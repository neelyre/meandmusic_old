const app = angular.module('soundtrack', []);

app.controller('MainController', ['$http', function($http){
  console.log('this is happening');
  const controller = this;

  this.login = function(userPass) {
  console.log(userPass);
}


  this.test = "hi"
  this.displayLogin = true;
  this.displayRegistration = false;

  this.instrumentInclude = function(){
		this.includePath = 'partials/partial1.html';
  }
  this.genreInclude = function(){
    this.includePath = 'partials/partial2.html';
  }
  this.listWoodwinds = function(){
    this.includePath = 'partials/woodwinds.html';
  }
  this.listStrings = function(){
    this.includePath = 'partials/strings.html';
  }
  this.listBrass = function(){
    this.includePath = 'partials/brass.html';
  }
  this.listPercussion = function(){
    this.includePath = 'partials/percussion.html';
  }
  this.listOther = function(){
    this.includePath = 'partials/other.html';
  }
  this.listJazz = function(){
    this.includePath = 'partials/jazz.html';
  }
  this.piano = function(){
    this.includePath = 'partials/single_instruments/piano.html';
  }
  this.double_bass = function(){
    this.includePath = 'partials/single_instruments/double_bass.html';
  }
  this.drums = function(){
    this.includePath = 'partials/single_instruments/drums.html';
  }
  this.guitar = function(){
    this.includePath = 'partials/single_instruments/guitar.html';
  }
  this.saxophonse = function(){
    this.includePath = 'partials/single_instruments/saxophone.html';
  }

  this.displayRegistrationDiv = function(){
  this.displayRegistration = true;
  this.displayLogin = false;
};

  this.hideAllLogin = function(){
    this.displayLogin = false;
    this.displayRegistration = false;
    this.displayLogOut = false;
  };

this.testdisplay = true;
this.hideText = function(){
  this.testdisplay = false;
};
this.showText = function(){
  this.testdisplay = true;
};



//discogs callback//



  // this.includePath = 'partials/partial1.html';


  this.user = {};
  this.users = [];
  this.userPass = {};

  this.url = 'http://localhost:3000';

  console.log('hi');


this.addReview = function(){
  $http({
            method: 'post',
            url: this.url + '/reviews/',
            data: {
              user_id: controller.user.id,
              comment_text: controller.newText
            }
          }).then(function(response){
            console.log(response);
        }, function(){
            console.log('error');
        });
    }

    this.editReview = function(id){
      $http({
        method: 'get',
        url: this.url + '/reviews/' + id
      }).then(function(response){
        console.log(controller.currentReview);
      }, function(error){
        console.log(error,'review error')
      })
    };

    this.publishReviewEdit = function(){
    $http({
      method: 'put',
      url: this.url + '/reviews/' + this.currentReview.id,
      data: this.currentReview
    }).then(function(response){
      controller.hideAllCenterDivs();
      controller.displaySearchForm = true;
    }, function(error){
      console.log(error, 'error from review edit');
    })
  };

    this.deleteReview = function(id){
  $http({
    method: 'delete',
    url: this.url + '/reviews/' + id
  }).then(function(response){
    console.log(response);
  }, function(error){
    console.log(error, 'error from delete route');
  })
};




  // ============LOGIN METHODS BELOW=========

//user account create///
   this.createUser = function(userPass) {
    //  this.displayLogout = true;
     console.log('creating user');
     $http({
       method: 'POST',
       url: this.url + '/users',
       data: { user: { username: userPass.username, password: userPass.password, first_name: userPass.first_name, last_name: userPass.last_name, instruments: userPass.instruments, genre: userPass.genre }},
     }).then(function(response) {
       controller.user = response.data;
       console.log(controller.user,'logged user');
       controller.hideAllLogin();
       controller.displayLogOut = true;

     })
   };

// /user login///

this.login = function(userPass) {
$http({
  method: 'POST',
  url: this.url + '/users/login',
  data: { user: { username: userPass.username, password: userPass.password }},
}).then(function(response) {
  console.log(response);
  controller.user = response.data.user;
  localStorage.setItem('token', JSON.stringify(response.data.token));
  }.bind(this));
  controller.hideAllLogin();
  controller.displayLogOut = true;
};




// ===test method below. may want to disable once login tests sucessful===
this.getUsers = function() {
  $http({
    url: this.url + '/users',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    }
  }).then(function(response) {
    console.log(response);
    if (response.data.status == 401) {
        this.error = "Unauthorized";
    } else {
      this.users = response.data;
    }
  }.bind(this));
}

//logout //

this.logout = function() {
  console.log('logout');
localStorage.clear('token');
location.reload();
// this.hideAllLogin();
// this.displayLogin = true;
}

// ============END LOGIN METHODS=========

}]);
