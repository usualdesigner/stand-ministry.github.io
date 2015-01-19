function UserCtrl(Restangular) {

    var vm = this;

    Restangular.all('user').getList()
        .then(function (response) {
            vm.users = response;
        })

}