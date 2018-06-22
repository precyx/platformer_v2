var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class Box V 1.0
  // ------------------------------------------------------------------------------
  function Box(){
    //
    this.x      = 0;
    this.y      = 0;
    this.w      = 0;
    this.h      = 0;
    this.sides  = {};
    this.vx     = 0;
    this.vy     = 0;
    this.max_x  = 50;
    this.xdirection = 1;
    //
    this.color  = "#ffbbaa";
    this.color_g1 = undefined;
    this.color_g2 = undefined;
    this.animation = [];
    this.animationIndex = 0;
    this.loopAnimation = false;
    this.xstart;
    this.ystart;
    //
    this.collisionPossible = false;
  }

  Box.prototype.init = function(){
    var Math2 = app.Math2;
    this.updateSides();
    this.color_g1 = Math2.randomHex();
    this.color_g2 = Math2.randomHex();
  }
  Box.prototype.updateSides = function(){
    this.sides = {top: this.y, bottom: this.y + this.h, left: this.x, right: this.x + this.w};
  }
  Box.prototype.update = function(dt){}

  //
  app.Box = Box;

	return app;
}(MODULE || {}));
