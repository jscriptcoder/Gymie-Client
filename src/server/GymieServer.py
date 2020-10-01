#!/usr/bin/env python

import json
import gym
import eventlet
from eventlet import wsgi, websocket
from .config import host, port

@websocket.WebSocketWSGI
def env_handle(ws):
    if ws.path == '/step':
        pass
    elif ws.path == '/reset':
        pass
    elif ws.path == '/render':
        pass
    elif ws.path == '/close':
        pass
    else
        # TODO

@websocket.WebSocketWSGI
def make_handle(ws):


def dispatch(environ, start_response):
    if environ['PATH_INFO'] == '/make':
        make_handle(environ, start_response) 
    else:


class GymieServer:
    __init__(self):
        pass
