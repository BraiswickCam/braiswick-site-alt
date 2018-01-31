//Holder for next section to move to.
var sectionMove = "";

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
    afterRender: function() {},
    afterUpdate: function() {onSectionExpand(sectionMove);}
  });

/**
 * Scrolls the page to the new expanded section. Call after scrollify update to avoid index errors.
 * @param {string} destination - Target section to scroll to.
 */
function onSectionExpand(destination) {
    if (destination != "") {
            $.scrollify.move(destination);
            sectionMove = "";
        }
}

/**
 * Resizes section rows. On mobile, will show all '_b' sections and resize to avoid text overlay.
 * On desktop, will set the height of '_b' sections to 0px and center each '_a' sections '.content' vertically.
 * Relies on CSS hiding/showing '_b' sections
 */
function resizeRows() {
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

    //Overrides nav links to use scrollify's move function for smooth scrolling
    $('a.top-nav-btn').on('click', function(e) {
        e.preventDefault();
        $.scrollify.move($(this).attr('data-id-target'));
    });

    initMap(51.9588432, 1.0582637, 'mapManningtree');

    initMap(53.0679812, -1.2519532, 'mapMansfield', 18);
});