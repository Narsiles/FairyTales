class TableauTiled extends Tableau1 {



    preload() {
        super.preload();
        this.load.image('background', 'assets/images/background.png');
        this.load.image('arbre1', 'assets/anims/arbreAube.png');
        this.load.image('arbre2', 'assets/anims/arbreJour.png');
        this.load.image('arbre3', 'assets/anims/arbreSoir.png');
        this.load.image('arbre4', 'assets/anims/arbreNuit.png');
        this.load.image('luciole', 'assets/anims/luciole.png');

        // At last image must be loaded with its JSON
        this.load.image('tiles', 'assets/tilesets/tilesheetFT.png');

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/blockout.json');

    }



    create() {
        super.create();

        // On créer la taille du niveau
        this.vuelarge = false;
        this.largeurniveau = 5120;
        this.hauteurniveau = 640;

        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 0.8);

        //notre map
        const map = this.make.tilemap({key: 'map'});
        //nos images qui vont avec la map
        const tileset = map.addTilesetImage('tilesheetFT', 'tiles');


        //On charge les layers Tiled du dernier au premier plan, les layers de Tiles sont une simple ligne
        const platforms5 = map.createLayer('ciel', tileset, 0, 200);
        const platforms4 = map.createLayer('plan4', tileset, 0, 200);
        const platforms3 = map.createLayer('plan3', tileset, 0, 200);
        const platforms2 = map.createLayer('Decor', tileset, 0, 200);

        //Les layers d'objets : on charge d'abord la physique des objets.
        this.arbre4 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        //Puis le layer en question en positionnant objet par objet.
        map.getObjectLayer('Arbre4').objects.forEach((arbre4) => {
            const arbre4Sprite = this.arbre4.create(arbre4.x, arbre4.y + 200 - arbre4.height, 'arbre4').setOrigin(0);
            arbre4Sprite.body.setSize(arbre4.width, arbre4.height).setOffset(0,0);
        });

        this.arbre3 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Arbre3').objects.forEach((arbre3) => {
            const arbre3Sprite = this.arbre3.create(arbre3.x, arbre3.y + 200 - arbre3.height, 'arbre3').setOrigin(0);
            arbre3Sprite.body.setSize(arbre3.width, arbre3.height).setOffset(0,0);
        });

        this.arbre2 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Arbre2').objects.forEach((arbre2) => {
            const arbre2Sprite = this.arbre2.create(arbre2.x, arbre2.y + 200 - arbre2.height, 'arbre2').setOrigin(0);
            arbre2Sprite.body.setSize(arbre2.width, arbre2.height).setOffset(0,0);
        });

        this.arbre1 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Arbre1').objects.forEach((arbre1) => {
            const arbre1Sprite = this.arbre1.create(arbre1.x, arbre1.y + 200 - arbre1.height, 'arbre1').setOrigin(0);
            arbre1Sprite.body.setSize(arbre1.width, arbre1.height).setOffset(0,0);
        });

        this.luciole = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('lucioles').objects.forEach((luciole) => {
            const lucioleSprite = this.luciole.create(luciole.x, luciole.y + 200 - luciole.height, 'luciole').setOrigin(0);
            lucioleSprite.body.setSize(luciole.width, luciole.height).setOffset(0,0);
        });

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