var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Global Consts
  // ------------------------------------------------------------------------------
  function Consts(){
    this.FPS       = 60;
    this.WIDTH     = 900;
    this.HEIGHT    = 550;
    this.PLAYER_W  = 22;
    this.PLAYER_H  = 50;
    this.KEY       = {
      SPACE : 32,
      LEFT  : 37,
      UP    : 38,
      RIGHT : 39,
      DOWN  : 40,
      O     : 79,
      I     : 73,
      P     : 80,
      W     : 87,
      A     : 65,
      S     : 83,
      D     : 68,
      X     : 88,
      I     : 73 
    };
  }

  app.Consts = new Consts();

	return app;
}(MODULE || {}));
