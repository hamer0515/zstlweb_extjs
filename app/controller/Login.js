Ext.define('Zstlweb.controller.Login', {
			extend : 'Ext.app.Controller',
			views : ['login.LoginForm', 'login.PasswordReset', 'login.Logout'],

			init : function() {
				this.control({
							'loginform button[action=submit]' : {
								click : this.submit
							},
							'loginform button[action=reset]' : {
								click : this.reset
							},
							'passwordreset button[action=passwordreset]' : {
								click : this.passwordreset
							},
							'passwordreset button[action=reset]' : {
								click : this.reset
							}
						});
			},
			submit : function(button) {
				var panel = button.up('panel');
				var form = panel.getForm();
				if (form.isValid()) {
					form.submit({
								clientValidation : true,
								url : panel.url,
								success : function(form, action) {
									var response = action.result.success;
									if (response) {
										if (response == 'forbidden') {
											Ext.MessageBox.show({
														title : '警告',
														msg : '抱歉，没有登录操作权限',
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
											return;
										}
										var viewport = panel.up('viewport');
										viewport.removeAll();
										viewport.add([{
													region : 'north',
													xtype : 'north',
													height : 60,
													margins : '0 5 0 5'
												}, {
													title : '菜單',
													region : 'west',
													xtype : 'west',
													margins : '0 0 0 5',
													width : 200,
													collapsible : true,
													layout : 'fit'
												}, {
													region : 'center',
													xtype : 'center',
													layout : 'fit',
													height : 683,
													margins : '0 5 0 0'
												}, {
													region : 'south',
													xtype : 'south',
													height : 25,
													margins : '0 5 0 5'
												}]);
									} else {
										Ext.MessageBox.show({
													title : '警告',
													msg : action.result.msg,
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
									}
								},
								failure : function(form, action) {
									Ext.MessageBox.show({
												title : '警告',
												msg : '用户名或密码错误',
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.ERROR
											});
								},
								waitMsg : '使劲登录中...',
								waitTitle : '请稍等'
							});
				}
			},
			passwordreset : function(button) {
				var panel = button.up('panel');
				var form = panel.getForm();
				if (form.isValid()) {
					form.submit({
								clientValidation : true,
								url : panel.url,
								success : function(form, action) {
									var response = action.result.success;
									if (response) {
										if (response == 'forbidden') {
											Ext.MessageBox.show({
														title : '警告',
														msg : '抱歉，没有密码修改操作权限',
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
											return;
										}
										Ext.MessageBox.show({
													title : '提示',
													msg : '密码修改成功',
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.INFO
												});
										form.reset();
									} else {
										Ext.MessageBox.show({
													title : '失败',
													msg : action.result.msg,
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
									}
								},
								failure : function(form, action) {
									switch (action.failureType) {
										case Ext.form.action.Action.CLIENT_INVALID :
											Ext.MessageBox.show({
														title : '失败',
														msg : '表单数据有误，请检查',
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
											break;
										case Ext.form.action.Action.CONNECT_FAILURE :
											Ext.MessageBox.show({
														title : '失败',
														msg : '网络链接出错',
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
											break;
										case Ext.form.action.Action.SERVER_INVALID :
											Ext.MessageBox.show({
														title : '失败',
														msg : action.result.msg,
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
									}
								},
								waitMsg : '正在提交请求...',
								waitTitle : '请稍等'
							});
				}
			},
			reset : function(button) {
				button.up('panel').getForm().reset();
			}
		});