class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio("sfx_select", "./assets/pop_select.wav");   // select option
        this.load.audio("sfx_move", "./assets/move.wav");           // chopsticks moving
        this.load.audio("bgm", "./assets/bgm.wav");                 // load bgm 
        this.load.audio("sfx_crowd", "./assets/crowd.wav");         // ambience sfx
        this.load.audio("sfx_munch", "./assets/sfx_munch.wav");     // collision sfx 
        this.load.image("sushi01", "./assets/sushi_01.png");
        this.load.image("sushi02", "./assets/sushi_02.png");
        this.load.image("sushi03", "./assets/sushi_03.png");
        this.load.image("menu", "./assets/menu_BG.png");
        this.load.image("belt", "./assets/belt.png");
    }

    create() {
        // load menu bg
        this.menuBG = this.add.tileSprite(0,0, game.config.width, game.config.height, "menu").setOrigin(0,0);

        // menu text configuration
        let menuConfig = {
            fontFamily: "Monaco",
            fontSize: "28px",
            backgroundColor: "#FFC0CB",
            Ccolor: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }


        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, "LET'S ROLL", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, "Use ←→ arrows to move & (F) to fire", menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#789d2e";
        menuConfig.color = "#000";
        this.add.text(game.config.width/2,game.config.height/2 + borderUISize + borderPadding, "Press ← for Novice or → for Expert", menuConfig).setOrigin(0.5);    
    
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        game.music = this.sound.add("bgm", {volume: 0.5});
        game.music.setLoop(true);

        game.ambience = this.sound.add("sfx_crowd");
        game.ambience.setLoop(true);
        

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // EASY MODE
            game.settings = {
                sushiSpeed: 3,
                gameTimer: 2000
            }

            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // HARD MODE
            game.settings = {
                sushiSpeed: 4,
                gameTimer: 45000
            }
            
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}