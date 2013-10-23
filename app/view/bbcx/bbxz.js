Ext.define('Zstlweb.view.bbcx.bbxz', {
	extend : 'Ext.form.Panel',
	alias : 'widget.bbcxbbxz',

	border : false,
	fieldDefaults : {
		labelWidth : 80
	},
	layout : {
		type : 'vbox',
		align : 'left'
	},
	initComponent : function() {
		var form = this;
		this.items = [{
					xtype : 'datefield',
					fieldLabel : '报表日期',
					format : 'Y-m-d',
					name : 'date',
					width : 320,
					allowBlank : false
				}, {
					xtype : 'button',
					text : '下载',
					handler : function(button) {
						if (form.getForm().isValid()) {
							form.getForm().submit({
								clientValidation : true,
								url : '/bbxz/download',
								success : function(form, action) {
									var result = action.result.success;
									if (result && result === 'forbidden') {
										Ext.MessageBox.show({
													title : '警告',
													msg : '抱歉，没有报表下载权限',
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
									}
									if (result && result === 'none') {
										Ext.MessageBox.show({
													title : '警告',
													msg : '文件不存在',
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
									} else if (result
											&& 'path' in action.result) {
										window.open(action.result.path);
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

				}];
		this.callParent(arguments);
	}
});