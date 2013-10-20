Ext.define('Zstlweb.controller.Routes', {
			extend : 'Ext.app.Controller',
			views : ['component.Routes'],

			init : function() {
				this.control({
							'treepanel' : {
								checkchange : this.checkChange
							},
							'routes' : {
								setChangedValue : this.setValues
							},
							'checkbox[action=selectAll]' : {
								change : this.selectAll
							},
							'checkbox[action=deselectAll]' : {
								change : this.deselectAll
							}
						});
			},
			setValues : function(arr) {
				alert('event');
				var routes = Ext.getCmp('routes');
				var root = routes.getRootNode();
				this.select(root.childNodes, arr);
			},
			select : function(node, arr) {
				if (Ext.isArray(node)) {
					for (var i = node.length - 1; i >= 0; i--) {
						this.select(node[i]);
					}
				} else {
					if (Ext.Array.contains(arr, node.data.route_id)) {
						node.set('checked', true);
					}
					if (node.childNodes.length > 0) {
						this.select(node.childNodes);
					}
				}
			},
			selectAll : function(element, newValue, oldValue, eOpts) {
				var routes = Ext.getCmp('routes');
				var root = routes.getRootNode();
				this.changeChecked(root, newValue);
			},
			deselectAll : function(element, newValue, oldValue, eOpts) {
				var routes = Ext.getCmp('routes');
				var root = routes.getRootNode();
				this.checkDeselect(root);
			},
			checkDeselect : function(node) {
				if (node.childNodes.length > 0) {
					this.deselect(node.childNodes);
				}
			},
			deselect : function(node) {
				if (Ext.isArray(node)) {
					for (var i = node.length - 1; i >= 0; i--) {
						this.deselect(node[i]);
					}
				} else {
					if (node.data.checked != null) {
						node.set('checked', !node.data.checked);
					}
					if (node.childNodes.length > 0) {
						this.deselect(node.childNodes);
					}
				}
			},
			checkChange : function(node, checked) {
				if (node.childNodes.length > 0) {
					this.changeChecked(node.childNodes, checked);
				}
				if (node.parentNode.data.checked != null) {
					this.changeCheckedUp(node.parentNode, checked);
				}
			},
			changeChecked : function(node, checked) {
				if (Ext.isArray(node)) {
					for (var i = node.length - 1; i >= 0; i--) {
						this.changeChecked(node[i], checked);
					}
				} else {
					if (node.data.checked != null) {
						node.set('checked', checked);
					}
					if (node.childNodes.length > 0) {
						this.changeChecked(node.childNodes, checked);
					}
				}
			},
			changeCheckedUp : function(node, checked) {
				if (checked == false) {
					var re = node.childNodes.every(function(element, index,
									array) {
								return !element.data.checked;
							});
					if (re) {
						node.set('checked', checked);
					}
				} else {
					node.set('checked', checked);
				}
				if (node.parentNode.data.checked != null) {
					this.changeCheckedUp(node.parentNode, checked);
				}
			}
		});