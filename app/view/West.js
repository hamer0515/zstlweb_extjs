Ext.define('Zstlweb.view.West', {
			extend : 'Ext.tree.Panel',
			alias : 'widget.west',
			width : 200,
			autoShow : true,
			disableSelection : true,
			rootVisible : false,
			cls : 'x-unselectable',

			initComponent : function() {
				var panel = this;
				var store = new Ext.data.TreeStore({
							fields : ['text', 'url'],
							autoLoad : true,

							proxy : {
								type : 'ajax',
								url : 'login/menu'
							},
							listeners : {
								load : function(thiz, records, successful,
										eOpts) {
									if (!successful) {
										Ext.MessageBox.show({
													title : '警告',
													msg : '菜单加载失败，请重新登录',
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR,
													fn : function() {
														var viewport = panel
																.up('viewport');
														viewport.removeAll();
														viewport.add({
																	xtype : 'loginform'
																});;
													}
												});

									}
								}
							}
						});
				this.store = store;
				this.callParent(arguments);
			}
		});