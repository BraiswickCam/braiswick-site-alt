$.scrollify({
    section : ".slide",
    interstitialSection : "",
    easing: "easeOutExpo",
    scrollSpeed: 1100,
    offset : 0,
    scrollbars: true,
    standardScrollElements: "",
    setHeights: false,
    overflowScroll: true,
    updateHash: false,
    touchScroll:true,
    before:function() {},
    after:function() {},
    afterResize:function() {},
    afterRender:function() {}
  });

$(document).ready(function (){      

    $('.loader-container').fadeOut('slow');

    /*$(document).on('click', 'a[href^="#"]', function(e){
        var id = $(this).attr('href');
        if ($(id).length > 0) {
            e.preventDefault();
            controller.scrollTo(id);
        }
    });*/
});