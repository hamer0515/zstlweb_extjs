Ext.define('Zstlweb.view.component.UTypes', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.uitypes',

	layout : {
		type : 'table',
		columns : 1
	},
	autoShow : true,
	border : false,
	cls : 'x-unselectable',

	initComponent : function() {
		this.items = [{
					xtype : 'combobox',
					width : 300,
					queryMode : 'local',
					editable : false,
					allowBlank : false,
					name : 'itype',
					id : 'itype',
					valueNotFoundText : '',
					forceSelection : true,
					emptyText : '请选择用户类型',
					listeners : {
						blur : function(self, The, eOpts) {
							var value = self.getValue();
							var result = self.getStore().queryBy(
									function(record) {
										if (record.data.id == value) {
											return true;
										}
										return false;
									});
							if (result.length == 0) {
								self.setValue('');
							}
						},
						select : function(combo, record, index) {
							try {
								var utype = combo.getValue();
								var child = Ext.getCmp('utype');
								child.clearValue();
								if (parseInt(utype) != 0) {
									child.store.load({
												params : {
													utype : utype
												}
											});
								}
							} catch (ex) {
								Ext.MessageBox.alert("错误", "部门数据加载失败。");
							}
						}
					},
					fieldLabel : '用户类型',
					store : new Ext.data.Store({
								fields : ['name', 'id'],
								data : [{
											"id" : '0',
											"name" : "运营"
										}, {
											"id" : '1',
											"name" : "渠道"
										}, {
											"id" : '2',
											"name" : "技术服务商"
										}]
							}),
					valueField : 'id',
					displayField : 'name'
				}, {
					xtype : 'combobox',
					width : 300,
					queryMode : 'local',
					editable : false,
					name : 'utype',
					valueNotFoundText : '',
					forceSelection : true,
					emptyText : '请选择渠道',
					fieldLabel : '渠道',
					triggerAction : 'all',
					id : 'utype',
					store : new Ext.data.Store({
						fields : ['name', 'id'],
						autoLoad : false,
						proxy : {
							type : 'ajax',
							api : {
								read : '/base/pft_inst'
							},
							reader : {
								type : 'json'
							}
						},
						listeners : {
							load : function(thiz, records, successful, eOpts) {
								if (!successful) {
									Ext.MessageBox.show({
												title : '警告',
												msg : '渠道数据加载失败,请联系管理员',
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.ERROR
											});
									return;
								}
								var jsonData = thiz.proxy.reader.jsonData.success;
								if (jsonData && jsonData === 'forbidden') {
									Ext.MessageBox.show({
												title : '警告',
												msg : '抱歉，没有渠道数据访问权限',
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.ERROR
											});
								}
							}
						}
					}),
					valueField : 'id',
					displayField : 'name'
				}],

		this.callParent(arguments);
	}
});