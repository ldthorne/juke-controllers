var app = angular.module("juke", []);

app.controller("MainController", function($scope) {
    $scope.title = "Hello!";

    var fakeAlbum = {
        name: 'Abbey Road',
        imageUrl: 'http://fillmurray.com/300/300',
        songs: [{
            name: 'Romeo & Juliette',
            artists: [{
                name: 'Bill'
            }],
            genres: ['Smooth', 'Funk'],
            audioUrl: 'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2013.mp3'
        }, {
            name: 'White Rabbit',
            artists: [{
                name: 'Bill'
            }, {
                name: 'Bob'
            }],
            genres: ['Fantasy', 'Sci-fi'],
            audioUrl: 'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2008.mp3'
        }, {
            name: 'Lucy in the Sky with Diamonds',
            artists: [{
                name: 'Bob'
            }],
            genres: ['Space'],
            audioUrl: 'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2001.mp3'
        }]
    };

    $scope.fakeAlbum = fakeAlbum;
    $scope.songs = fakeAlbum.songs;

});

app.controller('AlbumUrl', function($http, $scope) {
	$scope.activeClass = false;
    $scope.currentSong;

	$scope.toggle = function () {
		$scope.activeClass = !$scope.activeClass;
		console.log('got called');
	}

    $scope.playSong = function(song) {
        $scope.currentSong = song;
        var audio = document.createElement('audio');
        audio.src = '/api/songs/' + song._id + '.audio';
        audio.load();
        audio.play();
        // for now, reload the page if you want to stop the music
        $scope.toggle();
    }

    $http.get('/api/albums/565f2c87bc281ce022218e1d')
        .then(function(response) {

            $scope.songs = response.data.songs;
            $scope.albumInfo = response.data;
            $scope.imageUrl = response.config.url + ".image";

            // console.log($scope.imageUrl);
            console.log('the server responded with ', response);

        }).catch(console.error.bind(console));



});
