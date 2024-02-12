import { registerPlugin } from '@capacitor/core';

import type { SmartSensorsManagerPlugin } from './definitions';

const SmartSensorsManager = registerPlugin<SmartSensorsManagerPlugin>(
  'SmartSensorsManager',
  {
    web: () => import('./web').then(m => new m.SmartSensorsManagerWeb()),
  },
);

export * from './definitions';
export { SmartSensorsManager };
