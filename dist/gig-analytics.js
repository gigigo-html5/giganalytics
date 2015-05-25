/**
 * Angular Google Analytics - Angular Module for Google Analytics
 * @version v0.0.3 - 2015-05-25
 * @link https://github.com/gigigo-html5/giganalytics
 * @author Pedro José Peña Jerez <pedro.jose@gigigo.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
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

        this.$get = ['$log', '$window', '$rootScope', '$stateParams', '$document', function($log, $window, $rootScope, $stateParams, $document) {
            var me = this;

            this._createScript = function() {
                // inject the google analytics tag
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
                })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

                $window._gaq = [];

                $window._gaq.push(['_setAccount', accountId]);

                $window.ga('create', accountId);
                var gaSrc;

                gaSrc = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';

                (function () {
                  var document = $document[0];
                  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                  ga.src = gaSrc;
                  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
                })(gaSrc);
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
