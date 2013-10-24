Ext.define('Zstlweb.view.role.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.rolelist',
	disableSelection : true,
	columnLines : true,
	loadMask : true,
	height : 'auto',

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['name', 'memo', 'role_id', 'rowid'],
					autoLoad : true,

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : '/role/list'
						},
						reader : {
							type : 'json',
							root : 'data',
							totalProperty : 'totalCount',
							successProperty : 'success'
						}
					},
					sorters : [{
								property : 'role_id',
								direction : 'DESC'
							}],
					listeners : {
						load : function(thiz, records, successful, eOpts) {
							if (!successful) {
								Ext.MessageBox.show({
											title : '警告',
											msg : '角色列表加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有角色列表访问权限',
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
								iconCls : 'roleadd',
								text : '添加角色',
								tooltip : '添加角色',
								handler : function() {
									Ext.widget('roleadd', {
												modal : true,
												resizable : false
											});
								}
							}]
				}, {
					xtype : 'pagingtoolbar',
					store : store,
					dock : 'bottom',
					plugins : [new Zstlweb.view.component.plugins.PageComboResizer()],
					displayInfo : true
				}];
		this.columns = [{
					text : "编号",
					dataIndex : 'role_id',
					width : 80,
					sortable : true,
					flex : 1
				}, {
					text : "角色名",
					dataIndex : 'name',
					sortable : false,
					flex : 2
				}, {
					text : "备注",
					dataIndex : 'memo',
					sortable : false,
					flex : 4,
					renderer : function(value, p, record) {
						return Ext.String.ellipsis(value, 30, true);
					}
				}, {
					xtype : 'actioncolumn',
					text : '操作',
					width : 80,
					align : 'center',
					items : [{
								iconCls : 'roleedit',
								tooltip : '编辑',
								action : 'edit',
								handler : function(grid, rowIndex, colIndex) {
									var record = grid.getStore()
											.getAt(rowIndex);
									var view = Ext.widget('roledit', {
												modal : true,
												resizable : false,
												role_id : record.data.role_id
											});
									view.down('form').loadRecord(record);
								}
							}, {
								iconCls : 'roledelete',
								tooltip : '删除',
								handler : function(grid, rowIndex, colIndex) {
									var record = grid.getStore()
											.getAt(rowIndex);
									Ext.MessageBox.confirm('提醒', '你正在删除角色['
													+ record.data.name + ']',
											function(optional) {
												if (optional === 'yes') {
													Ext.Ajax.request({
														url : 'role/delete',
														async : false,
														params : {
															id : record.data.role_id
														},
														success : function(
																response) {
															var text = Ext
																	.decode(response.responseText);
															if (text.success) {
																Ext.MessageBox
																		.alert(
																				'提醒',
																				'删除角色成功');
																var list = Ext
																		.getCmp('center_rolelist');
																var items = list.items.items;
																items[0]
																		.getStore()
																		.reload();
															} else {
																Ext.MessageBox
																		.alert(
																				'提醒',
																				'删除角色失败');
															}
														}
													});
												}
											});
								}
							}]
				}];
		this.callParent(arguments);
	}
});