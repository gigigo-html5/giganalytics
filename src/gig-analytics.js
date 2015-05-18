(function() {
    'use strict';

    function AnalyticsService() {

        var accountId,
            trackRoutes = true;

        this.setAccount = function (id) {
            accountId = id;
            return true;
        };

        this.trackPages = function (doTrack) {
            trackRoutes = doTrack;
            return true;
        };

        this.$get = ['$log', '$window', '$rootScope', '$stateParams', function($log, $window, $rootScope, $stateParams) {
            var me = this;

            this._createScript = function() {
                // inject the google analytics tag
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
                })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

                $window._gaq = [];

                $window._gaq.push(['_setAccount', accountId]);
            };

            this._trackPage = function (section) {
                $log.debug('Track Page: ' + section);
                $window.ga('send', 'pageview', section);
            };

            this._trackEvent = function (section, code, category) {
                $log.debug('Track Event: ' + section, code, category);
                $window.ga('send', 'event', section, code, category);
            };


            this._createScript();

            return {
                trackPage: function (section) {
                    me._trackPage(section);
                },
                trackEvent: function (section, code, category) {
                    me._trackEvent(section, code, category);
                }
            }
        }];
    }

    angular.module('gig-analytics', [])
        .provider('GigAnalytics', AnalyticsService);



})();