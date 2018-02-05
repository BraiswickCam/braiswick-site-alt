//Initiate Scrollify for section locking and smooth scrolling
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
    afterResize: function() {resizeRows();},
    afterRender: function() {}
  });

/**
 * Resizes section rows. On mobile, will show all '_b' sections and resize to avoid text overlay.
 * On desktop, will set the height of '_b' sections to 0px and center each '_a' sections '.content' vertically.
 * Relies on CSS hiding/showing '_b' sections
 */
function resizeRows() {
    if ($("div[id$='_b']").is(':visible') && ($('.slide-one').height() - $('#intro_a').height()) > ($('.slide-one').height() / 2)) {
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

/**
 * Initiate google map.
 * @param {number} latitude Latitude of location marker
 * @param {number} longtitude Longtitude of location marker
 * @param {string} elementId Target div to assign map element to
 * @param {number} zoomLevel Zoom level (default = 17)
 */
function initMap(latitude, longtitude, elementId, zoomLevel = 17) {
    var uluru = {lat: latitude, lng: longtitude};
    var map = new google.maps.Map(document.getElementById(elementId), {
      zoom: zoomLevel,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }


$(document).ready(function (){      

    resizeRows();

    //Hide loading screen once page is ready
    $('.loader-container').fadeOut('slow');

    //Gives section buttons ability to open their expanded section.
    $('button.expanding').on('click', function() {
        var thisSection = $(this);
        var currentSection = $.scrollify.current();
        var destIdName = '';
        var dest = '';
        window.setTimeout(function() {
            $('.expand').each(function() {
                $(this).removeClass('slide');
                $(this).addClass('hidden');
            });
            dest = thisSection.attr('data-dest');
            console.log(dest);
            destIdName = thisSection.attr('data-dest-idname');
            console.log(destIdName);
            $(dest).removeClass('hidden');
            $(dest).addClass('slide');
        }, 399);
        $.scrollify.update();
        window.setTimeout(function(){
            $.scrollify.instantMove('#' + currentSection.attr('data-idname'));
        }, 401);
        window.setTimeout(function(){
            $.scrollify.move(destIdName);
        }, 402);
    });

    //Overrides nav links to use scrollify's move function for smooth scrolling
    $('a.top-nav-btn').on('click', function(e) {
        e.preventDefault();
        $.scrollify.move($(this).attr('data-id-target'));
    });

    //Hides all other FAQ collapse section when a new one is opened
    $('.collapse').on('show.bs.collapse', function() {
        var id = $(this).attr('id');
        $('div[id^="qu"]').each(function() {
            if ($(this).attr('id') != id) {
                $(this).collapse('hide');
            }
        });
    });

    //Switches up/down chevron on active FAQ collapse shown
    $('.collapse').on('shown.bs.collapse', function() {
        var id = $(this).attr('id');
        var question = $('a[href="#' + id + '"] h3');
        question.removeClass('question-before');
        question.addClass('question-after');
        $.scrollify.update();
    });

    //Switches up/down chevron on active FAQ collapse hidden
    $('.collapse').on('hidden.bs.collapse', function() {
        var id = $(this).attr('id');
        var question = $('a[href="#' + id + '"] h3');
        question.removeClass('question-after');
        question.addClass('question-before');
        $.scrollify.update();
    });

    //Initiates Manningtree google map
    initMap(51.9588432, 1.0582637, 'mapManningtree');

    //Initiates Mansfield google map
    initMap(53.0679812, -1.2519532, 'mapMansfield', 18);
});