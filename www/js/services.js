angular.module('app.services', [])

/*
.factory('Camera', ['$q', function($q) {

  var ideaPhoto = {};

  return {
    setIdeaPhoto: function(ideaPhotoObject) {
        ideaPhoto = ideaPhotoObject;
    },
    getIdeaPhoto: function () {
        return ideaPhoto;
    },
    getPicture: function(options) {
      var q = $q.defer();

      getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])

*/

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);