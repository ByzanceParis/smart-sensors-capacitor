import { registerPlugin } from '@capacitor/core';
const SmartSensorsManager = registerPlugin('SmartSensorsManager', {
    web: () => import('./web').then(m => new m.SmartSensorsManagerWeb()),
});
export * from './definitions';
export { SmartSensorsManager };
//# sourceMappingURL=index.js.map