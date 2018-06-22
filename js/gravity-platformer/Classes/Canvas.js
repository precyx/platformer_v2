var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class Canvas
  // ------------------------------------------------------------------------------
  function Canvas(){
    this.canvas = document.getElementById("stage");
    this.context = this.canvas.getContext('2d');
    this.canvas.width = app.Consts.WIDTH;
    this.canvas.height = app.Consts.HEIGHT;
  };
  var c = new Canvas()
  app.canvas = c.canvas;
  app.context = c.context;

	return app;
}(MODULE || {}));
