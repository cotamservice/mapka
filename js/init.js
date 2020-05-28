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

  var mapka = new Mapka('map',paths, callOnClick,callOnHoverIn,callOnHoverOut);
  // var mapka = new Mapka('map', paths['iceland'].regions, callOnClick,callOnHoverIn,callOnHoverOut);
  mapka.generation();
});
