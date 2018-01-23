$(document).ready(function (){                
    
    if ($(window).width() > 1024){
        console.log($(window).width());
        
        var controller = new ScrollMagic.Controller();
        
        var wipeAnimation = new TimelineMax()
            .to("logo", 20, {x: "-50%", y: "20%", scale: 0.5})
            .fromTo("section.slide.slide-two", 20, {opacity: "0"}, {opacity: "1", ease: Linear.easeNone})
            .to("section.slide.slide-two", 40, {opacity: "1"})
            .fromTo("section.slide.slide-four", 20, {opacity: "0"}, {opacity: "1", ease: Linear.easeNone})
            .fromTo("section.slide.slide-five", 20, {opacity: "0"}, {opacity: "1", ease: Linear.easeNone})
            .to("section.slide.slide-five", 40, {opacity: "1"})
            .fromTo("section.slide.slide-six", 20, {opacity: "0"}, {opacity: "1", ease: Linear.easeNone})
            .fromTo("section.slide.slide-seven", 20, {opacity: "0"}, {opacity: "1", ease: Linear.easeNone})
            .to("section.slide.slide-seven", 40, {opacity: "1"});

        new ScrollMagic.Scene({
            triggerElement: "#pinContainer",
            triggerHook: "onLeave",
            duration: "300%"
        })
            .setPin("#pinContainer")
            .setTween(wipeAnimation)
            .addIndicators()
            .addTo(controller);
        
            controller.scrollTo(function (newpos){
            TweenMax.to(window, 0.5, {scrollTo: {y: newpos}, ease: Cubic.easeInOut});
        });
    }

    $('.loader-container').fadeOut('slow');

    /*$(document).on('click', 'a[href^="#"]', function(e){
        var id = $(this).attr('href');
        if ($(id).length > 0) {
            e.preventDefault();
            controller.scrollTo(id);
        }
    });*/
});