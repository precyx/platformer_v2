var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class Slot v 1.0
  // ------------------------------------------------------------------------------
  function Slot(){
    this.x           = undefined;
    this.y           = undefined;
    this.w           = 50;
    this.h           = 50;
    //
    this.item        = undefined;
    this.slotType    = undefined;
  }

  app.Slot = Slot;

	return app;
}(MODULE || {}));
