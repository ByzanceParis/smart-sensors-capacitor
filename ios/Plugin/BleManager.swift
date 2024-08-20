import Foundation
import Capacitor
import AVFoundation
import CoreBluetooth
import UIKit


class BleManager: NSObject, CBCentralManagerDelegate, CBPeripheralDelegate  {


    var charact:CBCharacteristic!
    public var connectingPeripheral:CBPeripheral!
    var centralManager: CBCentralManager!

    private let UuidSerialService = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
    private let UuidTx =            "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"
    private let UuidRx =            "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"
    private var periphName = ""

    override init() {
        super.init()
    }

    public func initManager(name:String) {
        self.periphName = name
        initCentral()
    }


    public func setLedsState(state:Bool, ids: [String] ) {

        
        if (connectingPeripheral == nil) {
            return;
        }
        
        var stState = ""
        var action = state ? "1":"0"
        
        if (ids.count > 5) {
            
            let ids1 = ids[...5]
            for id in ids1 {
                stState = "\(stState)setState|\(id)|\(action);"
            }
            connectingPeripheral.writeValue(stState.data(using: .utf8)!, for: charact, type: .withResponse)

            stState = ""
            let ids2 = ids[6...]
            for id in ids2 {
                stState = "\(stState)setState|\(id)|\(action);"
            }
            print(stState)
            connectingPeripheral.writeValue(stState.data(using: .utf8)!, for: charact, type: .withResponse)
        } else {
            for id in ids {
                stState = "\(stState)setState|\(id)|\(action);"
            }
            print(stState)
            connectingPeripheral.writeValue(stState.data(using: .utf8)!, for: charact, type: .withResponse)
        }

        NotificationCenter.default.post(name: Notification.Name(rawValue: "vistaBleMsg"), object: nil, userInfo : ["message": "connected"])
    }
    
    
    
    public func ledSetup(speed:String, intensity:String ) {
        
        
        var stSetup = ""
        let ids = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12" ]
        let ids1 = ids[...5]
        for id in ids1 {
            stSetup = "\(stSetup)setup|\(id)|ledpoint|\(speed)|\(intensity);"
        }
        connectingPeripheral.writeValue(stSetup.data(using: .utf8)!, for: charact, type: .withResponse)

        stSetup = ""
        let ids2 = ids[6...]
        for id in ids2 {
            stSetup = "\(stSetup)setup|\(id)|ledpoint|\(speed)|\(intensity);"
        }
        connectingPeripheral.writeValue(stSetup.data(using: .utf8)!, for: charact, type: .withResponse)
        
    }

     public func switchOn(id:String){
         var stSetup = "setState|\(id)|1;"
         connectingPeripheral.writeValue(stSetup.data(using: .utf8)!, for: charact, type: .withResponse)
     }
    
     public func switchOff(id:String){
         var stSetup = "setState|\(id)|0;"
         connectingPeripheral.writeValue(stSetup.data(using: .utf8)!, for: charact, type: .withResponse)
     }

    func initCentral() {
        print("Central launched!");
        centralManager = CBCentralManager(delegate: self, queue: nil,options: [CBCentralManagerOptionShowPowerAlertKey:true])
    }

    func centralManagerDidUpdateState(_ central: CBCentralManager) {
        switch central.state {
            case .unknown:
                print("central.state is .unknown")
                NotificationCenter.default.post(name: Notification.Name(rawValue: "vistaBleMsg"), object: nil, userInfo : ["message": "Bluetooth unknown"])
            case .resetting:
                print("central.state is .resetting")
                NotificationCenter.default.post(name: Notification.Name(rawValue: "vistaBleMsg"), object: nil, userInfo : ["message": "Bluetooth resetting"])
            case .unsupported:
                print("central.state is .unsupported")
                NotificationCenter.default.post(name: Notification.Name(rawValue: "vistaBleMsg"), object: nil, userInfo : ["message": "Bluetooth unsupported"])
            case .unauthorized:
                print("central.state is .unauthorized")
                NotificationCenter.default.post(name: Notification.Name(rawValue: "vistaBleMsg"), object: nil, userInfo : ["message": "Bluetooth unauthorized"])
            case .poweredOff:
                print("central.state is .poweredOff")
                NotificationCenter.default.post(name: Notification.Name(rawValue: "vistaBleMsg"), object: nil, userInfo : ["message": "Bluetooth is off"])
            case .poweredOn:
                print("central.state is .poweredOn")
                centralManager.scanForPeripherals(withServices: nil)
        }
    }

    func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral,
                        advertisementData: [String: Any], rssi RSSI: NSNumber) {
        
        if((peripheral.name?.starts(with: self.periphName)) == true){

            print("CONNECTING")
            print(peripheral.name?.starts(with: self.periphName))
            print(self.periphName)

            
            connectingPeripheral = peripheral
            connectingPeripheral.delegate = self
            centralManager.connect(connectingPeripheral, options: nil)
            centralManager.stopScan()
        }
    }

    func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
        print("Connected")
        peripheral.discoverServices(nil)
    }

    func centralManager(_ central: CBCentralManager, didDisconnectPeripheral peripheral: CBPeripheral, error: Error?) {
        print("Disconnected")
        centralManager.scanForPeripherals(withServices: nil)
    }

    func peripheral(_ peripheral: CBPeripheral, didDiscoverServices error: Error?) {
        print("DISCOVER Service" )
        if(peripheral.services?.count ?? 0 >= 1){
            peripheral.discoverCharacteristics(nil, for: peripheral.services!.first!)
        }
    }

    func peripheral(_ peripheral: CBPeripheral, didDiscoverCharacteristicsFor service: CBService, error: Error?) {
        
        
        
        if let charactericsArr = service.characteristics
        {
            print(charactericsArr)
            charact = charactericsArr[1]
        }

        if let characteristics = service.characteristics {
            for characteristic in characteristics {
                // Tx:
                if characteristic.uuid == CBUUID(string: UuidTx) {
                    charact = characteristic
                }

                // Rx:
                if characteristic.uuid == CBUUID(string: UuidRx) {
                    let rXcharacteristic = characteristic as CBCharacteristic
                    peripheral.setNotifyValue(true, for: rXcharacteristic)
                }
            }
        }
        NotificationCenter.default.post(name: Notification.Name(rawValue: "vistaBleMsg"), object: nil, userInfo : ["message": "connected"])
        
    }

    public func peripheral(_ peripheral: CBPeripheral, didUpdateValueFor characteristic: CBCharacteristic, error: Error?) {
        let rxData = characteristic.value
        if let rxData = rxData {
            let numberOfBytes = rxData.count
            var rxByteArray = [UInt8](repeating: 0, count: numberOfBytes)
            (rxData as NSData).getBytes(&rxByteArray, length: numberOfBytes)
            var res:String = "";
            for b in rxByteArray {
                let str = UnicodeScalar(b)
                res.unicodeScalars.append(str)
            }
            let splits = res.components(separatedBy: "|")
            NotificationCenter.default.post(name: Notification.Name(rawValue: "onData"), object: nil, userInfo : ["action": splits[0]])
        }
    }
}
