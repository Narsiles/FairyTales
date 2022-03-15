class Tableau1 extends Phaser.Scene {

    function

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/blockout.json');

    }

    function

    create() {
        this.largeurniveau = 5120;
        this.hauteurniveau = 640;

        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 0.8);
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('platformPack_tilesheet', 'tiles');
        const platforms = map.createStaticLayer('Decor', tileset, 0, 200);
        platforms.setCollisionByExclusion(-1, true);

        this.player = this.physics.add.sprite(50, 300, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(false);
        this.physics.add.collider(this.player, platforms);

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'robo_player_',
                start: 2,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: [{key: 'player', frame: 'robo_player_0'}],
            frameRate: 10,
        });

        this.anims.create({
            key: 'jump',
            frames: [{key: 'player', frame: 'robo_player_1'}],
            frameRate: 10,
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        //CAMERA
        this.zoom = 1;
        this.cameras.main.setBounds(0, 0, this.largeurniveau, this.hauteurniveau);
        this.cameras.main.setZoom(1);
        this.cameras.main.setOrigin(this.largeurniveau/2, this.hauteurniveau/2);

        this.initKeyboard();
    }

    function

    initKeyboard()
    {
        let me=this;
        var cam = this.cameras.main;

        //touches relâchées
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.M:
                    if(me.zoom<=1.2)
                    {
                        me.zoom += 0.1
                        cam.zoomTo(me.zoom, 500);
                        break;
                    }
                    break;
            case Phaser.Input.Keyboard.KeyCodes.L:
                if(me.zoom>=0.7)
                {
                    me.zoom -= 0.1
                    cam.zoomTo(me.zoom, 500);
                    break;
                }
                break;
            case Phaser.Input.Keyboard.KeyCodes.R:
                console.log('ygreg=',cam.y,'  Igz=',cam.x);
                console.log(me.largeurniveau);
                cam.pan(me.largeurniveau,me.hauteurniveau, 20000, 'Power2');
                cam.zoomTo(0.4, 2000);
                console.log('ygreg=',cam.y,'  Igz=',cam.x);
                break;
            }
        })
    }

    function

    update() {
        // Control the player with left or right keys
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            if (this.player.body.onFloor()) {
                this.player.play('walk', true);
            }
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            if (this.player.body.onFloor()) {
                this.player.play('walk', true);
            }
        } else {
            // If no keys are pressed, the player keeps still
            this.player.setVelocityX(0);
            // Only show the idle animation if the player is footed
            // If this is not included, the player would look idle while jumping
            if (this.player.body.onFloor()) {
                this.player.play('idle', true);
            }
        }

// Player can jump while walking any direction by pressing the space bar
// or the 'UP' arrow
        if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()) {
            this.player.setVelocityY(-350);
            this.player.play('jump', true);
        }

        if (this.player.body.velocity.x > 0) {
            this.player.setFlipX(false);
        } else if (this.player.body.velocity.x < 0) {
            // otherwise, make them face the other side
            this.player.setFlipX(true);
        }

        //CAMERA
        this.cameras.main.centerOn(this.player.x,this.player.y);
    }

}