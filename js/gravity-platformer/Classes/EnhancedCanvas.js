var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class EnhancedCanvas v 1.1
  // ------------------------------------------------------------------------------
  function EnhancedCanvas(){

    this.rotate = function(ctx, rotationPoint, angle){
      ctx.translate(rotationPoint.x,rotationPoint.y);
      ctx.rotate(angle*Math.PI/180);
      ctx.translate(-rotationPoint.x,-rotationPoint.y);
    }

    this.scale = function(ctx, scalePoint, scaleFactor){
    }


    /**
     * Draws a rounded rectangle using the current state of the canvas.
     * If you omit the last three params, it will draw a rectangle
     * outline with a 5 pixel border radius
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} x The top left x coordinate
     * @param {Number} y The top left y coordinate
     * @param {Number} width The width of the rectangle
     * @param {Number} height The height of the rectangle
     * @param {Number} [radius = 5] The corner radius; It can also be an object
     *                 to specify different radii for corners
     * @param {Number} [radius.tl = 0] Top left
     * @param {Number} [radius.tr = 0] Top right
     * @param {Number} [radius.br = 0] Bottom right
     * @param {Number} [radius.bl = 0] Bottom left
     * @param {Boolean} [fill = false] Whether to fill the rectangle.
     * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
     */
    this.roundRect = function (ctx, x, y, width, height, radius, fill, stroke) {
        var cornerRadius = { upperLeft: 0, upperRight: 0, lowerLeft: 0, lowerRight: 0 };
        if (typeof stroke == "undefined") {
            stroke = true;
        }
        if (typeof radius === "object") {
            for (var side in radius) {
                cornerRadius[side] = radius[side];
            }
        }
        else if(typeof radius === "number"){
          for (var side in cornerRadius) {
              cornerRadius[side] = radius;
          }
        }

        ctx.beginPath();
        ctx.moveTo(x + cornerRadius.upperLeft, y);
        ctx.lineTo(x + width - cornerRadius.upperRight, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
        ctx.lineTo(x + width, y + height - cornerRadius.lowerRight);
        ctx.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height);
        ctx.lineTo(x + cornerRadius.lowerLeft, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
        ctx.lineTo(x, y + cornerRadius.upperLeft);
        ctx.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
        ctx.closePath();
        if (stroke) {
            ctx.stroke();
        }
        if (fill) {
            ctx.fill();
        }
    }

  }//end-class

  app.EnhancedCanvas = new EnhancedCanvas();

	return app;
}(MODULE || {}));
