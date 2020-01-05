---
id: start-stop-notifications
title: Start and Stop Notifications
sidebar_label: Start and Stop Notifications
---

## Demo

<div class="example">
  <h1>Start/stop notifications of a BLE device using p5.ble.js</h1>
  <div id="canvasContainer"></div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/addons/p5.dom.min.js"></script>
<script src="https://unpkg.com/p5ble@0.0.4/dist/p5.ble.js" type="text/javascript"></script>
<script src="assets/scripts/example-start-stop-notifications.js"></script>

## Arduino Code
Arduino Code can be found [here](https://github.com/ITPNYU/p5.ble.js/tree/master/examples/start-stop-notifications/arduino-sketches).

## p5 Code

```javascript
// The serviceUuid must match the serviceUuid of the device you would like to connect
const serviceUuid = "19b10010-e8f2-537e-4f6c-d104768a1214";
let myCharacteristic;
let myValue = 0;
let myBLE;

function setup() {
  // Create a p5ble class
  myBLE = new p5ble();

  createCanvas(200, 200);
  textSize(20);
  textAlign(CENTER, CENTER);

  // Create a 'Connect and Start Notifications' button
  const connectButton = createButton('Connect and Start Notifications')
  connectButton.mousePressed(connectAndStartNotify);

  // Create a 'Stop Notifications' button
  const stopButton = createButton('Stop Notifications')
  stopButton.mousePressed(stopNotifications);
}

function connectAndStartNotify() {
  // Connect to a device by passing the service UUID
  myBLE.connect(serviceUuid, gotCharacteristics);
}

// A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
  if (error) console.log('error: ', error);
  console.log('characteristics: ', characteristics);
  myCharacteristic = characteristics[0];
  // Start notifications on the first characteristic by passing the characteristic
  // And a callback function to handle notifications
  myBLE.startNotifications(myCharacteristic, handleNotifications);
  // You can also pass in the dataType
  // Options: 'unit8', 'uint16', 'uint32', 'int8', 'int16', 'int32', 'float32', 'float64', 'string'
  // myBLE.startNotifications(myCharacteristic, handleNotifications, 'string');
}

// A function that will be called once got characteristics
function handleNotifications(data) {
  console.log('data: ', data);
  myValue = data;
}

// A function to stop notifications
function stopNotifications() {
  myBLE.stopNotifications(myCharacteristic);
}

function draw() {
  background(250);
  // Write value on the canvas
  text(myValue, 100, 100);
}
```

## [Source](https://github.com/ITPNYU/p5.ble.js/tree/master/examples/start-stop-notifications/p5-sketch)
