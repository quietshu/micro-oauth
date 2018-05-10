OAuth micro service for GitHub. Deploy via Now: 
```
now quietshu/micro-oauth -e PROVIDER=GitHub -e AUTHORIZE_URL=https://github.com/login/oauth/authorize -e CALLBACK_URL=https://mak.ink -e CLIENT_ID=16d340c91cc32ce7b321 -e CLIENT_SECRET=XXX -e GET_TOKEN_URL=https://github.com/login/oauth/access_token
```

## License

Forked from https://github.com/brunolemos/micro-oauth.

Copyright (c) 2017 [Bruno Lemos](https://twitter.com/brunolemos) & [Maximilian Stoiber](https://twitter.com/mxstbr), licensed under the MIT license.
See [LICENSE.md](LICENSE.md) for more information.
