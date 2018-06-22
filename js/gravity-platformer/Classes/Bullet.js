var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class Bullet V 1.0
  // ------------------------------------------------------------------------------
  function Bullet(){
    var Math2 = app.Math2;
    //
    this.x        = 0;
    this.y        = 0;
    this.r        = 7;
    this.w        = undefined;
    this.h        = undefined;
    this.sides    = {};
    this.color    = "#bb77dd";
    this.color_g1 = Math2.randomHex();
    this.color_g2 = Math2.randomHex();
    this.vx       = 0;
    this.vy       = 0;
    this.grav     = 0.1;
    this.bounce   = 0.8;
  }

  Bullet.prototype.init = function(){
    this.updateSides();
  }

  Bullet.prototype.updateSides = function(){
    this.sides = {top: this.y - this.r, bottom: this.y + this.r, left: this.x - this.r, right: this.x + this.r};
    this.w = this.r*2;
    this.h = this.r*2;
  }

  app.Bullet = Bullet;

	return app;
}(MODULE || {}));
