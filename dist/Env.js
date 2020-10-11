"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Commander_1 = __importDefault(require("./Commander"));
const utils_1 = require("./utils");
/**
 * Wrapper for an [OpenAI Gym Environment]{@link https://gym.openai.com/envs/}
 */
class Env {
    constructor(instanceId, requester) {
        this.commander = null;
        this.requester = null;
        this.commander = new Commander_1.default(instanceId);
        this.requester = requester;
    }
    async step(action) {
        const cmd = this.commander.make('step', { action });
        const strStep = await this.requester.request(cmd);
        return utils_1.toObj(strStep);
    }
    async reset() {
        const cmd = this.commander.make('reset');
        const strState = await this.requester.request(cmd);
        return utils_1.toObj(strState);
    }
    async observation_space() {
        const cmd = this.commander.make('observation_space');
        const strObsSpace = await this.requester.request(cmd);
        return utils_1.toObj(strObsSpace);
    }
    async action_space() {
        const cmd = this.commander.make('action_space');
        const strActSpace = await this.requester.request(cmd);
        return utils_1.toObj(strActSpace);
    }
    async action_sample() {
        const cmd = this.commander.make('action_sample');
        const strAction = await this.requester.request(cmd);
        return utils_1.toObj(strAction);
    }
    async close() {
        const cmd = this.commander.make('close');
        const resp = await this.requester.request(cmd);
        return utils_1.toObj(resp);
    }
}
exports.default = Env;
