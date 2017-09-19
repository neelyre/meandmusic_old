const app = angular.module('soundtrack', []);

app.controller('MainController', ['$http', function($http){
  const controller = this;
  this.test = "hi"
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





  // this.includePath = 'partials/partial1.html';

  this.url = 'http://localhost:3000/';

  console.log('hi');

  // ============LOGIN METHODS BELOW=========

//user account create///
   this.CreateUser = function(userPass) {
    //  this.displayLogout = true;
     console.log('creating user');
     $http({
       method: 'POST',
       url: this.url + 'users',
       data: { user: { username: userPass.username, password: userPass.password, first_name: userPass.first_name, last_name: userPass.last_name, age: userPass.age, gender: userPass.gender }},
     }).then(function(response) {
       controller.user = response.data;
       console.log(controller.user,'logged user');
      //  controller.hideAllLogin();
      //  controller.displayLogOut = true;

     })
   };

// /user login///

this.login = function(userPass) {
//      console.log('login user');
// console.log(userPass);

$http({

  method: 'POST',
  url: this.url + 'users/login',
  data: { user: { username: userPass.username, password: userPass.password }},
}).then(function(response) {
  console.log(response);
  console.log('response on login');
  this.user = response.data.user;
  // controller.user = response.data.user;
  // console.log(controller.user,'logged user')
  localStorage.setItem('token', JSON.stringify(response.data.token));
  // controller.hideAllLogin();
  // controller.displayLogOut = true;
}, function(error){
  console.log('I skipped the response')
});
// }
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
      controller.users = response.data;
    }
  });
}

//logout //

this.logout = function() {
  console.log('logout');
localStorage.clear('token');
location.reload();
// this.hideAllLogin();
// this.displayLogin = true;
};

// ============END LOGIN METHODS=========

}])
