Ext.define('Zstlweb.view.zhgl.zhlscx', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.zhglzhlscx',
			mid : '',
			defaults : {
				bodyPadding : 5,
				collapsible : false
			},

			initComponent : function() {
				var store = new Ext.data.Store({
							fields : ['in', 'out', 'balance', 'memo', 'ts_c'],
							autoLoad : true,

							proxy : {
								type : 'ajax',
								extraParams : {
									mid : this.mid
								},
								api : {
									read : 'zhcx/history'
								},
								reader : {
									type : 'json',
									root : 'data',
									totalProperty : 'totalCount',
									successProperty : 'success'
								}
							},
							listeners : {
								load : function(thiz, records, successful,
										eOpts) {
									if (!successful) {
										Ext.MessageBox.show({
													title : '警告',
													msg : '账户操作历史数据加载失败,请联系管理员',
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
										return;
									}
									var jsonData = thiz.proxy.reader.jsonData.success;
									if (jsonData && jsonData === 'forbidden') {
										Ext.MessageBox.show({
													title : '警告',
													msg : '抱歉，没有账户操作历史访问权限',
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
									}
								}
							}
						});
				this.store = store;
				this.items = [{
					xtype : 'gridpanel',
					id : 'zhglzhlscx-grid-id',
					height : 'auto',
					collapsible : false,
					store : this.store,
					columns : [{
						text : "入帐(元)",
						dataIndex : 'in',
						sortable : false,
						flex : 2,
						renderer : function(value) {
							if (!value) {
								value = 0;
							}
							return Ext.util.Format.number(
									parseInt(value) / 100, '0,0.00');
						}
					}, {
						text : "出帐(元)",
						dataIndex : 'out',
						flex : 2,
						sortable : false,
						renderer : function(value) {
							if (!value) {
								value = 0;
							}
							return Ext.util.Format.number(
									parseInt(value) / 100, '0,0.00');
						}
					}, {
						text : "余额(元)",
						dataIndex : 'balance',
						flex : 2,
						sortable : false,
						renderer : function(value) {
							if (!value) {
								value = 0;
							}
							return Ext.util.Format.number(
									parseInt(value) / 100, '0,0.00');
						}
					}, {
						text : "备注",
						dataIndex : 'memo',
						flex : 3,
						sortable : false,
						renderer : function(value) {
							return "<div title='" + value + "'>"
									+ Ext.String.ellipsis(value, 28, true)
									+ "</div>";
						}
					}, {
						text : "操作时间",
						dataIndex : 'ts_c',
						flex : 3,
						sortable : false
					}]
				}];
				this.callParent(arguments);
			}
		});
