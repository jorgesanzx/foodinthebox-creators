Recipes = new Mongo.Collection('recipes');

Recipes.before.insert(function(userId, doc) {
  doc.userId = Meteor.userId();
  doc.description = '';
  doc.preparationTime = 0;
  doc.cookingTime = 0;
  doc.servings = 0;
  doc.difficulty = 0;
  doc.appliances = '';
  doc.ingredients = [];
  doc.steps = [];
  doc.createdAt = Date.now();
  doc.updatedAt = Date.now();
});

Recipes.before.update(function(userId, doc, fieldNames, modifier) {
  modifier.$set = modifier.$set || {};
  modifier.$set.updatedAt = Date.now();
});

Recipes.allow({
  update: function(userId, recipe) { return ownsDocument(userId, recipe); },
  remove: function(userId, recipe) { return ownsDocument(userId, recipe); },
});

Recipes.deny({
  update: function(userId, recipe, fieldNames) {
    // may only edit the following fields:
    return _.without(
      fieldNames,
      'name',
      'description',
      'preparationTime',
      'cookingTime',
      'servings',
      'difficulty',
      'appliances',
      'ingredients',
      'steps',
      'updatedAt'
    ).length > 0;
  },
});

Meteor.methods({
  recipeInsert: function(recipe) {
    check(Meteor.userId(), String);
    check(recipe, { name: String });

    let recipeWithSameName = Recipes.findOne({
      userId: Meteor.userId(),
      name: recipe.name,
    });

    if (recipeWithSameName) {
      return {
        recipeExists: true,
        _id: recipeWithSameName._id,
      };
    }

    let recipeId = Recipes.insert(recipe);

    return {
      _id: recipeId,
    };
  },
});
