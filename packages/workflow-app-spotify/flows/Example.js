/* eslint-env node */
import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';

const Spotify = requireComponent('workflow-app-spotify');
const { Playlist } = Spotify;

export default render(
  <Workspace name={'workflow-app-spotify'}>
    <Spotify play minimized>
      <Playlist user={'spotify'} id={'37i9dQZF1DX1j96SzHv3js'} />
    </Spotify>
  </Workspace>
);
