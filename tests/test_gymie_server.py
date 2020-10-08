#!/usr/bin/env python

import uuid
import json
import unittest
from functools import reduce
from unittest.mock import MagicMock
import src.server.gymie_server as gs

class WebsocketMock():
    def send(self, message):
        pass

    def close(self, close_data=None):
        pass

class TestGymieServer(unittest.TestCase):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        ws = WebsocketMock()
        ws.send = MagicMock()
        ws.close = MagicMock()
        self.ws = ws

    def tearDown(self):
        keys = list(gs.envs.keys())
        for instance_id in keys:
            del gs.envs[instance_id]

    def make_env(self, env_id):
        gs.make(self.ws, env_id)
        return self.ws.send.call_args[0][0]

    def assert_valid_state(self, state, size=4):
        self.assertTrue(len(state) == size)
        self.assertTrue(reduce(lambda a, b: type(b) == float and a, state, True)) # all floats

    def test_message_handle(self):
        gs.message_handle(self.ws, 'Wrong JSON')
        self.ws.close.assert_called_with((1003, 'Message `Wrong JSON` is invalid'))

        gs.message_handle(self.ws, '{"prop": "value"}')
        self.ws.close.assert_called_with((1003, "Message keys ['prop'] are missing or invalid"))

        gs.message_handle(self.ws, '{"method": "make"}')
        self.ws.close.assert_called_with((1003, "Message keys ['method'] are missing or invalid"))

        gs.message_handle(self.ws, '{"method": "invalid_method", "params": {}}')
        self.ws.close.assert_called_with((1007, 'Method `invalid_method` not found'))

        gs.message_handle(self.ws, '{"method": "make", "params": {}}')
        self.ws.close.assert_called_with((1007, 'Parameters `{}` are wrong'))

        gs.message_handle(self.ws, '{"method": "make", "params": {"env_id": "malformed" }}')
        self.ws.close.assert_called_with((1007, 'Environment `malformed` is malformed'))

        gs.message_handle(self.ws, '{"method": "make", "params": {"env_id": "NotFound-v1" }}')
        self.ws.close.assert_called_with((1007, 'Environment `NotFound-v1` not found'))

        # TODO: test more exceptions

    def test_make(self):
        with self.assertRaises(gs.EnvironmentMalformed):
            gs.make(self.ws, 'malformed')
        
        with self.assertRaises(gs.EnvironmentNotFound):
            gs.make(self.ws, 'NotFound-v1')

        gs.make(self.ws, 'CartPole-v1')

        instance_id = self.ws.send.call_args[0][0]

        self.assertTrue(type(instance_id) == str)
        self.assertTrue(len(instance_id) == len(uuid.uuid4().hex))
    
    def test_lookup_env(self):
        instance_id = self.make_env('CartPole-v1')

        env = gs.lookup_env(instance_id)

        self.assertTrue(env.spec.id == 'CartPole-v1')

        with self.assertRaises(gs.InstanceNotFound):
            gs.lookup_env('not_found')

    def test_reset(self):
        instance_id = self.make_env('CartPole-v1')
        gs.reset(self.ws, instance_id)

        state = json.loads(self.ws.send.call_args[0][0])
        self.assert_valid_state(state)

    def test_close(self):
        instance_id = self.make_env('CartPole-v1')
        env = gs.lookup_env(instance_id)
        self.assertTrue(env != None)

        gs.close(self.ws, instance_id)
        with self.assertRaises(gs.InstanceNotFound):
            gs.lookup_env(instance_id)
        
        resp = json.loads(self.ws.send.call_args[0][0])
        self.assertTrue(resp)

    def test_step(self):
        instance_id = self.make_env('CartPole-v1')
        env = gs.lookup_env(instance_id)

        gs.reset(self.ws, instance_id)

        with self.assertRaises(gs.WrongAction):
            gs.step(self.ws, instance_id, 'invalid_action')
        
        # valid action
        action = env.action_space.sample()
        gs.step(self.ws, instance_id, action)

        observation, reward, done, info = json.loads(self.ws.send.call_args[0][0])

        self.assert_valid_state(observation)
        self.assertTrue(type(reward) == float)
        self.assertTrue(type(done) == bool)
        self.assertTrue(type(info) == dict)

    def test_observation_space(self):
        instance_id = self.make_env('CartPole-v1')
        env = gs.lookup_env(instance_id)

        gs.observation_space(self.ws, instance_id)
        info = json.loads(self.ws.send.call_args[0][0])

        self.assertEqual(info['name'], 'Box')
        self.assertEqual(info['shape'], list(env.observation_space.shape))
        self.assertEqual(info['low'], list(env.observation_space.low))
        self.assertEqual(info['high'], list(env.observation_space.high))

    def test_action_space(self):
        instance_id = self.make_env('CartPole-v1')
        env = gs.lookup_env(instance_id)

        gs.action_space(self.ws, instance_id)
        info = json.loads(self.ws.send.call_args[0][0])

        self.assertEqual(info['name'], 'Discrete')
        self.assertEqual(info['n'], env.action_space.n)

    def test_action_sample(self):
        instance_id = self.make_env('CartPole-v1')
        env = gs.lookup_env(instance_id)

        gs.action_sample(self.ws, instance_id)
        action = json.loads(self.ws.send.call_args[0][0])

        self.assertTrue(action in range(env.action_space.n))


if __name__ == '__main__':
    unittest.main()
