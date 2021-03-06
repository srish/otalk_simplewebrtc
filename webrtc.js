var webrtc = new SimpleWebRTC({
	    // the id/ element dom element that will hold our video
	    localVideoEl: 'localVideo',
	    // the id/ element dom element that will hold remote videos

	    // the documentation says that in order to wrap the video element 
	    // in a container we need to supress adding them to the remote video 
	    // container and instead pass an empty string 

	    remoteVideosEl: '', //empty string 
	    // immediately ask for camera access
	    autoRequestMedia: true
	});

	// when a peer video has been added 

	webrtc.on('videoAdded', function(video, peer) {
		console.log('video added', peer);

		var remotes = document.getElementById('remoteVideo');

		if(remotes) {
			var container = document.createElement('div');

			container.className = 'videoContainer';

			container.id = 'container_' + webrtc.getDomId(peer);

			container.appendChild(video);

			// suppress contextmenu

			video.oncontextmenu = function() {
				return false;
			};

			remotes.appendChild(container);
		}
	});

	// a peer video was removed
	webrtc.on('videoRemoved', function (video, peer) {
	    console.log('video removed ', peer);
	    var remotes = document.getElementById('remoteVideo');
	    var el = document.getElementById(peer ? 'container_' + webrtc.getDomId(peer) : 'localScreenContainer');
	    if (remotes && el) {
	        remotes.removeChild(el);
	    }
	});

	//we have to wait until it's ready
	webrtc.on('readyToCall', function() {
		// you can name it anything
		webrtc.joinRoom('your awesome room name');
	});


$(".btn-volume-down").click(function() {
	webrtc.mute();
	$("#glyph-volume").addClass("glyphicon-volume-off");
	$("#glyph-volume").removeClass("glyphicon-volume-down");
});

