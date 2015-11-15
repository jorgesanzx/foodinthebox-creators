Template.recipePage.helpers({
  difficultyText: function() {
    if (this.difficulty === 0) {
      return '';
    } else if (this.difficulty === 1) {
      return 'Fácil';
    } else if (this.difficulty === 2) {
      return 'Media';
    }
    return 'Difícil';
  },

  hasSteps: function() {
    return this.steps.length === 0;
  },
});
