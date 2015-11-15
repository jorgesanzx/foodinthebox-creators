Template.recipesList.helpers({
  recipes: function() {
    return Recipes.find();
  },
});
