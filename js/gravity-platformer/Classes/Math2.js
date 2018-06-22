var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class Math2
  // ------------------------------------------------------------------------------
  function Math2(){

    this.lerp = function(n, dn, dt) {
      return n + (dn * dt);
    },

    this.timestamp = function() {
      return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    },

    this.bound = function(x, min, max) {
      return Math.max(min, Math.min(max, x));
    },

    this.between = function(n, min, max) {
      return ((n >= min) && (n <= max));
    },

    this.brighten = function(hex, percent) {

      var a = Math.round(255 * percent/100),
          r = a + parseInt(hex.substr(1, 2), 16),
          g = a + parseInt(hex.substr(3, 2), 16),
          b = a + parseInt(hex.substr(5, 2), 16);

      r = r<255?(r<1?0:r):255;
      g = g<255?(g<1?0:g):255;
      b = b<255?(b<1?0:b):255;

      return '#' + (0x1000000 + (r * 0x10000) + (g * 0x100) + b).toString(16).slice(1);
    },

    this.darken = function(hex, percent) {
      return this.brighten(hex, -percent);
    },

    this.normalize = function(n, min, max) {
      while (n < min)
        n += (max-min);
      while (n >= max)
        n -= (max-min);
      return n;
    },

    this.randomHex = function(){
          var pool = ["0","1","2","3","4","5","6","7","8","9","0","A","B","C","D","E","F"];
          var color = "#";
          for( var i = 0; i < 6; i++){
            var pick = Math.floor(Math.random() * pool.length);
            color += pool[pick];
          }
          return color;
    },

    this.normalizeAngle180 = function(angle) { return this.normalize(angle, -180, 180); },
    this.normalizeAngle360 = function(angle) { return this.normalize(angle,    0, 360); },

    this.steppedRound      = function(val, step) { return Math.round(val / step) * step;  }

    this.random            = function(min, max) { return (min + (Math.random() * (max - min)));        },
    this.randomInt         = function(min, max) { return Math.round(this.random(min, max));            },
    this.randomSteppedInt  = function(min, max, step) { var val = Math.round(this.random(min, max)); return val - val%step; },
    this.randomChoice      = function(choices)  { return choices[this.randomInt(0, choices.length-1)]; }


  }

  app.Math2 = new Math2();

	return app;
}(MODULE || {}));
