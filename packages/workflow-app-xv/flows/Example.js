import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';
import { readdir } from 'fs';
import { promisify } from 'util';
import { join } from 'path';

const readdirAsync = promisify(readdir);

const { Flex } = requireComponent('workflow-layout-yoga');
const ImageViewer = requireComponent('workflow-app-xv');

const folder = '/home/havard/docs/pictures';

export default readdirAsync(folder)
  .then(files => files.filter(file => file.endsWith('.jpg')))
  .then(files =>
    render(
      <Workspace name={'workflow-app-xv'}>
        <Flex
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {files.map(file => (
            <ImageViewer
              key={file}
              style={{ height: '300px', width: '450px', margin: '30px' }}
              file={join(folder, file)}
            />
          ))}
        </Flex>
      </Workspace>
    )
  );
