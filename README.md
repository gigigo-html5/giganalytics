# giganalytics
Angular Module for Analytics


## install

`bower install giganalytics --save`

## example

```js

var app = angular.module('app', ['gig-analytics'])

.config(function(GigAnalyticsProvider) {
      // initial configuration
      GigAnalyticsProvider.setAccount('UA-XXXXX-xx');
        
})

.run(function($rootScope, GigAnalytics, $stateParams) {

    $rootScope.$on('$stateChangeSuccess', function(state, current){
        GigAnalytics.trackPage(current.url, current.name);
    });
    
});
