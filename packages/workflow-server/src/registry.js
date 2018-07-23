const apps = [];

export function all() {
  return apps;
}

export function push(app) {
  console.log('register', app.appId);
  apps.push(app);
}
