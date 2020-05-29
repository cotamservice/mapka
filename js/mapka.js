function Mapka(containerId, paths, callOnClick, callOnHoverIn, callOnHoverOut){
  this.callOnClick = callOnClick;
  this.callOnHoverIn = callOnHoverIn;
  this.callOnHoverOut = callOnHoverOut;
  this.clickedElement = null;
  this.hoverElement = null;
  this.elements = new Array();
  this.staticColor = '#f5f5f5';
  this.clickColor = '#c7c7c7';
  this.hoverColor = '#c7c7c7';
  this.borderColor = '#c7c7c7';
  this.borderWidth = 1.5;

  this.containerId = containerId;
  this.paths = paths;
  this.containerW = $('#' + this.containerId).width();
  this.containerH = $('#' + this.containerId).height();
  this.r = Raphael(this.containerId, this.containerW, this.containerH);

  this.parsePaths = function(paths){
    scaleFactor = paths.scaleFactor;
    containerScaleFactor = this.containerW/this.containerH;
    scaleX = paths.scaleFactorX * this.containerW;
    scaleY = paths.scaleFactorY * this.containerH;
    translateX = paths.translateX;
    translateY = paths.translateY;
    borderWidth = this.borderWidth;

    k = scaleFactor / containerScaleFactor;
    if(containerScaleFactor > scaleFactor){
      scaleX = scaleX * k;
      translateDeltaW = (this.containerW - this.containerH * scaleFactor) / scaleX;
      translateX = translateX + translateDeltaW/2;
      borderWidth = borderWidth * scaleY;
    }else {
      scaleY = scaleY / k;
      translateDeltaH = (this.containerH - this.containerW / scaleFactor ) / scaleY;
      translateY = translateY + translateDeltaH/2 ;
      borderWidth = borderWidth * scaleX;
    }

    attributes = {
      fill: this.staticColor,
      stroke: this.borderColor,
      'stroke-width': borderWidth,
      'stroke-linejoin': 'round',
    };

    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.translateX = translateX;
    this.translateY = translateY;

    for (var path in paths) {
      var obj = this.r.path(paths[path].path);
      obj.attr(attributes);
      obj.firstId = paths.firstId;
      obj.secondId = paths[path].secondId;
      obj.name = paths[path].name;
      obj.mapka = this;
      this.elements.push(obj);
    }
  };

  this.parseById = function(id){
      if(id != null && id.toUpperCase() == 'EU'){
        this.parsePaths(this.paths);
      }else{
        for (var path in this.paths) {
          isPathExist = typeof this.paths[path].regions != 'undefined';
          if(isPathExist && this.paths[path].secondId == id){
              console.log(this.paths[path].secondId);
              this.parsePaths(this.paths[path].regions);
              return;
          }
        }
      }
      this.parsePaths(this.paths);
  };

  this.generation = function(){
    this.parseById(arguments[0]);
    for (var element of this.elements) {
      element
        .hover(function(){
          if(this.mapka.clickedElement === null || this.mapka.clickedElement.id !== this.id){
            this.animate({
                  fill: this.mapka.hoverColor
              }, 300);
          }
          this.mapka.callOnHoverIn(this);
        }, function(){
          if(this.mapka.clickedElement === null || this.mapka.clickedElement.id !== this.id){
            this.animate({
                fill: this.mapka.staticColor
            }, 300);
          }
          this.mapka.callOnHoverOut(this);
        })
        .click(function(){
          if(this.mapka.clickedElement !== null){
            this.mapka.clickedElement
            .attr({
                fill: this.mapka.staticColor
            });
          }
          this.mapka.clickedElement = this;
          this.attr({
              fill: this.mapka.clickColor
          });
          this.mapka.callOnClick(this.mapka.clickedElement);
        })
        .scale(this.scaleX, this.scaleY,1,1)
        .translate(this.translateX, this.translateY);
    }
  };
};
