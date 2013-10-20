Ext.define('overrides.RowExpander', {
			override : 'Ext.grid.plugin.RowExpander',
			addExpander : function() {
				var me = this, expanderGrid = me.grid, expanderHeader = me
						.getHeaderConfig();

				// If this is the normal side of a lockable grid, find the other
				// side.
				if (expanderGrid.ownerLockable) {
					expanderGrid = expanderGrid.ownerLockable.lockedGrid;
					expanderGrid.width += expanderHeader.width;
				}
				// expanderGrid.headerCt.insert(0, expanderHeader);
			}
		});