Ext.define('Zstlweb.view.role.Edit', {
			extend : 'Ext.window.Window',
			alias : 'widget.roledit',

			title : '更新角色',
			layout : 'fit',
			autoShow : true,

			initComponent : function() {
				var store = new Ext.data.TreeStore({
							fields : ['text', 'route_id'],
							proxy : {
								type : 'ajax',
								url : 'base/routes',
								extraParams : {
									id : this.role_id
								}
							},
							listeners : {
								load : function(thiz, records, successful,
										eOpts) {
									if (!successful) {
										Ext.MessageBox.show({
													title : '警告',
													msg : '权限列表加载失败,请联系管理员',
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
									}
									var jsonData = thiz.proxy.reader.jsonData.success;
									if (jsonData && jsonData === 'forbidden') {
										Ext.MessageBox.show({
													title : '警告',
													msg : '抱歉，没有权限列表访问权限',
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
									}
								}
							}
						});
				this.items = [{
							xtype : 'form',
							id : 'roleditform',
							url : 'role/update',
							border : false,
							fieldDefaults : {
								labelWidth : 70
							},
							bodyPadding : 5,
							items : [{
										xtype : 'hiddenfield',
										id : 'role_id',
										name : 'role_id'
									}, {
										xtype : 'textfield',
										name : 'name',
										fieldLabel : '角色名称',
										allowBlank : false,
										validateOnChange : false,
										msgTarget : 'qtip',
										verify : {
											url : 'role/check',
											id : 'role_id'
										},
										vtype : 'remoteverify'
									}, {
										xtype : 'textarea',
										name : 'memo',
										fieldLabel : '角色描述',
										width : 400
									}, {
										xtype : 'routes',
										store : store
									}]
						}];

				this.buttons = [{
							text : '更新',
							action : 'update'
						}, {
							text : '取消',
							scope : this,
							handler : this.close
						}];

				this.callParent(arguments);
			}
		});