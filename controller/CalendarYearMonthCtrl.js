function CalendarYearMonthCtrl($stateParams, Restangular, $kookies) {

    $kookies.set('user_id', 2);

    var vm = this;

    vm.moment = moment($stateParams.year + '-' + $stateParams.month, 'YYYY-MM');

    Restangular.allUrl('days', '//usualdesigner-rest-2.usualdesigner.bilberrysoft.com/calendar/dashboard/' + vm.moment.format('YYYY') + '/' + vm.moment.format('M')).getList().then(function (response) {

        vm.days = response;

    });

    vm.prevMonthParams = function () {
        return {
            year: vm.moment.clone().subtract(1, 'month').format('YYYY'),
            month: vm.moment.clone().subtract(1, 'month').format('M')
        };
    };

    vm.nextMonthParams = function () {
        return {
            year: vm.moment.clone().add(1, 'month').format('YYYY'),
            month: vm.moment.clone().add(1, 'month').format('M')
        };
    };
}