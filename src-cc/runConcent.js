import loadingPlugin from 'concent-plugin-loading';
import { run } from 'concent';
import * as models from './models-cc';
import * as dashboardModels from './pages/Dashboard/models-cc';
import * as accSettingsModels from './pages/Account/Settings/models-cc';
import * as listModels from './pages/List/models-cc';

// loadingPlugin.setConf({ onlyForAsync: true });

const allModels = { ...models, ...dashboardModels, ...accSettingsModels, ...listModels };

run(allModels, {
  plugins: [loadingPlugin],
  middlewares: [
    (ctx, next) => {
      next();
    },
  ],
});
