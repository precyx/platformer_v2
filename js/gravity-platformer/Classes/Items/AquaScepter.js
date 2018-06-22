var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class AquaScepter v 1.0
  // ------------------------------------------------------------------------------
  function AquaScepter(){
    //
    this.imgpath     = "aqua_scepter";
    this.drag        = false;
    this.showTooltip = false;
    //
    this.itemType    = "weapon";
    this.weaponData  = {
      bullet : {
        color : "#2bd8d8"
      }
    };
  }

  app.AquaScepter = AquaScepter;

	return app;
}(MODULE || {}));
