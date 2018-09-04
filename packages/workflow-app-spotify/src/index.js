/* eslint-disable no-unused-vars */

import { platform } from 'shared/apps';

const Playlist = {
  type: 'app',
  name: 'Playlist',
  params: ['user', 'id'],
  open: ({ user, id }, context, children) => {
    return `spotify:user:${user}:playlist:${id}`;
  },
};

function getUri(children, context) {
  if (!children || children.length === 0) {
    return;
  }
  if (children.length > 1) {
    throw new Error('Spotify support at most one child node');
  }

  const [child] = children;
  return child.open(child, context, child.children);
}

const spotify = {
  type: 'app',
  name: 'Spotify',
  xClass: 'Spotify',
  params: ['minimized'],
  open: platform({
    'linux-i3': linux,
  }),
};

function linux({ mimimized }, context, children) {
  const uri = getUri(children, context);
  if (uri) {
    return `spotify --uri='${uri}' &`;
  } else {
    return 'spotify &';
  }
}


export default spotify;

export { Playlist };
