require('dotenv').config()

const { omit } = require('lodash');
const { send } = require('micro')
const { get, router } = require('microrouter/lib')

const oauth = require('./lib/oauth');
const { mergeQueryWithURL } = require('./helpers');

const getBaseCallbackURL = req =>
  `${oauth.getCurrentHostURL(req)}/callback`

const getCallbackURLWithQuery = (req, query = req.query) =>
  mergeQueryWithURL(
    getBaseCallbackURL(req),
    omit(query, [
      'client_id',
      'code',
      'grant_type',
      'redirect_uri',
      'response_type',
      'scope',
    ])
  );

module.exports = router(
  get('/', (req, res) => {
    oauth.authorize(
      req,
      res,
      { AUTHORIZE_URL: 'https://github.com/login/oauth/authorize' },
      Object.assign(
        {},
        req.query,
        {
          client_id: process.env.CLIENT_ID,
          redirect_uri: getCallbackURLWithQuery(req),
          response_type: 'code',
        }
      )
    );
  }),

  get('/callback', (req, res) => {
    oauth.callback(
      req,
      res,
      {
        PROVIDER: 'GitHub',
        CALLBACK_URL: req.query.callback_url || process.env.CALLBACK_URL,
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
        GET_TOKEN_URL: 'https://github.com/login/oauth/access_token',
      },
      {
        grant_type: 'authorization_code',
        redirect_uri: getCallbackURLWithQuery(req),
      }
    );
  })
);
