export function args(args) {
  const parsedArgs = {
    named: {},
    positional: [],
  };

  const argsLength = args.length;
  for (let i = 0; i < argsLength; i++) {
    const arg = args[i];
    if (arg.indexOf('-') != -1) {
      const name = getArgName(arg);
      if (args[i + 1] === undefined) throw Error('named argument should have a value');
      parsedArgs.named[name] = args[i + 1];
      i++;
    } else {
      parsedArgs.positional.push(arg);
    }
  }

  return parsedArgs;
}

export function getArgName(arg) {
  const sliceIndex = arg.lastIndexOf('-');
  return arg.slice(sliceIndex + 1, arg.length);
}
