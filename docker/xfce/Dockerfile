FROM circleci/node:8

# Update apt-get definitions
RUN sudo apt-get update

# Install Xvfb
RUN sudo apt-get install -y xvfb

# Install workflow test dependencies
RUN sudo apt-get install -y xfce4 wmctrl gedit iceweasel gnome-terminal scrot

# Upgrade yarn
RUN sudo npm i -g yarn

# Set PS1
RUN sudo echo 'export PS1="\w # "' >> ~/.bash_profile

# Copy i3 config
 COPY src/xrandr /usr/local/bin/xrandr
