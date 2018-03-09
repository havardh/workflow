

export function Terminal(config) {
  return {
    open: () => "",
    ...config,
    name: 'Terminal',
  };
}

export function TextEdit(config) {
  return {
    open: ({ file }) => file,
    ...config,
    name: 'TextEdit',
  };
}

export function Safari(config) {
  return {
    open: ({ url }) => url,
    ...config,
    name: 'Safari',
  };
}
