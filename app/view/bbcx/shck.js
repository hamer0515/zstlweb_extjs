Ext.define('Zstlweb.view.bbcx.shck', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.bbcxshck',

	defaults : {
		bodyPadding : 5,
		collapsible : true
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['mid', 'fbatch', 'amt', 'cdate', 'status',
							'mname'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'shck/list'
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
							var form = Ext.getCmp('bbcxshckform').getForm();
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
											msg : '商户出款数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有商户出款数据访问权限',
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
					title : '商户出款情况查询',
					id : 'bbcxshckform',

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
								fieldLabel : '出款日期',
								layout : 'hbox',
								items : [{
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'cdate_from',
											margin : '0 10 0 0',
											width : 180
										}, {
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'cdate_to',
											margin : '0 10 0 0',
											width : 180
										}, {
											xtype : 'combobox',
											name : 'status',
											width : 516,
											queryMode : 'local',
											anyMatch : true,
											editable : false,
											store : new Ext.data.Store({
														fields : ['id', 'name'],
														data : [{
																	"id" : '-1',
																	"name" : "失败"
																}, {
																	"id" : '0',
																	"name" : "处理中"
																}, {
																	"id" : '1',
																	"name" : "成功"
																}, {
																	"id" : '2',
																	"name" : "失败已回退"
																}]
													}),
											valueField : 'id',
											displayField : 'name',
											margin : '0 10 0 0',
											fieldLabel : '出款状态'
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
					viewConfig : {
						getRowClass : function(record) {
							var color;
							var status = parseInt(record.data.status);
							if (status == -1) {
								color = 'red';
							}
							return color;
						}
					},
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
								text : "商户号",
								dataIndex : 'mid',
								sortable : false,
								flex : 2
							}, {
								text : "商户名称",
								dataIndex : 'mname',
								sortable : false,
								flex : 3
							}, {
								text : "出款日期",
								dataIndex : 'cdate',
								sortable : false,
								flex : 1,
								renderer : Ext.util.Format
										.dateRenderer('Y年m月d日')
							}, {
								text : "出款批次",
								dataIndex : 'fbatch',
								sortable : false,
								flex : 1
							}, {
								text : "出款金额(元)",
								dataIndex : 'amt',
								sortable : false,
								flex : 1,
								renderer : function(value) {
									if (!value) {
										value = 0;
									}
									return Ext.util.Format.number(
											parseInt(value) / 100, '0,0.00');
								}
							}, {
								text : "出款状态",
								dataIndex : 'status',
								flex : 1,
								sortable : false,
								renderer : function(value) {
									var text = ['失败', '处理中', '成功', '失败已回退'];
									return text[parseInt(value) + 1];
								}
							}]
				}];
		this.callParent(arguments);
	}
});
