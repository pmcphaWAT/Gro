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

var locations = [
    {
        "title": 'Petes Garden',
        "lat": '44.0497020484571',
        "lng": ' -91.6754105152892',
        "img-path":"",
        "uses-pesticides":false,
        "pick-your-own":true,
        "is-limit":true,
        "description": 'Various fruits ready to be picked.'
    },
    {
        "title": 'Bills Curb Garden',
        "lat": '44.05096281797642',
        "lng": '-91.67619372031038',
        "img-path":"",
        "uses-pesticides":false,
        "pick-your-own":true,
        "is-limit":true,
        "description": 'Offering mainly lettuce and turnips.'
    },
    {
        "title": 'Laylas Backyard',
        "lat": '44.05124327433896',
        "lng": '-91.67982287097426',
        "img-path":"",
        "uses-pesticides":false,
        "pick-your-own":true,
        "is-limit":true,
        "description": 'Lots of corn ready to harvest.  Also offering tomatoes and carrots.'
    },
    {
        "title": 'Larrys Front Garden',
        "lat": '44.04721529953577',
        "lng": '-91.67684025459225',
        "img-path":"",
        "uses-pesticides":false,
        "pick-your-own":true,
        "is-limit":true,
        "description": 'I usually have plenty of potatoes included sweet potatoes.'
    },
    {
        "title": 'Sanjays Veggies',
        "lat": '44.04721529953577',
        "lng": '-91.64334841278864',
        "img-path":"",
        "uses-pesticides":false,
        "pick-your-own":true,
        "is-limit":true,
        "description": 'Come get it! Bock choy, radishes, napa cabbage and sweet peas'
    },
    {
        "title": 'Janes Fruits and More',
        "lat": '44.04855323590796',
        "lng": '-91.63001783336748',
        "img-path":"",
        "uses-pesticides":false,
        "pick-your-own":true,
        "is-limit":true,
        "description": 'I carry peaches, strawberries, plums and apricots'
    }
    ];

var contentString = '<div class="card">' +
'<img class="card-img-top" src="https://images.unsplash.com/photo-1594498653385-d5172c532c00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGdhcmRlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="Card image">' +
'<div class="card-body">'+
  '<h4 class="card-title">Card title</h4>'+
  '<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card content.</p>'+
  '<div>'+
  '<i class="fa-solid fa-xmark"></i> Pesticides'+
  '<i class="fa-solid fa-xmark"></i> Pick your own'+
  '<i class="fa-solid fa-check"></i> Limit per person'+
  '</div>'+
'<button type="button" class="btn btn-outline-secondary btn-block">Get Directions</button>'+
'</div>'+
'</div>'

//Google maps functions
function initMap() {
    // locate users coordinates to find on map
    if ("geolocation" in navigator) {
        console.log("geolocation exists for this browser")
        navigator.geolocation.getCurrentPosition(function (p) {
            addMarkers(p.coords.latitude, p.coords.longitude);
        }, function (e) {
            ipLookup();
        });
    } else
        ipLookup();


};

function addMarkers(lat, lng) {
    var mapOptions = {
        center: new google.maps.LatLng(lat,lng),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var infoWindow = new google.maps.InfoWindow();
    var latlngbounds = new google.maps.LatLngBounds();
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    for (var i = 0; i < locations.length; i++) {
        var data = locations[i]
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: data.title
        });
        (function (marker, data) {
            google.maps.event.addListener(marker, "mouseover", function (e) {
                infoWindow.setContent(contentString);
                infoWindow.open(map, marker);
            });
        })(marker, data);
        latlngbounds.extend(marker.position);
    }
    var bounds = new google.maps.LatLngBounds();
    // map.setCenter(latlngbounds.getCenter());
    map.fitBounds(latlngbounds);
}
