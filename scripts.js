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
    afterResize: function() {resizeMobileRows();},
    afterRender: function() {},
    afterUpdate: function() {onSectionExpand(sectionMove);}
  });

function onSectionExpand(destination) {
    if (destination != "") {
            $.scrollify.move(destination);
            sectionMove = "";
        }
}

function resizeMobileRows() {
    if ($("div[id$='_b']").is(':visible')) {
        $('#schoolphotography_b').height($('.slide-three').height() - $('#schoolphotography_a').height());
        $('#about_b').height($('.slide-two').height() - $('#about_a').height());
        $('#intro_b').height($('.slide-one').height() - $('#intro_a').height());
        $('#idservices_b').height($('.slide-four').height() - $('#idservices_a').height());
    } else {
        $("div[id$='_b']").height(0);
        $("div[id$='_a']").height($('.slide-one').height());
        $('.content').each(function(){
            var contentHeight = $(this).height();
            var parentHeight = $('.slide-one').height();
            var calcTopMargin = (parentHeight - contentHeight) / 2;
            $(this).css('margin-top', calcTopMargin);
        });
    }
}

$(document).ready(function (){      

    resizeMobileRows();

    $('.loader-container').fadeOut('slow');

    /*$(document).on('click', 'a[href^="#"]', function(e){
        var id = $(this).attr('href');
        if ($(id).length > 0) {
            e.preventDefault();
            controller.scrollTo(id);
        }
    });*/
    
    $('button.expanding').on('click', function() {
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

    $('button.top-nav-btn').on('click', function() {
        $.scrollify.move($(this).attr('data-id-target'));
    });

    $('a.top-nav-btn').on('click', function(e) {
        e.preventDefault();
        $.scrollify.move($(this).attr('data-id-target'));
    });
});