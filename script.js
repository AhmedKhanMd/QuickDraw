$(function() {

  var paint = false;
  var paint_erase = "paint";
  var canvas = document.getElementById("paint");
  var ctx = canvas.getContext('2d');
  var container = $(".container");
  var mouse = { x: 0, y: 0};
  var erase = $("#erase");
  var save = $("#save");
  var reset = $("#reset");

  // load saved work from localstorage

  if(localStorage.getItem("imageCanvas") != null) {
    var image = new Image();
    image.onload = function() {
      ctx.drawImage(image, 0, 0);
    };
    image.src = localStorage.getItem("imageCanvas");
  };

  ctx.linewidth = 3;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  
  container.mousedown(function(e) {
    paint = true;
    ctx.beginPath();
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    ctx.moveTo(mouse.x, mouse.y);
  })

  container.mousemove(function(e) { // holding the mouse key
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    if(paint == true) {
      if(paint_erase == "paint") {
        ctx.strokeStyle = document.getElementById("paintcolor").value;
      }
      else {
        ctx.strokeStyle = "white";
      }
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
  })

  container.mouseup(function(e) { // holding the mouse key
    paint = false;
  })

  container.mouseleave(function(e) { // holding the mouse key
    paint = false;
  })

  erase.click(function() {
    if(paint_erase == "paint") {
      paint_erase = "erase";
    }
    else {
      paint_erase = "paint";
    }
    $(this).toggleClass("eraseMode");
  })

  save.click(function() {

    if(typeof(Storage) != null) {
      localStorage.setItem("imageCanvas", canvas.toDataURL());
      // alert(localStorage.getItem("imageCanvas");
    }
    else {
      alert("Your browser doesn't support localStorage");
    }
  })

  reset.click(function() {
    ctx.clearRect(0, 0, 500, 400);
    paint_erase = "paint";
    $("#erase").removeClass("eraseMode");
  })

  $("#paintcolor").change(function() {
    $("#circle").css("background-color", $(this).val());
  });
  
  $("#slider").slider({
    min: 3,
    max: 30,
    slide: function(event, ui) {
      $("#circle").height(ui.value);
      $("#circle").width(ui.value);
      ctx.lineWidth = ui.value;
    }
  });

});