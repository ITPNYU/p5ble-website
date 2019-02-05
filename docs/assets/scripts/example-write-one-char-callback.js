// The serviceUuid must match the serviceUuid of the device you would like to connect
// Copyright (c) 2018 p5ble
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const serviceUuid = "19b10000-e8f2-537e-4f6c-d104768a1214";
let myCharacteristic;
let input;
let myBLE;

function setup() {
  myBLE = new p5ble();

  // Create a 'Connect' button
  const connectButton = createButton('Connect')
  connectButton.mousePressed(connectToBle);
  connectButton.parent('#container');

  // Create a text input
  input = createInput();
  input.parent('#container');

  // Create a 'Write' button
  const writeButton = createButton('Write');
  writeButton.mousePressed(writeToBle);
  writeButton.parent('#container');
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
