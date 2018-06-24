var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class Player
  // ------------------------------------------------------------------------------
  var Player = function(){
    // dependencies
    var consts = app.Consts;
    var WIDTH = app.Consts.WIDTH;
    var HEIGHT = app.Consts.HEIGHT;
    var camera = app.Camera;
    var boxManager = app.BoxManager;
    var ui = app.Ui;
    //
    this.input      = {left:false, right:false, up:false, down:false, space:false, o:false};
    this.x          = undefined;
    this.y          = ui.setValue("settings_y", -300);
    this.vx         = ui.setValue("settings_vx", 0);
    this.vy         = ui.setValue("settings_vy", 0);
    this.acc        = ui.setValue("settings_acc", 0.75 /*Math.round(Game.Math.random(0.6, 0.7) *100) /100*/);
    this.fric       = ui.setValue("settings_fric", 0.83/*Math.round(Game.Math.random(0.65, 0.90) *100) /100*/); //std 0.86
    this.w          = undefined;
    this.h          = undefined;
    this.grav       = ui.setValue("settings_grav", 0.35/*Math.round(Game.Math.random(0.5, 1.2) *100) /100*/);
    this.color      = "#333";
    this.sides      = {};
    this.collide    = {};
    this.jumped     = false;
    this.jumpv      = ui.setValue("settings_jumpv", 13);
    this.turnedLeft = false;
    //
    this.itemslots  = {};

    this.init = function(){
      this.x            = ui.setValue("settings_x", WIDTH/2);
      this.w            = ui.setValue("settings_w", consts.PLAYER_W);
      this.h            = ui.setValue("settings_h", consts.PLAYER_H);
      this.updateSides();
      camera.y = camera.seekingY = this.y -HEIGHT/2 +consts.PLAYER_H/2 +150;
    }

    this.updateSides = function(){
      this.sides = {top: this.y, bottom: this.y + this.h, left: this.x, right: this.x + this.w};
    }


    this.update = function(dt){
      if(this.input.left || this.input.a)   {this.vx -= this.acc; this.turnedLeft = true;}
      if(this.input.right || this.input.d)  {this.vx += this.acc; this.turnedLeft = false;}
      if(this.input.space && !this.jumped ||
         this.input.w && !this.jumped)  {
        this.vy -= this.jumpv;
        this.jumped = true;
      }
      // debug input
      if(this.input.o) {}
      //
      if(this.y - camera.y > 295) { camera.positionY(this.y); camera.vy = 12; }
      if(this.vy > 0) this.jumped = true;
      //
      this.vy += this.grav;
      this.vx *= this.fric;
      this.x += this.vx;
      this.y += this.vy;
      this.updateSides();
      //
      this.updateCamera();
      this.checkCollision();
    }

    this.updateCamera = function(){
      camera.x += (camera.seekingX - camera.x)/ camera.vx //+ Game.Math.randomInt(-5,5);
      camera.y += (camera.seekingY - camera.y)/ camera.vy //+ Game.Math.randomInt(-5,5);;
      //
      camera.positionX(this.x);
      //camera.positionY(this.y);
    }

    this.checkCollision = function(){
        var collisionResponse =  {
          collideLeft : function(e1,e2){
              e1.x = e2.sides.right;
              e1.vx = 0;
          },
          collideRight : function(e1,e2){
              e1.x = e2.sides.left - e1.w;
              e1.vx = 0;
          },
          collideBottom : function(e1,e2){
              e1.y = e2.sides.top - e1.h;
              e1.vy *= -0.15;
              e1.jumped = false;
              app.Camera.positionY(e1.y);
          },
          collideTop : function(e1,e2){
              e1.y = e2.sides.bottom;
              e1.vy = 0;
          },
          collide:function(e1,e2){}
        }

        var objects = boxManager.boxes.concat(boxManager.movableBoxes);
        var playerSketch = {x:this.x, y:this.y, width:this.w, height:this.h};
        var quadtreeElems = app.Quadtree.PlayerTree.retrieve( playerSketch );
        //app.Infobox.elemsInQuadtree = quadtreeElems.length;
        //app.Infobox.elemsInQuadtree2 = objects.length;

        app.CollisionManager.checkAABBCollision([this], quadtreeElems, collisionResponse);
    }



  }//end-player

  app.Player = new Player();


	return app;
}(MODULE || {}));
