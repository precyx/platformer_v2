var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class Quadtree
  // ------------------------------------------------------------------------------

  var myQuadtrees = {
    EnemyTree : new Quadtree({
      x: -2500,
      y: -2500,
      width: 5000,
      height: 5000
    }, 4),

    PlayerTree : new Quadtree({
      x: -2500,
      y: -2500,
      width: 5000,
      height: 5000
    }, 4),
  }

  app.Quadtree = myQuadtrees;

	return app;
}(MODULE || {}));
