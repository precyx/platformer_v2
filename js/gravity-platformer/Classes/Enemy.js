var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class Enemy
  // ------------------------------------------------------------------------------
  function Enemy(){
    var Math2 = app.Math2;
    var boxManager = app.BoxManager;
    //
    this.x      = 600;
    this.y      = -200;
    this.w      = 30;
    this.h      = 50;
    this.sides  = {};
    this.vx     = 0;
    this.vxm    = 1;
    this.vy     = 5;
    this.burstx = 0;
    this.bursty = 0;
    this.acc    = 0.2;
    this.fric   = 0.83;
    this.grav   = 0.3;
    this.jumped = false;
    this.swapX  = false;
    this.readyToJump = false;
    this.jumpv  = 13;
    //
    this.hp     = 2000;
    this.maxhp  = this.hp;
    //
    this.color  = "#000";
    this.color_g1 = undefined;
    this.color_g2 = undefined;
    //
    this.collisionPossible = false;

    this.init = function(){
      this.updateSides();
      this.color_g1 = Math2.randomHex();
      this.color_g2 = Math2.randomHex();
    }
    this.updateSides = function(){
      this.sides = {top: this.y, bottom: this.y + this.h, left: this.x, right: this.x + this.w};
    }
    this.update = function(dt){
      if(this.readyToJump && !this.jumped){
        this.vy -= 10;
        this.jumped = true;
      }
      if(this.swapX){
        this.acc *= -1;
      }
      if(this.vy > 0) this.jumped = true;
      this.readyToJump = false;
      this.swapX = false;
      this.vx += this.acc;
      if(this.vx >= this.vxm) this.vx = this.vxm;
      this.vy += this.grav;
      //this.vx *= this.fric;
      this.x += this.vx + this.burstx;
      this.y += this.vy + this.bursty;
      //
      this.burstx *= this.fric;
      this.bursty *= this.fric;
      this.updateSides();
      //
      this.checkCollision();
      //
    }

    this.checkCollision = function(){
        var collisionResponse =  {
          collideLeft : function(e1,e2){
            if(e2 instanceof app.Bullet) {
              e1.burstx += 5;
            }
            else{
              e1.x = e2.sides.right;
              e1.vx = 0;
              e1.readyToJump = true;
            }
          },
          collideRight : function(e1,e2){
            if(e2 instanceof app.Bullet) {
              e1.burstx -= 5;
            }
            e1.x = e2.sides.left - e1.w;
            e1.vx = 0;
            e1.readyToJump = true;
          },
          collideBottom : function(e1,e2){
            if(e2 instanceof app.Bullet) {
              e1.bursty += 5;
            }
            e1.y = e2.sides.top - e1.h;
            e1.vy = 0;
            e1.jumped = false;
          },
          collideTop : function(e1,e2){
            if(e2 instanceof app.Bullet) {
              e1.bursty -= 5;
            }
            if(e2 instanceof app.Bullet) return;
            e1.y = e2.sides.bottom;
            e1.vy = 0;
          },
          collide : function(e1,e2){
            if(e2 instanceof app.Bullet){
              for(var i = 0; i < app.BulletManager.bullets.length;i++){
                var b = app.BulletManager.bullets[i];
                if(b == e2) {
                  app.BulletManager.bullets.splice(i,1);
                  e1.hp -= 25;
                  if(e1.hp < 0)e1.hp = 0;
                  break;
                }
              }
            }
          }
        }

        this.ccc = function(e1,e2){

        }

        var bl = app.BulletManager.bullets;
        var bo = app.BoxManager.boxes;
        var bo2 = app.BoxManager.movableBoxes;
        var objects = bl.concat(bo).concat(bo2);
        var enemySketch = {x:this.x, y:this.y, width:this.w, height:this.h};
        var quadtreeElems = app.Quadtree.EnemyTree.retrieve( enemySketch );
        //app.Infobox.elemsInQuadtree = quadtreeElems.length;
        //app.Infobox.elemsInQuadtree2 = objects.length;

        app.CollisionManager.checkAABBCollision([this], objects, collisionResponse);
    }

  }
  app.Enemy = new Enemy();

	return app;
}(MODULE || {}));
