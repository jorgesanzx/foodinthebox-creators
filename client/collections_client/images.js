let originalsStore = new FS.Store.S3('originals');

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
