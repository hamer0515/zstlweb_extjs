Ext.define('Zstlweb.view.North', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.north',
	height : 60,
	layout : {
		type : 'hbox',
		align : 'middle'
	},
	autoShow : true,
	border : false,
	listeners : {
		afterlayout : function(thiz, eOpts) {
			var panel = thiz;
			var button = Ext.get('north_logout_button');
			if (button) {
				button.on('click', function(e, btn, eOpts) {
					Ext.Msg.show({
						floating : true,
						title : '警告',
						msg : '确定要退出',
						buttons : Ext.Msg.OKCANCEL,
						closable : false,
						fn : function(id) {
							if (id !== 'cancel') {
								Ext.Ajax.request({
									async : false,
									url : 'login/logout',
									success : function(response) {
										var success = Ext
												.decode(response.responseText).success;
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
													msg : '服务器端出错，错误码:'
															+ response.status,
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
									}
								});
							}
						},
						icon : Ext.window.MessageBox.WARNING
					});
				}, self);
			}
		}
	},
	initComponent : function() {
		this.items = [{
					xtype : 'image',
					border : false,
					height : 39,
					width : 127,
					src : 'resources/images/yeepay_logo.jpg',
					margin : '0 0 0 20'
				}, {
					xtype : 'image',
					border : false,
					height : 39,
					width : 158,
					src : 'resources/images/logo_title.png',
					margin : '0 0 0 40'
				}, {
					xtype : 'image',
					border : false,
					height : 16,
					width : 16,
					src : 'resources/images/door_in.png',
					margin : "0 0 0 800"
				}, {
					xtype : 'displayfield',
					value : "<a href='javascript:void(0)' id='north_logout_button'>安全退出</a>",
					margin : '0 0 0 5'
				}];
		this.callParent(arguments);
	}
});