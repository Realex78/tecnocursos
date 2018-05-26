"use strict";

function _classCallCheck(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

function writeMessage(e) {
    document.getElementById("message").innerHTML = e;
}

$.fn.formObject = function() {
    var e = {};
    return $.each($(this).serializeArray(), function(r, n) {
        e[n.name] = n.value || "";
    }), e;
}, navigator.serviceWorker && navigator.serviceWorker.register("sw.js"), function() {
    function n() {
        var n = i();
        n && !c && (c = !0, o()), !n && c && (c = !1, t());
    }
    function e() {
        $("#responsive-nav ul").toggleClass("active"), $("#nav-control").toggleClass("glyphicon-menu-hamburger");
    }
    function o() {
        $("#description").addClass("fixed").removeClass("absolute"), $("#navigation").slideUp("slow"), 
        $("#sticky-navigation").slideDown("slow");
    }
    function t() {
        $("#description").removeClass("fixed").addClass("absolute"), $("#navigation").slideDown("slow"), 
        $("#sticky-navigation").slideUp("slow");
    }
    function i() {
        var n = $("#description").height();
        return $(window).scrollTop() > $(window).height() - 2 * n;
    }
    function a() {
        var n = $(s);
        $.ajax({
            url: "https://formspree.io/rentopa78@infinitummail.com",
            method: "POST",
            data: n.formObject(),
            dataType: "json",
            success: function() {
                Push.create("Has creado tu cuenta!", {
                    body: "Tu cuenta en Tecnocursos.com ha sido creada correctamente.",
                    icon: "/imgs/ok.png",
                    timeout: 6e3
                });
            }
        });
    }
    var s = "new-account", c = !1, r = 0, l = parseInt($("[data-name='image-counter']").attr("content"));
    $("#new-account").on("submit", function(n) {
        return n.preventDefault(), a($(this)), !1;
    }), $("#sticky-navigation").removeClass("hidden"), $("#sticky-navigation").slideUp(0), 
    $("#nav-control").on("click", e), $(".nav-link").on("click", e), setInterval(function() {
        r < l ? r++ : r = 0, $("#gallery .inner").css({
            left: "-" + 100 * r + "%"
        });
    }, 4750), $(window).scroll(n);
}();

var _createClass = function() {
    function e(e, n) {
        for (var a = 0; a < n.length; a++) {
            var t = n[a];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(n, a, t) {
        return a && e(n.prototype, a), t && e(n, t), n;
    };
}(), directionsService = new google.maps.DirectionsService(), map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: {
        lat: 19.439331,
        lng: -99.20226000000002
    },
    scrollwheel: !1
}), directionsDisplay = new google.maps.DirectionsRenderer({
    map: map
}), my_place = {
    lat: 19.439331,
    lng: -99.20226000000002
}, UserLocation = function() {
    function e() {
        _classCallCheck(this, e);
    }
    return _createClass(e, null, [ {
        key: "get",
        value: function(e) {
            navigator.geolocation ? navigator.geolocation.getCurrentPosition(function(n) {
                e({
                    lat: n.coords.latitude,
                    lng: n.coords.longitude
                });
            }) : Push.create("Error en localización", {
                body: "Al parecer yu navegador no soporta la localización. Haz clic aquí para actualizarlo.",
                icon: "/imgs/error.png",
                timeout: 1e4,
                link: "https://browsehappy.com"
            });
        }
    } ]), e;
}();

UserLocation.get(function(e) {
    var n = new google.maps.LatLng(e.lat, e.lng);
    new google.maps.DistanceMatrixService(), directionsService.route({
        origin: n,
        destination: my_place,
        travelMode: google.maps.TravelMode.DRIVING
    }, function(e, n) {
        if (n === google.maps.DirectionsStatus.OK) {
            var a = 0;
            e.routes[0].legs.forEach(function(e) {
                a += e.duration.value;
            }), directionsDisplay.setDirections(e), Math.round(a / 60) < 2 && (document.getElementById("message").innerHTML = "Estás a " + Math.round(a / 60) + " minuto de nuestra sede."), 
            Math.round(a / 60) < 60 && Math.round(a / 60) >= 2 ? document.getElementById("message").innerHTML = "Estás a " + Math.round(a / 60) + " minutos de nuestra sede." : (1 == Math.round(a / 60 / 60) && (document.getElementById("message").innerHTML = "Estás a " + Math.round(a / 60 / 60) + " hora de nuestra sede."), 
            Math.round(a / 60 / 60) < 24 && a / 60 / 60 > 1 && (document.getElementById("message").innerHTML = "Estás a " + Math.round(a / 60 / 60) + " horas de nuestra sede."), 
            1 == Math.round(a / 60 / 60 / 24) && (document.getElementById("message").innerHTML = "Estás a " + Math.round(a / 60 / 60 / 24) + " dia de nuestra sede."), 
            a / 60 / 60 / 24 > 1 && (document.getElementById("message").innerHTML = "Estás a " + Math.round(a / 60 / 60 / 24) + " dias de nuestra sede."));
        } else Push.create("Error en localización", {
            body: "Hubo un error al obtenrer las direcciones. " + n,
            icon: "/imgs/error.png",
            timeout: 6e3
        }), new google.maps.Marker({
            map: map,
            position: my_place,
            title: "Learning Center by Tecnocursos.com",
            visible: !0
        }), writeMessage("Ubícanos en Antara Fashion Hall en la CDMX.");
    });
}), function() {
    function t() {
        e() ? send_form : (n($(i).find(".input:invalid").first().parent()), $(".path-step:nth-child(1)").addClass("red"));
    }
    function e() {
        return document.querySelector(i).checkValidity();
    }
    function n(t) {
        $(".step.active").removeClass("active"), t.addClass("active"), t.find(".input").focus();
        var e = t.index(".step") + 1;
        a($(".path-step:nth-child(" + e + ")"));
    }
    function a(t) {
        $(".path-step.active").removeClass("active"), t.addClass("active");
    }
    var i = "new-account";
    $(".path-step").on("click", function(t) {
        var e = $(t.target);
        a(e);
        var i = e.index(".path-step") + 1;
        n($(".step:nth-child(" + i + ")"));
    }), $(i).find(".input").on("change", function(a) {
        var i = $(a.target).parent().next(".step");
        !e() && i.length > 0 ? n(i) : t();
    });
}();