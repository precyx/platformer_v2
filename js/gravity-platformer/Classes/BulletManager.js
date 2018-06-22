var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class BulletManager
  // ------------------------------------------------------------------------------
  function BulletManager(){

    var boxManager = app.BoxManager;
    var boxes = app.BoxManager.boxes;

    this.bullets = [];

    this.init = function(){
    }

    this.update = function(){
      for(var i = 0; i < this.bullets.length; i++){
        var bullet = this.bullets[i];
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;
        bullet.vy += bullet.grav;
        bullet.updateSides();
        this.checkCollision(bullet);
      }

    }

    this.checkCollision = function(bullet){

        var collisionResponse =  {
          collideLeft : function(e1,e2){
              e1.x = e2.sides.right + e1.r;
              e1.vx *= -e1.bounce;
              //e2.x -= 5;
              //e2.updateSides();
          },
          collideRight : function(e1,e2){
              e1.x = e2.sides.left - e1.r;
              e1.vx *= -e1.bounce;
              //e2.x += 5;
              //e2.updateSides();
          },
          collideBottom : function(e1,e2){
              e1.y = e2.sides.top - e1.r;
              e1.vy *= -e1.bounce;
              //e2.y += 5;
              //e2.updateSides();
          },
          collideTop : function(e1,e2){
              e1.y = e2.sides.bottom + e1.r;
              e1.vy *= -e1.bounce;
              //e2.y -= 5;
              //e2.updateSides();
          },
          collide:function(e1,e2){}
        }

        var objects = boxManager.boxes.concat(boxManager.movableBoxes);
        var bulletSketch = {x:bullet.x-bullet.r, y:bullet.y-bullet.r, width:bullet.w, height:bullet.h};
        var quadtreeElems = app.Quadtree.PlayerTree.retrieve( bulletSketch );
        app.Infobox.elemsInQuadtree = objects.length;
        app.Infobox.elemsInQuadtree2 = quadtreeElems.length;
        //heckObjectCollision(bullet, quadtreeElems, sides, x, y, vx, vy);
        //checkObjectCollision(bullet, objects, sides, x, y, vx, vy);

        var boxes = boxManager.boxes.concat(boxManager.movableBoxes);
        if(bullet) app.CollisionManager.checkAABBCollision([bullet], quadtreeElems, collisionResponse);
    }


    this.addBullet = function(offsetX, offsetY){
      if(!app.Inventory.getEquippedWeapon()) return;
      //
      var b = new app.Bullet();
      if(app.Player.turnedLeft){
        b.x = app.Player.x + app.Player.w/2 -43;
        b.y = app.Player.y + app.Player.h/2 -13;
      }
      else{
        b.x = app.Player.x + app.Player.w/2 +43;
        b.y = app.Player.y + app.Player.h/2 -13;
      }
      var dx = -1 *(app.Player.x - app.Camera.x - offsetX);
      var dy = -1 *(app.Player.y - app.Camera.y - offsetY);
      var d = Math.sqrt(dx*dx + dy*dy);
      var v = 6;
      b.vx =  v*dx / d;
      b.vy =  v*dy / d;
      b.r = Game.Math.randomInt(5,8);
      b.color = app.Inventory.getEquippedWeapon().weaponData.bullet.color;
      b.updateSides();
      this.bullets.push(b);
      //
      b.width = b.w;
      b.height = b.h;
      b.updateSides();
      app.Quadtree.EnemyTree.insert(b);
    }

  }

  app.BulletManager = new BulletManager();

	return app;
}(MODULE || {}));
