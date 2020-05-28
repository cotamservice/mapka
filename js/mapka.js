function Mapka(containerId, paths, callOnClick, callOnHoverIn, callOnHoverOut){
  this.callOnClick = callOnClick;
  this.callOnHoverIn = callOnHoverIn;
  this.callOnHoverOut = callOnHoverOut;
  this.clickedElement = null;
  this.hoverElement = null;
  this.elements = new Array();
  this.staticColor = '#ff0';
  this.clickColor = '#f00';
  this.hoverColor = this.clickColor;
  this.borderColor = '#3899E6';
  this.borderWidth = 1;

  this.containerId = containerId;
  this.paths = paths;
  this.containerW = $('#' + this.containerId).width();
  this.containerH = $('#' + this.containerId).height();
  this.r = Raphael(this.containerId, this.containerW, this.containerH);

  this.parsePaths = function(){
    scaleFactor = paths.scaleFactor;
    containerScaleFactor = this.containerW/this.containerH;
    scaleX = paths.scaleFactorX * this.containerW;
    scaleY = paths.scaleFactorY * this.containerH;
    translateX = paths.translateX;
    translateY = paths.translateY;
    borderWidth = 1;

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

    for (var path in this.paths) {
      var obj = this.r.path(paths[path].path);
      obj.attr(attributes);
      obj.firstId = paths.firstId;
      obj.secondId = paths[path].secondId;
      obj.name = paths[path].name;
      obj.mapka = this;
      this.elements.push(obj);
    }
  };

  this.generation = function(){
    this.parsePaths();
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
