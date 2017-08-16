app.controller('LoginController', ['$http', '$location', function($http, $location){
  var vm = this;

  vm.username = '';
  vm.password = '';

  vm.login = function(){
    var sendData = {};

    sendData.username = vm.username;
    sendData.password = vm.password;

    $http.post('/login', sendData).then(handleSuccess, handleFailure);
  };

  function handleSuccess(response){
    $location.path('/dashboard');
  };

  function handleFailure(response){
  };
}]);
