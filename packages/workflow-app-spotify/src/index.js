/* eslint-disable no-unused-vars */
/* global Application, delay */

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
    'osx-default': osx,
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

async function osx(app, context, children) {
  const uri = getUri(children, context);

  await context.run(
    (app, uri) => {
      const se = Application('System Events');
      const window = se.processes['Spotify'].windows[0];

      const spotify = Application('Spotify');
      spotify.activate();

      const { x, y, width, height } = app.position;
      window.position = [x, y];
      window.size = [width, height];

      if (uri) {
        spotify.playTrack(uri);
      }

      if (!app.play) {
        spotify.pause();
      } else {
        spotify.play();
      }

      if (app.minimized) {
        delay(0.1);
        se.keystroke('m', { using: 'command down' });
      }
      if (app.fullscreen) {
        delay(0.1);
        se.keystroke('f', { using: ['control down', 'command down'] });
      }
    },
    app,
    uri
  );
}

export default spotify;

export { Playlist };
