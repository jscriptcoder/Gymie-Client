import gym
import time
import random

env = gym.make('LunarLander-v2')

n_actions = env.action_space.n
episodes = 1000

print('---')
print('Running {} episodes in Python...'.format(episodes))
start = time.time()

for _ in range(episodes):
    env.reset()
    total_reward = 0
    while True:
        action = random.randint(0, n_actions-1)
        observation, reward, done, info = env.step(action)
        total_reward += reward
        if done:
            break
env.close()

end = time.time()
print('It took {:.2f} seconds to finish.'.format(end - start))
print('---')
