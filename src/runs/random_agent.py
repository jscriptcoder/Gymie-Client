import gym
import time
import argparse
import numpy as np
from src.agents import RandomAgent

parser = argparse.ArgumentParser()
parser.add_argument('-p', '--episodes', default=10000, type=int)
args = parser.parse_args()

env = gym.make('LunarLander-v2')
agent  = RandomAgent(env.action_space.n)

episodes = args.episodes
rewards = []

print('---')
print('Running {} episodes on Python platform...'.format(episodes))
start = time.time()

for _ in range(episodes):
    env.reset()
    total_reward = 0
    while True:
        action = agent.act()
        obs, reward, done, info = env.step(action)
        total_reward += reward
        if done:
            rewards.append(total_reward)
            break
env.close()

end = time.time()
print('It took {:.2f} seconds to finish.'.format(end - start))
print('Average total reward: {:.2f}'.format(np.mean(rewards)))
print('---')
