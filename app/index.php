<?php 
if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip'))
    ob_start("ob_gzhandler");
else
    ob_start();
?>
<!doctype html>
<!--  
/*
 * ----------------------------------------------------------------------------
 * "THE DRINKWARE LICENSE" (Revision 1):
 * <diego@schmaedech.com> wrote this file. You can do anything with this file.  
 * There are no licenses. But you can help me paying a coffee, a beer or my green server.
 * <a href="http://www.dreamhost.com/donate.cgi?id=17405">
 * <img border="0" alt="Donate towards my web hosting bill!" src="https://secure.newdream.net/donate4.gif" /> </a> 
 * or please! 
 * http://www.dreamhost.com/donate.cgi?id=17405 
 * ----------------------------------------------------------------------------
 */ 
-->

<html lang="en" ng-app="myApp" ng-controller="InitCtrl" >
    <head> 
        <title>Diego Schmædech</title>
        <meta http-equiv="content-type" content="text/html;charset=utf-8" />
        <meta name="description" content="Diego Schmaedech" />
        <meta name="keywords" content="diego schmaedech, portifolio, profile, life style, hacking, virtual world" />
        <meta name="author" content="Diego Schmaedech" /> 
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"> 
        <link rel="shortcut icon" href="images/favicon.ico"> 
        <link rel="stylesheet" type="text/css" href="css/modal.css" />
        <link rel="stylesheet" href="css/app.css"/>
        <link rel="stylesheet" href="css/bootstrap.css"/>
        <link rel="stylesheet" href="css/font-awesome.min.css"> 
        <link rel="stylesheet" type="text/css"  media="screen" href="css/style.php"> 
    </head>
    <body>
        <canvas id="hackmouse" width="0" height="0"></canvas> 
        <!-- .navbar -->
        <nav class="navbar navbar-default" role="navigation">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#"></a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul ng-controller="NavCtrl" class="nav navbar-nav">
                    <li><a href="#/view1" role="button">Persona</a> </li>
                    <li><a href="#/view2" role="button">Work</a></li>
                    <li><a href="#/view3" role="button">Playing</a>  </li>
                   
                </ul>
                 
            </div><!-- /.navbar-collapse -->
        </nav>
        <div class="container">
            <div ng-view>
            </div> 
        </div> 
        <div class="copyright">app v<span app-version></span>
            <div id="social-bar"> 
                <a href="https://google.com/+DiegoSchmaedech" target="_blank">
                    <i class="fa fa-google-plus"></i>
                    <span></span>
                </a>
                <a href="https://www.youtube.com/channel/UCxgxn5jdS_AGGGaTXUJujew" target="_blank">
                    <i class="fa fa-youtube"></i>
                    <span></span>
                </a>
                <a href="http://www.linkedin.com/pub/diego-schmaedech/9/a27/a78" target="_blank">
                    <i class="fa fa-linkedin"></i>
                    <span></span>
                </a>
                <a href="https://github.com/schmaedech" target="_blank">
                    <i class="fa fa-github"></i>
                    <span></span>
                </a>
                <a href="https://twitter.com/DiegoSchmaedech" target="_blank">
                    <i class="fa fa-twitter"></i>
                    <span></span>
                </a>
                <a href="https://www.facebook.com/schmaedech" target="_blank">
                    <i class="fa fa-facebook"></i>
                    <span></span>
                </a>
                <a href="http://www.dreamhost.com/green.cgi?schmaedech.com" target="_blank">
                    <i class="fa fa-globe"></i> 
                    <span></span>
                </a>
            </div>
        </div>  
        <footer>
            <p>{{ '&copy; Diego Schmædech 1982™' | interpolate }}</p>
        </footer>
        <!-- classie.js by @desandro: https://github.com/desandro/classie -->
        <script src="js/classie.js"></script>
       
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="lib/angular/angular.js"></script>
        <script src="lib/angular/angular-route.js"></script>
        <script src="js/app.js"></script>
        <script src="js/services.js"></script>
        <script src="js/controllers.js"></script>
        <script src="js/filters.js"></script>
        <script src="js/directives.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/modernizr.custom.js"></script> 
        <script src='js/jquery.placeholder.min.js'></script>
        <script src='js/heatmap.js'></script>
       
        <script>
                (function(i, s, o, g, r, a, m) {
                    i['GoogleAnalyticsObject'] = r;
                    i[r] = i[r] || function() {
                        (i[r].q = i[r].q || []).push(arguments)
                    }, i[r].l = 1 * new Date();
                    a = s.createElement(o),
                            m = s.getElementsByTagName(o)[0];
                    a.async = 1;
                    a.src = g;
                    m.parentNode.insertBefore(a, m)
                })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

                ga('create', 'UA-5156382-27', 'schmaedech.com');
                ga('send', 'pageview');

        </script>
        <!-- Google Tag Manager -->
        <noscript>
        <iframe src="//www.googletagmanager.com/ns.html?id=GTM-MGVQNF" height="0" width="0" style="display:none;visibility:hidden"></iframe>
        </noscript>
        <script>(function(w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({'gtm.start':
                            new Date().getTime(), event: 'gtm.js'});
                var f = d.getElementsByTagName(s)[0],
                        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src =
                        '//www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-MGVQNF');</script>
        <!-- End Google Tag Manager -->
    </body>
</html>
