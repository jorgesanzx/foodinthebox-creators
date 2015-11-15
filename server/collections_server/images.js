let originalsStore = new FS.Store.GridFS('originals');

Images = new FS.Collection('images', {
  stores: [originalsStore],
  filter: {
    allow: {
      contentTypes: ['image/*'],
    },
    onInvalid: function(message) {
      Meteor.isClient && alert(message);
    },
  },
});

Images.allow({
  insert: function(userId, fileObj) {
    return ownsDocument(userId, Recipes.findOne(fileObj.recipeId));
  },
  update: function(userId, fileObj) {
    return ownsDocument(userId, Recipes.findOne(fileObj.recipeId));
  },
  remove: function(userId, fileObj) {
    return ownsDocument(userId, Recipes.findOne(fileObj.recipeId));
  },
  download: function() {
    return true;
  },
});

Images.deny({
  insert: function(userId, fileObj) {
    if (Recipes.findOne(fileObj.recipeId).userId === userId) {
      return false;
    }
    return true;
  },
});
