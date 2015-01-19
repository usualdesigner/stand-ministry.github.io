function CalendarYearMonthDayCtrl($stateParams, Restangular) {

    var vm = this;

    vm.moment = moment($stateParams.year + '-' + $stateParams.month + '-' + $stateParams.day, 'YYYY-MM-DD');

    Restangular.oneUrl('day', '//usualdesigner-rest-2.usualdesigner.bilberrysoft.com/calendar/day/' + vm.moment.format('X')).get().then(function (response) {

        vm.shifts = response;

    });

}