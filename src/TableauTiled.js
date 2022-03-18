class TableauTiled extends Tableau1 {



    preload() {
        super.preload();
        this.load.image('background', 'assets/images/background.png');

        // At last image must be loaded with its JSON
        this.load.image('tiles', 'assets/tilesets/tilesheetFT.png');

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/blockout.json');

    }



    create() {
        super.create();

        // On créer la taille du nieau
        this.vuelarge = false;
        this.largeurniveau = 5120;
        this.hauteurniveau = 640;

        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 0.8);

        //notre map
        const map = this.make.tilemap({key: 'map'});
        //nos images qui vont avec la map
        const tileset = map.addTilesetImage('tilesheetFT', 'tiles');


        //les différents calque de tiled
        const platforms5 = map.createLayer('ciel', tileset, 0, 200);
        const platforms4 = map.createLayer('plan4', tileset, 0, 200);
        const platforms3 = map.createLayer('plan3', tileset, 0, 200);
        const platforms2 = map.createLayer('Decor', tileset, 0, 200);
        const platforms1 = map.createLayer('Base', tileset, 0, 200);

        // on donne les collisions ou non
        platforms1.setCollisionByExclusion(-1, true);
        platforms2.setCollisionByExclusion(-1, false);
        platforms3.setCollisionByExclusion(-1, false);
        platforms4.setCollisionByExclusion(-1, false);
        platforms5.setCollisionByExclusion(-1, false);

        // Qui collide avec quoi
        this.physics.add.collider(this.player, platforms1);



    }



}