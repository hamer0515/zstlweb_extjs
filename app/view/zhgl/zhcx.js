Ext.define('Zstlweb.view.zhgl.zhcx', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.zhglzhcx',

	defaults : {
		bodyPadding : 5,
		collapsible : true
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['mid', 'mname', 'r_0', 'r_1', 'ts_u'],

					pageSize : 50,

					proxy : {
						type : 'ajax',
						api : {
							read : 'zhcx/list'
						},
						reader : {
							type : 'json',
							root : 'data',
							totalProperty : 'totalCount',
							successProperty : 'success'
						}
					},
					listeners : {
						beforeload : function(store, operation, eOpts) {
							var form = Ext.getCmp('zhglzhcxform').getForm();
							var values = form.getValues();
							if (form.isValid()) {
								store.proxy.extraParams = values;
							} else {
								return false;
							}
						},
						load : function(thiz, records, successful, eOpts) {
							if (!successful) {
								Ext.MessageBox.show({
											title : '警告',
											msg : '账户查询数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有账户查询数据访问权限',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
							}
						}
					}
				});
		this.store = store;
		this.items = [{
					xtype : 'form',
					title : '账户查询',
					id : 'zhglzhcxform',

					fieldDefaults : {
						labelWidth : 140
					},
					items : [{
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'textfield',
											name : 'mid',
											width : 516,
											vtype : 'id',
											fieldLabel : '商户号'
										}]
							}, {
								xtype : 'button',
								text : '查询',
								margin : '0 20 0 0',
								handler : function() {
									store.loadPage(1);
								}
							}, {
								xtype : 'button',
								text : '重置',
								handler : function(button) {
									button.up('panel').getForm().reset();
								}
							}]
				}, {
					xtype : 'gridpanel',
					height : 500,
					features : [{
								id : 'group',
								ftype : 'groupingsummary',
								groupHeaderTpl : '{name}',
								hideGroupedHeader : true,
								enableGroupingMenu : false
							}, {
								ftype : 'summary',
								dock : 'bottom'
							}],
					collapsible : false,
					store : this.store,
					dockedItems : [{
						xtype : 'pagingtoolbar',
						store : this.store,
						dock : 'bottom',
						pageSize : 50,
						plugins : [new Zstlweb.view.component.plugins.PageComboResizer()],
						displayInfo : true
					}],
					columns : [{
						text : "商户名称",
						dataIndex : 'mname',
						sortable : false,
						flex : 4,
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return '小计：';
						}
					}, {
						text : "商户号",
						dataIndex : 'mid',
						sortable : false,
						flex : 3
					}, {
						text : "账户余额(元)",
						dataIndex : 'r_0',
						sortable : false,
						flex : 2,
						summaryType : function(records) {
							var i = 0, length = records.length, total = 0, record;

							for (; i < length; ++i) {
								record = records[i];
								total += parseInt(record.get('r_0'));
							}
							return total;
						},
						summaryRenderer : function(value) {
							if (!value) {
								value = 0;
							}
							return Ext.util.Format.number(
									parseInt(value) / 100, '0,0.00');
						},
						renderer : function(value) {
							if (!value) {
								value = 0;
							}
							return Ext.util.Format.number(
									parseInt(value) / 100, '0,0.00');
						}
					}, {
						text : "已经冻结金额(元)",
						dataIndex : 'r_1',
						flex : 2,
						sortable : false,
						summaryType : function(records) {
							var i = 0, length = records.length, total = 0, record;

							for (; i < length; ++i) {
								record = records[i];
								total += parseInt(record.get('r_1'));
							}
							return total;
						},
						summaryRenderer : function(value) {
							if (!value) {
								value = 0;
							}
							return Ext.util.Format.number(
									parseInt(value) / 100, '0,0.00');
						},
						renderer : function(value) {
							if (!value) {
								value = 0;
							}
							return Ext.util.Format.number(
									parseInt(value) / 100, '0,0.00');
						}
					}, {
						text : "最后操作时间",
						dataIndex : 'ts_u',
						flex : 3,
						sortable : false
					}, {
						xtype : 'actioncolumn',
						text : '操作',
						width : 80,
						align : 'center',
						items : [{
							tooltip : '账户操作历史',
							getClass : function(v, meta, rec) {
								return 'detail';
							},
							handler : function(grid, rowIndex, colIndex) {
								var record = grid.getStore().getAt(rowIndex);

								Ext.create('Ext.window.Window', {
									title : '商户【' + record.data.mname + '】商户号【'
											+ record.data.mid + '】账户操作历史',
									height : 540,
									width : 800,
									modal : true,
									resizable : false,
									layout : 'fit',
									items : {
										xtype : 'zhglzhlscx',
										border : false,
										mid : record.data.mid
									}
								}).show();
							}
						}]
					}]
				}];
		this.callParent(arguments);
	}
});
