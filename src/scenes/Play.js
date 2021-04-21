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
        
    }

    create (){
        // place background
        this.belt = this.add.tileSprite(0, 0, game.config.width, game.config.height, "belt").setOrigin(0,0);                // place belt
        this.background = this.add.tileSprite(0,0, game.config.width, game.config.height, "background").setOrigin(0,0);     // place resturant background
        
        // add p1 brown chopsticks
        this.p1Chopsticks = new Chopsticks(this, game.config.width/2, game.config.height - borderUISize - borderPadding, "chopsticks").setOrigin(0.5,0);

        // add sushi rolls on conveyor belt later
        this.sushi01 = new SushiRoll(this, game.config.width + borderUISize*6, 210, "sushi01", 0, 30).setOrigin(0,0);
        this.sushi02 = new SushiRoll(this, game.config.width + borderUISize*3, 250, "sushi02", 0, 20).setOrigin(0,0);
        this.sushi03 = new SushiRoll(this, game.config.width, 320 , "sushi03", 0, 10).setOrigin(0,0);

        // define keys 
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        // display fire UI 
        let fireUI = {
            fontFamily: "Monaco",
            fontSize: "14px",
            backgroundColor: "#FFC0CB",
            Ccolor: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(570, 130, "GRAB THOSE ROLLS", fireUI).setOrigin(0.5);

        // initialize score
        this.p1score = 0;
        // display score 
        let scoreConfig = {
            fontFamily: "Monaco",
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
        this.scoreLeft = this.add.text(270, 100, this.p1score, scoreConfig);

        // countdown timer 
        game.settings.currentTime = game.settings.gameTimer;
        game.settings.timeLeft = this.add.text(320, 54, game.settings.currentTime, scoreConfig);

        this.timer = this.time.addEvent({
            delay: 100,                         // per second                
            callback: this.countDownTimer,
            loop: true
        });
        
       // GAME OVER flag
        this.gameOver = false;
        
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(2000, () => {
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
        this.gameOver = true;
        }, null, this);


        game.music.play();              // Play BGM 
        game.ambience.play();           // Play crowd SFX


    }

    update() {
        // when timer hits 0 stop timer 
        if(game.settings.currentTime == 0){
            this.stopGame();
        }
        
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        // scroll belt
        this.belt.tilePositionX += conveyBeltSpeed;

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

    checkCollision(chopsticks, sushi){
        if(chopsticks.x < sushi.x + sushi.width &&
            chopsticks.x + chopsticks.width > sushi.x &&
            chopsticks.y < sushi.y + sushi.height &&
            chopsticks.height + chopsticks.y > sushi.y) {
                console.log("chopsticks");
                return true;
            } else {
                return false;
            }
    }

    eatSushi(sushi) {
        this.p1score += sushi.points;
        this.scoreLeft.text = this.p1score;
        sushi.reset();

        this.sound.play("sfx_munch");       // bite sfx it's quiet 
    }

    countDownTimer() {
        game.settings.currentTime -= 100;
        game.settings.timeLeft.text = game.settings.currentTime;
    }
    
    stopGame() {
        // stops music/ambience/timer                    
        this.gameOver = true;
        this.timer.paused = true;
        game.music.pause();
        game.ambience.pause();
        game.settings.timeLeft.text = 0
        
    }
}