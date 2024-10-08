var capacitorSmartSensorsManager = (function (exports, core) {
    'use strict';

    exports.ConnectorType = void 0;
    (function (ConnectorType) {
        ConnectorType["WIFI"] = "wifi";
        ConnectorType["BLE"] = "ble";
    })(exports.ConnectorType || (exports.ConnectorType = {}));
    exports.SensorType = void 0;
    (function (SensorType) {
        SensorType["LEDS"] = "leds";
        SensorType["RFID"] = "rfid";
        SensorType["MAGNETIC"] = "magnetic";
        SensorType["TEMPERATURE"] = "temperature";
        SensorType["HUMIDITY"] = "humidity";
        SensorType["PRESSURE"] = "pressure";
        SensorType["ACCELEROMETER"] = "accelerometer";
        SensorType["GYROSCOPE"] = "gyroscope";
        SensorType["GPS"] = "gps";
        SensorType["CAMERA"] = "camera";
        SensorType["MICROPHONE"] = "microphone";
        SensorType["SPEAKER"] = "speaker";
        SensorType["DISPLAY"] = "display";
        SensorType["BUTTON"] = "button";
        SensorType["SWITCH"] = "switch";
        SensorType["POTENTIOMETER"] = "potentiometer";
        SensorType["JOYSTICK"] = "joystick";
        SensorType["SLIDER"] = "slider";
        SensorType["ROTARY"] = "rotary";
        SensorType["TOUCH"] = "touch";
        SensorType["PROXIMITY"] = "proximity";
        SensorType["DISTANCE"] = "distance";
    })(exports.SensorType || (exports.SensorType = {}));

    const SmartSensorsManager = core.registerPlugin('SmartSensorsManager', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.SmartSensorsManagerWeb()),
    });

    class SmartSensorsManagerWeb extends core.WebPlugin {
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
        async switchOn(setup) {
            console.log(setup);
            const error = {
                status: false,
                errorMsg: 'switchOn Not implemented on web'
            };
            return error;
        }
        async switchOff(setup) {
            console.log(setup);
            const error = {
                status: false,
                errorMsg: 'switchOff Not implemented on web'
            };
            return error;
        }
    }

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        SmartSensorsManagerWeb: SmartSensorsManagerWeb
    });

    exports.SmartSensorsManager = SmartSensorsManager;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
