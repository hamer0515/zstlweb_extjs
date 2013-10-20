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
									'ctype', 'tamt'],

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
													vtype : 'id',
													fieldLabel : '商户号'
												}]
									}, {
										xtype : 'fieldcontainer',
										fieldLabel : '出款日期',
										layout : 'hbox',
										items : [{
													xtype : 'datetimefield',
													name : 'ptdt_from',
													margin : '0 10 0 0',
													width : 180
												}, {
													xtype : 'datetimefield',
													name : 'ptdt_to',
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
											button.up('panel').getForm()
													.reset();
										}
									}]
						}, {
							xtype : 'gridpanel',
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
										text : "商户号",
										dataIndex : 'mid',
										sortable : false,
										flex : 3
									}, {
										text : "商户终端",
										dataIndex : 'tid',
										sortable : false,
										flex : 2
									}, {
										text : "交易时间",
										dataIndex : 'ptdt',
										sortable : false,
										flex : 3
									}, {
										text : "交易类型",
										dataIndex : 'tcode',
										sortable : false,
										flex : 2
									}, {
										text : "交易卡号",
										dataIndex : 'cno',
										flex : 4,
										sortable : false
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
									}]
						}];
				this.callParent(arguments);
			}
		});
