Ext.define('Zstlweb.view.user.Edit', {
	extend : 'Ext.window.Window',
	alias : 'widget.useredit',
	id : 'panel.useredit',
	title : '更新用户',
	layout : 'fit',
	autoShow : true,

	initComponent : function() {
		this.items = [{
			xtype : 'form',
			id : 'usereditform',
			url : 'user/update',
			border : false,
			fieldDefaults : {
				labelWidth : 70
			},
			bodyPadding : 5,
			items : [{
						xtype : 'hiddenfield',
						id : 'user_id',
						name : 'user_id'
					}, {
						xtype : 'textfield',
						name : 'username',
						fieldLabel : '用户名',
						anchor : '100%',
						allowBlank : false,
						validateOnChange : 2,
						msgTarget : 'qtip',
						verify : {
							url : 'user/check',
							id : 'user_id'
						},
						vtype : 'remoteverify'
					}, {
						xtype : 'textfield',
						name : 'password',
						inputType : 'password',
						maxLength : 20,
						maxLengthText : '允许最大长度为20',
						minLength : 6,
						minLengthText : '允许最小长度为6',
						fieldLabel : '初始密码'
					}, {
						xtype : 'uitypes'
					}, {
						xtype : 'status'
					}, {
						xtype : 'itemselector',
						name : 'roles',
						id : 'itemselector-roles-edit',
						width : 700,
						height : 300,
						fieldLabel : '角色选择',
						store : new Ext.data.Store({
							fields : ['name', 'role_id'],
							autoLoad : true,

							proxy : {
								type : 'ajax',
								api : {
									read : '/base/allroles'
								},
								reader : {
									type : 'json'
								}
							},
							listeners : {
								load : function(thiz, records, successful,
										eOpts) {
									if (!successful) {
										Ext.MessageBox.show({
													title : '警告',
													msg : '数据加载失败,请联系管理员',
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
									}
									var jsonData = thiz.proxy.reader.jsonData.success;
									if (jsonData && jsonData === 'forbidden') {
										Ext.MessageBox.show({
													title : '警告',
													msg : '抱歉，没有角色列表访问权限',
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
									}
								}
							}
						}),
						displayField : 'name',
						valueField : 'role_id',
						allowBlank : false,
						msgTarget : 'qtip',
						fromTitle : '可选择',
						toTitle : '已选择'
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