Ext.define('Zstlweb.view.Viewport', {
			extend : 'Ext.container.Viewport',
			requires : ['Ext.data.TreeStore', 'Ext.layout.container.Border',
					'Ext.toolbar.Paging', 'Ext.grid.plugin.RowExpander',
					'Ext.ux.TabScrollerMenu', 'Ext.ux.TabCloseMenu',
					'Ext.grid.column.Action', 'Ext.form.field.Date',
					'Ext.form.field.Hidden', 'Ext.ux.form.ItemSelector',
					'Ext.grid.property.Grid', 'overrides.Date',
					'Ext.layout.container.Table', 'overrides.Format',
					'overrides.Table', 'overrides.TabCloseMenu',
					'overrides.VType', 'overrides.RowExpander',
					'overrides.BasicForm', 'Ext.grid.feature.Summary',
					'Ext.grid.feature.GroupingSummary'],

			layout : {
				type : 'border'
			},

			items : [{
						xtype : 'loginform'
					}]
		});
