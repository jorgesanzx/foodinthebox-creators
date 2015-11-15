Template.recipeItem.helpers({
  thumbnail: function() {
    if (typeof this.steps[0] !== 'undefined') {
      return this.steps[this.steps.length - 1].image;
    }
  },
});
