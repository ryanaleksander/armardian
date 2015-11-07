angular.module('Armadian.timezones', [])
	.factory('Timezones', function(){
		var localTz = new Date().getTimezoneOffset() / 60;
		var timezones = [
			{
				name: "Local",
				offset: localTz
			},
			{ 
				name: "GMT (UTC)",
				offset: 0
			},
			{
				name: "GMT +1:00 (ECT)",
				offset: 1
			},
			{
				name: "GMT +2:00 (EET/ART)",
				offset: 2
			},
			{
				name: "GMT +3:00 (EAT)",
				offset: 3
			},
			{
				name: "GMT +3:30 (MET)",
				offset: 3.5
			},
			{
				name: "GMT +4:00 (NET)",
				offset: 4
			},
			{
				name: "GMT +5:00 (PLT)",
				offset: 5
			},
			{
				name: "GMT +5:30 (IST)",
				offset: 5.5
			},
			{
				name: "GMT +6:00 (BST)",
				offset: 6
			},
			{
				name: "GMT +7:00 (VST)",
				offset: 7
			},
			{
				name: "GMT +8:00 (CTT)",
				offset: 8
			},
			{
				name: "GMT +9:00 (JST)",
				offset: 9
			},
			{
				name: "GMT +9:30 (ACT)",
				offset: 9.5
			},
			{
				name: "GMT +10:00 (AET)",
				offset: 10
			},
			{
				name: "GMT +11:00 (SST)",
				offset: 11
			},
			{
				name: "GMT +12:00 (NST)",
				offset: 12
			},
			{
				name: "GMT -11:00 (MIT)",
				offset: -11
			},
			{
				name: "GMT -10:00 (HST)",
				offset: -10
			},
			{
				name: "GMT -9:00 (AST)",
				offset: -9
			},
			{
				name: "GMT -8:00 (PST)",
				offset: -8
			},
			{
				name: "GMT -7:00 (PNT/MST)",
				offset: -7
			},
			{
				name: "GMT -6:00 (CST)",
				offset: -6
			},
			{
				name: "GMT -5:00 (EST/IET)",
				offset: -5
			},
			{
				name: "GMT -4:00 (PRT)",
				offset: -4
			},
			{
				name: "GMT -3:30 (CNT)",
				offset: -3.5
			},
			{
				name: "GMT -3:00 (BET/AGT)",
				offset: -3
			},
			{
				name: "GMT -1:00 (CAT)",
				offset: -1
			}
		];
		return  {
			list: function() {
				return timezones;
			}
		}
	});