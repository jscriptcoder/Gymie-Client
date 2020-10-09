import numpy as np

class RandomAgent:

    n_actions = 0

    def __init__(self, n_actions):
        self.n_actions = n_actions
    
    def act(self, state=None):
        return np.random.randint(0, self.n_actions)
