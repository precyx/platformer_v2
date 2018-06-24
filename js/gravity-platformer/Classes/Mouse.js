var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class Mouse v 1.0
  // ------------------------------------------------------------------------------
  function Mouse(){
    this.x = undefined;
    this.y = undefined;
    //
    this.mouseDown  = false;
    this.mouseDownX = undefined;
    this.mouseDownY = undefined;
  }

  app.Mouse = new Mouse();

	return app;
}(MODULE || {}));
