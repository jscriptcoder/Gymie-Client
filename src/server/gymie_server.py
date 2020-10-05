#!/usr/bin/env python

import gym
import json
import uuid
import eventlet
import argparse
import numpy as np
from eventlet import wsgi, websocket

#####################
# Custom Exceptions #
#####################

class InstanceNotFound(Exception): 
    pass

class EnvironmentMalformed(Exception): 
    pass

class EnvironmentNotFound(Exception): 
    pass

class WrongAction(Exception): 
    pass

##########################
# Environments Container #
##########################

envs = {}

#############################
# Gym.Env Wrapper Functions #
#############################

def lookup_env(instance_id):
    try:
        return envs[instance_id]
    except KeyError:
        raise InstanceNotFound(instance_id)

def make(ws, env_id, seed=None):
    
    try:
        env = gym.make(env_id)
    except gym.error.UnregisteredEnv:
        raise EnvironmentNotFound(env_id)
    except gym.error.Error:
        raise EnvironmentMalformed(env_id)
    else:
        if seed: 
            env.seed(seed)

        instance_id = uuid.uuid4().hex
        envs[instance_id] = env

        ws.send(instance_id)

def step(ws, instance_id, action, render=False):
    env = lookup_env(instance_id)

    if render: 
        env.render()

    try:
        observation, reward, done, info = env.step(action)
    except AssertionError:
        raise WrongAction(str(action))
    else:
        ws.send(json.dumps([observation.tolist(), reward, done, info]))

def reset(ws, instance_id):
    state = lookup_env(instance_id).reset()
    ws.send(json.dumps(state.tolist()))
    
def close(ws, instance_id):
    lookup_env(instance_id).close()
    del envs[instance_id]

def space_info(space):
    name = space.__class__.__name__
    info = { 'name': name }

    if name == 'Discrete':
        info['n'] = space.n
    elif name == 'Box':
        info['shape'] = space.shape

        # I noticed that numpy.float32 isn't JSON serializable but numpy.float64 is.
        # By applying float(x) we're converting into float64
        info['low'] = [(float(x) if x != -np.inf else -1e100) for x in space.low]
        info['high'] = [(float(x) if x != -np.inf else -1e100) for x in space.high]
    # TODO other shapes

    return info

def observation_space(ws, instance_id):
    space = lookup_env(instance_id).observation_space
    info = space_info(space)
    ws.send(json.dumps(info))

def action_space(ws, instance_id):
    space = lookup_env(instance_id).action_space
    info = space_info(space)
    ws.send(json.dumps(info))

def action_sample(ws, instance_id):
    env = lookup_env(instance_id)
    action = env.action_space.sample()
    ws.send(json.dumps(action))

###############
# Exposed API #
###############

methods = {
    'make': make,
    'reset': reset,
    'step': step,
    'close': close,
    'observation_space': observation_space,
    'action_space': action_space,
    'action_sample': action_sample
}

#############################
# WebSocket Server Handlers #
#############################

def message_handle(ws, message):
    try:
        data = json.loads(message)
        method = data['method']
        params = data['params']
    except json.JSONDecodeError:
        ws.close((1003, 'Message `{}` is invalid'.format(message)))
    except KeyError:
        keys = str(list(data.keys()))
        ws.close((1003, 'Message keys {} are missing or invalid'.format(keys)))
    else:
        try:
            methods[method](ws, **params)
        except KeyError:
            ws.close((1007, 'Method `{}` not found'.format(method)))
        except TypeError:
            ws.close((1007, 'Parameters `{}` are wrong'.format(data['params'])))
        except InstanceNotFound as instance_id:
            ws.close((1007, 'Instance `{}` not found'.format(instance_id)))
        except EnvironmentMalformed as env_id:
            ws.close((1007, 'Environment `{}` is malformed'.format(env_id)))
        except EnvironmentNotFound as env_id:
            ws.close((1007, 'Environment `{}` not found'.format(env_id)))
        except WrongAction as action:
            ws.close((1007, 'Action `{}` is wrong'.format(action)))

@websocket.WebSocketWSGI
def gym_handle(ws):
    while True:
        message = ws.wait()
        if message is None: 
            break
        message_handle(ws, message)

def dispatch(environ, start_response):
    if environ['PATH_INFO'] == '/gym':
        return gym_handle(environ, start_response)
    else:
        start_response('200 OK', [('Content-Type', 'text/plain')])
        return ['Gymie is running...']

###############
# Entry Point #
###############
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-l', '--host', default='0.0.0.0')
    parser.add_argument('-p', '--port', default=5000, type=int)
    args = parser.parse_args()

    listener = eventlet.listen((args.host, args.port))
    wsgi.server(listener, dispatch)
