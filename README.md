# smart-sensors-capacitor

Byzance Smart Sensors Capacitor plugin
This plugin allow to connect and manage Byzance Sensors.
This is a draft versions, namaing could change a bit.

## Installation

```bash
npm install ByzanceParis/smart-sensors-capacitor
npx cap sync
```
### iOS
On iOS, add the `NSBluetoothAlwaysUsageDescription` to `Info.plist`, otherwise the app will crash when trying to use Bluetooth (see [here](https://developer.apple.com/documentation/corebluetooth)).



## Example
**Example for Burberry integration**  
  ```typescript
  import { SmartSensorsManager } from '@byzance/smart-sensors-capacitor';
  // into some function
  const configuration = {
    sensor:'leds', 
    connector:'ble' 
  };

  const status = await SmartSensorsManager.init(configuration)
  console.log(status); 
  // { success: true } or { success: false, errorMsg: '...' }

  //TURN ON Light at ID 1, 2, 3
  const res = await SmartSensorsManager.setLedsState({ state:true, ids: ['1', '2', '3'] });
  // { success: true } or { success: false, errorMsg: '...' }
  
  //TURN OFF led at ID 2
  const res = await SmartSensorsManager.setLedsState({ state:false, ids: ['2'] });
  // { success: true } or { success: false, errorMsg: '...' }

  //TURN OFF all leds 
  const res = await SmartSensorsManager.setLedsState({ state:false });
  // { success: true } or { success: false, errorMsg: '...' }

  //TURN ON all leds 
  const res = await SmartSensorsManager.setLedsState({ state:true });
  // { success: true } or { success: false, errorMsg: '...' }

  ```



## API
### init(...)

```typescript
init(configuration: ConfigurationOptions) => Promise<ManagerStatus>
```
Initialize Bluetooth Low Energy (BLE) or WIFI connexion to the sensor. If it fails, BLE/wifi might be unavailable on this device.
On **Android** it will ask for the location permission. On **iOS** it will ask for the Bluetooth permission.

| Param         | Type                                                            |
| ------------- | --------------------------------------------------------------- |
| **`configuration`** | <code><a href="#configurationoptions">ConfigurationOptions</a></code> |

**Return:** <code>Promise&lt;<a href="#managerstatus">ManagerStatus</a>&gt;</code>

### setLedsState(...)

```typescript
setLedsState({state:boolean, ids:string | string[]}) => Promise<ManagerStatus>
```
Turn on or off the leds at output ID(s).


| Param         | Type         | Default      | Description      | Required | 
| ------------- | ------------ | ------------ |----------------- |----------- |
| **`state`** | boolean| | Set the state of leds<br> TRUE to turn on, FALSE to turn off | YES | 
| **`ids`** | string \| string[]| | Array of IDs<br>You can pass an array of IDs.<br>The sensors has 12 output, ranging from 1 to 12  | NO | 

**Return:** <code>Promise&lt;<a href="#managerstatus">ManagerStatus</a>&gt;</code>

---
### Interfaces
#### ConfigurationOptions

| Name                          | Type                 | Description     | Default            | Required            |
| ----------------------------- | -------------------- |----------------|--------------------|-----| 
| **`sensor`** | string<br>'leds' \| 'rfid' \| 'magnetic' \| "bus'</code> | Sensor type. | | YES |
| **`connector`** | string<br> <code>'wifi' \| 'ble'</code> | Type of connexion used | | YES |
| **`apiKey`** | string | Vista apiKey deployment |  | NO |

### Interfaces
#### ManagerStatus

| Name                          | Type                 | Description     |
| ----------------------------- | -------------------- |----------------| 
| **`success`** | boolean | Return the outcome of the command  |
| **`errorMsg`** | string | Error message when success is false |

