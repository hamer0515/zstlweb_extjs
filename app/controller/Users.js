Ext.define('Zstlweb.controller.Users', {
			extend : 'Ext.app.Controller',
			views : ['user.List', 'user.Add', 'user.Edit'],

			init : function() {
				this.control({
							'useradd button[action=submit]' : {
								click : this.userAddSave
							},
							'useredit button[action=update]' : {
								click : this.userEditUpdate
							}
						});
			},
			userAddSave : function(button) {
				var panel = Ext.getCmp('useraddform');
				var form = panel.getForm();
				if (form.isValid()) {
					var roles = panel.down('itemselector').getValue();
					form.submit({
								clientValidation : true,
								url : panel.url,
								params : {
									roles : roles
								},
								success : function(form, action) {
									var response = action.result.success;
									if (response) {
										if (response == 'forbidden') {
											Ext.MessageBox.show({
														title : '警告',
														msg : '抱歉，没有用户添加操作权限',
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
											return;
										}
										var list = Ext
												.getCmp('center_userlist');
										var items = list.items.items;
										items[0].getStore().reload();
										Ext.MessageBox.show({
													title : '提示',
													msg : '用户添加成功',
													closable : false,
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.INFO,
													scope : panel.up('window'),
													fn : function() {
														this.close();
													}
												});
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
								waitMsg : '请求提交中...',
								waitTitle : '请稍等'
							});
				}
			},
			userEditUpdate : function(button) {
				var panel = Ext.getCmp('usereditform');
				var form = panel.getForm();
				if (form.isValid()) {
					var roles = panel.down('itemselector').getValue();
					form.submit({
								clientValidation : true,
								url : panel.url,
								params : {
									roles : roles
								},
								success : function(form, action) {
									var response = action.result.success;
									if (response) {
										if (response == 'forbidden') {
											Ext.MessageBox.show({
														title : '警告',
														msg : '抱歉，没有用户更新操作权限',
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
											return;
										}
										var list = Ext
												.getCmp('center_userlist');
										var items = list.items.items;
										items[0].getStore().reload();
										Ext.MessageBox.show({
													title : '提示',
													msg : '用户更新成功',
													closable : false,
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.INFO,
													scope : panel.up('window'),
													fn : function() {
														this.close();
													}
												});
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
								waitMsg : '请求提交中...',
								waitTitle : '请稍等'
							});
				}
			}
		});