import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/angular-universal-test/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('/api/events', (req, res) => {
    const events=[
      {
        name:"Concerto Xutos e Pontapés",
        description:"Concerto especial 10 anos do grupo mais famoso de portugal",
        photo:"https://media.timeout.com/images/105380766/image.jpg"
      },
      {
        name:"Concerto Dua Lipa Com Dababy",
        description:"Concerto dua lipa com o dababy especial tour",
        photo:"https://images.thefacecdn.com/images/121110720_1498193387038835_1925307451712523341_n.jpg?fit=crop&crop=focalpoint&fp-x=0.5395&fp-y=0.4269&w=1180"
      },
      {
        name:"Concerto Eminem",
        description:"Há mais de 20 anos que o eminem não vem a portugal ! Sexta feira é o seu dia! aparece",
        photo:"https://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2020/02/eminem-rapper-2019-696x464.jpg"
      },
    ]
    res.status(200).json(events)
  });
  server.get('*.*', express.static(distFolder, {
    maxAge: '0'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
