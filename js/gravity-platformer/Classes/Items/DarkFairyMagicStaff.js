var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class DarkFairyMagicStaff v 1.0
  // ------------------------------------------------------------------------------
  function DarkFairyMagicStaff(){
    //
    this.imgpath     = "dark_fairy_magic_staff";
    this.drag        = false;
    this.showTooltip = false;
    //
    this.itemType    = "weapon";
    this.weaponData  = {
      bullet : {
        color : "#570853"
      }
    };
  }

  app.DarkFairyMagicStaff = DarkFairyMagicStaff;

	return app;
}(MODULE || {}));
