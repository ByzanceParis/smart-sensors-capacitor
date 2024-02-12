import { SplashScreen } from '@capacitor/splash-screen';
import { Camera } from '@capacitor/camera';
import { SmartSensorsManager } from '@byzance/smart-sensors-capacitor';
import { textChangeRangeIsUnchanged } from 'typescript';


window.customElements.define(
  'capacitor-welcome',
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
    <style>
      :host {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        width: 100%;
        height: 100%;
      }
      h1, h2, h3, h4, h5 {
        text-transform: uppercase;
      }
      .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
      }
      
      /* Hide default HTML checkbox */
      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      
      /* The slider */
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
      }
      
      .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
      }
      
      input:checked + .slider {
        background-color: #2196F3;
      }
      
      input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
      }
      
      input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }
      
      /* Rounded sliders */
      .slider.round {
        border-radius: 34px;
      }
      
      .slider.round:before {
        border-radius: 50%;
      }
      
      .button {
        display: inline-block;
        padding: 10px;
        background-color: #73B5F6;
        color: #fff;
        font-size: 0.9em;
        border: 0;
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
      }
      main {
        padding: 15px;
      }
      main hr { height: 1px; background-color: #eee; border: 0; }
      main h1 {
        font-size: 1.4em;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      main h2 {
        font-size: 1.1em;
      }
      main h3 {
        font-size: 0.9em;
      }
      main p {
        color: #333;
      }
      main pre {
        white-space: pre-line;
      }
    </style>
    <div>
      <capacitor-welcome-titlebar>
        <h1>Smart Sensor Test</h1>
      </capacitor-welcome-titlebar>
      <main>
        <h2>Click to connect</h2>
        <p>
          <button class="button" id="connect">Connect</button>
        </p>
        <label class="switch">
          01
          <input type="checkbox" name="ids[]" value="1">
          <span class="slider"></span>
        </label>
        <label class="switch">
          02
          <input type="checkbox" name="ids[]" value="2">
          <span class="slider"></span>
        </label>
        <label class="switch">
          03
          <input type="checkbox" name="ids[]" value="3">
          <span class="slider"></span>
        </label>
        <label class="switch">
          04
          <input type="checkbox" name="ids[]" value="4">
          <span class="slider"></span>
        </label>
        <label class="switch">
          05
          <input type="checkbox" name="ids[]" value="5">
          <span class="slider"></span>
        </label>
        <label class="switch">
          06
          <input type="checkbox" name="ids[]" value="6">
          <span class="slider"></span>
        </label>
        <label class="switch">
          07
          <input type="checkbox" name="ids[]" value="7">
          <span class="slider"></span>
        </label>
        <label class="switch">
          08
          <input type="checkbox" name="ids[]" value="8">
          <span class="slider"></span>
        </label>
        <label class="switch">
          09
          <input type="checkbox" name="ids[]" value="9">
          <span class="slider"></span>
        </label>
        <label class="switch">
          10
          <input type="checkbox" name="ids[]" value="10">
          <span class="slider"></span>
        </label>
        <label class="switch">
          11
          <input type="checkbox" name="ids[]" value="11">
          <span class="slider"></span>
        </label>
        <label class="switch">
          12
          <input type="checkbox" name="ids[]" value="12">
          <span class="slider"></span>
        </label>
        <p>
          <button class="button" id="setstate">Set state</button>
        </p>

      </main>
    </div>
    `;
    }

    async init() {
      const result = await SmartSensorsManager.initManager({
        sensor:"leds",
        connector:"ble"
      });
      console.log("result");
      console.log(result);
      console.log(result.state);
      if (result.state) {
        const self = this;
        self.shadowRoot.querySelector('#connect').innerHTML = "CONNECTED"
        self.shadowRoot.querySelector('#setstate').addEventListener('click', async function (e) {
          self.setStates();
        });
        // await SmartSensorsManager.setLedsState({ state:false });
      }

    }






    async setStates() {

      let idsStateOn = [];
      let idsStateOff = [];

      const ids = this.shadowRoot.querySelectorAll('input[name="ids[]"]');
      ids.forEach(id => {

        if (id.checked) {
          idsStateOn.push(id.value);
        } else {
          idsStateOff.push(id.value);
        }

      })
      if (idsStateOn.length) {
        const res1 = await SmartSensorsManager.setLedsState({
          state:true,
          ids:idsStateOn
        })
        console.log(res1);
      }
      if (idsStateOff.length) {
        const res2 = await SmartSensorsManager.setLedsState({
          state:false,
          ids:idsStateOff
        })
        console.log(res2);
      }
    }

    connectedCallback() {
      const self = this;
      self.shadowRoot.querySelector('#connect').addEventListener('click', async function (e) {
        self.init();
      });
    }
  }
);

window.customElements.define(
  'capacitor-welcome-titlebar',
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 15px 15px 15px 15px;
        text-align: center;
        background-color: #73B5F6;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
      }
    </style>
    <slot></slot>
    `;
    }
  }
);
