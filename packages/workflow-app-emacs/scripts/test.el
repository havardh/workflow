(find-file "/home/havard/dev/workflow/packages/workflow-app-emacs/flows/../package.json")
(save-selected-window
  (split-window-below)
  (other-window 1)

  (let (remember-original-function magit-display-buffer-function)
    (setq magit-display-buffer-function
          (lambda (buffer)
            (display-buffer buffer '(display-buffer-same-window))))
    (magit-status)
    (setq magit-display-buffer-function remember-original-function))

  )
(split-window-right)
(other-window 1)
(find-file "/home/havard/dev/workflow/packages/workflow-app-emacs/flows/../flows/emacs.js")
