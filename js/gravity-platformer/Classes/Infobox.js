var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class Infobox
  // ------------------------------------------------------------------------------
  function Infobox(){
      this.elemsInQuadtree = undefined;
      this.elemsInQuadtree2 = undefined;
  }

  app.Infobox = new Infobox();

	return app;
}(MODULE || {}));
