Ext.define('Zstlweb.store.component.Routes', {
			extend : 'Ext.data.TreeStore',
			fields : ['text', 'route_id'],
			proxy : {
				type : 'ajax',
				url : 'base/routes'
			},
			listeners : {
				load : function(thiz, records, successful, eOpts) {
					if (!successful) {
						Ext.MessageBox.show({
									title : '警告',
									msg : '权限列表数据加载失败,请联系管理员',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					var jsonData = thiz.proxy.reader.jsonData.success;
					if (jsonData && jsonData === 'forbidden') {
						Ext.MessageBox.show({
									title : '警告',
									msg : '抱歉，没有权限列表数据访问权限',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
					}
				}
			}
		});