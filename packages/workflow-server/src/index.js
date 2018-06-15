const ipc = require("node-ipc");

const apps = [];

ipc.config.id = 'workflow-server';
ipc.config.retry = 1500;
ipc.config.sync = true;

const hub = {
  listeners: {},
  emit(tag, msg) {
    //console.log("emit", tag, (listeners[tag] || []).length);
    for (const listener of (this.listeners[tag] || [])) {
      listener(msg);
    }
  },
  on(tag, cb) {
    this.listeners[tag] = (this.listeners[tag] || []);

    this.listeners[tag].push(cb);
  }
}


ipc.serveNet(() => {
  ipc.server.on('connect', (socket) => {
    ipc.log('server connected');

    hub.on("register", (data) => {
      console.log(data);
      ipc.server.emit(socket, "workflow.apply", JSON.stringify({
        file: "/home/havard/dev/workflow/packages/workflow-atom-plugin/package.json"
      }));
    });
  });

  ipc.server.on('workflow.register', (data) => {
    ipc.log("uhm", data);
    apps.push({
      appId: data.appId,
      processId: data.processId
    });

    hub.emit("register", data);
  });

  ipc.server.on('socket.disconnect', function() {
    ipc.log('server disconnected');
  });
});

ipc.server.start();
