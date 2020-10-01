#!/usr/bin/env python

import json
import gym
import eventlet
import argparse
from eventlet import wsgi, websocket
from src.server.envs import methods, NotFoundInstance

@websocket.WebSocketWSGI
def gym_handle(ws):
    while True:
        message = ws.wait()
        if message is None: break
        data = json.loads(message)

        method = data['method']
        params = data['params']

        try:
            methods[method](ws, **params)
        except KeyError:
            ws.send(json.dumps({ 'Error': 'Wrong method' }))
        except NotFoundInstance:
            ws.send(json.dumps({ 'Error': 'Instance not found' }))
        else:
            break

def dispatch(environ, start_response):
    if environ['PATH_INFO'] == '/gym':
        return gym_handle(environ, start_response)
    else:
        start_response('200 OK', [('Content-Type', 'text/plain')])
        return ['Gymie is running...']


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-l', '--host', default='0.0.0.0')
    parser.add_argument('-p', '--port', default=5000, type=int)
    args = parser.parse_args()

    listener = eventlet.listen((args.host, args.port))
    wsgi.server(listener, dispatch)
