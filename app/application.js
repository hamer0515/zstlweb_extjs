Ext.define('Zstlweb.Application', {
			name : 'Zstlweb',
			minHeight : 768,
			minWidth : 1024,
			extend : 'Ext.app.Application',

			views : [
			// TODO: add views here
			],

			controllers : ['Login', 'Index', 'Component', 'Roles', 'Users',
					'Routes', 'bbcx', 'jycx'
			// TODO: add controllers here
			],

			stores : [
			// TODO: add stores here
			]
		});
