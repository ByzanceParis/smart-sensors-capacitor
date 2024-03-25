import { WebPlugin } from '@capacitor/core';
import type { ConfigurationOptions, LedStateConfig, ManagerStatus, SmartSensorsManagerPlugin } from './definitions';
export declare class SmartSensorsManagerWeb extends WebPlugin implements SmartSensorsManagerPlugin {
    initManager(configuration: ConfigurationOptions): Promise<ManagerStatus>;
    setLedsState(ledState: LedStateConfig): Promise<ManagerStatus>;
    ledSetup(setup: any): Promise<ManagerStatus>;
}
