chrome.tabs.onUpdated.addListener((tabId, changeObject) => {
  const { url } = changeObject;
  if (typeof url === 'string') {
    if (url.startsWith('http://localhost:9876')) {
      const params = new URL(url).searchParams;
      const data = params.get('data');

      const { redirect, appId } = JSON.parse(decodeURIComponent(data));

      console.log('creating socket', { redirect, appId });
      const socket = new WebSocket('ws://localhost:8080');

      socket.addEventListener('open', function(event) {
        console.log('socket opened');
        socket.send(
          JSON.stringify({
            type: 'register',
            appId: appId,
            processId: 'na',
          })
        );
      });
      chrome.tabs.update(tabId, { url: redirect });
      socket.addEventListener('message', function(event) {
        const { topic, message } = JSON.parse(event.data);
        const { url } = message;
        chrome.tabs.update(tabId, { url });
      });
    }
  }
});
