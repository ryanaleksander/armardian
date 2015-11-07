(function() {
    var app = angular.module('Armadian', ['ionic', 'ds.clock', 'Armadian.clockstore', 'Armadian.timezones', 'Armadian.stopwatch', 'Armadian.countdown', 'angular-svg-round-progress']);
    app.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tab', {
                url: "/tab",
                templateUrl: "templates/tab.ng.html",
                abstract: true
            })
            .state('tab.clocks', {
                url: "/clocks",
                views: {
                    'tab-clocks': {
                        templateUrl: "templates/clocks.ng.html"
                    }
                }
            })
            .state('tab.clocks-selection', {
                url: "/clocks-selection",
                views: {
                    'tab-clocks': {
                        templateUrl: "templates/add-clocks.ng.html"
                    }
                }
            })
            .state('tab.stopwatch', {
                url: "/stopwatch",
                views: {
                    'tab-stopwatch': {
                        templateUrl: "templates/stopwatch.ng.html"
                    }
                }
            })
            .state('tab.edit-stopwatch', {
                url: "/edit-stopwatch/:stopwatchId",
                views: {
                    'tab-stopwatch': {
                        templateUrl: "templates/edit-stopwatch.ng.html"
                    }
                }
            })
            .state('tab.countdown', {
                url: "/countdown",
                views: {
                    'tab-countdown': {
                        templateUrl: "templates/countdown.ng.html"
                    }
                }
            })
            $urlRouterProvider.otherwise("tab/clocks");
    });
    app.controller("ClocksCtrl", function($scope, ClockStore) {
        $scope.clocks = ClockStore.list();
        $scope.remove = function(clockId)  {
            ClockStore.remove(clockId);
        }
    });

    app.controller("AddCtrl", function($scope, $state, Timezones, ClockStore) {
        $scope.timezones = Timezones.list();
        $scope.clock = {
            id: new Date().getTime().toString(),
            timezone: $scope.timezones[0],
            description: ''
        }

        $scope.save = function(clock) {
            ClockStore.add(clock);
            $state.go("tab.clocks");
        }
    });

    app.controller("StopwatchCtrl", function($scope, $interval, Stopwatch) {
        $scope.stopwatches = Stopwatch.list();
        $scope.stopwatch = {
            counting: false,
            milliseconds: 0,
            seconds: 0,
            minutes: 0,
            hours: 0
        }

        function timer() {
            if ($scope.stopwatch.counting) {
                $scope.stopwatch.milliseconds += 1;
                if ($scope.stopwatch.milliseconds >= 100) {
                    $scope.stopwatch.seconds++;
                    $scope.stopwatch.milliseconds = 0;
                }
                if ($scope.stopwatch.seconds >= 60) {
                    $scope.stopwatch.minutes++;
                    $scope.stopwatch.seconds = 0;
                }
                if ($scope.stopwatch.minutes >= 60) {
                    $scope.stopwatch.hours++;
                    $scope.stopwatch.minutes = 0
                }
            }
        }
        var timerCounting;
        $scope.start = function() {
            if ($scope.stopwatch.counting === false) {
                $scope.stopwatch.counting = true;
                timerCounting = $interval(timer, 10);
            }
        };

        $scope.stop = function() {
            $scope.stopwatch.counting = false;
            $interval.cancel(timerCounting);
        };

        $scope.reset = function() {
            $scope.stopwatch.milliseconds = 0;
            $scope.stopwatch.seconds = 0;
            $scope.stopwatch.minutes = 0;
            $scope.stopwatch.hours = 0;
        }

        $scope.check = function() {
            var time = {
                id: new Date().getTime().toString(),
                time: $scope.stopwatch.hours + ':' + ("00" + $scope.stopwatch.minutes).slice(-2) + ':' + ("00" + $scope.stopwatch.seconds).slice(-2) + ':' + ("00" + $scope.stopwatch.milliseconds).slice(-2),
                description: ''
            }
            Stopwatch.add(time);
        }

        $scope.remove = function(stopwatchId) {
            Stopwatch.remove(stopwatchId);
        }
    });

    app.controller("StopwatchEditCtrl", function($scope, $state, Stopwatch) {
        $scope.stopwatchId = $state.params.stopwatchId;
        $scope.stopwatch = Stopwatch.get($scope.stopwatchId);
        $scope.save = function(stopwatch) {
            Stopwatch.update(stopwatch);
            $state.go('tab.stopwatch');
        }
    });

    app.controller("CountdownCtrl", function($scope, $interval, $ionicPopup, Countdown) {
        $scope.countdowns = Countdown.list();
        $scope.timer = {
            id: new Date().getTime().toString(),
            hours: 0,
            minutes: 0,
            seconds: 0,
            total: 0,
            max: 0,
            started: false,
            countdownStart: undefined
        }

        $scope.validInput = true;

        $scope.show = function() {
            var popTimer = $ionicPopup.prompt({
              title: 'Timer',
              templateUrl: 'templates/TimerForm.html',
              scope: $scope,
              buttons: [
                { text: "Cancel" },
                {
                    text: "Save",
                    type: "button-positive",
                    onTap: function(e) {
                        if ($scope.timer.hours > 0 || $scope.timer.minutes > 0 || $scope.timer.seconds > 0) {
                            if ($scope.timer.minutes > 59) {
                                $scope.timer.minutes = 59;
                            }
                            if ($scope.timer.seconds > 59) {
                                $scope.timer.seconds = 59;
                            }
                            $scope.timer.max = $scope.timer.total = $scope.timer.seconds + $scope.timer.minutes * 60 + $scope.timer.hours * 3600;
                            Countdown.add(angular.copy($scope.timer));
                        } else {
                            $scope.validInput = false;
                            e.preventDefault();
                        }
                    }
                }
              ]
            });
        }
        $scope.remove = function(countdownId) {
            Countdown.remove(countdownId);
        }


        $scope.start = function(timer) {
            if (!timer.started) {
                timer.started = true;
                timer.countdownStart = $interval(function() {
                    if (timer.total > 0) {
                        timer.seconds--;
                        timer.total--;
                        if (timer.seconds < 0) {
                            timer.seconds = 59;
                            timer.minutes--;
                        }
                        if (timer.minutes < 0) {
                           timer.miutes = 59;
                           timer.hours--;
                        }   
                    } else {
                        $interval.cancel(timer.countdownStart);
                    }
                    Countdown.update(timer);
                }, 1000);
            }
        }
        $scope.stop = function(timer) {
            timer.started = false;
            $interval.cancel(timer.countdownStart);
            Countdown.update(timer);
        }
    })
    app.run(function($ionicPlatform, $state, $timeout) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
}());
