Package.describe({
  name: 'themeteorchef:bert',
  version: '2.0.0',
  summary: 'Client-side curmudgeon for Meteor.',
  git: 'http://github.com/themeteorchef/bert',
  documentation: 'README.md'
});

Package.onUse( function( api ) {
  api.versionsFrom( '1.2.0.2' );

  api.use([
    'ecmascript',
    'templating',
    'jquery',
    'velocityjs:velocityjs@1.2.1',
    'fourseven:scss@3.3.3_3',
    'fortawesome:fontawesome@4.4.0'
  ], 'client');

  api.addFiles([
    'templates/bert-alert.html',
    'templates/bert-alert.js',
    'stylesheets/colors.scss',
    'stylesheets/flexbox.scss',
    'stylesheets/bert.scss',
    'bert.js',
  ], 'client');

  api.export( 'Bert' );
});
