(function(){


  // ------------------------------------------------------------------------------
  //  Global Vars
  // ------------------------------------------------------------------------------
  var app = MODULE;


  // ------------------------------------------------------------------------------
  //  UI
  // ------------------------------------------------------------------------------
  function setupUI(){
    $(".btn.save_settings, .action_btn.save_player_settings").click(function(){
      savePlayerData();
    });

    function savePlayerData(){
      var player = app.Player;
      var ui = app.Ui;
      player.x = ui.getValue("settings_x");
      player.y = ui.getValue("settings_y");
      player.vx = ui.getValue("settings_vx");
      player.vy = ui.getValue("settings_vy");
      player.acc = ui.getValue("settings_acc");
      player.fric = ui.getValue("settings_fric");
      player.grav = ui.getValue("settings_grav");
      player.jumpv = ui.getValue("settings_jumpv");
      player.w = ui.getValue("settings_w");
      player.h = ui.getValue("settings_h");
    }
  }

  function openInventory(){
    app.Renderer.showInventory = !app.Renderer.showInventory;
  }


  // ------------------------------------------------------------------------------
  //  Run the game
  // ------------------------------------------------------------------------------
  $(document).ready(function(){
    app.Renderer.loadImages(function(){
      run();
    });
  });


  function run(){
    initClasses();
    setupEvents();
    setupUI();
    Game.run({
          fps:    app.Consts.FPS,
          update: update,
          render: render
        });
  }

  // ------------------------------------------------------------------------------
  //  Setup
  // ------------------------------------------------------------------------------

  function initClasses(){
    app.Inventory.init();
    app.Camera.init();
    app.Enemy.init();
    app.Player.init();
    app.BoxManager.init();
    //
  }

  function setupEvents(){
    document.addEventListener("keydown", function(e) { return keyboard(e, e.keyCode, true); });
    document.addEventListener("keyup",   function(e) { return keyboard(e, e.keyCode, false); });
    document.addEventListener("mousedown", function(e) { return mouse(e, "mousedown"); });
    document.addEventListener("mousemove", function(e) { return mouse(e, "mousemove"); });
    document.addEventListener("mouseup", function(e) { return mouse(e, "mouseup"); });
  }

  function keyboard(e, key, pressed){
    var c = app.Consts;
    var player = app.Player;
    //
    switch(key){
      case c.KEY.LEFT   : player.input.left   = pressed; e.preventDefault(); return false;
      case c.KEY.RIGHT  : player.input.right  = pressed; e.preventDefault(); return false;
      case c.KEY.UP     : player.input.up     = pressed; e.preventDefault(); return false;
      case c.KEY.DOWN   : player.input.down   = pressed; e.preventDefault(); return false;
      case c.KEY.SPACE  : player.input.space  = pressed; e.preventDefault(); return false;
      case c.KEY.O      : player.input.o      = pressed; e.preventDefault(); return false;
      case c.KEY.A      : player.input.a      = pressed; e.preventDefault(); return false;
      case c.KEY.D      : player.input.d      = pressed; e.preventDefault(); return false;
      case c.KEY.W      : player.input.w      = pressed; e.preventDefault(); return false;
      case c.KEY.I      : if(pressed) {openInventory();  e.preventDefault(); return false;}
    }
  }

  function mouse(e, type){
    if(type == "mousedown"){
      app.Mouse.mouseDown = true;
      app.Mouse.mouseDownX = e.offsetX;
      app.Mouse.mouseDownY = e.offsetY;
      //
      for(var i=0;i<1; i++) {
        window.setTimeout(function(){
          app.BulletManager.addBullet(e.offsetX, e.offsetY);
        }, i*60)

      }
    }

    else if(type == "mouseup"){
      console.log("mouseup");
      app.Mouse.mouseDown = false;
    }

    else if(type == "mousemove"){
      app.Mouse.x = e.offsetX;
      app.Mouse.y = e.offsetY;
    }
  }


  // ------------------------------------------------------------------------------
  //  Update Render
  // ------------------------------------------------------------------------------
  function update(dt){
    app.BoxManager.update(dt);
    app.BulletManager.update(dt);
    app.Player.update(dt);
    app.Enemy.update(dt);
    app.Inventory.update();
  }
  function render(){
    app.Renderer.render();
  }


})();

//# sourceURL=js/gravity-platformer/game.js
