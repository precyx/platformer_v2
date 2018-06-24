var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class Item v 1.1
  // ------------------------------------------------------------------------------
  function Item(){
    //
    this.x           = undefined;
    this.y           = undefined;
    //
    this.img         = undefined;
    this.drag        = false;
    this.showTooltip = false;
    //
    this.itemType    = undefined;
    this.weaponData  = undefined;
  }

  app.Item = Item

	return app;
}(MODULE || {}));
