Tinytest.add( 'Bert is available on the client', function ( test ) {
  test.equal( typeof Bert, 'object' );
});

Tinytest.add( 'Bert can set an alert on Session', function ( test ) {
  var testMessage = 'Testing Bert\'s ability to display an alert.';

  Bert.alert( testMessage );
  var message = Session.get( 'bertAlert' ).message;

  test.equal( message, testMessage );
});

Tinytest.addAsync( 'Bert can set a default message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'default' );

  Meteor.setTimeout( function() {
    var hasClass = $( '.bert-alert' ).hasClass( 'default' );
    test.equal( hasClass, true );
    next();
  }, 500 );
});

Tinytest.addAsync( 'Bert can set a success message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'success' );

  Meteor.setTimeout( function() {
    var hasClass = $( '.bert-alert' ).hasClass( 'success' );
    test.equal( hasClass, true );
    next();
  }, 500 );
});

Tinytest.addAsync( 'Bert can set an info message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'info' );

  Meteor.setTimeout( function() {
    var hasClass = $( '.bert-alert' ).hasClass( 'info' );
    test.equal( hasClass, true );
    next();
  }, 500 );
});

Tinytest.addAsync( 'Bert can set a warning message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'warning' );

  Meteor.setTimeout( function() {
    var hasClass = $( '.bert-alert' ).hasClass( 'warning' );
    test.equal( hasClass, true );
    next();
  }, 500 );
});

Tinytest.addAsync( 'Bert can set a danger message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'danger' );

  Meteor.setTimeout( function() {
    var hasClass = $( '.bert-alert' ).hasClass( 'danger' );
    test.equal( hasClass, true );
    next();
  }, 500 );
});

Tinytest.addAsync( 'Bert can set a fixed-top message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'default', 'fixed-top' );

  Meteor.setTimeout( function() {
    var hasClass = $( '.bert-alert' ).hasClass( 'fixed-top' );
    test.equal( hasClass, true );
    next();
  }, 500 );
});

Tinytest.addAsync( 'Bert can set a fixed-bottom message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'default', 'fixed-bottom' );

  Meteor.setTimeout( function() {
    var hasClass = $( '.bert-alert' ).hasClass( 'fixed-bottom' );
    test.equal( hasClass, true );
    next();
  }, 500 );
});

Tinytest.addAsync( 'Bert can set a growl-top-left message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'default', 'growl-top-left' );

  Meteor.setTimeout( function() {
    var hasClass = $( '.bert-alert' ).hasClass( 'growl-top-left' );
    test.equal( hasClass, true );
    next();
  }, 500 );
});

Tinytest.addAsync( 'Bert can set a growl-top-right message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'default', 'growl-top-right' );

  Meteor.setTimeout( function() {
    var hasClass = $( '.bert-alert' ).hasClass( 'growl-top-right' );
    test.equal( hasClass, true );
    next();
  }, 500 );
});

Tinytest.addAsync( 'Bert can set a growl-bottom-left message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'default', 'growl-bottom-left' );

  Meteor.setTimeout( function() {
    var hasClass = $( '.bert-alert' ).hasClass( 'growl-bottom-left' );
    test.equal( hasClass, true );
    next();
  }, 500 );
});

Tinytest.addAsync( 'Bert can set a growl-bottom-right message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'default', 'growl-bottom-right' );

  Meteor.setTimeout( function() {
    var hasClass = $( '.bert-alert' ).hasClass( 'growl-bottom-right' );
    test.equal( hasClass, true );
    next();
  }, 500 );
});

Tinytest.addAsync( 'Bert can set a custom icon', function ( test, next ) {
  Bert.alert( 'Testing 123', 'default', 'fixed-top', 'fa-amazon' );

  Meteor.setTimeout( function() {
    var hasClass = $( '.bert-alert i' ).hasClass( 'fa-amazon' );
    test.equal( hasClass, true );
    next();
  }, 500 );
});

Tinytest.addAsync( 'Bert can set a complex message', function ( test, next ) {
  Bert.alert({
    title: 'Now Playing',
    message: 'Artist &mdash; Song Name',
    type: 'info',
    style: 'growl-top-right',
    icon: 'fa-music'
  });

  Meteor.setTimeout( function() {
    var alert = {
      title: $( '.bert-alert .bert-content h5' ).text(),
      message: $( '.bert-alert .bert-content p' ).text(),
      type: $( '.bert-alert' ).hasClass( 'info' ),
      style: $( '.bert-alert' ).hasClass( 'growl-top-right' ),
      icon: $( '.bert-alert i' ).hasClass( 'fa-music' )
    };

    test.equal( alert.title, 'Now Playing' );
    test.equal( alert.message, 'Artist — Song Name' );
    test.equal( alert.type, true );
    test.equal( alert.style, true );
    test.equal( alert.icon, true );
    next();
  }, 500 );
});
