(function($) {
	var a = [
	{ name: "Contact 1", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
	{ name: "Contact 2", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
	{ name: "Contact 3", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
	{ name: "Contact 4", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
	{ name: "Contact 5", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
	{ name: "Contact 6", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
	];

	var Contact = Backbone.Model.extend({
		defaults:{
			photo: 'img/placeholder.png'
		}
	});

	var Directory = Backbone.Collection.extend({
		model : Contact
	});

	var ContactView = Backbone.View.extend({
		tagName: "article",
		className: "contact-wrap",
		ContactTemplate: $('#contact-template').html(),
		render: function(){
			var tmpl = _.template(this.ContactTemplate);
			console.log(tmpl);
			// function (data) {
			//      return render.call(this, data, _);
			//    } 

			$(this.el).html(tmpl(this.model.toJSON()));
			return this;
		}
	});

	var DirectoryView = Backbone.View.extend({
		el : $('#contacts'),

		initialize : function(){
			this.collection = new Directory(a);
			this.render();
			console.log(this.collection.toJSON());
		},

		render: function(){
			var me = this;
			_.each(this.collection.models, function (mymodel) {
				me.renderContact(mymodel);
			}, this);
		},

		renderContact: function(mymodel){
			var contactview = new ContactView({
				model : mymodel
			});
			this.$el.append(contactview.render().el);
		},

		getType: function(){
			_.uniq(this.collection.pluck("type"),false,function(type){
				return type.toLowerCase();
			});
		},

		creatingSelect: function(){
			var filter = $(this.el).find("#filter"),
				select = $("<select/>",{
					html:"<option>All</option>"
				});
			
			_.each(this.getType(), function(selecttype) {
				var option = $("<option/>",{
					value : selecttype.toLowerCase(),
					text : selecttype.toLowerCase()
				});
				$(option).appendTo(select);				
			});				

			return select;
		}

	});

	var directoryview = new DirectoryView();
	
} (jQuery));