angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.cameraTabDefaultPage', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/cameraTabDefaultPage.html',
        controller: 'cameraTabDefaultPageCtrl'
      }
    }
  })

  .state('tabsController.cartTabDefaultPage', {
    url: '/page6',
    views: {
      'tab2': {
        templateUrl: 'templates/sendTextMessagePage.html',
        controller: 'sendTextMessagePageCtrl'
      }
    }
  })

  .state('tabsController.cloudTabDefaultPage', {
    url: '/page5',
    views: {
      'tab3': {
        templateUrl: 'templates/sendRecordedMessagePage.html',
        controller: 'sendRecordedMessagePageCtrl'
      }
    }
  })

   .state('tabsController.uploadPhotoDefaultPage', {
    url: '/page7',
    views: {
      'tab4': {
        templateUrl: 'templates/uploadPhotoPage.html',
        controller: 'uploadPhotoPageCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.sendRecordedMessagePage', {
    url: '/page5',
    views: {
      'tab3': {
        templateUrl: 'templates/sendRecordedMessagePage.html',
        controller: 'sendRecordedMessagePageCtrl'
      }
    }
  })

  .state('tabsController.sendTextMessagePage', {
    url: '/page6',
    views: {
      'tab1': {
        templateUrl: 'templates/sendTextMessagePage.html',
        controller: 'sendTextMessagePageCtrl'
      }
    }
  })
  

$urlRouterProvider.otherwise('/page1/page2')

  

});