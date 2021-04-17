class Chopsticks extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add obects to the exsisting scene
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed =2;

        this.sfxChopsticks = scene.sound.add("sfx_move");       // add chopsticks movement sfx
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }

        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxChopsticks.play();      // play move sfx
        }

        // if fired, move the chopsticks up
        if(this.isFiring && this.y >= borderUISize *3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        // reset on miss 
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    // reset chopstick on ground
    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}