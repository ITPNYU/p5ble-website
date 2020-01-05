---
id: connect-disconnect
title: Connect and Disconnect
sidebar_label: Connect and Disconnect
---

## Demo

<div class="example">
  <h1>Connect, Disconnect, OnDisconnect to a BLE device using p5.ble.js</h1>
  <div id="canvasContainer"></div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/addons/p5.dom.min.js"></script>
<script src="https://unpkg.com/p5ble@0.0.4/dist/p5.ble.js" type="text/javascript"></script>
<script src="assets/scripts/example-connect-disconnect.js"></script>

## Arduino Code
Arduino Code can be found [here](https://github.com/ITPNYU/p5.ble.js/tree/master/examples/connect-disconnect/arduino-sketches).

## p5 Code

```javascript
// The serviceUuid must match the serviceUuid of the device you would like to connect
const serviceUuid = "19b10010-e8f2-537e-4f6c-d104768a1214";
let myBLE;
let isConnected = false;

function setup() {
  // Create a p5ble class
  myBLE = new p5ble();

  createCanvas(200, 200);
  textSize(20);
  textAlign(CENTER, CENTER);

  // Create a 'Connect' button
  const connectButton = createButton('Connect')
  connectButton.mousePressed(connectToBle);

  // Create a 'Disconnect' button
  const disconnectButton = createButton('Disconnect')
  disconnectButton.mousePressed(disconnectToBle);
}

function connectToBle() {
  // Connect to a device by passing the service UUID
  myBLE.connect(serviceUuid, gotCharacteristics);
}

function disconnectToBle() {
  // Disonnect to the device
  myBLE.disconnect();
  // Check if myBLE is connected
  isConnected = myBLE.isConnected();
}

function onDisconnected() {
  console.log('Device got disconnected.');
  isConnected = false;
}

// A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
  if (error) console.log('error: ', error);
  console.log('characteristics: ', characteristics);

  // Check if myBLE is connected
  isConnected = myBLE.isConnected();

  // Add a event handler when the device is disconnected
  myBLE.onDisconnected(onDisconnected)
}

function draw() {
  if (isConnected) {
    background(0, 255, 0);
    text('Connected!', 100, 100);
  } else {
    background(255, 0, 0);
    text('Disconnected :/', 100, 100);
  }
}
```

## [Source](https://github.com/ITPNYU/p5.ble.js/tree/master/examples/connect-disconnect/p5-sketch)
