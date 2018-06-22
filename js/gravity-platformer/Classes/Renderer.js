var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class Renderer v 1.0
  // ------------------------------------------------------------------------------
  function Renderer(){
    // dependencies
    var WIDTH = app.Consts.WIDTH;
    var HEIGHT = app.Consts.HEIGHT;
    var context = app.context;
    var player = app.Player;
    var camera = app.Camera;
    var boxManager = app.BoxManager;
    var bulletManager = app.BulletManager;
    var Math2 = app.Math2;
    //
    var bg;
    var lvl2;
    var lvl3;

    //
    this.color_g1 = Math2.randomHex();
    this.color_g2 = Math2.randomHex();
    this.color_g3 = Math2.randomHex();
    this.color_g4 = Math2.randomHex();
    //
    this.images = {};
    //
    this.showInventory = false;
    //
    //this.imagesLoaded = function(){};
    //
    this.loadImages = function(imagesLoadedCallback){
      var bg_path = "bg_01";
      Game.Load.images([bg_path], "img/",".png", function(images){ bg = images[bg_path]; });

      var lvl2_path = "bg_lvl2_01";
      Game.Load.images([lvl2_path], "img/",".png", function(images){ lvl2 = images[lvl2_path]; });

      var lvl3_path = "bg_lvl3_01";
      Game.Load.images([lvl3_path], "img/",".png", function(images){ lvl3 = images[lvl3_path]; });

      // item imgs
      var item_names = app.ItemManager.getWeaponNames();
      Game.Load.images(item_names, "img/", ".png", function(images){
        app.Renderer.images.items = images;
        imagesLoadedCallback();
      });

      var gametitle = "unillama_sorcerer_title";
      Game.Load.images([gametitle], "img/", ".png", function(images){
        app.Renderer.images.game = images;

      });
    }
    //
    this.render = function(){
      context.clearRect(0, 0, WIDTH, HEIGHT);
      this.renderBg();
      this.renderLvl3();
      this.renderLvl2();
      //
      this.renderParticles();

      this.renderEnemies();
      this.renderBoxes();
      this.renderPlayer();
      this.renderBullets();
      //
      this.renderInfobox();
      if(this.showInventory) this.renderInventory();
      //
      //this.renderGameTitle();

    }


    this.renderGameTitle = function(){
      var img = app.Renderer.images.game.unillama_sorcerer_title;
      context.drawImage(img, 0, 0, img.width*0.8, img.height*0.8);
    }


    /*
    *
      Inventory
    *
    */
    /* @todo */
    this.renderInventory = function(){
      var inv = app.Inventory;
      //
      context.save();
      // bg
      context.fillStyle = inv.bgcolor;
      context.globalAlpha = 0.98;
      app.EnhancedCanvas.roundRect(context, inv.x, inv.y, inv.w, inv.h, inv.round, true, false);

      // header
      var x = inv.x + inv.w/2 - inv.header_w/2;
      var y = inv.y - inv.header_h;
      var w = inv.header_w;
      var h = inv.header_h;
      var cornerRadius = { upperLeft: 5, upperRight: 5, lowerLeft: 0, lowerRight: 0 };
      var grd=context.createLinearGradient(x,y-30,x,y+h+30);
      grd.addColorStop(0,"#FFB41C");
      grd.addColorStop(1,"#FFE638");
      context.fillStyle = grd
      app.EnhancedCanvas.roundRect(context, x, y, w, h, cornerRadius, true, false);

      // bg border
      var x = inv.x;
      var y = inv.y;
      var w = inv.w;
      var h = inv.h;
      context.strokeStyle ="#9B5600";
      context.lineWidth = 4;
      context.globalAlpha = 1;
      app.EnhancedCanvas.roundRect(context, x, y, w, h, inv.round, false, true);

      // title
      context.font = "italic 28px Libre Baskerville";
      var txt_w = context.measureText(inv.txt).width;
      var txt_h = 8;
      var x = inv.x + inv.w/2 - txt_w/2;
      var y = inv.y - inv.header_h/2 + txt_h;
      context.fillStyle = "#633F00";
      context.fillText(inv.txt, x, y);

      // player bg
      context.globalAlpha = 0.05;
      context.fillStyle = "#f7a54d";
      context.strokeStyle ="#FFB41C";
      context.strokeStyle ="#633F00";
      context.lineWidth = 1;
      context.setLineDash([7, 10]);
      context.lineCap="round";
      var x = inv.x + inv.w/2 - inv.ply_bg_w/2;
      var y = inv.y+20;
      var w = inv.ply_bg_w;
      var h = inv.ply_bg_h;
      app.EnhancedCanvas.roundRect(context, x, y, w, h, inv.round, true, false);

      //Player
      context.globalAlpha = 1;
      var img_std = document.getElementsByClassName("player_img")[0];
      var img = img_std;
      var sprite_w = img.width;
      var sprite_h = img.height;
      var x = inv.x + inv.w/2 - sprite_w/2+5;
      var y = inv.y +40;
      context.drawImage(img, x, y, sprite_w, sprite_h);

      //Player weapon
      if(app.Inventory.getEquippedWeapon()){
        var weapon = app.Inventory.getEquippedWeapon();
        img = this.images.items[weapon.imgpath];
        x = x +62;
        y = y +55;
        var deg = 35;
        var s = 0.6;
        context.save();
        app.EnhancedCanvas.rotate(context, {x: x+img.width*s/2,y: y+img.height*s}, deg);
        context.drawImage(img, x, y, img.width*s, img.height*s);
        context.restore();
        //
      }

      // Player hand
      var hand_right = document.getElementsByClassName("hand_right")[0];
      img = hand_right;
      sprite_w = img.width;
      sprite_h = img.height;
      x = inv.x + inv.w/2 - sprite_w/2+5;
      y = inv.y +40;
      context.drawImage(img, x, y, sprite_w, sprite_h);

      //Slots
      for(var i=0; i < inv.slotRows; i++){
        for(var j=0; j < inv.slotCols; j++){
          var slot = inv.slots[i.toString()+j.toString()];
          if(!slot){}
          else if(slot.slotType == "disabled"){}
          else{
            context.fillStyle = "#f7a54d";
            var x = slot.x;
            var y = slot.y;
            var w = slot.w;
            var h = slot.h;
            if(slot.item){
              // item bg
              /*context.globalAlpha = 0.8;
              context.strokeStyle ="#FFB41C";
              context.lineWidth = 2;
              context.setLineDash([5, 8]);
              app.EnhancedCanvas.roundRect(context, x, y, w, h, 5, false, true);*/

              //
              // item
              var item = this.images.items[slot.item.imgpath];
              var s = 0.6;
              var iw = item.width*s;
              var ih = item.height*s;
              context.globalAlpha = 1;
              context.save();
              //
              if(slot.item.drag){
                var mdx = app.Mouse.mouseDownX;
                var mdy = app.Mouse.mouseDownY;
                var mx = app.Mouse.x;
                var my = app.Mouse.y;
                var itemX = x+w/2-iw/2+mx-mdx;
                var itemY = y+h/2-ih/2+my-mdy;
                context.drawImage(item, itemX, itemY, iw, ih);
              }
              else{
                app.EnhancedCanvas.rotate(context, {x:x+w/2, y:y+h/2}, 45);
                context.drawImage(item, x+w/2-iw/2, y+h/2-ih/2, iw, ih);
                // tooltip
                if(slot.item.showTooltip){
                  context.globalAlpha = 0.5;
                  context.fillStyle = "#f7a54d";
                  app.EnhancedCanvas.roundRect(context, x, y-100, 200, 100, inv.round, true, false);
                }
              }

              context.restore();
              //

            }
            // slot bg
            context.globalAlpha = 0.05;
            context.fillStyle = "#f7a54d";
            // weapon slot
            if(slot.slotType != "storage" && slot.slotType == "weapon"){
              context.globalAlpha = 1;
              context.lineWidth = 2;
              context.setLineDash([5,8]);
              if(slot.slotType == "weapon")   context.strokeStyle ="#9933ff";
              /*if(slot.slotType == "hat")      context.strokeStyle ="#ffdd33";
              if(slot.slotType == "helmet")   context.strokeStyle ="#bbffaa";
              if(slot.slotType == "cloak")    context.strokeStyle ="#66aabb";
              if(slot.slotType == "extra1")    context.strokeStyle ="#bbccdd";
              if(slot.slotType == "extra2")    context.strokeStyle ="#ffc1b4";*/
              //
              app.EnhancedCanvas.roundRect(context, x, y, w, h, 5, false, true);
              context.globalAlpha = 0.05;
            }
            // slot hover
            if(app.CollisionManager.pointIntersectsAABB(app.Mouse, slot)){
                if(app.Mouse.mouseDown){
                  if(slot.slotType == "storage"){
                    context.globalAlpha = 0.8;
                    context.strokeStyle ="#FFB41C";
                    context.lineWidth = 2;
                    context.setLineDash([5, 8]);
                    app.EnhancedCanvas.roundRect(context, x, y, w, h, 5, false, true);
                  }
                }
                context.globalAlpha = 0.1;
            }
            app.EnhancedCanvas.roundRect(context, x, y, w, h, inv.round, true, false);



          }//end-else
        }//end-for
      }//end-for

      context.restore();
    }


    this.renderEnemies = function(){
      // enemy
      var enemy = app.Enemy;
      context.fillStyle = enemy.color;
      context.fillRect(enemy.x - camera.x, enemy.y - camera.y, enemy.w, enemy.h);
      //max hp
      context.fillStyle = "#cc3322";
      var missing_hp = ((enemy.maxhp - enemy.hp)/enemy.maxhp);
      var h = 8;
      var w = enemy.w *1.8;
      var nh = 20;
      context.fillRect(enemy.x - camera.x + w - w * missing_hp -w/2 +enemy.w/2, enemy.y - camera.y -nh, w * missing_hp, h);
      //current hp
      context.fillStyle = "#44cc66";
      context.fillRect(enemy.x - camera.x -w/2+enemy.w/2, enemy.y - camera.y -nh, w * enemy.hp/enemy.maxhp, h);
    }

    this.renderInfobox = function(){
      context.font = "12px Arial";
      context.fillStyle ="#000";
      context.fillText("x: "+Math.round(player.x).toString(), 10, 20);
      context.fillText("y: "+Math.round(player.y).toString(), 10, 40);
      context.fillText("n: "+Math.round(app.Infobox.elemsInQuadtree).toString(), 10, 60);
      context.fillText("n: "+Math.round(app.Infobox.elemsInQuadtree2).toString(), 10, 80);
    }

    this.renderBullets = function(){
      for(var i = 0; i < bulletManager.bullets.length; i++){
        var bullet = bulletManager.bullets[i];
        //
        context.save();
        context.beginPath();
        var gradient = context.createLinearGradient(0,0,0,550);
        gradient.addColorStop(0,this.color_g3);
        gradient.addColorStop(1,this.color_g4);
        //context.globalAlpha = 0.8;
        //context.fillStyle = gradient;
        context.fillStyle = bullet.color;
        //context.globalCompositeOperation = "multiply";
        //context.globalCompositeOperation = "luminosity";
        context.arc(bullet.x -camera.x, bullet.y -camera.y, bullet.r, 0,2*Math.PI);
        //bullet.r += 0.2;
        //
        //context.stroke();
        context.fill();
        context.restore();

      }
    }

    this.renderParticles = function(){
    }

    this.renderBg = function(){
      if(bg) context.drawImage(bg, 0, 0, WIDTH, HEIGHT);
    }

    this.renderLvl3 = function(){
      if(lvl3) {
        var pat=context.createPattern(lvl3,"repeat-x");
        context.fillStyle=pat;
        var offset_y = 190;

        context.save();
        context.translate(-Math.round(camera.x*0.35), offset_y);
        context.fillRect(+Math.round(camera.x*0.35), -offset_y, WIDTH, HEIGHT);
        context.restore();
      }
    }

    this.renderLvl2 = function(){
      if(lvl2) {
        var pat=context.createPattern(lvl2,"repeat-x");
        context.fillStyle=pat;
        var offset_y = 400;

        context.save();
        context.translate(-Math.round(camera.x*0.5), offset_y);
        context.fillRect(+Math.round(camera.x*0.5), -offset_y, WIDTH, HEIGHT);
        context.restore();
      }
    }



    this.renderPlayer = function(){
      context.fillStyle = player.color;
      //context.fillRect(player.x - camera.x, player.y - camera.y, player.w, player.h);
      //
      // vector line
      /*context.beginPath();
      context.moveTo(player.x +player.w/2 - camera.x, player.y +player.h/2 - camera.y);
      context.lineTo(player.x +player.w/2 + player.vx*10 - camera.x, player.y +player.h/2 +player.vy*10 - camera.y);
      context.lineWidth = 2;
      context.strokeStyle = 'orange';
      context.stroke();*/
      //
      // player
      var img_std = document.getElementsByClassName("player_img")[0];
      var img_flipv = document.getElementsByClassName("player_img_flipv")[0];
      var img = player.turnedLeft ? img_flipv :img_std;
      var sprite_w = img.width*0.7;
      var sprite_h = img.height*0.7;
      var px = player.turnedLeft ? (sprite_w-player.w)/2 +1 : (sprite_w-player.w)/2 -1;
      var py = (sprite_h-player.h)/2 +15;
      var x = player.x - camera.x -px;
      var y = player.y - camera.y -py;
      context.drawImage(img, x, y, sprite_w, sprite_h);
      //
      //Player weapon
      if(app.Inventory.getEquippedWeapon()){
        var weapon = app.Inventory.getEquippedWeapon();
        img = this.images.items[weapon.imgpath];
        context.save();
        px = player.turnedLeft ? 45 : 0;
        x = x + 45 -px;
        y = y + 35;
        var deg = player.turnedLeft ? -45 : 45;
        var s = 0.4;
        app.EnhancedCanvas.rotate(context, {x: x+img.width*s/2,y: y+img.height*s}, deg);
        context.drawImage(img, x, y, img.width*s, img.height*s);
        context.restore();
      }
      // Player hand
      var hand_left = document.getElementsByClassName("hand_left")[0];
      var hand_right = document.getElementsByClassName("hand_right")[0];
      img = player.turnedLeft ? hand_left : hand_right;
      sprite_w = img.width*0.7;
      sprite_h = img.height*0.7;
      px = player.turnedLeft ? (sprite_w-player.w)/2 +1 : (sprite_w-player.w)/2 -1;
      py = (sprite_h-player.h)/2 +15;
      x = player.x - camera.x -px;
      y = player.y - camera.y -py;
      context.drawImage(img, x, y, sprite_w, sprite_h);
      //
      // debug shape
      context.fillStyle = player.color;
      //context.fillRect(player.x - camera.x, player.y - camera.y, player.w, player.h);
    }
    this.renderBoxes = function(){
      for(var i = 0; i < boxManager.boxes.length; i++){
        var box = boxManager.boxes[i];
        //
        //context.fillStyle = box.color;

        var gradient = context.createLinearGradient(0,0,0,500);
        gradient.addColorStop(0,this.color_g1);
        gradient.addColorStop(1,this.color_g2);
        context.fillStyle = gradient;

        context.fillRect(box.x - camera.x , box.y -camera.y, box.w, box.h);

        if(box.collisionPossible) {
          /*box.collisionPossible = false;
          context.fillStyle = "#ffdd88";
          context.fillRect(box.x - camera.x + box.w/2 - 1, box.y -camera.y + box.h/2 -1, 2, 2)*/
        }
      }
      //
      for(var j = 0; j < boxManager.movableBoxes.length; j++){
        var box = boxManager.movableBoxes[j];
        //context.fillStyle = box.color;
        //context.fillRect(box.x - camera.x, box.y- camera.y, box.w, box.h);

        var img = document.getElementsByClassName("slime_img")[0];
        context.drawImage(img, box.x - camera.x -box.w/1.5/2, box.y -camera.y -box.h/1.5/2, box.w + box.w/1.5, box.h + box.h/1.5);
      }

    }
  }

  app.Renderer = new Renderer();

	return app;
}(MODULE || {}));
