---
id: write-one-char-callback
title: Write to one characteristic
sidebar_label: Write to one Characteristic
---

## Demo

<div class="example">
  <h1>Write 1 or 0 to one characteristic with p5.ble.js</h1>
  <div id="container"></div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/addons/p5.dom.min.js"></script>
<script src="https://unpkg.com/p5ble@0.0.4/dist/p5.ble.js" type="text/javascript"></script>
<script src="assets/scripts/example-write-one-char-callback.js"></script>

## Arduino Code
Arduino Code can be found [here](https://github.com/ITPNYU/p5-ble-examples/tree/master/write-one-char/arduino-sketches/write-one-char-ArduinoBLE).

## p5 Code

```javascript
// The serviceUuid must match the serviceUuid of the device you would like to connect
const serviceUuid = "19b10000-e8f2-537e-4f6c-d104768a1214";
let myCharacteristic;
let input;
let myBLE;

function setup() {
  myBLE = new p5ble();

  // Create a 'Connect' button
  const connectButton = createButton('Connect')
  connectButton.mousePressed(connectToBle);

  // Create a text input
  input = createInput();

  // Create a 'Write' button
  const writeButton = createButton('Write');
  writeButton.mousePressed(writeToBle);
}

function connectToBle() {
  // Connect to a device by passing the service UUID
  myBLE.connect(serviceUuid, gotCharacteristics);
}

function gotCharacteristics(error, characteristics) {
  if (error) console.log('error: ', error);
  console.log('characteristics: ', characteristics);
  // Set the first characteristic as myCharacteristic
  myCharacteristic = characteristics[0];
}

function writeToBle() {
  const inputValue = input.value();
  // Write the value of the input to the myCharacteristic
  myBLE.write(myCharacteristic, inputValue);
}
```

## [Source](https://github.com/ITPNYU/p5-ble-examples/tree/master/write-one-char/p5-sketch)
