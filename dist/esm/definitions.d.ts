export interface SmartSensorsManagerPlugin {
    initManager(configuration: ConfigurationOptions): Promise<ManagerStatus>;
    setLedsState(ledState: LedStateConfig): Promise<ManagerStatus>;
}
export interface ConfigurationOptions {
    sensor: SensorType;
    connector: ConnectorType;
    apiKey?: string;
    apiSecret?: string;
    apiEndpoint?: string;
}
export interface ManagerStatus {
    status: boolean;
    errorMsg?: string;
}
export interface LedStateConfig {
    state: boolean;
    ids?: string | string[];
}
export declare enum ConnectorType {
    WIFI = "wifi",
    BLE = "ble"
}
export declare enum SensorType {
    LEDS = "leds",
    RFID = "rfid",
    MAGNETIC = "magnetic",
    TEMPERATURE = "temperature",
    HUMIDITY = "humidity",
    PRESSURE = "pressure",
    ACCELEROMETER = "accelerometer",
    GYROSCOPE = "gyroscope",
    GPS = "gps",
    CAMERA = "camera",
    MICROPHONE = "microphone",
    SPEAKER = "speaker",
    DISPLAY = "display",
    BUTTON = "button",
    SWITCH = "switch",
    POTENTIOMETER = "potentiometer",
    JOYSTICK = "joystick",
    SLIDER = "slider",
    ROTARY = "rotary",
    TOUCH = "touch",
    PROXIMITY = "proximity",
    DISTANCE = "distance"
}
