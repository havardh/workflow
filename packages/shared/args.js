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
  let sliceIndex;
  const isWordArg = arg[1] === '-';
  if (isWordArg) {
    if (arg.length === 3) throw new Error(`expected ${arg} to be a word arg`);
    sliceIndex = 2;
  } else {
    if (arg.length > 2) throw new Error(`expected ${arg} to be a single char arg`);
    sliceIndex = 1;
  }
  return arg.slice(sliceIndex, arg.length);
}

export function removeScriptName(args) {
  let sliceIndex = 0;
  if (args[0].indexOf('workflow') !== -1) sliceIndex = 1;
  else if (args[0].indexOf('node') !== -1) sliceIndex = 2;
  else throw new Error('script run wrongly');
  return args.slice(sliceIndex, args.length);
}
