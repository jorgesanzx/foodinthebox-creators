Template.stepByStepNew.helpers({
  stepTwo: function() {
    if (this.steps.length === 1) {
      return true;
    }
    return false;
  },

  stepHigherThanTwo: function() {
    if (this.steps.length > 1) {
      return true;
    }
    return false;
  },
});

Template.stepByStepNew.events({
  'change #imageInput': function(event) {
    let currentRecipeId = this._id;

    FS.Utility.eachFile(event, function(file) {
      let fsFile = new FS.File(file);
      fsFile.recipeId = currentRecipeId;
      Images.insert(fsFile, function(error, fileObj) {
        if (error) {
          alert(error.reason);
        } else {
          Recipes.update(
            currentRecipeId,
            { $push: { steps: { image: fileObj._id, text: '' } } },
            function(err) {
              if (err) {
                alert(err.reason);
              }
            }
          );
        }
      });
    });
  },

  'dropped #imageInput': function(event) {
    let currentRecipeId = this._id;

    FS.Utility.eachFile(event, function(file) {
      let fsFile = new FS.File(file);
      fsFile.recipeId = currentRecipeId;
      Images.insert(fsFile, function(error, fileObj) {
        if (error) {
          alert(error.reason);
        } else {
          Recipes.update(
            currentRecipeId,
            { $push: { steps: { image: fileObj._id, text: '' } } },
            function(err) {
              if (err) {
                alert(err.reason);
              }
            }
          );
        }
      });
    });
  },

  'click #back': function() {
    history.back();
  },

  'click #next-step': function() {
    $('#myModal').modal('hide');

    let currentRecipeId = this._id;
    setTimeout(function() {
      Router.go('stepByStepEdit', { _id: currentRecipeId });
    }, 500);
  },
});
