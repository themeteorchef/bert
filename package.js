Package.describe({
  name: 'themeteorchef:bert',
  version: '1.0.0',
  summary: 'Client-side curmudgeon for Meteor.',
  git: 'http://github.com/themeteorchef/bert',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  // Set versionsFrom()
  api.versionsFrom('1.0.3.1');

  // Define what resources our package will use.
  api.use([
    'templating',
    'jquery'
  ], 'client');

  // Add files for our package.
  api.addFiles([
    'lib/bert-alert.html',
    'lib/bert.css',
    'lib/bert.js',
    'lib/bert-alert.js'
  ], 'client');

  // Export any global variables in our package so they're visible on the client.
  api.export('Bert');
});

// Tests would go here, but Bert wasn't too happy about testing. Maybe later.
