Tinytest.add( 'Bert is available on the client', function ( test ) {
  test.equal( typeof Bert, 'object' );
});

Tinytest.addAsync( 'Bert can set an alert on Session', function ( test, next ) {
  var testMessage = 'Testing Bert\'s ability to display an alert.';

  Bert.alert( testMessage );
  var message = Session.get( 'bertAlert' ).message;

  Meteor.setTimeout( function() {
    test.equal( message, testMessage );
    next();
  }, 1000 );
});

Tinytest.addAsync( 'Bert can set a default message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'default' );

  Meteor.setTimeout( function() {
    var hasClass = document.getElementById( 'bert-alert' ).classList.contains( 'default' );
    test.equal( hasClass, true );
    next();
  }, 1000 );
});

Tinytest.addAsync( 'Bert can set a success message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'success' );

  Meteor.setTimeout( function() {
    var hasClass = document.getElementById( 'bert-alert' ).classList.contains( 'success' );
    test.equal( hasClass, true );
    next();
  }, 1000 );
});

Tinytest.addAsync( 'Bert can set an info message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'info' );

  Meteor.setTimeout( function() {
    var hasClass = document.getElementById( 'bert-alert' ).classList.contains( 'info' );
    test.equal( hasClass, true );
    next();
  }, 1000 );
});

Tinytest.addAsync( 'Bert can set a warning message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'warning' );

  Meteor.setTimeout( function() {
    var hasClass = document.getElementById( 'bert-alert' ).classList.contains( 'warning' );
    test.equal( hasClass, true );
    next();
  }, 1000 );
});

Tinytest.addAsync( 'Bert can set a danger message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'danger' );

  Meteor.setTimeout( function() {
    var hasClass = document.getElementById( 'bert-alert' ).classList.contains( 'danger' );
    test.equal( hasClass, true );
    next();
  }, 1000 );
});

Tinytest.addAsync( 'Bert can set a fixed-top message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'default', 'fixed-top' );

  Meteor.setTimeout( function() {
    var hasClass = document.getElementById( 'bert-alert' ).classList.contains( 'fixed-top' );
    test.equal( hasClass, true );
    next();
  }, 1000 );
});

Tinytest.addAsync( 'Bert can set a fixed-bottom message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'default', 'fixed-bottom' );

  Meteor.setTimeout( function() {
    var hasClass = document.getElementById( 'bert-alert' ).classList.contains( 'fixed-bottom' );
    test.equal( hasClass, true );
    next();
  }, 1000 );
});

Tinytest.addAsync( 'Bert can set a growl-top-left message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'default', 'growl-top-left' );

  Meteor.setTimeout( function() {
    var hasClass = document.getElementById( 'bert-alert' ).classList.contains( 'growl-top-left' );
    test.equal( hasClass, true );
    next();
  }, 1000 );
});

Tinytest.addAsync( 'Bert can set a growl-top-right message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'default', 'growl-top-right' );

  Meteor.setTimeout( function() {
    var hasClass = document.getElementById( 'bert-alert' ).classList.contains( 'growl-top-right' );
    test.equal( hasClass, true );
    next();
  }, 1000 );
});

Tinytest.addAsync( 'Bert can set a growl-bottom-left message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'default', 'growl-bottom-left' );

  Meteor.setTimeout( function() {
    var hasClass = document.getElementById( 'bert-alert' ).classList.contains( 'growl-bottom-left' );
    test.equal( hasClass, true );
    next();
  }, 1000 );
});

Tinytest.addAsync( 'Bert can set a growl-bottom-right message', function ( test, next ) {
  Bert.alert( 'Testing 123', 'default', 'growl-bottom-right' );

  Meteor.setTimeout( function() {
    var hasClass = document.getElementById( 'bert-alert' ).classList.contains( 'growl-bottom-right' );
    test.equal( hasClass, true );
    next();
  }, 1000 );
});

Tinytest.addAsync( 'Bert can set a custom icon', function ( test, next ) {
  Bert.alert( 'Testing 123', 'default', 'fixed-top', 'fa fa-amazon' );

  var alertElement = document.getElementById( 'bert-alert' );

  Meteor.setTimeout( function() {
    var hasClass = alertElement.getElementsByTagName( 'i' )[ 0 ].classList.contains( 'fa-amazon' );
    test.equal( hasClass, true );
    next();
  }, 1000 );
});

Tinytest.addAsync( 'Bert can set a complex message', function ( test, next ) {
  Bert.alert({
    title: 'Now Playing',
    message: 'Artist &mdash; Song Name',
    type: 'info',
    style: 'growl-top-right',
    icon: 'fa fa-music'
  });

  Meteor.setTimeout( function() {
    var alertElement = document.getElementById( 'bert-alert' ),
        alertClasses = alertElement.classList;

    var alert = {
      title: alertElement.getElementsByTagName( 'h5' )[ 0 ].innerText,
      message: alertElement.getElementsByTagName( 'p' )[ 0 ].innerText,
      type: alertClasses.contains( 'info' ),
      style: alertClasses.contains( 'growl-top-right' ),
      icon: alertElement.getElementsByTagName( 'i' )[ 0 ].classList.contains( 'fa-music' )
    };

    test.equal( alert.title, 'Now Playing' );
    test.equal( alert.message, 'Artist — Song Name' );
    test.equal( alert.type, true );
    test.equal( alert.style, true );
    test.equal( alert.icon, true );
    next();
  }, 1000 );
});
