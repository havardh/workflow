const { readFileSync } = require('fs');
const { join } = require('path');

const lineregex = /(?<indent> *)(?<windowId>0x[0-9a-f]*) (?<name>\(has no name\)|".*"): \((?<title>.*)\)  (?<width>\d+)x(?<height>\d+)\+(?<x>\d+)\+(?<y>\d+)  \+\d+\+\d+$mgU/;

function parse(file) {
  const text = readFileSync(join(__dirname, file));

  const root = [];

  let lastIndent = 4;

  for (let line of text.split('\n')) {
    if (lineregex.test(line)) {
      const { indent, windowId, name, title, width, height, x, y } = lineregex.exec(line).groups;

      console.log(indent.length, windowId, title);
    }
  }
}

console.log(parse('../xininfo.out'));
