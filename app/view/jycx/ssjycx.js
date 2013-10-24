Ext.define('Zstlweb.view.jycx.ssjycx', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.jycxssjycx',

	defaults : {
		bodyPadding : 5,
		collapsible : true
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['mid', 'ptid', 'ptdt', 'tcode', 'cno', 'ctype',
							'tamt', 'mname', 'refnum', 'tsn', 'rev_flag',
							'resp_code'],

					remoteSort : true,
					pageSize : 50,

					proxy : {
						type : 'ajax',
						api : {
							read : 'ssjycx/list'
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
							var form = Ext.getCmp('jycxssjycxform').getForm();
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
											msg : '实时交易数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有实时交易数据访问权限',
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
					title : '实时交易查询',
					id : 'jycxssjycxform',

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
											margin : '0 10 0 0',
											vtype : 'id',
											fieldLabel : '商户号'
										}, {
											xtype : 'textfield',
											name : 'ptid',
											width : 516,
											fieldLabel : '终端号'
										}]
							}, {
								xtype : 'fieldcontainer',
								fieldLabel : '交易时间',
								layout : 'hbox',
								items : [{
											xtype : 'datetimefield',
											name : 'ptdt_from',
											margin : '0 10 0 0',
											width : 180
										}, {
											xtype : 'datetimefield',
											name : 'ptdt_to',
											margin : '0 10 0 0',
											width : 180
										}, {
											xtype : 'textfield',
											name : 'cno',
											width : 516,
											fieldLabel : '交易卡号'
										}]
							}, {
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'textfield',
											name : 'refnum',
											width : 516,
											margin : '0 10 0 0',
											fieldLabel : '检索参考号'
										}, {
											xtype : 'textfield',
											name : 'tsn',
											width : 516,
											vtype : 'id',
											fieldLabel : '终端流水号'
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
					viewConfig : {
						getRowClass : function(record) {
							var color;
							var jstatus = parseInt(record.data.rev_flag);
							if (jstatus == 1) {
								color = 'red';
							}
							return color;
						}
					},
					height : 'auto',
					collapsible : false,
					store : this.store,
					dockedItems : [{
						xtype : 'pagingtoolbar',
						store : this.store,
						dock : 'bottom',
						plugins : [new Zstlweb.view.component.plugins.PageComboResizer()],
						displayInfo : true
					}],
					columns : [{
								text : "商户名称",
								dataIndex : 'mname',
								sortable : false,
								locked : true,
								width : 200
							}, {
								text : "商户号",
								dataIndex : 'mid',
								sortable : false,
								locked : false,
								width : 150
							}, {
								text : "终端号",
								dataIndex : 'ptid',
								sortable : false,
								locked : true,
								width : 100
							}, {
								text : "卡号",
								dataIndex : 'cno',
								sortable : false,
								locked : true,
								width : 160
							}, {
								text : "卡类型",
								dataIndex : 'ctype',
								width : 100,
								locked : true,
								sortable : false,
								renderer : function(value) {
									var text = ['借记卡', '信用卡', '信用卡'];
									return text[parseInt(value) - 1];
								}
							}, {
								text : "交易时间",
								dataIndex : 'ptdt',
								sortable : false,
								locked : true,
								width : 150
							}, {
								text : "交易类型",
								dataIndex : 'tcode',
								sortable : false,
								locked : true,
								width : 90,
								renderer : function(value) {
									if (value == 'V52') {
										return '消费撤销';
									} else if (value == 'S22') {
										return '消费';
									}
									return value;
								}
							}, {
								text : "交易金额",
								dataIndex : 'tamt',
								locked : true,
								width : 100,
								sortable : false,
								renderer : function(value) {
									if (!value) {
										value = 0;
									}
									return Ext.util.Format.number(
											parseInt(value) / 100, '0,0.00');
								}
							}, {
								text : "检索参考号",
								dataIndex : 'refnum',
								sortable : false,
								locked : false,
								width : 150
							}, {
								text : "终端流水号",
								dataIndex : 'tsn',
								sortable : false,
								locked : false,
								width : 150
							}, {
								text : "冲正标志",
								dataIndex : 'rev_flag',
								locked : false,
								width : 80,
								sortable : false
							}, {
								text : "应答码",
								dataIndex : 'resp_code',
								locked : false,
								width : 80,
								sortable : false
							}]
				}];
		this.callParent(arguments);
	}
});
