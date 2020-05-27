var clickedId = '';
$(function(){
  var call = function(id){
      this.clickedId = id;
      console.log(this.clickedId);
  };

  var mapka = new Mapka('map',paths, call);
  // var mapka = new Mapka('map', paths['iceland'].regions, call);
  mapka.generation();
});
