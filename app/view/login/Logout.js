Ext.define('Zstlweb.view.login.Logout', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.logout',

	autoShow : true,

	initComponent : function() {
		var panel = this;
		Ext.Msg.show({
			floating : true,
			title : '警告',
			msg : '确定要退出',
			buttons : Ext.Msg.OKCANCEL,
			closable : false,
			fn : function(id) {
				if (id === 'cancel') {
					Ext.getCmp('center_tab_container').remove(Ext
							.getCmp('center_logout'));
				} else {
					Ext.Ajax.request({
						async : false,
						url : 'login/logout',
						success : function(response) {
							var success = Ext.decode(response.responseText).success;
							if (success) {
								if (response === 'forbidden') {
									Ext.MessageBox.show({
												title : '警告',
												msg : '抱歉，没有登录退出操作权限',
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.ERROR
											});
									return;
								}
								var viewport = panel.up('viewport');
								viewport.removeAll();
								viewport.add({
											xtype : 'loginform'
										});
							} else {
								Ext.MessageBox.alert('警告', '操作失败');
							}
						},
						failure : function(response, opts) {
							Ext.MessageBox.show({
										title : '警告',
										msg : '服务器端出错，错误码:' + response.status,
										buttons : Ext.Msg.YES,
										icon : Ext.Msg.ERROR
									});
						}
					});
					// window.location.href = "login/logout";
					// Ext.MessageBox.show({
					// title : '再见',
					// msg : '跳转中...',
					// floating : true,
					// closable : false
					// });
				}
			},
			icon : Ext.window.MessageBox.WARNING
		});
		this.callParent(arguments);
	}
});