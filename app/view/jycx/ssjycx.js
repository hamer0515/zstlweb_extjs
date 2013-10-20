Ext.define('Zstlweb.view.jycx.ssjycx', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.jycxssjycx',

			defaults : {
				bodyPadding : 5,
				collapsible : true
			},

			initComponent : function() {
				var store = new Ext.data.Store({
							fields : ['mid', 'tid', 'ptdt', 'tcode', 'cno',
									'ctype', 'tamt', 'mname', 'refnum', 'tsn',
									'rev_flag'],

							pageSize : 50,
							remoteSort : true,

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
									var form = Ext.getCmp('jycxssjycxform')
											.getForm();
									var values = form.getValues();
									if (form.isValid()) {
										store.proxy.extraParams = values;
									} else {
										return false;
									}
								},
								load : function(thiz, records, successful,
										eOpts) {
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
													name : 'tid',
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
													vtype : 'id',
													fieldLabel : '检索参考号'
												}, {
													xtype : 'textfield',
													name : 'tid',
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
											button.up('panel').getForm()
													.reset();
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
							height : 500,
							collapsible : false,
							store : this.store,
							dockedItems : [{
										xtype : 'pagingtoolbar',
										store : this.store,
										dock : 'bottom',
										displayInfo : true
									}],
							columns : [{
										text : "商户名称",
										dataIndex : 'mname',
										sortable : false,
										flex : 3
									}, {
										text : "商户号",
										dataIndex : 'mid',
										sortable : false,
										flex : 3
									}, {
										text : "终端号",
										dataIndex : 'tid',
										sortable : false,
										flex : 2
									}, {
										text : "卡号",
										dataIndex : 'cno',
										flex : 4,
										sortable : false
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
										text : "交易时间",
										dataIndex : 'ptdt',
										sortable : false,
										flex : 4
									}, {
										text : "交易类型",
										dataIndex : 'tcode',
										sortable : false,
										flex : 2
									}, {
										text : "交易金额",
										dataIndex : 'tamt',
										flex : 4,
										sortable : false,
										renderer : function(value) {
											if (!value) {
												value = 0;
											}
											return Ext.util.Format.number(
													parseInt(value) / 100,
													'0,0.00');
										}
									}, {
										text : "检索参考号",
										dataIndex : 'refnum',
										sortable : false,
										flex : 4
									}, {
										text : "终端流水号",
										dataIndex : 'tsn',
										sortable : false,
										flex : 2
									}, {
										text : "冲正标志",
										dataIndex : 'rev_flag',
										flex : 2,
										sortable : false
									}]
						}];
				this.callParent(arguments);
			}
		});
