Ext.define('Zstlweb.store.component.Status', {
			extend : 'Ext.data.Store',
			fields : ['id', 'name'],
			data : [{
						"id" : 0,
						"name" : '禁用'
					}, {
						"id" : 1,
						"name" : '启用'
					}]
		});