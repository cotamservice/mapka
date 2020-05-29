var clickedElement = '';
$(function(){
  var drawMapka =  function(){
    var mapka = new Mapka('map1', paths, callOnClick,callOnHoverIn,callOnHoverOut);
    mapka.generation(clickedElement.secondId);
  }
  var callOnClick = function(obj){
      console.log('was clicked: ' + obj.firstId + ';'+obj.secondId);
      clickedElement = obj;
      $("#map1").html("");
      drawMapka();
  };
  var callOnHoverIn = function(obj){
      console.log('was hover in: ' + obj.firstId + ';'+obj.secondId);
  };

  var callOnHoverOut = function(obj){
      console.log('was hover out: ' + obj.firstId + ';'+obj.secondId);
  };
  var mapka = new Mapka('map0', paths, callOnClick,callOnHoverIn,callOnHoverOut);
  mapka.generation();
});
