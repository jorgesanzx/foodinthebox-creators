Template.stepByStepEdit.events({
  'change #imageInput': function(event) {
    let currentRecipeId = this._id;

    FS.Utility.eachFile(event, function(file) {
      let f = new FS.File(file);
      FS.Utility.extend(f, { recipeId: currentRecipeId });
      Images.insert(f, function(error, fileObj) {
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
      let f = new FS.File(file);
      FS.Utility.extend(f, { recipeId: currentRecipeId });
      Images.insert(f, function(error, fileObj) {
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

  'submit form': function(e) {
    e.preventDefault();

    let currentRecipeId = this._id;

    let oldSteps = this.steps;
    let newSteps = $('textarea').map(function(index, item) {
      return { image: oldSteps[index].image, text: item.value };
    }).get();

    Recipes.update(
      currentRecipeId,
      { $set: { steps: newSteps } },
      function(error) {
        if (error) {
          // display the error to the user
          alert(error.reason);
        } else {
          Router.go('stepByStepPage', { _id: currentRecipeId });
        }
      }
    );
  },

  'click #back': function() {
    history.back();
  },
});
