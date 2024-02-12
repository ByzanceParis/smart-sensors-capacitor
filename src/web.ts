import { WebPlugin } from '@capacitor/core';

import type { ConfigurationOptions, LedStateConfig, ManagerStatus, SmartSensorsManagerPlugin } from './definitions';

export class SmartSensorsManagerWeb
  extends WebPlugin
  implements SmartSensorsManagerPlugin
{
  async initManager(configuration: ConfigurationOptions): Promise<ManagerStatus> {
    console.log(configuration)
    const error: ManagerStatus = {
      status: false,
      errorMsg: 'initManager Not implemented on web'
    }
    return error;
  }

  async setLedsState(ledState: LedStateConfig): Promise<ManagerStatus> {
    console.log(ledState)
    const error: ManagerStatus = {
      status: false,
      errorMsg: 'setLedsState Not implemented on web'
    }
    return error;

  }

}
