var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class ItemManager
  // ------------------------------------------------------------------------------
  function ItemManager(){
    //
    this.weapons = [
      app.MoonStaff,
      app.DarkFairyMagicStaff,
      app.AquaScepter,
      app.BloodStinger
    ];

    this.getRandomWeapon = function(){
      var randomWeapon = this.weapons[app.Math2.randomInt(0, this.weapons.length-1)];
      var item = new randomWeapon();
      return item;
    }

    this.getWeaponNames = function(){
      var images = [];
      for(var i = 0; i < this.weapons.length; i++){
        var img = new this.weapons[i]().imgpath;
        images.push(img);
      }
      return images;
    }

  }

  app.ItemManager = new ItemManager();

	return app;
}(MODULE || {}));
