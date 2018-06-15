'use babel';

import { CompositeDisposable } from 'atom';
import http from "http";
import url from "url";
import op from "openport";

export default {

  server: null,

  activate(state) {
    setTimeout(() => {
      this.server = http.createServer((req, res) => {
        var queryData = url.parse(req.url, true).query;

        const {split, files} = queryData;
        if (files) {
          this.openSplit(split || "right", typeof file === "string" ? [files] : files);
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end();
        } else {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({
            path: atom.project.getDirectories()[0].path
          }));
        }
      });

      op.find({ startingPort: 9110, endingPort: 9120 }, (err, port) => {
        this.server.listen(port);
      });

    }, 10000);
  },

  deactivate() {
    this.server.close();
  },

  openSplit(split, files) {
    const panes = atom.workspace.getPanes();
    const activePane = atom.workspace.getActivePane();

    for (let pane of panes) {
      if (pane !== activePane) {
        pane.destroy();
      }
    }

    atom.workspace.open(files[0])
    for (let i = 1; i < files.length; i += 1) {
      atom.workspace.open(files[i], {split});
    }
  }
};
