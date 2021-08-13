$(document).ready(function() {
    // --- our code goes here ---
  $("#text").on('input propertychange',  function() {
    let txtcontent= $('#text').val();
    let strCount = (140- txtcontent.length );
    $(".counter").html(strCount);
    if (strCount <=0 ) {
      $('.counter').addClass("counter-overflow");
    }
    if (strCount >0) {
      $('.counter').removeClass("counter-overflow");
    }
    if(strCount >0 && strCount < 140) {
      $('#error').text('');
    }
  });  
});
