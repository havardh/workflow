function matches(spec, { platform, wm }) {
  const [specPlatform, specWm] = spec.split('-');

  if (specPlatform === '*' || specPlatform === platform) {
    if (specWm === '*' || specWm === wm) {
      return true;
    }
  } else {
    return false;
  }
}

export function platform(spec) {
  return async (app, context, children) => {
    for (let [matchString, fn] of Object.entries(spec)) {
      if (matches(matchString, context)) {
        try {
          return await fn.apply(null, [app, context, children]);
        } catch (e) {
          throw e;
        }
      }
    }

    throw new Error(
      `App ${JSON.stringify(app)} does not support the platform ${JSON.stringify(context)}`
    );
  };
}
