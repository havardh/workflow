import { file } from 'tmp-promise';
import { outputFile, close } from 'fs-extra';
import execa from 'execa';

class Terminal {
  async apply(flow) {
    const app = flow.children[0];

    const script = app.open(app);

    const { path, fd } = await file({
      prefix: 'workflow-wm-terminal-',
      postfix: '.sh',
      mode: 0o755,
    });

    await outputFile(path, script);
    await close(fd);

    await execa(path, null, {
      detached: true,
      shell: true,
      stdio: ['inherit', 'inherit', 'inherit'],
    });
  }

  async screen() {
    return {
      left: 0,
      top: 0,
      width: 1024,
      height: 768,
    };
  }
}

export default Terminal;
