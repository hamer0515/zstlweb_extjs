Ext.define('overrides.Format', {
			override : 'Ext.util.Format',
			/**
			 * Returns a date rendering function that can be reused to apply a
			 * date format multiple times efficiently.
			 * 
			 * @param {String}
			 *            format Any valid date format string. Defaults to
			 *            {@link Ext.Date#defaultFormat}.
			 * @return {Function} The date formatting function
			 */
			dateRenderer : function(format) {
				return function(v) {
					return Ext.util.Format.date(new Date(Date.parse(v.replace(
									/-/g, "/"))), format);
				};
			}

		});