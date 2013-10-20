Ext.define('Zstlweb.controller.Component', {
			extend : 'Ext.app.Controller',
			stores : ['Zstlweb.store.component.Status'],
			views : ['Zstlweb.view.component.Status',
					'Zstlweb.view.component.UTypes',
					'Zstlweb.view.component.DateTime',
					'Zstlweb.view.component.picker.DateTimePicker']
		});