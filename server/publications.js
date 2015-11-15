Meteor.publish('ownRecipes', function() {
  return Recipes.find({ userId: this.userId });
});

Meteor.publish('images', function() {
  return Images.find();
});
