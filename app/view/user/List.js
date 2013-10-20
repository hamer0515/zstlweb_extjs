Ext.define('Zstlweb.view.user.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.userlist',
	disableSelection : true,
	height : 540,

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['username', 'pwd_chg_date', 'status', 'rowid',
							'user_id', 'utype', 'itype'],
					autoLoad : true,

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : '/user/list'
						},
						reader : {
							type : 'json',
							root : 'data',
							totalProperty : 'totalCount',
							successProperty : 'success'
						}
					},
					sorters : [{
								property : 'user_id',
								direction : 'DESC'
							}],
					listeners : {
						load : function(thiz, records, successful, eOpts) {
							if (!successful) {
								Ext.MessageBox.show({
											title : '警告',
											msg : '用户列表加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有用户列表访问权限',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
							}
						}
					}
				});
		this.store = store;
		this.dockedItems = [{
					xtype : 'toolbar',
					dock : 'top',
					items : [{
								iconCls : 'useradd',
								text : '添加用户',
								tooltip : '添加用户',
								action : 'add',
								handler : function() {
									Ext.widget('useradd', {
												modal : true,
												resizable : false
											});
								}
							}]
				}, {
					xtype : 'pagingtoolbar',
					store : store,
					dock : 'bottom',
					displayInfo : true
				}];
		this.columns = [{
					text : "编号",
					dataIndex : 'user_id',
					width : 80,
					sortable : true,
					flex : 1
				}, {
					text : "用户名",
					dataIndex : 'username',
					sortable : false,
					flex : 2
				}, {
					text : "密码修改日期",
					dataIndex : 'pwd_chg_date',
					sortable : false,
					flex : 4,
					renderer : Ext.util.Format.dateRenderer('Y年m月d日')
				}, {
					text : "状态",
					dataIndex : 'status',
					width : 70,
					sortable : true,
					renderer : function(value, p, record) {
						return value == 1 ? '启用' : '<font color=red>禁用</font>';
					},
					flex : 1
				}, {
					xtype : 'actioncolumn',
					text : '操作',
					width : 50,
					align : 'center',
					items : [{
								iconCls : 'useredit',
								tooltip : '编辑用户',
								handler : function(grid, rowIndex, colIndex) {
									var record = grid.getStore()
											.getAt(rowIndex);
									var view = Ext.widget('useredit', {
												modal : true,
												resizable : false
											}).hide();
									Ext.getCmp('utype').store.load({
												params : {
													utype : record.data.itype
												}
											});
									selector = Ext
											.getCmp('itemselector-roles-edit');
									view.down('form').loadRecord(record);
									// Ext.getCmp('utype')
									// .setValue(record.data.utype);
									// if (parseInt(record.data.itype) == 0) {
									// Ext.getCmp('itype').clearValue();
									// }
									// Ext.getCmp('itype')
									// .setValue(record.data.itype);
									Ext.Ajax.request({
												url : 'base/roles',
												async : false,
												params : {
													id : record.data.user_id
												},
												success : function(response) {
													var text = response.responseText;
													selector.setValue(Ext
															.decode(text))
												}
											});
									view.show();
								}
							}]
				}];
		this.callParent(arguments);
	}
});