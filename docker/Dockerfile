FROM circleci/node:8

# Install Xvfb
RUN sudo apt-get install -y xvfb

# Install workflow test dependencies
RUN sudo apt-get install -y i3 xterm scrot

# Upgrade yarn
RUN sudo npm i -g yarn

# Set PS1
RUN sudo echo 'export PS1="\w # "' >> ~/.bash_profile
