function DayInMonthCtrl($scope) {

    var vm = this;

    vm.moment = moment.unix($scope.day.timestamp);

}