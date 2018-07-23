#!/bin/bash

#tmux new-window -a -n WinSplit1
#tmux new-session -d -s WinSplit1
#tmux send-keys "cd ..; clear; ls" C-m
#tmux splitw -h
#tmux send-keys "cd ../../; clear; pwd" C-m
#tmux splitw -v
#tmux splitw -v
#tmux attach -t WinSplit1

tmux kill-session -t tmux-test
tmux start-server
tmux new-window -a -n tmux-test
tmux new-session -d -s tmux-test
tmux send-keys "vim /home/havard/dev/workflow/packages/workflow-app-tmux/flow/TmuxSplit.js" C-m
WF_TMUX_PANE_0=`tmux lsp | grep active | awk '{print $1}' | grep -o '[0-9]*'`
tmux splitw -v
tmux send-keys "less -f /home/havard/dev/workflow/packages/workflow-app-tmux/flow/TmuxSplit.js" C-m
tmux selectp -t $WF_TMUX_PANE_0
tmux splitw -h
tmux send-keys "less  /home/havard/dev/workflow/packages/workflow-app-tmux/flow/TmuxSplit.js" C-m
WF_TMUX_PANE_1=`tmux lsp | grep active | awk '{print $1}' | grep -o '[0-9]*'`
tmux splitw -h
tmux send-keys "less  /home/havard/dev/workflow/packages/workflow-app-tmux/flow/TmuxSplit.js" C-m
tmux selectp -t $WF_TMUX_PANE_1
tmux splitw -v
tmux send-keys "vim /home/havard/dev/workflow/packages/workflow-app-tmux/flow/TmuxSplit.js" C-m

tmux attach-session -t tmux-test

exit 0


tmux new-window -a -n tmux-test
tmux new-session -d -s tmux-test

tmux send-keys "echo 1" C-m

# WF_TMUX_PANE_0=`tmux lsp | grep active | awk '{print $1}' | grep -o '[0-9]*'`
tmux splitw -v
tmux send-keys "echo 2" C-m

# tmux selectp -t $WF_TMUX_PANE_0
tmux splitw -h
tmux send-keys "echo 3" C-m

tmux attach-session -t tmux-test


