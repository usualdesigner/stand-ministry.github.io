var standMinistry = angular.module('standMinistry', [
    'ui.router',
    'angularMoment',
    'restangular',
    'angular-loading-bar',
    'ngKookies'
])
    .run(['$rootScope', function ($rootScope) {
        $rootScope.today = moment();
        $rootScope.sidebar = [
            {
                title: 'Календарь',
                icon_class: 'calendar',
                url: "calendar({year: ($rootScope.today | amDateFormat:'YYYY'), month: ($rootScope.today | amDateFormat:'M')})"
            },
            {
                title: 'Напоминания',
                icon_class: 'alarm',
                notifications: 2,
                url: 'alarm'
            },
            {
                title: 'Пользователи',
                icon_class: 'user',
                url: 'user'
            },
            {
                title: 'Сообщения',
                icon_class: 'mail',
                notifications: 5,
                url: 'mail'
            },
            {
                title: 'Настройки',
                icon_class: 'setting',
                url: 'setting'
            }
        ];
        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                $('.left.sidebar').sidebar('hide');
            });
    }])
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 20;
    }]);

standMinistry.controller('CalendarYearMonthCtrl', CalendarYearMonthCtrl);
standMinistry.controller('CalendarYearMonthDayCtrl', CalendarYearMonthDayCtrl);
standMinistry.controller('DayInMonthCtrl', DayInMonthCtrl);
standMinistry.controller('UserCtrl', UserCtrl);
standMinistry.controller('LoginCtrl', LoginCtrl);

standMinistry.config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('//usualdesigner-rest-2.usualdesigner.bilberrysoft.com');
    $urlRouterProvider.otherwise("/calendar/" + new Date().getFullYear() + "/" + new Date().getMonth() + 1);
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "pages/login.html",
            controller: 'LoginCtrl as login'
        })
        .state('calendar', {
            url: "/calendar/:year/:month",
            templateUrl: "pages/calendar.year.month.html",
            controller: 'CalendarYearMonthCtrl as calendar'
        })
        .state('day', {
            url: "/calendar/:year/:month/:day",
            templateUrl: "pages/calendar.year.month.day.html",
            controller: 'CalendarYearMonthDayCtrl as calendar'
        })
        .state('alarm', {
            url: "/alarm",
            templateUrl: "pages/alarm.html",
            controller: 'AlarmCtrl as alarm'
        })
        .state('user', {
            url: "/user",
            templateUrl: "pages/user.html",
            controller: 'UserCtrl as user'
        })
        .state('mail', {
            url: "/mail",
            templateUrl: "pages/mail.html",
            controller: 'MailCtrl as mail'
        })
        .state('setting', {
            url: "/setting",
            templateUrl: "pages/setting.html",
            controller: 'SettingCtrl as setting'
        });
})
    .config(function (RestangularProvider) {

        RestangularProvider.setExtraFields(['name']);
        //RestangularProvider.setDefaultHeaders({token: "x-restangular"});
        RestangularProvider.setDefaultRequestParams(['remove', 'post'], {confirm: true});

    });

standMinistry.filter('range', function () {
    return function (input, total) {
        total = parseInt(total);
        for (var i = 0; i < total; i++)
            input.push(i);
        return input;
    };
});

angular.module('auth', ['ngCookies', 'restangular']);

angular.module('auth')
    .service('AuthService', function ($cookies, $http, Restangular) {
        'use strict';

        var self = this;
        this.status = {
            authorized: false,
        };

        this.loginByCredentials = function (username, password) {
            return Restangular.all('sessions').post({email: username, password: password})
                .then(function (response) {
                    return self.loginByToken(response.contents);
                });
        };

        this.loginByToken = function (token) {
            $http.defaults.headers.common['X-Token'] = token;

            return Restangular.all('sessions').get(token)
                .then(function (response) {
                    $cookies.accessToken = token;
                    self.status.authorized = true;
                    return response;
                });
        };

        this.logout = function () {
            self.status.authorized = false;
            $cookies.accessToken = '';

            Restangular.all('sessions').remove();
        };
    });