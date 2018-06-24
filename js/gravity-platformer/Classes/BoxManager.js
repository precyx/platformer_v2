var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class BoxManager
  // ------------------------------------------------------------------------------
  function BoxManager(){
    var HEIGHT = app.Consts.HEIGHT;
    var WIDTH = app.Consts.WIDTH;

    this.boxes = [];
    this.movableBoxes = [];
    this.minw = Game.Math.randomInt(Game.Math.randomInt(5, 10), Game.Math.randomInt(40, 80));
    this.minh = this.minw;
    this.maxw = Game.Math.randomInt(Game.Math.randomInt(12, 25), Game.Math.randomInt(40, 100));
    this.maxh = this.maxw;
    this.numb = Game.Math.randomInt(Game.Math.randomInt(2, 50), Game.Math.randomInt(60, 2500));
    this.step = 2;


    this.init = function(){
      this.createFlatLand();
     this.createPlatforms();
      //this.createGround();
      //this.createBoxes();
      //this.createMovableBoxes();
      this.createTwoBoxes();
    }

    this.createGround = function(){
      var box = new app.Box();
      box.w = 1500;
      box.h = 600;
      box.y = 600
      box.x = 0;
      box.color = Game.Math.brighten("#BB88DD", Game.Math.randomInt(-70, -40));
      box.init();
      this.boxes.push(box);
      //
      box.width = box.w;
      box.height = box.h;
      box.updateSides();
      app.Quadtree.PlayerTree.insert(box);
      app.Quadtree.EnemyTree.insert(box);
    }


    this.createTwoBoxes = function(){
      for(var i = 0; i < 2; i++){
        var box = new app.Box();
        box.w = 200;
        box.h = 40;
        box.y = 400;
        box.x = 200+ i*200;
        box.color = Game.Math.brighten("#BB88DD", Game.Math.randomInt(-70, -40))
        box.init();
        this.boxes.push(box);
        //
        box.width = box.w;
        box.height = box.h;
        box.updateSides();
        app.Quadtree.PlayerTree.insert(box);
        app.Quadtree.EnemyTree.insert(box);
      }
    }

    this.createFlatLand = function(){
      for(var i = 0; i < 100; i++){
        var box = new app.Box();
        box.w = 40;
        box.h = 40;
        box.y = 200;
        box.x = i*39;
        if(Math.random() > 0.8) box.x = i*39*2;
        box.color = Game.Math.brighten("#BB88DD", Game.Math.randomInt(-70, -40))
        box.init();
        this.boxes.push(box);
        //
        box.width = box.w;
        box.height = box.h;
        box.updateSides();
        app.Quadtree.PlayerTree.insert(box);
        app.Quadtree.EnemyTree.insert(box);
      }
    }
    this.createPlatforms = function(){
      for(var i = 0; i < 100; i++){
        var box = new app.Box();
        box.w = 40;
        box.h = 40;
        box.y = Game.Math.randomSteppedInt(0, 160, 40);
        box.x = i*39;
        //if(Math.random() < 0.1) box.x = i*39*2;
        box.color = Game.Math.brighten("#33AABB", Game.Math.randomInt(-70, -40))
        box.init();
        this.boxes.push(box);
        //
        box.width = box.w;
        box.height = box.h;
        box.updateSides();
        app.Quadtree.PlayerTree.insert(box);
        app.Quadtree.EnemyTree.insert(box);
      }
    }
    this.createBoxes = function(){
      for(var i = 0; i < this.numb; i++){
        var box = new app.Box();
        box.w = Game.Math.randomSteppedInt(this.minw, this.maxw, this.step);
        box.h = Game.Math.randomSteppedInt(this.minh, this.maxh, this.step);
        box.y = Game.Math.randomSteppedInt(-HEIGHT*3, HEIGHT*3 - box.h, this.step);
        box.x = Game.Math.randomSteppedInt(-WIDTH*3, WIDTH*3 - box.w, this.step);
        box.color = Game.Math.brighten("#ffbbaa", Game.Math.randomInt(-80, -40))
        box.init();
        this.boxes.push(box);
        //
        box.width = box.w;
        box.height = box.h;
        box.updateSides();
        app.Quadtree.PlayerTree.insert(box);
        app.Quadtree.EnemyTree.insert(box);
      }
    }
    this.createMovableBoxes = function(){
      for(var i = 0; i < 5; i++){
      var box = new app.Box();
        box.w = Game.Math.randomSteppedInt(30, 130, 10);
        box.h = Game.Math.randomSteppedInt(30, 130, 10);
        box.w = 80;
        box.h = 57;
        box.y = Game.Math.randomSteppedInt(-HEIGHT*3, HEIGHT*3 - box.h, this.step);
        box.x = Game.Math.randomSteppedInt(-WIDTH*3, WIDTH*3 - box.w, this.step);
        box.animation = [{x:50, t:500}, {x:50, t:500}];
        box.loopAnimation = true;
        box.color = Game.Math.brighten("#AA8811", Game.Math.randomInt(-60, 60))
        box.max_x = Game.Math.randomInt(50, 200);
        box.init();
        this.movableBoxes.push(box);
        //
        box.width = box.w;
        box.height = box.h;
        box.updateSides();
        app.Quadtree.PlayerTree.insert(box);
        app.Quadtree.EnemyTree.insert(box);
      }
    }

    this.update = function(dt){
      for(var i = 0; i < this.movableBoxes.length; i++){
        var box = this.movableBoxes[i];
        box.xstart = box.xstart ? box.xstart : box.x;
        box.ystart = box.ystart ? box.ystart : box.y;

        if(box.x > box.xstart + box.max_x) box.xdirection *= -1;
        if(box.x < box.xstart) box.xdirection *= -1;
        box.vx = 1*box.xdirection;
        box.x += box.vx;
        //box.y += Game.Math.randomInt(-1, 1);

        box.init();

      }
    }
  }

  app.BoxManager = new BoxManager();

	return app;
}(MODULE || {}));
