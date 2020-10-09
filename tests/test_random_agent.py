import gym
import time
import numpy as np
from src.agents import RandomAgent

env = gym.make('LunarLander-v2')
agent  = RandomAgent(env.action_space.n)

episodes = 10000
rewards = []

print('---')
print('Running {} episodes in Python...'.format(episodes))
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
