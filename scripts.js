$.scrollify({
    section : ".slide",
    sectionName: "idname",
    interstitialSection : "",
    easing: "easeOutExpo",
    scrollSpeed: 1100,
    offset : 0,
    scrollbars: true,
    standardScrollElements: "",
    setHeights: true,
    overflowScroll: true,
    updateHash: true,
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