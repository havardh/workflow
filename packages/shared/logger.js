/* eslint-env node */
/* eslint-disable no-console */
const DEBUG = 1;
const INFO = 2;
const ERROR = 3;

function getLevel() {
  const level = process.env.WORKFLOW_LOG;
  if (level) {
    try {
      return parseInt(level, 10);
    } catch(e) {
      error(
        `Could not parse WORKFLOW_LOG_LEVEL enviroment variable given ${level}`,
        e
      );
    }
  } else {
    return ERROR;
  }
}

const shouldLogDebug = () => getLevel() >= DEBUG;
const shouldLogInfo = () => getLevel() >= INFO;
const shouldLogError = () => getLevel() >= ERROR;

export function error(...args) {
  if (shouldLogError()) {
    console.error(...args);
  }
}

export function info(...args) {
  if (shouldLogInfo()) {
    console.info(...args);
  }
}

export function debug(...args) {
  if (shouldLogDebug()) {
    console.log(...args);
  }
}
