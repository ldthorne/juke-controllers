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

app.controller('AlbumUrl', function($http, $scope, $rootScope) {
    // $scope.activeClass = false;
    $scope.currentSong;


    $scope.toggle = function() {
        $scope.activeClass = !$scope.activeClass;
    }

    var audio = document.createElement('audio');
    $scope.playSong = function(song) {
        if(song == $scope.currentSong){
            $scope.currentSong = null;
            audio.pause();
        }else{
            console.log("else")
            audio.src = '/api/songs/' + song._id + '.audio';
            audio.load();
            audio.play();
            $scope.currentSong = song;
        }
        $scope.toggle();
        $rootScope.$broadcast('started_playing',{});
    }


    $http.get('/api/albums/565f7818ece67f361474e7de')
        .then(function(response) {

            $scope.songs = response.data.songs;
            $scope.albumInfo = response.data;
            $scope.imageUrl = "/api/albums/" + response.data._id + ".image";

        }).catch(console.error.bind(console));
});

app.controller("FooterController", function($scope, $rootScope){
    $scope.activeClass = false;
    $rootScope.$on("started_playing", function(){
        $scope.activeClass = true;
    });
})
