import * as models from './models-cc';
import * as dashboardModels from './pages/Dashboard/models-cc';
import loadingPlugin from 'concent-plugin-loading';
import { run } from 'concent';

// loadingPlugin.setConf({ onlyForAsync: true });

const allModels = { ...models, ...dashboardModels };

run(allModels, {
  plugins: [loadingPlugin],
  middlewares: [
    (ctx, next) => {
      console.log(ctx);
      next();
    }
  ]
});