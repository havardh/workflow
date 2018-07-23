#!/bin/bash

#tmux new-window -a -n WinSplit1
#tmux new-session -d -s WinSplit1
#tmux send-keys "cd ..; clear; ls" C-m
#tmux splitw -h
#tmux send-keys "cd ../../; clear; pwd" C-m
#tmux splitw -v
#tmux splitw -v
#tmux attach -t WinSplit1


# tmux start-server
tmux new-window -a -n tmux-test
tmux new-session -d -s tmux-test
tmux send-keys "vim /home/havard/dev/workflow/packages/workflow-app-tmux/flow/TmuxSplit.js" C-m
tmux splitw -v
tmux send-keys "less -f /home/havard/dev/workflow/packages/workflow-app-tmux/flow/TmuxSplit.js" C-m
tmux splitw -h
tmux send-keys "less  /home/havard/dev/workflow/packages/workflow-app-tmux/flow/TmuxSplit.js" C-m
