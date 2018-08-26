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
      if (args[i + 1] === undefined) throw Error(`named argument ${arg} is missing a value`);
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

export function removeScriptName(args) {
  let sliceIndex = 0;
  if (args[0].indexOf('workflow') !== -1) sliceIndex = 1;
  else if (args[0].indexOf('node') !== -1) sliceIndex = 2;
  else throw new Error('script run wrongly');
  return args.slice(sliceIndex, args.length);
}
