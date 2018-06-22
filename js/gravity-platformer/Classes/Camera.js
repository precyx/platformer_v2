var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class Camera
  // ------------------------------------------------------------------------------
  function Camera(){
    var consts = app.Consts;
    var WIDTH = app.Consts.WIDTH;
    var HEIGHT = app.Consts.HEIGHT;
    var player = app.Player;
    //
    this.x = 0;
    this.y = 0;
    this.vx = 12;
    this.vy = 12;
    this.seekingX = 0;
    this.seekingY = 0;
    this.startView = undefined;
    //
    this.init = function(){
        this.startView = {x: WIDTH/2 - consts.PLAYER_W/2, y: HEIGHT/2 - consts.PLAYER_H/2 + 60};
    }
    //
    this.positionX = function(x){
      this.seekingX = x - this.startView.x;
    }
    this.positionY = function(y){
      this.seekingY = y - this.startView.y;
    }
  }

  app.Camera = new Camera();

	return app;
}(MODULE || {}));
