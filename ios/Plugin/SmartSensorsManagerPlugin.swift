import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(SmartSensorsManagerPlugin)
public class SmartSensorsManagerPlugin: CAPPlugin {
    private let implementation = SmartSensorsManager()
    var bleManager :BleManager?
    var callbackFn:CAPPluginCall?
    var unicId:String?

    
    @objc func initManager(_ call: CAPPluginCall) {
        let sensor = call.getString("sensor") ?? ""
        self.callbackFn = call
        self.unicId  = UIDevice.current.identifierForVendor?.uuidString
        NotificationCenter.default.addObserver(self, selector:  #selector(onBle), name: Notification.Name(rawValue: "vistaBleMsg"), object: nil)
        self.bleManager = BleManager()
        self.bleManager?.initManager(name:"BYZANCE CONTROLLER")
    }

    @objc func setLedsState(_ call: CAPPluginCall) {
        
        self.callbackFn = call
        
        let state = call.getBool("state") ?? false
        //        let ids = call.getArray("ids")?.capacitor.replacingNullValues() as? [String?]
        //        let ids = call.getArray("ids") ?? []
        var ids = [String]()
        if let arrayValues = call.getArray("ids")?.capacitor.replacingNullValues() as? [String] {
            print("arrayValues")
            print(arrayValues)
            ids = arrayValues
        }
        print(ids)
        print(ids.count)
        print(state)
        if (ids.count < 1) {
            ids = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12" ]
        }
        print(ids)
        self.bleManager?.setLedsState(state:state, ids:ids)
    }


    @objc func onBle(notification: Notification){
      let message = notification.userInfo!["message"] as! String
        print(message)
      if (message == "connected") {
        self.callbackFn?.resolve([
            "state": true
        ])
      } else {
        self.callbackFn?.resolve([
            "state": false,
            "errorMsg": message
        ])
      }
    }
    
}


