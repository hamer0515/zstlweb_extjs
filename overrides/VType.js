Ext.define('overrides.VType', {
			override : 'Ext.form.field.VTypes',

			id : function(val, field) {
				return /^\d*$/.exec(val);
			},
			idText : '不是有效的数字',

			money : function(val, field) {
				return /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/.exec(val);
			},
			moneyText : '不是有效的金额',

			verifypwd : function(val, field) {
				var valiStatus = true;// 验证状态
				var textfield = Ext.getCmp(field.verifypwd.id);
				var form = textfield.up('form').getForm();
				var passwd = field.value;
				if (textfield.lastValue != passwd) {
					valiStatus = false;
				}
				return valiStatus;
			},
			verifypwdText : '密码不一致',

			beforecurrentdate : function(val, field) {
				var valiStatus = false;// 验证状态
				var from = new Date(val);
				var to = new Date();
				var interval = from.dateDiff('d', to);
				if (interval > 0) {
					valiStatus = true;
				}
				return valiStatus;
			},
			beforecurrentdateText : '日期值必须小于当前日期',

			remoteverify : function(val, field) {
				var valiStatus = false;// 验证状态
				var url = field.verify.url;
				var id = -1;
				if (field.verify.id)
					id = Ext.getCmp(field.verify.id).getSubmitValue();
				Ext.Ajax.request({
							async : false,
							url : url,
							params : {
								name : val,
								id : id
							},
							success : function(response) {
								valiStatus = Ext.decode(response.responseText).success;
							},
							failure : function(response, opts) {
								Ext.MessageBox.show({
											title : '警告',
											msg : '服务器端出错，错误码:'
													+ response.status,
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
							}
						});
				return valiStatus;
			},
			remoteverifyText : '名称已存在，请重新输入'

		});