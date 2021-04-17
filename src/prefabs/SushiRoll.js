class SushiRoll extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame , pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);                       // add to existing scene
        this.points = pointValue;                       // store pointValue
        this.moveSpeed = game.settings.sushiSpeed;      // pizels per frame
    }

    update() {
        // move chopsticks left
        this.x -= this.moveSpeed;

        //wrap around from left to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    // position reset
    reset() {
        this.x = game.config.width;
    }
}