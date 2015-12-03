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
var songs;
var songsPlayed = [];
var audio = document.createElement('audio');
app.controller('AlbumUrl', function($http, $scope, $rootScope) {
    // $scope.activeClass = false;
    $rootScope.currentSong;


    $scope.toggle = function() {
        $scope.activeClass = !$scope.activeClass;
    }

    $rootScope.playSong = function(song) {

        if (song == $rootScope.currentSong && !audio.paused) {
            $rootScope.currentSong = null;
            audio.pause();
        } else {
            audio.src = '/api/songs/' + song._id + '.audio';
            audio.load();
            audio.play();
            $rootScope.currentSong = song;
        }
        $scope.toggle();
        $rootScope.$broadcast('started_playing', {});
    }




    $http.get('/api/albums/565f7818ece67f361474e7de')
        .then(function(response) {

            $rootScope.songs = response.data.songs;
            $scope.albumInfo = response.data;
            $scope.imageUrl = "/api/albums/" + response.data._id + ".image";
            for (var i = 0; i < $scope.songs.length; i++) {
                $rootScope.songs[i].trackNum = i;
            }
        }).catch(console.error.bind(console));
});

app.controller("FooterController", function($scope, $rootScope) {
    audio.addEventListener('timeupdate', function () {
        $rootScope.progress = 100 * audio.currentTime / audio.duration;
        $rootScope.$digest();
    });

    $scope.activeClass = false;

    $rootScope.$on("started_playing", function() {
        $scope.activeClass = true;
    });

    // var currentTrack=$scope.c
    $scope.previousTrack = function() {
        if($rootScope.currentSong.trackNum===0){
        }else{
            $rootScope.currentSong = $rootScope.songs[$rootScope.currentSong.trackNum - 1];
        }
        audio.src = '/api/songs/' + $rootScope.currentSong._id + '.audio';
        $rootScope.playSong($rootScope.currentSong);
    };

    $scope.nextTrack = function() {
        if($rootScope.currentSong.trackNum===$rootScope.songs.length-1){
        }else{
            $rootScope.currentSong = $rootScope.songs[$rootScope.currentSong.trackNum + 1];
        }        
        audio.src = '/api/songs/' + $rootScope.currentSong._id + '.audio';

        $rootScope.playSong($rootScope.currentSong);
    };

    $scope.shuffle = function() {
        var currentTrackNum = $rootScope.currentSong.trackNum;
        var shuffledNum = Math.floor((Math.random()*$rootScope.songs.length));
        console.log(shuffledNum)
        if(songsPlayed.length === $rootScope.songs.length){
            songsPlayed = [];
            return $scope.shuffle();
        }
        if(songsPlayed.indexOf(shuffledNum) >= 0 || shuffledNum === currentTrackNum){
            return $scope.shuffle();
        }
        $rootScope.currentSong = $rootScope.songs[shuffledNum]
        audio.src = '/api/songs/' + $rootScope.currentSong._id + '.audio';
        $rootScope.playSong($rootScope.currentSong);
        songsPlayed.push(shuffledNum)
        console.log(songsPlayed)
    };
})
