/*Credits: 
Background Music done by boyfriend Zachary Westman 
SFX munch/select by GMSounds.com
SFX crowd talking by snakebarney

Gotten help from groupmates Finn Morrison, Emersen Lorenz, Aubrey Anne Schelbauer,
*/


// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes 
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let conveyBeltSpeed = 6;

// reserve keyboard bindings 
let keyF, keyR, keyLEFT, keyRIGHT;