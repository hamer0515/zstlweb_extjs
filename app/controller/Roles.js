Ext.define('Zstlweb.controller.Roles', {
			extend : 'Ext.app.Controller',
			views : ['role.List', 'role.Add', 'role.Edit'],

			init : function() {
				this.control({
							'roleadd button[action=submit]' : {
								click : this.roleAddSave
							},
							'roledit button[action=update]' : {
								click : this.roleEditUpdate
							}
						});
			},
			roleAddSave : function(button) {
				var panel = Ext.getCmp('roleaddform');
				var form = panel.getForm();
				if (form.isValid()) {
					var limits = [];
					var records = panel.down('treepanel').getChecked();
					records.forEach(function(element, index, array) {
								limits.push(element.data.route_id);
							});
					form.submit({
								clientValidation : true,
								url : panel.url,
								params : {
									limits : limits
								},
								success : function(form, action) {
									var response = action.result.success;
									if (response) {
										if (response == 'forbidden') {
											Ext.MessageBox.show({
														title : '警告',
														msg : '抱歉，没有角色添加操作权限',
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
											return;
										}
										var list = Ext
												.getCmp('center_rolelist');
										var items = list.items.items;
										items[0].getStore().reload();
										Ext.MessageBox.show({
													title : '消息',
													msg : '角色添加成功',
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
			roleEditUpdate : function(button) {
				var panel = Ext.getCmp('roleditform');
				var form = panel.getForm();
				if (form.isValid()) {
					var limits = [];
					var records = panel.down('treepanel').getChecked();
					records.forEach(function(element, index, array) {
								limits.push(element.data.route_id);
							});
					form.submit({
								clientValidation : true,
								url : panel.url,
								params : {
									limits : limits
								},
								success : function(form, action) {
									var response = action.result.success;
									if (response) {
										if (response == 'forbidden') {
											Ext.MessageBox.show({
														title : '警告',
														msg : '抱歉，没有角色更新操作权限',
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
											return;
										}
										var list = Ext
												.getCmp('center_rolelist');
										var items = list.items.items;
										items[0].getStore().reload();
										Ext.MessageBox.show({
													title : '消息',
													msg : '角色更新成功',
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