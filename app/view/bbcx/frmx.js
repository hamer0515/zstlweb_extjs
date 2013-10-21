Ext.define('Zstlweb.view.bbcx.frmx', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.bbcxfrmx',

	defaults : {
		bodyPadding : 5,
		collapsible : true
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['mid', 'sdate', 'tdt', 'ssn', 'tamt', 'pft',
							'lfee', 'je', 'mname'],

					pageSize : 10,

					proxy : {
						type : 'ajax',
						api : {
							read : 'frmx/list'
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
							var form = Ext.getCmp('bbcxfrmxform').getForm();
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
											msg : '分润明细加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有分润明细数据访问权限',
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
					title : '分润明细查询',
					id : 'bbcxfrmxform',

					fieldDefaults : {
						labelWidth : 140
					},
					items : [{
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'textfield',
											name : 'mid',
											margin : '0 10 0 0',
											width : 516,
											vtype : 'id',
											fieldLabel : '商户号'
										}, {
											xtype : 'textfield',
											name : 'mname',
											width : 516,
											fieldLabel : '商户名称'
										}]
							}, {
								xtype : 'fieldcontainer',
								fieldLabel : '清算日期',
								layout : 'hbox',
								items : [{
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'sdate_from',
											margin : '0 10 0 0',
											width : 180
										}, {
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'sdate_to',
											width : 180
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
								displayInfo : true
							}],
					columns : [{
						text : "商户号",
						dataIndex : 'mid',
						sortable : false,
						locked : true,
						width : 130,
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return '小计：';
						}
					}, {
						text : "交易时间",
						dataIndex : 'tdt',
						sortable : false,
						locked : false,
						width : 150
					}, {
						text : "清算日期",
						dataIndex : 'sdate',
						sortable : false,
						locked : true,
						width : 150,
						renderer : Ext.util.Format.dateRenderer('Y年m月d日')
					}, {
						text : "商户名称",
						dataIndex : 'mname',
						sortable : false,
						locked : false,
						width : 200
					}, {
						text : "交易流水号",
						dataIndex : 'ssn',
						sortable : false,
						locked : false,
						width : 100
					}, {
						text : "交易金额(元)",
						dataIndex : 'tamt',
						sortable : false,
						locked : true,
						width : 120,
						summaryType : function(records) {
							var i = 0, length = records.length, total = 0, record;

							for (; i < length; ++i) {
								record = records[i];
								total += parseInt(record.get('tamt'));
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
						text : "基本分润(元)",
						dataIndex : 'pft',
						locked : true,
						width : 120,
						sortable : false,
						summaryType : function(records) {
							var i = 0, length = records.length, total = 0, record;

							for (; i < length; ++i) {
								record = records[i];
								total += parseInt(record.get('pft_chnl'));
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
						text : "品牌服务费承担(元)",
						dataIndex : 'lfee',
						locked : true,
						width : 150,
						sortable : false,
						summaryType : function(records) {
							var i = 0, length = records.length, total = 0, record;

							for (; i < length; ++i) {
								record = records[i];
								total += parseInt(record.get('lfee_chnl'));
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
						text : "分润净额(元)",
						dataIndex : 'je',
						locked : true,
						width : 120,
						sortable : false,
						summaryType : function(records) {
							var i = 0, length = records.length, total = 0, record;

							for (; i < length; ++i) {
								record = records[i];
								total += parseInt(record.get('je'));
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
						xtype : 'actioncolumn',
						text : '操作',
						width : 80,
						align : 'center',
						items : [{
									tooltip : '其他分润明细',
									getClass : function(v, meta, rec) {
										return 'detail';
									},
									handler : function(grid, rowIndex, colIndex) {
										var record = grid.getStore()
												.getAt(rowIndex);
										var view = Ext.widget('bbcxfrmxdetail',
												{
													width : 600,
													height : 260,
													modal : true,
													resizable : false,
													ssn : record.data.ssn,
													tdt : record.data.tdt
												}).show();
									}
								}]
					}]
				}];
		this.callParent(arguments);
	}
});
