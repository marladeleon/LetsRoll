/*
Marla De Leon
Let's Roll
April 21, 2021
Hours to complete: 15~ hours

Points Explanation:
-Implemented background music 5 POINTS
-Fire UI Text but I substituted "Fire Computer" to "GRAB THOSE ROLLS" 5 POINTS
-New Title Screen. I created a sushi roll menu screen with a font that fits my theme. 10 POINTS
-Countdown Timer. I was able to create a timer that goes from 60 secs (60000) to zero. 10 points
-Redesign. I changed the theme from the original Rocket Patrol to a conveyor belt Sushi restaurant. 60 points

*I could not figure out how to change the conveyor belt speed in Hard Mode.

Credits: 
Background Music done by boyfriend Zachary Westman 
SFX select by GFXSounds.com
SFX munch by X Sound Effect https://www.youtube.com/watch?v=bjcC3B0GGog
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