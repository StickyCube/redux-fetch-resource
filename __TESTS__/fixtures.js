import http from 'http';
import sinon from 'sinon';
import noop from 'lodash/noop';
import express from 'express';
import jsdom from 'jsdom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import FetchResourceMiddleware from '../src/index.js';
import cookieParser from 'cookie-parser';

const FETCH_POLYFILL = 'https://cdnjs.cloudflare.com/ajax/libs/fetch/1.0.0/fetch.min.js';
const PORT = 9009;

function createExpressApp () {
  const app = express();

  app.use(cookieParser());

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

function createDom (options) {
  return new Promise((resolve, reject) => {
    jsdom.env({
      url: `http://localhost:${PORT}`,
      scripts: [FETCH_POLYFILL],
      done: (err, window) => err
          ? reject(err)
          : resolve({ window }),
      ...options
    });
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

class MockResponse {
  constructor (data = {}) {
    this._json = data;
    this._text = JSON.stringify(data);
    this.ok = true;
    this.statusCode = 200;
    this.headers = new Map();
  }

  text () {
    return Promise.resolve(this._text);
  }

  json () {
    return Promise.resolve(this._json);
  }
}

export const mocks = {
  noopFetch: function () {
    return sinon.stub().returns(new Promise(noop));
  },

  successFetch: function (result = {}) {
    return sinon.stub().returns(Promise.resolve(new MockResponse(result)));
  },

  errorFetch: function (error = {}) {
    return sinon.stub().returns(Promise.reject(error));
  },

  window: function () {
    return {
      location: {}
    };
  }
};

export const env = {
  app: createExpressApp(),

  server: null,

  window: null,

  injectGlobals: function (window = mocks.window()) {
    global.window = window;
  },

  mount: async function (options = {}) {
    const {server} = await createServer(this.app);
    const {window} = await createDom(options);

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

export default { env, mocks, createStoreWithOptions };
