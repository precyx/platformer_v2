var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class Inventory v 1.1
  // ------------------------------------------------------------------------------
  function Inventory(){
    var Math2 = app.Math2;
    //
    this.x          = undefined;
    this.y          = undefined;
    this.w          = 330;
    this.h          = 390;
    this.bgcolor    = "#230A00";
    this.round      = 10;
    // header
    this.header_w  = 260;
    this.header_h  = 45;
    this.txt       = "Inventory";
    // playerbg
    this.ply_bg_w  = 170;
    this.ply_bg_h  = 170;
    //
    this.slotCols  = 5;
    this.slotRows  = 6;
    this.slots     = {};

    this.init = function(){
      this.x = app.Consts.WIDTH/2 - this.w/2;
      this.y = app.Consts.HEIGHT/2 - this.h/2;
      this.createSlots();
      //this.fillItemsRandomly();
      this.fillSlotsRandomly();
      this.fillWeaponSlot();
    }

    /* @return Item / Boolean*/
    this.getEquippedWeapon = function(){
      if(this.slots["04"].item) return this.slots["04"].item;
      else return false;
    }

    this.fillWeaponSlot = function(){
      var item = app.ItemManager.getRandomWeapon();
      console.log(item);
      this.slots["04"].item = item;
    }

    this.createSlots = function(){
      for(var i = 0; i < this.slotRows; i++){
        for(var j = 0; j < this.slotCols; j++){
          var slot = new app.Slot();
          slot.x = this.x+20 +60*j;
          slot.y = this.y+20 +60*i;
          //
          if(i==0 && j==4) { slot.slotType = "weapon"; }
          else if(i==0 && j==0) { slot.slotType = "hat"; }
          else if(i==1 && j==0) { slot.slotType = "helmet"; }
          else if(i==2 && j==0) { slot.slotType = "cloak"; }
          else if(i==1 && j==4) { slot.slotType = "extra1"; }
          else if(i==2 && j==4) { slot.slotType = "extra2"; }
          else if(i==1 && j==4 || i==2 && j==4 ||
                  i==0 && j==0 || i==1 && j==0 ||
                  i==2 && j==0) { slot.slotType = "noitem"; }
          else if(i==0&&j==1 || i==0&&j==2 || i==0&&j==3 ||
                  i==1&&j==1 || i==1&&j==2 || i==1&&j==3 ||
                  i==2&&j==1 || i==2&&j==2 || i==2&&j==3) {
              slot.slotType = "disabled";
          }
          else slot.slotType = "storage";
          //
          this.slots[i.toString()+j.toString()] = slot;
        }
      }
    }

    this.fillItemsRandomly = function(){
      var count = 0;
      var itemNames = app.ItemManager.getWeaponNames();
      for (var i = 0; i < itemNames.length; i++){
          //if (Math.random() < 1/++count) {
            var item = app.ItemManager.getRandomWeapon();
            var x = Math2.randomInt(0,this.slotRows-1);
            var y = Math2.randomInt(0,this.slotCols-1);
            var xy = x.toString()+y.toString();
            this.assignItem(xy, item);
          //}
      }
    }

    this.fillSlotsRandomly = function(){
      var count = 0;
      for (var key in this.slots){
          if (Math.random() < 0.5) {
            var item = app.ItemManager.getRandomWeapon();
            this.assignItem(key, item);
          }
      }
    }

    this.assignItem = function(slotId, item){
      var slot = this.slots[slotId];
      /*switch(slot.slotType){
        case "disabled" : return;
        case "weapon"   : return;
        case "noitem"   : return;
      }*/
      if(slot.slotType != "storage") return;
      slot.item = item;
    }

    this.update = function(){
      for(var i = 0; i < this.slotRows; i++){
        for(var j = 0; j < this.slotCols; j++){
          var slot = this.slots[i.toString()+j.toString()];
          //
          if(!slot.item) continue;
          var mouseDown = app.Mouse.mouseDown;
          var collision = app.CollisionManager;
          var mouseDownPoint = {x: app.Mouse.mouseDownX, y: app.Mouse.mouseDownY};
          var mouseUpPoint = {x: app.Mouse.x, y: app.Mouse.y};
          //
          // mousedown
          if(mouseDown && collision.pointIntersectsAABB(mouseDownPoint, slot)){
            // drag
            slot.item.drag = true;
          }
          //mouseup
          else if(!mouseDown){
            for(var key in this.slots){
              var slot2 = this.slots[key];
              if(slot.item.drag && collision.pointIntersectsAABB(mouseUpPoint, slot2)){
                //if(slot2.slotType != "storage") continue;
                // drop
                slot.item.drag = false;
                var item1 = app.Cloner.clone(slot.item);
                var item2 = app.Cloner.clone(slot2.item);
                slot.item = item2;
                slot2.item = item1;
                break;
              }
            }//end-for#3
            if(slot.item) slot.item.drag = false;
          }//end-if
        }//end-for#2
      }//end-for#1
    }




  }//end-class

  app.Inventory = new Inventory();

	return app;
}(MODULE || {}));
