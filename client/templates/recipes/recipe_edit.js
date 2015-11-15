Template.recipeEdit.onRendered(function() {
  var qs,js,q,s,d=document,gi=d.getElementById,ce=d.createElement,gt=d.getElementsByTagName,id='typef_orm',b='https://s3-eu-west-1.amazonaws.com/share.typeform.com/';if(!gi.call(d,id)){js=ce.call(d,'script');js.id=id;js.src=b+'share.js';q=gt.call(d,'script')[0];q.parentNode.insertBefore(js,q)} //eslint-disable-line
});

Template.recipeEdit.helpers({
  isSelected: function(difficulty) {
    if (this.difficulty === difficulty) {
      return 'selected';
    }
    return '';
  },
});

Template.recipeEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    let currentRecipeId = this._id;

    let recipeProperties = {
      name: $(e.target).find('[name=name]').val(),
      description: $(e.target).find('[name=description]').val(),
      preparationTime: parseInt($('[name=preparation-time]').val(), 10),
      cookingTime: parseInt($('[name=cooking-time]').val(), 10),
      servings: parseInt($('[name=servings]').val(), 10),
      difficulty: parseInt($(e.target).find('[name=difficulty]').val(), 10),
      appliances: $(e.target).find('[name=appliances]').val(),
    };

    Recipes.update(currentRecipeId, { $set: recipeProperties },
    function(error) {
      if (error) {
        alert(error.reason);
      } else {
        Router.go('recipePage', { _id: currentRecipeId });
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm('¿Eliminar esta receta?')) {
      let currentRecipeId = this._id;

      Posts.remove(currentRecipeId);
      Router.go('/');
    }
  },

  'click #back': function() {
    history.back();
  },
});
