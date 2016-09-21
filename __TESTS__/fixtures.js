import url from 'url';
import http from 'http';
import sinon from 'sinon';
import noop from 'lodash/noop';
import express from 'express';
import jsdom from 'jsdom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import FetchResourceMiddleware from '../src/index.js';

const FETCH_POLYFILL = 'https://cdnjs.cloudflare.com/ajax/libs/fetch/1.0.0/fetch.min.js';
const PORT = 9009;

function createExpressApp () {
  const app = express();

  app.all('/echo/:prop', function (req, res) {
    const { [req.params.prop]: prop } = req;
    res.set('X-Echo-Prop', prop);
    res.send({ [req.params.prop]: prop });
  });

  app.all('/status/:code', function (req, res) {
    const code = parseFloat(req.params.code);
    return res.sendStatus(code);
  });

  return app;
}

function getUrl (hostname = 'localhost') {
  return url.format({
    protocol: 'http:',
    hostname,
    port: PORT
  });
}

function createDom (hostname) {
  return new Promise((resolve, reject) => {
    jsdom.env(
      getUrl(hostname),
      [FETCH_POLYFILL],
      (err, window) => err
        ? reject(err)
        : resolve({ window })
    );
  });
}

function createServer (app) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(app);
    server.setTimeout(500);
    server.listen(PORT, err => err
      ? reject(err)
      : resolve({ server })
    );
  });
}

export const env = {
  app: createExpressApp(),

  server: null,

  window: null,

  injectGlobals: function (window = { location: {} }) {
    global.window = window;
  },

  mount: async function (hostname) {
    const {server} = await createServer(this.app);
    const {window} = await createDom(hostname);

    this.server = server;
    this.window = window;

    this.injectGlobals(window);
  },

  unmount: function () {
    return new Promise((resolve, reject) => {
      this.window.close();
      this.server.close(err => err
        ? reject(err)
        : resolve()
      );
    });
  }
};

export function createStoreWithOptions (reducer, options) {
  if (typeof reducer !== 'function') {
    options = reducer;
    reducer = () => ({});
  }

  return createStore(
    reducer,
    applyMiddleware(
      thunk,
      FetchResourceMiddleware(options)
    )
  );
}

export const mocks = {
  noopFetch: function () {
    return sinon.stub().returns(new Promise(noop));
  },

  errorFetch: function (error = {}) {
    return sinon.stub().returns(Promise.reject(error));
  }
};

export default { env, mocks, createStoreWithOptions };
