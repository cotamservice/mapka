var clickedId = '';
$(function(){
  var callOnClick = function(obj){
      console.log('was clicked: ' + obj.firstId + ';'+obj.secondId);
  };
  var callOnHoverIn = function(obj){
      console.log('was hover in: ' + obj.firstId + ';'+obj.secondId);
  };

  var callOnHoverOut = function(obj){
      console.log('was hover out: ' + obj.firstId + ';'+obj.secondId);
  };
  // ONLY FOR calculate correct proportion
  // var mapka0 = new Mapka0('map0', paths['gb'].regions, callOnClick,callOnHoverIn,callOnHoverOut);
  // mapka0.generation();
  ////////////////////////////////////////

  // var mapka = new Mapka('map',paths, callOnClick,callOnHoverIn,callOnHoverOut);
  // var mapka = new Mapka('map', paths['iceland'].regions, callOnClick,callOnHoverIn,callOnHoverOut);
  var mapka = new Mapka('map1', paths, callOnClick,callOnHoverIn,callOnHoverOut);
  mapka.generation();
  var mapka = new Mapka('map2', paths['gb'].regions, callOnClick,callOnHoverIn,callOnHoverOut);
  mapka.generation();
  var mapka = new Mapka('map3', paths['ireland'].regions, callOnClick,callOnHoverIn,callOnHoverOut);
  mapka.generation();
});
