FROM circleci/node:14

# Install Xvfb
RUN sudo apt-get install -y xvfb

# Install workflow test dependencies
RUN sudo apt-get install -y i3 xterm scrot

# Set PS1
RUN sudo echo 'export PS1="\w # "' >> ~/.bash_profile

# Copy i3 config
COPY --chown=circleci:circleci src/.i3 /home/circleci/.i3
