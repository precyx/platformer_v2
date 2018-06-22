var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class MoonStaff v 1.0
  // ------------------------------------------------------------------------------
  function MoonStaff(){
    //
    this.imgpath     = "moon_staff";
    this.drag        = false;
    this.showTooltip = false;
    //
    this.itemType    = "weapon";
    this.weaponData  = {
      bullet : {
        color : "#feecab"
      }
    };
  }

  app.MoonStaff = MoonStaff;

	return app;
}(MODULE || {}));
