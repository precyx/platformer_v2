var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class Ui
  // ------------------------------------------------------------------------------
  function Ui(){
      this.getValue = function(name, type){
          if($("."+name).length) {
            if(type == "string") return $("."+name).val();
            else return parseFloat($("."+name).val());
          }
          else return 0;
      }
      //
      this.setValue = function(name, val){
          $("."+name).val(val);
          return val;
      }
  }

  app.Ui = new Ui();

	return app;
}(MODULE || {}));
