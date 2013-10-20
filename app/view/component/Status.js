Ext.define('Zstlweb.view.component.Status', {
			extend : 'Ext.form.RadioGroup',
			alias : 'widget.status',
			fieldLabel : '状态',
			labelWidth : 70,
			id : 'component.status',
			fieldLabel : '状态',
			columns : 2,
			vertical : true,
			items : [{
						boxLabel : '禁用',
						name : 'status',
						inputValue : '0'
					}, {
						boxLabel : '启用',
						name : 'status',
						inputValue : '1',
						checked : true
					}],
			initComponent : function() {
				this.callParent(arguments);
			}
		});