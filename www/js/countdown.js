angular.module("Armadian.countdown", [])
	.factory("Countdown", function() {
		var countdowns = angular.fromJson(window.localStorage["countdowns"] || "[]");
		function persist() {
			window.localStorage["countdowns"] = angular.toJson(countdowns);
		}
		return {
			list: function() {
				return countdowns;
			},
			remove: function(countdownId) {
				for (var i = 0; i < countdowns.length; i++) {
					if (countdowns[i].id === countdownId) {
						countdowns.splice(i, 1);
						persist();
						return;
					}
				}
			},
			update: function(countdown) {
				for (var i = 0; i < countdowns.length; i++) {
					if (countdowns[i].id === countdown.id) {
						countdowns[i] = countdown;
						persist();
						return;
					}
				}
			},
			add: function(countdown) {
				countdowns.push(countdown);
				persist();
			}
		}
	})