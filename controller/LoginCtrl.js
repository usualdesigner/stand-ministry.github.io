function LoginCtrl($http) {

    var vm = this;

    vm.user = {login: false, password: false};

    vm.sendLoginData = function () {

        $http.post('http://usualdesigner-rest-2.usualdesigner.bilberrysoft.com/calendar/345/your_preferred_url', vm.user).
            success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    }

}