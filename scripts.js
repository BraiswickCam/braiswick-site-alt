var sectionMove = "";

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
    after:function() {console.log($.scrollify.current());},
    afterResize: function() {},
    afterRender: function() {},
    afterUpdate: function() {onSectionExpand(sectionMove);}
  });

function onSectionExpand(destination) {
    if (destination != "") {
            $.scrollify.move(destination);
            sectionMove = "";
        }
}

$(document).ready(function (){      

    $('.loader-container').fadeOut('slow');

    /*$(document).on('click', 'a[href^="#"]', function(e){
        var id = $(this).attr('href');
        if ($(id).length > 0) {
            e.preventDefault();
            controller.scrollTo(id);
        }
    });*/
    
    $('button.btn').on('click', function() {
        $('.expand').each(function() {
            $(this).removeClass('slide');
            $(this).addClass('hidden');
        });
        var dest = $(this).attr('data-dest');
        console.log(dest);
        var destIdName = $(this).attr('data-dest-idname');
        console.log(destIdName);
        $(dest).removeClass('hidden');
        $(dest).addClass('slide');
        $.scrollify.update();
        sectionMove = destIdName;
    });
});