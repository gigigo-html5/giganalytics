(function() {
    'use strict';


    angular.module('gig-analytics', [])
        .provider('AnalyticsService', ['$log', '$window', function($log, $window) {

            var accountId;

            // config methods
            this.setAccount = function (id) {
                accountId = id;
                return true;
            };

            this._createScript = function() {
                // inject the google analytics tag
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
                })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

                $window._gaq = [];
                $window._gaq.push(['_setAccount', accountId]);
            };

            this.trackPage = function(section) {
                $log.debug('Track Page: '+section);
                $window.ga('send','pageview', section);
            };

            this.trackEvent = function(section, code, category) {
                $log.debug('Track Event: '+section, code, category);
                $window.ga('send', 'event', section, code, category);
            };

            this._createScript();



        }]);



})();