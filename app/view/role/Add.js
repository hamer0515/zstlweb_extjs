Ext.define('Zstlweb.view.role.Add', {
			extend : 'Ext.window.Window',
			alias : 'widget.roleadd',
			id : 'panel.roleadd',
			title : '添加新角色',
			layout : 'fit',
			autoShow : true,

			initComponent : function() {
				var store = new Ext.data.TreeStore({
							fields : ['text', 'route_id'],
							proxy : {
								type : 'ajax',
								url : 'base/routes'
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
							id : 'roleaddform',
							url : 'role/add',
							border : false,
							fieldDefaults : {
								labelWidth : 70
							},
							bodyPadding : 5,
							items : [{
										xtype : 'textfield',
										name : 'name',
										fieldLabel : '角色名称',
										allowBlank : false,
										validateOnChange : false,
										msgTarget : 'qtip',
										verify : {
											url : 'role/check'
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
							text : '添加',
							action : 'submit'
						}, {
							text : '取消',
							scope : this,
							handler : this.close
						}];

				this.callParent(arguments);
			}
		});