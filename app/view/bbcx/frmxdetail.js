Ext.define('Zstlweb.view.bbcx.frmxdetail', {
	extend : 'Ext.window.Window',
	alias : 'widget.bbcxfrmxdetail',
	border : false,
	initComponent : function() {
		var bfjdetail = this;
		var tpl = new Ext.XTemplate(
				'<tpl for=".">',
				'<table border="0" cellspacing="1" cellpadding="0" align="center"  bgcolor="#C8DCF0" class="live_1_table">',
				'<tr align="center" class="ice_one_td">',
				'<td width="150px">商户号： </td><td width="150px">{mid}</td><td width="150px"></td><td width="150px"></td>',
				'</tr>',
				'<tr align="center" class="ice_one_td">',
				'<td >交易金额：</td><td >{tamt}</td><td></td><td></td>',
				'</tr>',
				'<tr align="center" class="ice_one_td">',
				'<td >分润方名称</td><td >基本分润</td><td>品牌服务费承担</td><td>分润净额</td>',
				'</tr>',
				'<tr align="center" class="ice_one_td">',
				'<td >{p_1}</td><td >{pft_1}</td><td>{lfee_1}</td><td>{je_1}</td>',
				'</tr>',
				'<tr align="center" class="ice_one_td">',
				'<td >{p_2}</td><td >{pft_2}</td><td>{lfee_2}</td><td>{je_2}</td>',
				'</tr>',
				'<tr align="center" class="ice_one_td">',
				'<td >{p_3}</td><td >{pft_3}</td><td>{lfee_3}</td><td>{je_3}</td>',
				'</tr>',
				'<tr align="center" class="ice_one_td">',
				'<td >{p_4}</td><td >{pft_4}</td><td>{lfee_4}</td><td>{je_4}</td>',
				'</tr>',
				'<tr align="center" class="ice_one_td">',
				'<td >{p_5}</td><td >{pft_5}</td><td>{lfee_5}</td><td>{je_5}</td>',
				'</tr>', '</table>', '</tpl>');
		var store = new Ext.data.Store({
					autoLoad : true,
					fields : ['mid', 'tamt', 'pft_1', 'pft_2', 'pft_3',
							'pft_4', 'pft_5', 'p_1', 'p_2', 'p_3', 'p_4',
							'p_5', 'lfee_1', 'lfee_2', 'lfee_3', 'lfee_4',
							'lfee_5', 'je_1', 'je_2', 'je_3', 'je_4', 'je_5'],
					proxy : {
						type : 'ajax',
						url : '/frmx/detail',
						extraParams : {
							tdt : this.tdt,
							ssn : this.ssn
						}
					},
					listeners : {
						load : function(thiz, records, successful, eOpts) {
							if (!successful) {
								Ext.MessageBox.show({
											title : '警告',
											msg : '分润明细详细数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有分润明细详细数据访问权限',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
						}
					}
				});
		this.store = store;
		var view = Ext.create('Ext.view.View', {
					store : store,
					tpl : tpl,
					itemSelector : 'table'
				});
		this.items = view;
		this.callParent(arguments);
	}
});