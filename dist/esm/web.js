import { WebPlugin } from '@capacitor/core';
export class SmartSensorsManagerWeb extends WebPlugin {
    async initManager(configuration) {
        console.log(configuration);
        const error = {
            status: false,
            errorMsg: 'initManager Not implemented on web'
        };
        return error;
    }
    async setLedsState(ledState) {
        console.log(ledState);
        const error = {
            status: false,
            errorMsg: 'setLedsState Not implemented on web'
        };
        return error;
    }
    async ledSetup(setup) {
        console.log(setup);
        const error = {
            status: false,
            errorMsg: 'ledSetup Not implemented on web'
        };
        return error;
    }
}
//# sourceMappingURL=web.js.map