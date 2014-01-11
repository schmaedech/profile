'use strict';

var movementStrength = 15;

var height = movementStrength / $(window).height();
var width = movementStrength / $(window).width();
var logX = new Array();
var logY = new Array();

$("html").mousemove(function(e) {
    var x = e.pageX;
    var y = e.pageY;
    $(this).css('background-position', +parseInt(-x / 10) + 'px ' + parseInt(-y / 10) + 'px');
    $(".jumbotron").css('margin', parseInt(-x / 100) + parseInt(-y / 100) + 'px');
//    var offset = $(this).offset();
//    x = e.pageX - offset.left;
//    y = e.pageY - offset.top;
    logX.push(x);
    logY.push(y);
});

$("html").mouseup(function(e) { 
    var canvas = document.getElementById("hackmouse"), ctx = canvas.getContext("2d"); 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
    ctx.fillStyle = "rgba(255,0,10, .1)";
    for (var i = 0; i < logX.length; i++) {
        ctx.fillRect(logX[i], logY[i], Math.random() * 10, Math.random() * 10);
    }
});
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
        url: '/send_mail.php',
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


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
]).
        config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
                $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
                $routeProvider.when('/view3', {templateUrl: 'partials/partial3.html', controller: 'MyCtrl3'});
                $routeProvider.otherwise({redirectTo: '/view1'});
            }]);
