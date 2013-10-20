Ext.define('overrides.TabCloseMenu', {
			override : 'Ext.ux.TabCloseMenu',
			createMenu : function() {
				var me = this;

				if (!me.menu) {
					var items = [{
								text : me.closeTabText,
								iconCls : this.closeTabIconCls,
								scope : me,
								handler : me.onClose
							}];

					if (me.showCloseAll || me.showCloseOthers) {
						items.push('-');
					}

					if (me.showCloseOthers) {
						items.push({
									text : me.closeOthersTabsText,
									iconCls : this.closeOtherTabsIconCls,
									scope : me,
									handler : me.onCloseOthers
								});
					}

					if (me.showCloseAll) {
						items.push({
									text : me.closeAllTabsText,
									iconCls : this.closeAllTabsIconCls,
									scope : me,
									handler : me.onCloseAll
								});
					}

					if (me.extraItemsHead) {
						items = me.extraItemsHead.concat(items);
					}

					if (me.extraItemsTail) {
						items = items.concat(me.extraItemsTail);
					}

					me.menu = Ext.create('Ext.menu.Menu', {
								items : items,
								listeners : {
									hide : me.onHideMenu,
									scope : me,
									delay : 1
								}
							});
				}

				return me.menu;
			}
		});