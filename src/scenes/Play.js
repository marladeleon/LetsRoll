class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        // load images
        this.load.image("chopsticks", "./assets/brown_chopsticks.png");
        this.load.image("sushi01", "./assets/sushi_01.png");
        this.load.image("sushi02", "./assets/sushi_02.png");
        this.load.image("sushi03", "./assets/sushi_03.png");
        this.load.image("background","./assets/background.png");    //background
        this.load.image("belt", "./assets/belt.png");               //moving conveyor belt 
        
        this.load.spritesheet("explosion", "./assets/explosion.png", {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
        
    }

    create (){
        // place background
        this.belt = this.add.tileSprite(0, 0, game.config.width, game.config.height, "belt").setOrigin(0,0);                // place belt
        this.background = this.add.tileSprite(0,0, game.config.width, game.config.height, "background").setOrigin(0,0);     // place resturant background
        
        // green UI background 
        this.add.rectangle(30, 85, 90, 64, 0xFFFFFF).setOrigin(0,0);

        console.log(this);
        // add p1 brown chopsticks
        this.p1Chopsticks = new Chopsticks(this, game.config.width/2, game.config.height - borderUISize - borderPadding, "chopsticks").setOrigin(0.5,0);

        // add sushi rolls on conveyor belt 
        this.sushi01 = new SushiRoll(this, game.config.width + 192, 132, "sushi01", 0, 30).setOrigin(0,0);
        
    }

}