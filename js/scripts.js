//Initiate Scrollify for section locking and smooth scrolling
$.scrollify({
    section : ".slide",
    sectionName: "idname",
    interstitialSection : ".footer",
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
    after:function() {
        console.log($.scrollify.current());
        var currentScroll = $.scrollify.current();
        if ((currentScroll.hasClass('expand') || currentScroll.hasClass('slide-fourfive') || currentScroll.hasClass('slide-five')) && $(window).width() <= 1024) {
            $.scrollify.disable();
        }
    },
    afterResize: function() {resizeRows();},
    afterRender: function() {}
  });

/**
 * Resizes section rows. On mobile, will show all '_b' sections and resize to avoid text overlay.
 * On desktop, will set the height of '_b' sections to 0px and center each '_a' sections '.content' vertically.
 * Relies on CSS hiding/showing '_b' sections
 */
function resizeRows() {
    if ($("div[id$='_b']").is(':visible')) {
        $('.slide').each(function(){
            if ($(this).find('div[id$="_b"]').length > 0) {
                var slide_a = $(this).find('div[id$="_a"]');
                var slide_b = $(this).find('div[id$="_b"]');
                if (($(this).height() - slide_a.height()) > ($(this).height() / 2.5)) {
                    slide_b.height($(this).height() - slide_a.height());
                } else {
                    slide_b.height(0);
                    slide_a.height($(this).height());
                    centerContent($(this));
                }
            }
        });
    } else {
        $("div[id$='_b']").height(0);
        $("div[id$='_a']").height($('.slide-one').height());
        $('.slide').each(function(){
            centerContent($(this));
        });
    }
    setNavDirection();
}

/**
 * Center content of a slide.
 * @param {jQuery Object} slide Slide to center content within
 */
function centerContent(slide) {
    var slideContent = slide.find('.content');
    var contentHeight = slideContent.height();
    var parentHeight = slide.height();
    var calcTopMargin = (parentHeight - contentHeight) / 2;
    slideContent.css('margin-top', calcTopMargin);
}

/**
 * Hides all other FAQ collapse sections when a new one is opened
 * @param {event} e Event object (e.currentTarget === $(this))
 */
function hideOtherCollapses(e) {
    var id = $(e.currentTarget).attr('id');
    $('div[id^="qu"]').each(function() {
        if ($(this).attr('id') != id) {
            $(this).collapse('hide');
        }
    });
}

/**
 * Overrides navigation anchor elements to use scrollify.move() to elements href value
 * @param {event} e Event object
 */
function navlinkOverride(e) {
    e.preventDefault();
    $.scrollify.enable();
    $.scrollify.move($(e.currentTarget).attr('href'));
}

/**
 * Sets the nav links to either dropdown or dropup, depending on available space
 */
function setNavDirection() {
    if (($('.slide-one').height() - $('#intro-main').height()) < 256) {
        $('ul.button-dropdown-list').css({'top': 'auto', 'bottom': '0'});
    } else {
        $('ul.button-dropdown-list').css({'top': '0', 'bottom': 'auto'});
    }
}

/**
 * Toggles the navigation menu open or closed on mobile screens (<768px). Only call from a mobile context (ie. check window width first)
 */
function toggleMobileNavMenu() {
    if ($('#navigation').width() > 0) {
        $('#navigation').width('0');
        $('#mobilenavigation').css('left', '10px');
        $('#mobilenavigation div.mobile-icon').removeClass('open-menu');
    } else {
        $('#navigation').width(180);
        $('#mobilenavigation').css('left', '130px');
        $('#mobilenavigation div.mobile-icon').addClass('open-menu');
    }
}

/** 
 * Toggles the navigation menu open or closed on tablet/desktop screens (>=1024). Also shows/hides the return to top button.
*/
function toggleNavMenu() {
    if ($(window).scrollTop() >= 50) {
        //$('#returntotop').fadeIn(600);
        $('#returntotop').removeClass('returned');
        if ($(window).width() >= 1024) {
            $('#navigation').height(0);
        }
    } else {
        //$('#returntotop').fadeOut(600);
        $('#returntotop').addClass('returned');
        if ($(window).width() >= 1024) {
            $('#navigation').height(50);
        }
    }
}

// function for scrollbar click detection
var clickedOnScrollbar = function(mouseX){
    if( $(window).innerWidth() <= mouseX ){
      return true;
    }
  }


$(document).ready(function (){      

    resizeRows();

    //Hide loading screen once page is ready
    $('.loader-container').fadeOut('slow');

    toggleNavMenu();

    //Gives section buttons ability to open their expanded section.
    $('button.expanding').on('click', function() {
        $.scrollify.enable();
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
    
    //Removed until a better solution is available
    /*var resizeTimer;
    $(window).resize(function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            location.reload();
        }, 100);
    });*/

    //Overrides nav links to use scrollify's move function for smooth scrolling
    $('a.top-nav-btn').on('click', navlinkOverride);

    $('.collapse').on(
        {
            'shown.bs.collapse': $.scrollify.update,
            'hidden.bs.collapse': $.scrollify.update,
            'show.bs.collapse': hideOtherCollapses
        });

    $(window).on('scroll', function(){
        toggleNavMenu();
    });

    /* Experimental fix for re-enabling scrollify
    $('.slide').on('touchstart', function(){
        if (!$(this).hasClass('expand') && !$(this).hasClass('slide-fourfive')) {
            if ($.scrollify.isDisabled()) {
                $.scrollify.enable();
            }
        }
    });*/

    $('#returntotop').on('click', function(){
        $.scrollify.enable();
        $.scrollify.move('#intro');
    });

    $('#mobilenavigation').on('click', function(){
        toggleMobileNavMenu();
    });

    $('#navigation li').on('click', function(){
        $.scrollify.enable();
        var navTo = $(this).attr('data-nav-to');
        if (navTo !== 'orders'){
            $.scrollify.move(navTo);
            if ($(window).width() < 1024){
                toggleMobileNavMenu();
            }
        }
    });

    $('.gdpr-img').on('click', function(){
        $.scrollify.enable();
        $.scrollify.move('#faq');
        $('#qup3').collapse('show');
    });

    $('a.privacypolicy').on('click', function(){
        $.scrollify.enable();
        $.scrollify.move('#faq');
        $('#qup4').collapse('show');
    });

    if ($(window).width() < 768) {
        $('a[data-toggle="lightbox"]').each(function() {
            $(this).attr('href', '');
            $(this).attr('data-toggle', 'disabled');
        });
        $('a[data-toggle="disabled"]').on('click', function(e) {
            e.preventDefault();
        });
    }

    $(document).mousedown(function(e){
        if( clickedOnScrollbar(e.clientX) ){
          $.scrollify.disable();
        }
      });

      $('.slide-one .content').imagesLoaded(function() {
          console.log('Images loaded');
          if (!$(".slide-one div[id$='_b']").is(':visible')) {
            centerContent($('.slide-one'));
          }          
      });

      $('.slide-five .content').imagesLoaded(function() {
        console.log('Images loaded');
        if (!$(".slide-one div[id$='_b']").is(':visible')) {
          centerContent($('.slide-five'));
        }          
    });
});