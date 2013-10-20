Ext.define('Zstlweb.view.component.Routes', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.routes',

			id : 'component.routes',
			layout : 'fit',
			autoShow : true,
			border : false,
			cls : 'x-unselectable',

			initComponent : function() {
				this.items = [{
							xtype : 'checkboxgroup',
							fieldLabel : '权限选择',
							columns : 2,
							vertical : true,
							items : [{
										xtype : 'checkbox',
										boxLabel : '全选',
										action : 'selectAll'
									}, {
										xtype : 'checkbox',
										boxLabel : '反选',
										action : 'deselectAll'
									}]
						}, {
							xtype : 'treepanel',
							rootVisible : false,
							id : 'routes',
							store : this.store,
							width : 400,
							height : 200
						}],

				this.callParent(arguments);
			}
		});