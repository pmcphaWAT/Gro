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
                $(".navbar .navbar-nav .nav-link").css("color", "black");
                $(".navbar .navbar-nav .nav-link").removeClass(".text-border");
            } else {
                $('.fixed-top').removeClass('bg-white shadow');
                $(".navbar .navbar-nav .nav-link").css("color", "white");
                $(".navbar .navbar-nav .nav-link").addClass(".text-border");
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow').css('top', -45);
                $(".navbar .navbar-nav .nav-link").css("color", "black");
                $(".navbar .navbar-nav .nav-link").removeClass(".text-border");
            } else {
                $('.fixed-top').removeClass('bg-white shadow').css('top', 0);
                $(".navbar .navbar-nav .nav-link").css("color", "white");
                $(".navbar .navbar-nav .nav-link").addClass(".text-border");
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
        $('html, body').animate({ scrollTop: 0 }, 0, 'easeInOutExpo');
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
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

})(jQuery);

//Google maps functions

function initMap() {
    // locate users coordinates to find on map
    if ("geolocation" in navigator) {
        console.log("geolocation exists for this browser")
        navigator.geolocation.getCurrentPosition(function (p) {
            locateUser(p.coords.latitude, p.coords.longitude);
        }, function (e) {
            ipLookup();
        });
    } else
        ipLookup();


};

function locateUser(latitude, longitude, additional) {
    console.log(latitude);
    console.log(longitude);
    var position = latitude + "," + longitude;
    var g_map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 12
    });

    addMarkers(g_map);
}


function ipLookup() {
    $.get('https://api.userinfo.io/userinfos', function (r) {
        showUserDetails(r.position.latitude, r.position.longitude, r);
    });
}

function addMarkers(g_map) {
    console.log("adding markers");
    var locations = [
        ['Loc A', 44.0497020484571, -91.6754105152892, 1],
        ['Loc B', 44.05096281797642, -91.67619372031038, 2],
        ['Loc C', 44.05124327433896, -91.67982287097426, 3],
        ['Loc E', 44.05198352666992, -91.67684025459225, 4],
        ['Loc F', 44.04721529953577, -91.64334841278864, 5],
        ['Loc G', 44.04855323590796, -91.63001783336748, 6]
    ];

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: g_map
        });

    }

    // 44.0497020484571, -91.6754105152892
    // 44.05096281797642, -91.67619372031038
    // 44.05124327433896, -91.67982287097426
    // 44.05198352666992, -91.67684025459225
    // 44.04721529953577, -91.64334841278864
    // 44.04855323590796, -91.63001783336748  
}