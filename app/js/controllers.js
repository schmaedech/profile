'use strict';

var myApp = angular.module('myApp.controllers', []);
myApp.controller('InitCtrl', ['$scope', '$location', InitCtrl]);
myApp.controller('NavCtrl', ['$scope', '$location', NavCtrl]);
myApp.controller('MyCtrl1', [MyCtrl1]);
myApp.controller('MyCtrl2', [MyCtrl2]);
myApp.controller('MyCtrl3', [MyCtrl3]);

var heatmap = null;
function InitCtrl($scope, $location) {

}
function NavCtrl($scope, $location) {
    $scope.navClass = function(page) {
        var currentRoute = $location.path().substring(1) || 'view1';
        return page === currentRoute ? 'active' : '';
    };
}

var heatmap = null;
function setBackgroundClass(b) {
    $("html").removeClass("dlagoinha");
       $("html").removeClass("ester"); 
          $("html").removeClass("trabalho"); 
    $("html").addClass(b);

}
function MyCtrl1() {
    /* Contact us process */
    $('#contact-form').submit(function() {
        var submitData = $(this).serialize();
        var $name = $(this).find('input[name="name"]');
        var $email = $(this).find('input[name="email"]');
        var $subject = $(this).find('textarea[name="subject"]');
        var $message = $(this).find('textarea[name="message"]');
        var $submit = $(this).find('input[name="submit"]');
        var $dataStatus = $(this).find('.data-status');

        $name.attr('disabled', 'disabled');
        $email.attr('disabled', 'disabled');
        $subject.attr('disabled', 'disabled');
        $message.attr('disabled', 'disabled');
        $submit.attr('disabled', 'disabled');

        $dataStatus.show().html('<div class="alert alert-info"><strong>Loading...</strong></div>');

        $.ajax({// Send an offer process with AJAX
            type: 'POST',
            url: 'lib/php/send_mail.php',
            data: submitData + '&action=add',
            dataType: 'text',
            success: function(msg) {
                if (parseInt(msg, 0) !== 0) {
                    var msg_split = msg.split('|');
                    if (msg_split[0] === 'success') {
                        $name.val('').removeAttr('disabled');
                        $email.val('').removeAttr('disabled');
                        $subject.val('').removeAttr('disabled');
                        $message.val('').removeAttr('disabled');
                        $submit.removeAttr('disabled');
                        $dataStatus.html(msg_split[1]).fadeIn();
                    } else {
                        $name.removeAttr('disabled');
                        $email.removeAttr('disabled');
                        $subject.removeAttr('disabled');
                        $message.removeAttr('disabled');
                        $submit.removeAttr('disabled');
                        $dataStatus.html(msg_split[1]).fadeIn();
                    }
                }
            }
        });
        return false;
    });
    /* End contact us process */
    initModal();
    setBackgroundClass("dlagoinha");
}
function MyCtrl2() {
    initModal();
    document.getElementById('resume').src = "http://lattes.cnpq.br/6542682937656418";
    document.getElementById('cognisense').src = "http://www.cognisense.com.br";
    document.getElementById('neovu').src = "http://www.neovu.com.br/";
    setBackgroundClass("trabalho");

}
function MyCtrl3() {
    initModal();
    setBackgroundClass("ester");
    var config = {
        element: document.getElementById("heatmapArea"),
        radius: 15,
        opacity: 50
    };

    heatmap = h337.create(config);

    (function() {
        var active = false,
                lastCoords = [],
                mouseMove = false,
                mouseOver = false,
                activate = function() {
                    active = true;
                },
                $ = function(id) {
                    return document.getElementById(id);
                },
                timer = null,
                simulateEv = function() {
                    heatmap.store.addDataPoint(lastCoords[0], lastCoords[1]);
                },
                antiIdle = function() {
                    if (mouseOver && !mouseMove && lastCoords && !timer) {
                        timer = setInterval(simulateEv, 1000);
                    }
                };


        (function(fn) {
            setInterval(fn, 1000);
        }(antiIdle));
        var tmp = $("heatmapArea");

        tmp.onmouseout = function() {
            mouseOver = false;
            if (timer) {
                clearInterval(timer)
                timer = null;
            }
        };

        tmp.onmousemove = tmp.onclick = function(ev) {
            mouseMove = true;
            mouseOver = true;
            if (active) {
                if (timer) {
                    clearInterval(timer);
                    timer = null;
                }

                var pos = h337.util.mousePosition(ev);

                heatmap.store.addDataPoint(pos[0], pos[1]);
                lastCoords = [pos[0], pos[1]];

                active = false;
            }
            mouseMove = false;
        };
        tmp["ontouchmove"] = function(ev) {
            var touch = ev.touches[0],
                    // simulating a mousemove event           
                    simulatedEvent = document.createEvent("MouseEvent");
            simulatedEvent.initMouseEvent("mousemove", true, true, window, 1,
                    touch.screenX, touch.screenY,
                    touch.clientX, touch.clientY, false,
                    false, false, false, 0, null);
            // dispatching the simulated event              
            touch.target.dispatchEvent(simulatedEvent);
            // we don't want to have the default iphone scrolling behaviour ontouchmove  
            ev.preventDefault();
        };

        (function(fn) {
            setInterval(fn, 50);
        }(activate));
    })();

//    $("#heatmapArea").click(function() {
//        $(this).slideUp();
//    });
    // $("#heatmapArea").slideToggle();
}
function MyCtrl3HeatToggle($scope, $location) {

    $scope.clickToggle = function( ) {
        $("#heatmapArea").slideToggle();
    };

}
function MyCtrlHeat($scope, $location) {

    $scope.clickSlideUp = function() {
        $("#heatmapArea").slideUp();
    };

}
function initModal() {

    var overlay = document.querySelector('.md-overlay');

    [].slice.call(document.querySelectorAll('.md-trigger')).forEach(function(el, i) {

        var modal = document.querySelector('#' + el.getAttribute('data-modal')),
                close = modal.querySelector('.md-close');

        function removeModal(hasPerspective) {
            classie.remove(modal, 'md-show');

            if (hasPerspective) {
                classie.remove(document.documentElement, 'md-perspective');
            }
        }

        function removeModalHandler() {
            removeModal(classie.has(el, 'md-setperspective'));
        }

        el.addEventListener('click', function(ev) {
            classie.add(modal, 'md-show');
            overlay.removeEventListener('click', removeModalHandler);
            overlay.addEventListener('click', removeModalHandler);

            if (classie.has(el, 'md-setperspective')) {
                setTimeout(function() {
                    classie.add(document.documentElement, 'md-perspective');
                }, 25);
            }
        });

        close.addEventListener('click', function(ev) {
            ev.stopPropagation();
            removeModalHandler();
        });

    });


}

 