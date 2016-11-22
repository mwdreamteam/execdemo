angular.module('app.controllers', ['ngCordova.plugins.camera', 'utf8-base64'])

.controller('cameraTabDefaultPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('cartTabDefaultPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('cloudTabDefaultPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])


.controller('uploadPhotoPageCtrl', ['$scope', '$stateParams', '$http', '$cordovaCamera', 'base64',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $cordovaCamera, base64) {

	document.addEventListener("deviceready", function () {

		navigator.getUserMedia = navigator.getUserMedia ||
	  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

	function successCallback(stream)
	{
	  window.stream = stream; // make stream available to console
	  videoElement.src = window.URL.createObjectURL(stream);
	  videoElement.play();
	}

	function errorCallback(error) {
	  console.log('navigator.getUserMedia error: ', error);
	}

	function gotSources(sourceInfos) {
	  for (var i = 0; i !== sourceInfos.length; ++i) {
	    var sourceInfo = sourceInfos[i];
	    var option = document.createElement('option');
	    option.value = sourceInfo.id;
	    if (sourceInfo.kind === 'audio') {
	      option.text = sourceInfo.label || 'microphone ' ;//+ (audioSelect.length + 1);
	      //audioSelect.appendChild(option);
	    } else if (sourceInfo.kind === 'video')
			{
				if (sourceInfo.facing == "environment")
				{
					var sourceNumber = sourceInfo.id;
					var constraints =
					{
							video: {
								optional: [{
									sourceId: sourceNumber
								}]
							}
						};

					navigator.getUserMedia(constraints, successCallback, errorCallback);
				}

	    } else {
	      console.log('Some other kind of source: ', sourceInfo);
	    }
	  }
	}

	if (typeof MediaStreamTrack === 'undefined'){
	  alert('This browser does not support MediaStreamTrack.\n\nTry Chrome Canary.');
	} else {
	  MediaStreamTrack.getSources(gotSources);
	}


	function successCallback(stream) {
		var video = document.getElementById('video');
	  window.stream = stream; // make stream available to console
	  video.src = window.URL.createObjectURL(stream);
	  video.play();
	}

  }, false);

	$scope.$on("$ionicView.loaded", function() {

            var video = document.getElementById('video');
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
            $scope.photoDiv = true;

            var tracker = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);
           // var tracker = new tracking.ColorTracker();

            tracking.track('#video', tracker, { camera: true });

            tracker.on('track', function(event) {
              context.clearRect(0, 0, canvas.width, canvas.height);

              event.data.forEach(function(rect) {
                if (rect.color === 'custom') {
                  rect.color = tracker.customColor;
                }


                context.strokeStyle = rect.color;
                context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                context.font = '11px Helvetica';
                context.fillStyle = "#fff";
                //context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
                //context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

				context.fillText('color: ' + rect.color, rect.x + rect.width + 5, rect.y + 5);

                if (rect.color === 'magenta') {
		            context.fillText('Fix ', rect.x - 5, rect.y -5);
		            document.getElementById('action').value = "fix";

		          } else if (rect.color === 'cyan') {
		            context.fillText('Clean  ', rect.x -5, rect.y -5);
		            document.getElementById('action').value = "clean";

		          } else if (rect.color === 'yellow') {
		            context.fillText('Paint  ', rect.x -5, rect.y -5);
		        	document.getElementById('action').value = "paint";

		          }


              });
            });

        //   initGUIControllers(tracker);
      	   });



	$scope.takePhoto = function(){


      var video, $output;
      var scale = 0.25;
      video = $("#video").get(0);
      var canvas = document.createElement("canvas");
      canvas.width = video.videoWidth * scale;
      canvas.height = video.videoHeight * scale;
      canvas.getContext('2d')
      .drawImage(video, 0, 0, canvas.width, canvas.height);

      $scope.base64Photo = canvas.toDataURL();
      $scope.photoDiv = false;
	  $scope.canvasDiv = true;
	  $scope.showResponse = false;
	  $scope.data.instructions = "";
	  document.getElementById('instructions') = "";

  	}


	/*
	$scope.takePhoto = function() {


		$scope.photoDiv = false;
		$scope.canvasDiv = true;
		console.info('Getting camera');
		$cordovaCamera.getPicture({
			quality : 75,
			targetWidth : 320,
			targetHeight : 320,
			saveToPhotoAlbum : true,
			destinationType : 0,
			correctOrientation : true,
			// encode as image/png
			encodingType : 1,
			sourceType: 1
		}).then(function(dataURI) {
			console.log("photo: "
				+ dataURI);
			$scope.base64Photo = dataURI;
		}, function(err) {
			console.err(err);
		});

	}

	*/


		function convertDataURIToBinary(dataURI) {

		  var BASE64_MARKER = ';base64,';

		  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
		  var base64 = dataURI.substring(base64Index);
		  var raw = window.atob(base64);
		  var rawLength = raw.length;
		  var array = new Uint8Array(new ArrayBuffer(rawLength));

		  for(i = 0; i < rawLength; i++) {
		    array[i] = raw.charCodeAt(i);
		  }
		  return array;
		}

    function convertDataURIToBinaryV2(dataURI) {
      var base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
      var base64 = dataURI.substring(base64Index);
      var raw = window.atob(base64);
      var rawLength = raw.length;
      var array = new Uint8Array(new ArrayBuffer(rawLength));

      for(i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }
      return array;
    }




	$scope.submitOrder = function(data) {

		var photoUploaded = true;
		var fileId = "";

		var instructions = data.instructions;
		var action = document.getElementById('action').value;

		// converts base64photo into binary before uploading to docs
		var filename = "workOrder_" + Math.random() + ".png";
		console.log(filename);
		var image = convertDataURIToBinaryV2($scope.base64Photo);
	    var fileContent = new Blob([image], { type: 'image/png'});;
	    var filePackage = new FormData()
	    filePackage.append('jsonInputParameters','{"parentID": "FE6F5FCCF036204EA0C0D44D7C38EE2EF7C48A5EA828"}');
	    filePackage.append('primaryFile',fileContent, filename);


	    $.ajax ( {
	                       type: 'POST',
	                        url: 'https://documents-bharatmarwaha.documents.us2.oraclecloud.com/documents/api/1.1' + '/files' +  '/data',
	                        enctype: 'multipart/form-data',
	                        data: filePackage,
	                        cache: false,
	                        processData: false,
	                        contentType: false,
	                        crossDomain: true,
	                        xhrFields: { withCredentials: true },
	                        beforeSend: function (xhr) {
	                            xhr.setRequestHeader ('Authorization',
	                                                  'Basic IHZpamF5a3VtYXIueWVubmVAb3JhY2xlLmNvbTpXZWJDZW50ZXIwMSM=');
	                            xhr.setRequestHeader ('linkID',
	                                                  'LFD48A8134FDF11DDEE725E97C38EE2EF7C48A5EA828');
	                        },
	                        success: function(data) {
	                        	$scope.showResponse = true;
	                            console.log('document successfully uploaded. docId is:' + data.id);
								fileId = "https://documents-bharatmarwaha.documents.us2.oraclecloud.com/documents/link/LFD48A8134FDF11DDEE725E97C38EE2EF7C48A5EA828/file/" + data.id;
								console.log(fileId);

								var processMessagePayload = {
								    "processDefId":"default~ColourWorkOrdersApp!1.1~ProcessOrder",
								    "serviceName":"ProcessOrder.service",
								    "operation":"start",
								    "payload":"<OrderBO xmlns='http://xmlns.oracle.com/bpm/bpmobject/BusinessData/OrderBO'><action>"+action+"</action><instructions>"+instructions+"</instructions><fileId>"+fileId+"</fileId></OrderBO>",
								    "action":"Submit"
								};

								console.info("Process Creation with message: ");
								console.info(JSON.stringify(processMessagePayload));

								// instantiates process
								var options = {
									method: 'POST',
							  		url: 'https://oracleprocessc-bharatmarwaha.process.us2.oraclecloud.com/bpm/api/3.0/processes',
									headers: {
										 'Content-Type' : 'application/json',
									     'Accept': 'application/json',
									     'Authorization': 'Basic dmlqYXlrdW1hci55ZW5uZUBvcmFjbGUuY29tOldlYkNlbnRlcjAxIw=='
									},
									data: processMessagePayload
								}

							  	$http(options).then(function(res) {

										$scope.response = "Order submitted successfully";
										$scope.showResponse = true;
										console.log("Process triggered successfully");
									}, function(res) {
										$scope.showResponse = true;
										console.error("Error creating process:" + JSON.stringify(res))
										$scope.response = "Error:" + JSON.stringify(res);
								});


	                        },
	                        error: function(jqXHR, textStatus, errorThrown) {
	                        	$scope.showResponse = true;
								console.error("Error uploading document:" + jqXHR.responseText)
								$scope.response = "Error uploading photo:" + errorThrown;
								photoUploaded = false;

	                        }
	                    } );



	}

	$scope.clearView = function() {
		$scope.photoDiv = true;
		$scope.canvasDiv = false;
		$scope.showResponse = false;
		$scope.response = "";

	}


}])

.controller('sendTextMessagePageCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {


  // Called when the form is submitted
  $scope.sendTextVoiceMessage = function(message) {

    var to = message.to;
    var content = message.content;
    var jsonMessage = {
		  "to": to,
		  "msg": content
	};


	console.log("JSON Message: " + JSON.stringify(jsonMessage));


	// declare the connection details
	//var mcsendpoint = 'https://apacdemo2-apacdemo2.mobileenv.us2.oraclecloud.com:443/mobile/custom/TwilioWrapperAPIs/message';
	var nodeendpoint = 'http://oraclecloudau.myoracledemos.com:3005/sms';

	// make $http request
	/*
	var req = {
		async: true,
        crossDomain: true,
		method : 'POST',
		url : mcsendpoint,
		headers : {
			'oracle-mobile-backend-id' : 'eff9b1f3-6d5a-48e9-86a1-aaa59906ec0d',
			'Authorization' : 'Basic QVBBQ0RFTU8yX0FQQUNERU1PMl9NT0JJTEVfQU5PTllNT1VTX0FQUElEOnZva3AzaWJhamdNMC5l',
			'Content-Type' : 'application/json'
		},
		processData: false,
		data: JSON.stringify(jsonMessage)
	};
	*/
	var req = {
		async: true,
        crossDomain: true,
		method : 'POST',
		url : nodeendpoint,
		headers : {
			'Content-Type' : 'application/json'
		},
		processData: false,
		data: JSON.stringify(jsonMessage)
	};


	$http(req).then
		(function(res) {
			$scope.showResponse = true;
			if(res.status == 200 || res.status == 202) {
				$scope.response = "Cool bananas! We've sent out your text message!";
				console.log("Request sent successfully to Twilio");
			} else {
				$scope.response = "Ups! Something went wrong, try again soon";
				console.error(JSON.stringify(res));
			}

		});


  };


}])

.controller('sendRecordedMessagePageCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {


  // Called when the form is submitted
  $scope.sendRecordedVoiceMessage = function(message) {

    var to = message.to;
    var content = message.content;
    var jsonMessage = {
		  "to": to,
		  "msg": content
	};


	console.log("JSON Message: " + JSON.stringify(jsonMessage));


	// declare the connection details
	//var mcsendpoint = 'https://apacdemo2-apacdemo2.mobileenv.us2.oraclecloud.com:443/mobile/custom/TwilioWrapperAPIs/message';
	var nodeendpoint = 'http://oraclecloudau.myoracledemos.com:3005/voicecall';

	// make $http request
	/*
	var req = {
		async: true,
        crossDomain: true,
		method : 'POST',
		url : mcsendpoint,
		headers : {
			'oracle-mobile-backend-id' : 'eff9b1f3-6d5a-48e9-86a1-aaa59906ec0d',
			'Authorization' : 'Basic QVBBQ0RFTU8yX0FQQUNERU1PMl9NT0JJTEVfQU5PTllNT1VTX0FQUElEOnZva3AzaWJhamdNMC5l',
			'Content-Type' : 'application/json'
		},
		processData: false,
		data: JSON.stringify(jsonMessage)
	};
	*/
	var req = {
		async: true,
        crossDomain: true,
		method : 'POST',
		url : nodeendpoint,
		headers : {
			'Content-Type' : 'application/json'
		},
		processData: false,
		data: JSON.stringify(jsonMessage)
	};


	$http(req).then
		(function(res) {
			$scope.showResponse = true;
			if(res.status == 200 || res.status == 202) {
				$scope.response = "Cool bananas! We've recorded and sent your voice message!";
				console.log("Voice Call Request sent successfully to Twilio");
			} else {
				$scope.response = "Ups! Something went wrong, try again soon";
				console.error(JSON.stringify(res));
			}

		});


  };


}])
