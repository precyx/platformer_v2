var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class BloodStinger v 1.0
  // ------------------------------------------------------------------------------
  function BloodStinger(){
    //
    this.imgpath     = "blood_stinger";
    this.drag        = false;
    this.showTooltip = false;
    //
    this.itemType    = "weapon";
    this.weaponData  = {
      bullet : {
        color : "#cd0854"
      }
    };
  }

  app.BloodStinger = BloodStinger;

	return app;
}(MODULE || {}));
