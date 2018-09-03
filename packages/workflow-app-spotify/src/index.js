/* eslint-disable no-unused-vars */

const Playlist = {
  type: 'app',
  name: 'Playlist',
  params: ['user', 'id'],
  open: ({ user, id }, context, children) => {
    return `spotify:user:${user}:playlist:${id}`;
  },
};

const spotify = {
  type: 'app',
  name: 'Spotify',
  xClass: 'Spotify',
  params: ['minimized'],
  open: ({ minimized }, context, children) => {
    if (children.length !== 1) {
      throw new Error('Spotify does not support more or less than one child node');
    }

    const [child] = children;
    const uri = child.open(child, context, child.children);

    return `spotify --uri='${uri}' &`;
  },
};

export default spotify;

export { Playlist };
