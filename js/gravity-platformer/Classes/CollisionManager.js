var MODULE = (function (app) {

  // ------------------------------------------------------------------------------
  //  Class CollisionManager v 1.0
  // ------------------------------------------------------------------------------
  function CollisionManager(){

    /*
    @function
    Checks if a point is intersecting an AABB.
    Returns true if intersecting.
    */
    this.pointIntersectsAABB = function(point, elem){
      var sides = {
        left    : elem.x,
        top     : elem.y,
        right   : elem.x + elem.w,
        bottom  : elem.y + elem.h
      };
      if(point.x > sides.left &&
         point.x < sides.right &&
         point.y > sides.top &&
         point.y < sides.bottom){ return true; }
      else return false;
    }


    /*
      @function
      AABB = Axis Aligned Bounding Box = Rectangle
      Checks 2 arrays of objects against each other and checks for a Collision.
      Returns a collision response for left, right, bottom and top.
    */
    this.checkAABBCollision = function(elemGroup1, elemGroup2, collisionResponse){
      var collide       = collisionResponse.collide;
      var collideLeft   = collisionResponse.collideLeft;
      var collideRight  = collisionResponse.collideRight;
      var collideTop    = collisionResponse.collideTop;
      var collideBottom = collisionResponse.collideBottom;
      //
      for(var i = 0; i < elemGroup1.length; i++){
        var e1 = elemGroup1[i];
        var vx1 = e1.vx;
        var vy1 = e1.vy;
        //
        for(var j = 0; j < elemGroup2.length; j++){
          var e2 = elemGroup2[j];
          e2.collisionPossible = true;
          //
          if(
             e1.sides.right > e2.sides.left &&
             e1.sides.bottom > e2.sides.top &&
             e1.sides.top < e2.sides.bottom &&
             e1.sides.left < e2.sides.right){

               collide(e1,e2);

               var collisionDistance = {
                 bottom : Math.abs(e1.sides.bottom - e2.sides.top),
                 top    : Math.abs(e1.sides.top - e2.sides.bottom),
                 right  : Math.abs(e1.sides.right - e2.sides.left),
                 left   : Math.abs(e1.sides.left - e2.sides.right)
               };
               var d = collisionDistance;

               var vx3 = vx1 - e2.vx;
               var vy3 = vy1 - e2.vy;

               if(vx3 > 0 && vy3 > 0) {
                 if(d.right < d.bottom) collideRight(e1,e2);
                 else collideBottom(e1,e2);
               }
               else if(vx3 < 0 && vy3 > 0){
                 if(d.left < d.bottom) collideLeft(e1,e2);
                 else collideBottom(e1,e2);
               }
               else if(vx3 > 0 && vy3 < 0){
                 if(d.right < d.top) collideRight(e1,e2);
                 else collideTop(e1,e2);
               }
               else if(vx3 < 0 && vy3 < 0){
                 if(d.left < d.top) collideLeft(e1,e2);
                 else collideTop(e1,e2);
               }
               else if(vx3 > 0) collideRight(e1,e2);
               else if(vy3 > 0) collideBottom(e1,e2);
               else if(vx3 < 0) collideLeft(e1,e2);
               else if(vy3 < 0) collideTop(e1,e2);
          }//end-if
        }//end-for
      }//end-for-2
    }//end-func



  }//end-class

  app.CollisionManager = new CollisionManager();

	return app;
}(MODULE || {}));
