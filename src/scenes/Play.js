class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        // load images
        this.load.image("brown_chopsticks", "./assets/brown_chopsticks.png");
        this.load.image("sushi_01", "./assets/sushi_01.png");
        this.load.image("sushi_02", "./assets/sushi_02.png");
        this.load.image("sushi_03", "./assets/sushi_03.png");
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
        this.belt = this.add.tileSprite(0, 0, game.config.width, game.config.height, "belt").setOrigin(0,0);                    // place belt
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background").setOrigin(0, 0);       // place background
        

         // green UI background
         this.add.rectangle(0, borderUISize + borderPadding, game.config.width,  borderUISize * 2, 0x00FF00).setOrigin(0,0);
         // white borders
         this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
         this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
         this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
         this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);

         // add brown chopsticks (player 1)
         this.p1Chopsticks = new Chopsticks(this.game.wdith/2, game.config.height - borderUISize - borderPadding, "brown_chopsticks").setOrigin(0.5,0);

         // add sushi rolls 
         this.sushi01 = new SushiRoll(this, game.config.width + borderUISize*6, borderUISize*4, "sushi_01", 0, 30).setOrigin(0,0);
         this.sushi02 = new SushiRoll(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, "sushi_02", 0, 20).setOrigin(0,0);
         this.sushi03 = new SushiRoll(this, game.config.width, borderUISize*6 + borderPadding*4, "sushi_03", 0, 10).setOrigin(0,0);

         // define keys 
         keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
         keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
         keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
         keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
         

         // ADD ANIMATE CONFIG LATER
         
        // initialize score
        this.p1score = 0;
        //display score 
        let scoreConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1score, scoreConfig);

       // GAME OVER flag
        this.gameOver = false;
        
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(60000, () => {
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
        this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        // scroll belt
        this.belt.tilePositionX -= conveyBeltSpeed;

        // update p1 chopsticks 
        this.p1Chopsticks.update();

        //update sushi rolls
        this.sushi01.update();
        this.sushi02.update();
        this.sushi03.update();

        //check collisions
        if(this.checkCollision(this.p1Chopsticks, this.sushi03)) {
            this.p1Chopsticks.reset();
            this.eatSushi(this.sushi03);

        }
        if(this.checkCollision(this.p1Chopsticks, this.sushi02)) {
            this.p1Chopsticks.reset();
            this.eatSushi(this.sushi02);
        }

        if(this.checkCollision(this.p1Chopsticks, this.sushi01)) {
            this.p1Chopsticks.reset();
            this.eatSushi(this.sushi01);
        }

        if(!this.gameOver) {
            this.p1Chopsticks.update();
            this.sushi01.update();
            this.sushi02.update();
            this.sushi03.update();
        }
    }

    checkCollision(brown_chopsticks, sushi){
        if(brown_chopsticks.x < sushi.x + sushi.width &&
            brown_chopsticks.y + brown_chopsticks.width > sushi.x &&
            brown_chopsticks.height + brown_chopsticks.y > sushi.y) {
                return true;
            } else {
                return false;
            }
    }

    sushiGrab(sushi) {
        // temporary hide ship 
        sushi.alpha = 0;
        this.p1score += sushi.points;
        this.scoreLeft.text = this.p1score;

        this.sound.play("sfx_munch");       // bite sfx
    }

}