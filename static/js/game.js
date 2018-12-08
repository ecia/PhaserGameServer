var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
	
    var config = {
        type: Phaser.AUTO,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        physics: {
            default: 'arcade',
            
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };
	
    var game = new Phaser.Game(config);

    function preload ()
    {
        this.load.image('space', '/static/space.png');
        this.load.image('fireL', '/static/fireL.png');
        this.load.image('fireR', '/static/fireR.png');
        this.load.image('asteroid', '/static/asteroid.png');
        this.load.image('spaceCraft', '/static/spacecraft.png')
    }

    function create ()
    {
        this.add.image(400, 300, 'space');
        this.engle = 0;
        
        this.asteroid = this.physics.add.image(0, 300, 'asteroid');
        this.asteroid.setVelocityX(Phaser.Math.Between(100, 200));
        this.asteroid.setVelocityY(Phaser.Math.Between(100, 200));

		var particlesL = this.add.particles('fireL');
		var emitterL = particlesL.createEmitter({ 
            speed: 20,
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD',
            rotate: {onEmit: function(){return this.engle}}
        });

        var particlesR = this.add.particles('fireR');
		var emitterR = particlesR.createEmitter({ 
            speed: 20,
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD',
            rotate: {onEmit: function(){return this.engle}}
        });

        this.player = this.physics.add.sprite(400, 100, 'spaceCraft');
        this.player.setCollideWorldBounds(true);

        emitterL.startFollow(this.player);
        emitterR.startFollow(this.player);
    }
	
	function update ()
	{
        cursors = this.input.keyboard.createCursorKeys();

        if (cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
            this.angle += 90;
        }
         if (cursors.right.isDown)
        {
            this.player.setVelocityX(160);
            this.angle += 90;
        }
        if (cursors.up.isDown)
        {
            this.player.setVelocityY(-160);
            this.angle += 90;
        }        
        if (cursors.down.isDown)
        {
            this.player.setVelocityY(160);
            this.angle += 90;
        }

	}