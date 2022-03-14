const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 5120,
    heigth: 640,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true,
        },
    },
    scene: new Tableau1()
};

const game = new Phaser.Game(config);

