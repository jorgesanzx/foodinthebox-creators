Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.route('/', {
  action: function() {
    if (! Meteor.user()) {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else {
        this.render('login');
      }
    } else {
      this.wait([Meteor.subscribe('ownRecipes'), Meteor.subscribe('images')]);
      this.layout('layout');
      this.render('recipesList');
    }
  },
  layoutTemplate: '',
  name: 'home',
});

Router.route('/recetas/nueva', { name: 'recipeNew' });

Router.route('/recetas/:_id', {
  name: 'recipePage',
  data: function() { return Recipes.findOne(this.params._id); },
  waitOn: function() {
    return [Meteor.subscribe('ownRecipes'), Meteor.subscribe('images')];
  },
});

Router.route('/recetas/:_id/editar', {
  name: 'recipeEdit',
  data: function() { return Recipes.findOne(this.params._id); },
  waitOn: function() {
    return [Meteor.subscribe('ownRecipes'), Meteor.subscribe('images')];
  },
});

Router.route('/recetas/:_id/paso-a-paso', {
  name: 'stepByStepPage',
  data: function() { return Recipes.findOne(this.params._id); },
  waitOn: function() {
    return [Meteor.subscribe('ownRecipes'), Meteor.subscribe('images')];
  },
});

Router.route('/recetas/:_id/paso-a-paso/nuevo', {
  name: 'stepByStepNew',
  data: function() { return Recipes.findOne(this.params._id); },
  waitOn: function() {
    return [Meteor.subscribe('ownRecipes'), Meteor.subscribe('images')];
  },
});

Router.route('/recetas/:_id/paso-a-paso/editar', {
  name: 'stepByStepEdit',
  data: function() { return Recipes.findOne(this.params._id); },
  waitOn: function() {
    return [Meteor.subscribe('ownRecipes'), Meteor.subscribe('images')];
  },
});

function requireLogin() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.layout();
      this.render('login');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin);
Router.onBeforeAction('dataNotFound', { only: 'recipePage' });
