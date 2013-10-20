Ext.define('Zstlweb.view.South', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.south',
	layout : 'fit',
	autoShow : true,
	height : 25,

	initComponent : function() {
		this.items = {
			xtype : 'displayfield',
			value : "<center>Copyright © 2013 yeepay. All rights reserved. <center>"
		};
		this.callParent(arguments);
	}
});