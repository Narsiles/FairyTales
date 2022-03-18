class Tableau1 extends Phaser.Scene {

    function

    preload() {
        this.load.image('luciole', 'deposez assets pour tileset ici/luciole.png');
        this.load.image('yellowFlares', 'deposez assets pour tileset ici/yellowFlares.png');
        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
    }

    function

    create() {


        this.player = this.physics.add.sprite(50, 300, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(false);


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

        this.initKeyboard();
    }

    function


    initKeyboard()
    {
        let me=this;
        var cam = this.cameras.main;

        //touches relâchées
        this.input.keyboard.on('keydown', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.R:
                    cam.useBounds=false;
                    me.vuelarge = true;
                    cam.centerOn(me.largeurniveau/2, me.hauteurniveau/2);
                    console.log('le pan est passé :o')
                    cam.zoomTo(0.2, 0);
                    break;
            }
        })

        //touches relâchées
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.I:
                    if(me.zoom<=1.4)
                    {
                        me.zoom += 0.1
                        cam.zoomTo(me.zoom, 250);
                        break;
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.L:
                    if(me.zoom>=0.9)
                    {
                        me.zoom -= 0.1
                        cam.zoomTo(me.zoom, 250);
                        break;
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.R:
                    me.vuelarge = false;
                    cam.zoomTo(me.zoom, 500);
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
        if(this.vuelarge == false)
        {
            this.cameras.main.centerOn(this.player.x,this.player.y);
            this.cameras.main.useBounds=true;
            this.cameras.main.setBounds(0, 0, this.largeurniveau, this.hauteurniveau);
        }
    }

}