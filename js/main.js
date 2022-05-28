(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();

    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow');
                $( ".navbar .navbar-nav .nav-link" ).css("color", "black");
                $( ".navbar .navbar-nav .nav-link" ).removeClass(".text-border");   
            } else {
                $('.fixed-top').removeClass('bg-white shadow');
                $( ".navbar .navbar-nav .nav-link" ).css("color", "white");
                $( ".navbar .navbar-nav .nav-link" ).addClass(".text-border");    
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow').css('top', -45);
                $( ".navbar .navbar-nav .nav-link" ).css("color", "black");
                $( ".navbar .navbar-nav .nav-link" ).removeClass(".text-border");  
            } else {
                $('.fixed-top').removeClass('bg-white shadow').css('top', 0);
                $( ".navbar .navbar-nav .nav-link" ).css("color", "white");
                $( ".navbar .navbar-nav .nav-link" ).addClass(".text-border");  
                // $('.navbar .navbar-nav .nav-link ').css('text-shadow','none')   
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 0, 'easeInOutExpo');
        return false;
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    //Google Maps Functions

    //Initialize and add the map
    function initMap()
    {
        getUserLocation();
        
    }

    function getUserLocation()
    {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position){
                console.log(position);
            }, function (err) {
                ipLookup();
            });
        } else
        ipLookup();

        function ipLookup(){

        }
    }

    
})(jQuery);

