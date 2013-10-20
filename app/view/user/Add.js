Ext.define('Zstlweb.view.user.Add', {
	extend : 'Ext.window.Window',
	alias : 'widget.useradd',
	id : 'panel.useradd',
	title : '添加新用户',
	layout : 'fit',
	autoShow : true,

	initComponent : function() {
		this.items = [{
			xtype : 'form',
			id : 'useraddform',
			url : 'user/add',
			border : false,
			fieldDefaults : {
				labelWidth : 70
			},
			bodyPadding : 5,
			items : [{
						xtype : 'textfield',
						name : 'username',
						fieldLabel : '用户名',
						anchor : '100%',
						allowBlank : false,
						validateOnChange : false,
						msgTarget : 'qtip',
						verify : {
							url : 'user/check'
						},
						vtype : 'remoteverify'
					}, {
						xtype : 'textfield',
						allowBlank : false,
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
						xtype : 'itemselector',
						name : 'roles',
						id : 'itemselector-roles',
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
													msg : '角色列表加载失败,请联系管理员',
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
										return;
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