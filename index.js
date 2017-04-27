// @flow

const [node, index, configFile, ...args] = process.argv;

const config = require(`./examples/js-test`).default;
import workflow from './workflow';

function parseArgs(config, args) {
  if (typeof config === "object" && config.length && config.length === args.length) {
    const argsObject = {}
    config.forEach(arg => argsObject[arg] = args.shift());
    return argsObject;
  } else if (typeof config === "string" && args.length === 1) {
    return {[config]: args[0]};
  } else {
    if (args.length && config.length) {
      throw `Invalid arguments. Arugments ${args.join(' ')} did not match config: ${config.join(' ')}`;
    } else {
      throw "Invalid arguments";
    }
  }
}

workflow.apply(config, parseArgs(config.args, args));
