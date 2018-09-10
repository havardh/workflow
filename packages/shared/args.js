export default function args(args) {
  const parsedArgs = {
    named: {},
    positional: [],
  };

  const argsLength = args.length;
  for (let i = 2; i < argsLength; i++) {
    const arg = args[i];
    if (arg[0] === '-') {
      const name = getArgName(arg);
      if (args[i + 1] === undefined) {
        parsedArgs.named[name] = true;
      } else {
        parsedArgs.named[name] = args[i + 1];
      }
      i++;
    } else {
      parsedArgs.positional.push(arg);
    }
  }

  return parsedArgs;
}

function getArgName(arg) {
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
