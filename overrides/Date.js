Ext.define('overrides.Date', {
			override : 'Date',
			dateDiff : function(interval, objDate) {
				var d = this, t = d.getTime(), t2 = objDate.getTime(), i = {};
				i["y"] = objDate.getFullYear() - d.getFullYear();
				i["q"] = i["y"] * 4 + Math.floor(objDate.getMonth() / 4)
						- Math.floor(d.getMonth() / 4);
				i["m"] = i["y"] * 12 + objDate.getMonth() - d.getMonth();
				i["ms"] = objDate.getTime() - d.getTime();
				i["w"] = Math.floor((t2 + 345600000) / (604800000))
						- Math.floor((t + 345600000) / (604800000));
				i["d"] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000);
				i["h"] = Math.floor(t2 / 3600000) - Math.floor(t / 3600000);
				i["n"] = Math.floor(t2 / 60000) - Math.floor(t / 60000);
				i["s"] = Math.floor(t2 / 1000) - Math.floor(t / 1000);
				return i[interval];
			},
			pattern : function(fmt) {
				var o = {
					"M+" : this.getMonth() + 1, // 月份
					"d+" : this.getDate(), // 日
					"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours()
							% 12, // 小时
					"H+" : this.getHours(), // 小时
					"m+" : this.getMinutes(), // 分
					"s+" : this.getSeconds(), // 秒
					"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
					"S" : this.getMilliseconds()
					// 毫秒
				};
				var week = {
					"0" : "\u65e5",
					"1" : "\u4e00",
					"2" : "\u4e8c",
					"3" : "\u4e09",
					"4" : "\u56db",
					"5" : "\u4e94",
					"6" : "\u516d"
				};
				if (/(y+)/.test(fmt)) {
					fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
									.substr(4 - RegExp.$1.length));
				}
				if (/(E+)/.test(fmt)) {
					fmt = fmt.replace(RegExp.$1,
							((RegExp.$1.length > 1) ? (RegExp.$1.length > 2
									? "\u661f\u671f"
									: "\u5468") : "")
									+ week[this.getDay() + ""]);
				}
				for (var k in o) {
					if (new RegExp("(" + k + ")").test(fmt)) {
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
										? (o[k])
										: (("00" + o[k])
												.substr(("" + o[k]).length)));
					}
				}
				return fmt;
			}
		});