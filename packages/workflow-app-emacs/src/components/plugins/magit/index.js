const Status = {
  type: 'app',
  name: 'MagitStatus',
  open: ({ path }) =>
    `
(let (remember-original-function magit-display-buffer-function)
  (setq magit-display-buffer-function
        (lambda (buffer)
          (display-buffer buffer '(display-buffer-same-window))))
  (magit-status${path ? ' ' + path : ''})
  (setq magit-display-buffer-function remember-original-function))
`
      .split('\n')
      .join(' '),
};

export const Magit = { Status };
