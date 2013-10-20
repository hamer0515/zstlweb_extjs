Ext.define('Zstlweb.view.login.PasswordReset', {
			extend : 'Ext.form.Panel',
			alias : 'widget.passwordreset',
			border : false,
			fieldDefaults : {
				labelWidth : 100
			},
			layout : {
				type : 'vbox',
				align : 'left'
			},

			// autoShow : true,

			initComponent : function() {
				this.url = '/login/passwordreset';
				this.fieldDefaults = {
					allowBlank : false,
					msgTarget : 'qtip',
					width : 280
				};
				this.items = [{
							xtype : 'textfield',
							fieldLabel : '旧密码',
							inputType : 'password',
							name : 'oldpassword',
							maxLength : 20,
							maxLengthText : '允许最大长度为20',
							minLength : 6,
							minLengthText : '允许最小长度为6'
						}, {
							xtype : 'textfield',
							fieldLabel : '新密码',
							inputType : 'password',
							name : 'newpassword',
							id : 'newpassword',
							maxLength : 20,
							maxLengthText : '允许最大长度为20',
							minLength : 6,
							minLengthText : '允许最小长度为6'
						}, {
							xtype : 'textfield',
							fieldLabel : '确认新密码',
							inputType : 'password',
							name : 'confirmpassword',
							id : 'verify',
							verifypwd : {
								id : 'newpassword'
							},
							vtype : 'verifypwd'
						}, {
							xtype : 'fieldcontainer',
							layout : 'hbox',
							items : [{
										xtype : 'button',
										margin : '0 20 0 0',
										text : '确定',
										action : 'passwordreset'
									}, {
										xtype : 'button',
										text : '重置',
										action : 'reset'
									}]
						}];
				this.callParent(arguments);
			}
		});