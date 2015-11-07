angular.module('Armadian.clockstore', [])
    .factory('ClockStore', function() {
        var clocks = angular.fromJson(window.localStorage['clocks'] || '[]');
        function persist() {
     		window.localStorage['clocks'] = angular.toJson(clocks);
     	}
        return {
        	list: function() {
        		return clocks;
        	},
            get: function(clockId) {
                for (var i = 0; i < clocks.length; i++) {
					if (clocks[i].id === clockId) {
						return clocks[i];
					}                	
					return undefined;
                }
            },
            add: function(clock) {
            	clocks.push(clock);
            	persist();
            },
            remove: function(clockId) {
            	for (var i = 0; i < clocks.length; i++) {
            		if (clocks[i].id === clockId) {
            			clocks.splice(i, 1);
            			persist();
            			return;
            		}
            	}
            }
        }
    })