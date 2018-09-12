/* eslint-disable no-unused-vars */

function buildUri({ teamId }) {
  if (teamId) {
    return `slack://open?team=${teamId}`;
  } else {
    return 'slack://open';
  }
}

const slack = {
  type: 'app',
  name: 'Slack',
  xClass: 'Slack',
  params: ['teamId'],
  open: ({ teamId }, { platform, wm }, children) => {
    if (platform !== 'linux') {
      throw new Error('Platform is not supported');
    }
    if (wm != 'i3') {
      throw new Error('Wm is not supported');
    }

    return `xdg-open ${buildUri({ teamId })}`;
  },
};

export default slack;
