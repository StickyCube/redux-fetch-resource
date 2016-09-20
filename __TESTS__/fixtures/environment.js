import url from 'url';
import http from 'http';
import express from 'express';
import jsdom from 'jsdom';

const FETCH_POLYFILL = 'https://cdnjs.cloudflare.com/ajax/libs/fetch/1.0.0/fetch.min.js';
const PORT = parseFloat(process.env.TEST_SERVER_PORT) || 5000;

function getUrl (hostname = 'localhost') {
  return url.format({
    protocol: 'http:',
    hostname,
    port: PORT
  });
}

function createWindow (hostname, done) {
  jsdom.env(
    getUrl(hostname),
    [FETCH_POLYFILL],
    done
  );
}

export default {
  app: express(),

  server: null,

  window: null,

  mount (hostname) {
    this.server = http.createServer(this.app);
    this.server.setTimeout(200);

    return new Promise((resolve, reject) => {
      return this.server.listen(PORT, err => {
        if (err) return reject(err);
        return createWindow(hostname, (err, win) => {
          if (err) return reject(err);
          this.window = win;
          setTimeout(function () {
            resolve();
          }, 100);
        });
      });
    });
  },

  unmount () {
    return new Promise((resolve, reject) => {
      this.server.once('close', resolve);
      this.window.close();
      this.server.close();
    });
  }
};
