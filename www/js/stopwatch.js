angular.module('Armadian.stopwatch', [])
	.factory('Stopwatch', function(){
		var stopwatches = angular.fromJson(window.localStorage['stopwatches'] || '[]');

		function persist() {
			window.localStorage['stopwatches'] = angular.toJson(stopwatches);
		}
		return {
			list: function() {
				return stopwatches
			},
			add: function(stopwatch) {
				stopwatches.push(stopwatch);
				persist();
			},
			remove: function(stopwatchId) {
				for (var i = 0; i < stopwatches.length; i++) {
					if (stopwatches[i].id === stopwatchId) {
						stopwatches.splice(i, 1);
						persist();
						return;
					}
				}
			},
			get: function(stopwatchId) {
				for (var i = 0; i < stopwatches.length; i++) {
					if (stopwatches[i].id === stopwatchId) {
						return stopwatches[i];
					}
				}
				return undefined;
			},
			update: function(stopwatch) {
				for (var i = 0; i < stopwatches.length; i++) {
					if (stopwatches[i].id === stopwatch.id) {
						stopwatches[i] = stopwatch;
						persist();
						return;
					}
				}
			}
		};
	});



