import gym
import uuid

class NotFoundInstance(Exception):
    pass

envs = {}

def __lookup_env(instance_id):
    try:
        return envs[instance_id]
    except KeyError:
        raise NotFoundInstance()

def make(ws, env_id='', seed=0):
    env = gym.make(env_id)
    if seed: env.seed(seed)

    instance_id = uuid.uuid4().hex
    envs[instance_id] = env

    ws.send(instance_id)

def step(ws, instance_id, action, render):
    pass

def reset(ws, instance_id=''):
    __lookup_env(instance_id).reset()

def close(ws, instance_id=''):
    __lookup_env(instance_id).close()

methods = {
    'make': make,
    'reset': reset,
    'step': step,
    'close': close
}
