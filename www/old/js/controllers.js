'use strict';

var myApp = angular.module('myApp.controllers', []);
myApp.controller('InitCtrl', ['$scope', '$location', InitCtrl]);
myApp.controller('NavCtrl', ['$scope', '$location', NavCtrl]);
myApp.controller('MyCtrl1', [MyCtrl1]);
myApp.controller('MyCtrl2', [MyCtrl2]);
myApp.controller('MyCtrl3', [MyCtrl3]);

function InitCtrl($scope, $location) {
    init();
}
function NavCtrl($scope, $location) {
    $scope.navClass = function(page) {
        var currentRoute = $location.path().substring(1) || 'view1';
        return page === currentRoute ? 'active' : '';
    };
}

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
    
    setBackgroundClass("dlagoinha");
     

    initBirds();
    animateBirds();
    //$(".particles").fadeOut("slow");
}
function MyCtrl2() {
     
    document.getElementById('resume').src = "http://lattes.cnpq.br/6542682937656418";
    document.getElementById('cognisense').src = "http://www.cognisense.com.br";
    document.getElementById('neovu').src = "http://www.neovu.com.br/";
    setBackgroundClass("trabalho");
    if (container.hasChildNodes())
    {
        while (container.childNodes.length >= 1)
        {
            container.removeChild(container.firstChild);
        }
    }
    // $(".particles").fadeOut("slow");
}
function MyCtrl3() {
     
    setBackgroundClass("ester");
    var config = {
        element: document.getElementById("heatmapArea"),
        radius: 15,
        opacity: 50
    };
    initHeatMap(config);

    initWaves();
    animateWaves();
    // $(".particles").fadeIn(1500);
//  initParticleWaves();
//    animateParticleWaves();

}
function MyCtrl3HeatToggle($scope, $location) {

    $scope.clickToggle = function( ) {
        // $("#heatmapArea").slideToggle();
        // $(".particles").toggle("slow");

    };

}
function MyCtrlHeat($scope, $location) {

    $scope.clickSlideUp = function() {
        $("#heatmapArea").slideUp();
    };

} 

 