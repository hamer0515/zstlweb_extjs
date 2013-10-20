Ext.define('Zstlweb.view.bbcx.shdz', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.bbcxshdz',

	defaults : {
		bodyPadding : 5,
		collapsible : true
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['mid', 'mname', 'sdate', 'tid', 'tdt', 'ctype',
							'ssn', 'cno', 'tcode', 'tamt', 'mfee', 'bj'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'shdz/list'
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
							var form = Ext.getCmp('bbcxshdzform').getForm();
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
											msg : '商户对账数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有商户对账数据访问权限',
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
					title : '商户对账报表查询',
					id : 'bbcxshdzform',

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
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'combobox',
											name : 'ctype',
											width : 516,
											queryMode : 'local',
											anyMatch : true,
											editable : false,
											store : new Ext.data.Store({
														fields : ['id', 'name'],
														data : [{
																	"id" : 1,
																	"name" : "借记卡"
																}, {
																	"id" : 2,
																	"name" : "信用卡"
																}]
													}),
											valueField : 'id',
											displayField : 'name',
											margin : '0 10 0 0',
											fieldLabel : '卡类型'
										}, {
											xtype : 'textfield',
											name : 'cno',
											width : 516,
											fieldLabel : '帐号'
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
						text : "商户名称",
						dataIndex : 'mname',
						locked : false,
						width : 220,
						sortable : false
					}, {
						text : "终端号",
						dataIndex : 'tid',
						sortable : false,
						locked : false,
						width : 60
					}, {
						text : "清算日期",
						dataIndex : 'sdate',
						sortable : false,
						locked : true,
						width : 150,
						renderer : Ext.util.Format.dateRenderer('Y年m月d日')
					}, {
						text : "卡类型",
						dataIndex : 'ctype',
						width : 100,
						sortable : false,
						locked : false,
						renderer : function(value) {
							var text = ['借记卡', '信用卡', '信用卡'];
							return text[parseInt(value) - 1];
						},
						width : 80
					}, {
						text : "账号",
						dataIndex : 'cno',
						sortable : false,
						locked : false,
						width : 150
					}, {
						text : "交易类型",
						dataIndex : 'tcode',
						sortable : false,
						locked : false,
						width : 100
					}, {
						text : "交易流水号",
						dataIndex : 'ssn',
						sortable : false,
						locked : false,
						width : 100
					}, {
						text : "交易时间",
						dataIndex : 'tdt',
						sortable : false,
						locked : false,
						width : 150
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
						text : "商户手续费(元)",
						dataIndex : 'mfee',
						locked : true,
						width : 120,
						sortable : false,
						summaryType : function(records) {
							var i = 0, length = records.length, total = 0, record;

							for (; i < length; ++i) {
								record = records[i];
								total += parseInt(record.get('mfee'));
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
						text : "清算净额(元)",
						dataIndex : 'bj',
						locked : true,
						width : 120,
						sortable : false,
						summaryType : function(records) {
							var i = 0, length = records.length, total = 0, record;

							for (; i < length; ++i) {
								record = records[i];
								total += parseInt(record.get('bj'));
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
					}]
				}];
		this.callParent(arguments);
	}
});
