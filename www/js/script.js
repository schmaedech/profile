 
$(function () {
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
    
                $('#playsound').on("click", function () {
                    var vid = document.getElementById("bgvid");
                    vid.muted = !vid.muted;
                })
                $('video').on('ended', function () {
                    this.load();
                    this.play();
                });
    $('#status').fadeOut();  
    $('#preloader').delay(350).fadeOut('slow');  
    $('body').delay(350).css({'overflow': 'visible'});
    $("html").niceScroll({
        cursorcolor: "#f74d65",
        scrollspeed: "100",
        cursorborder: "1px solid #f74d65",
        horizrailenabled: "false",
        cursorborderradius: "0px"
    });

     $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        dotsEach: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })



    new WOW().init();

});

