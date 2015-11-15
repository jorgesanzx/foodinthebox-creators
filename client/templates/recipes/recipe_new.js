Template.recipeNew.events({
  'click #complete-data': function(e) {
    e.preventDefault();

    let recipe = { name: $('[name=name]').val() };

    Meteor.call('recipeInsert', recipe, function(error, result) {
      if (error) { return alert(error.reason); }

      if (result.recipeExists) {
        alert('Ya tienes una receta con ese nombre');
        Router.go('recipePage', { _id: result._id });
      }

      Router.go('recipeEdit', { _id: result._id });
    });
  },

  'click #create-step-by-step': function(e) {
    e.preventDefault();

    let recipe = { name: $('#name').val() };

    Meteor.call('recipeInsert', recipe, function(error, result) {
      if (error) { return alert(error.reason); }

      if (result.recipeExists) {
        alert('Ya tienes una receta con ese nombre');
        Router.go('recipePage', { _id: result._id });
      }

      Router.go('stepByStepNew', { _id: result._id });
    });
  },
});
