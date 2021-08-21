$(function() {
  $("#slider").slider({
    min: 3,
    max: 30,
    slide: function(event, ui) {
      $("#circle").height(ui.value);
      $("#circle").width(ui.value);
    }
  });
  
});