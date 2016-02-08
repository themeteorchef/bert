Tinytest.add( 'Bert is available on the client', function ( test ) {
  test.equal( typeof Bert, 'object' );
});

Tinytest.add( 'Bert can set an alert on Session', function( test ) {
  Bert.alert( 'Yes, I do mind!' );
  var bertOnSession = Session.get( 'bertAlert' );
  test.equal( bertOnSession.message, 'Yes, I do mind!' );
});

Tinytest.addAsync( 'Bert can set a default message', function( test, next ) {
  Bert.alert( 'Yes, I do mind!', 'default' );

  setTimeout( function() {
    var bertElement = document.getElementById( 'bert-alert' ),
        bertClasses = bertElement.classList,
        hasClass    = bertClasses.contains( 'default' );
    test.equal( hasClass, true );
    next();
  }, 3000 );
});

Tinytest.addAsync( 'Bert can set a success message', function( test, next ) {
  Bert.alert( 'Yes, I do mind!', 'success' );

  setTimeout( function() {
    var bertElement = document.getElementById( 'bert-alert' ),
        bertClasses = bertElement.classList,
        hasClass    = bertClasses.contains( 'success' );
    test.equal( hasClass, true );
    next();
  }, 3000 );
});

Tinytest.addAsync( 'Bert can set an info message', function( test, next ) {
  Bert.alert( 'Yes, I do mind!', 'info' );
  var bertElement = document.getElementById( 'bert-alert' ),
      bertClasses = bertElement.classList,
      hasClass    = bertClasses.contains( 'info' );

  console.log( hasClass );
  test.equal( hasClass, true );

  setTimeout( function() { next(); }, 1000 );
});

//
// Tinytest.addAsync( 'Bert can set an info message', function ( test, next ) {
//   Bert.alert( 'Testing 123', 'info' );
//
//   var bertClasses = document.getElementById( 'bert-alert' ).classList;
//
//   Meteor.setTimeout( function() {
//     var hasClass = bertClasses.contains( 'info' );
//     test.equal( hasClass, true );
//     next();
//   }, 1000 );
// });
//
// Tinytest.addAsync( 'Bert can set a warning message', function ( test, next ) {
//   Bert.alert( 'Testing 123', 'warning' );
//
//   var bertClasses = document.getElementById( 'bert-alert' ).classList;
//
//   Meteor.setTimeout( function() {
//     var hasClass = bertClasses.contains( 'warning' );
//     test.equal( hasClass, true );
//     next();
//   }, 1000 );
// });
//
// Tinytest.addAsync( 'Bert can set a danger message', function ( test, next ) {
//   Bert.alert( 'Testing 123', 'danger' );
//
//   var bertClasses = document.getElementById( 'bert-alert' ).classList;
//
//   Meteor.setTimeout( function() {
//     var hasClass = bertClasses.contains( 'danger' );
//     test.equal( hasClass, true );
//     next();
//   }, 1000 );
// });
//
// Tinytest.addAsync( 'Bert can set a fixed-top message', function ( test, next ) {
//   Bert.alert( 'Testing 123', 'default', 'fixed-top' );
//
//   var bertClasses = document.getElementById( 'bert-alert' ).classList;
//
//   Meteor.setTimeout( function() {
//     var hasClass = bertClasses.contains( 'fixed-top' );
//     test.equal( hasClass, true );
//     next();
//   }, 1000 );
// });
//
// Tinytest.addAsync( 'Bert can set a fixed-bottom message', function ( test, next ) {
//   Bert.alert( 'Testing 123', 'default', 'fixed-bottom' );
//
//   var bertClasses = document.getElementById( 'bert-alert' ).classList;
//
//   Meteor.setTimeout( function() {
//     var hasClass = bertClasses.contains( 'fixed-bottom' );
//     test.equal( hasClass, true );
//     next();
//   }, 1000 );
// });
//
// Tinytest.addAsync( 'Bert can set a growl-top-left message', function ( test, next ) {
//   Bert.alert( 'Testing 123', 'default', 'growl-top-left' );
//
//   var bertClasses = document.getElementById( 'bert-alert' ).classList;
//
//   Meteor.setTimeout( function() {
//     var hasClass = bertClasses.contains( 'growl-top-left' );
//     test.equal( hasClass, true );
//     next();
//   }, 1000 );
// });
//
// Tinytest.addAsync( 'Bert can set a growl-top-right message', function ( test, next ) {
//   Bert.alert( 'Testing 123', 'default', 'growl-top-right' );
//
//   var bertClasses = document.getElementById( 'bert-alert' ).classList;
//
//   Meteor.setTimeout( function() {
//     var hasClass = bertClasses.contains( 'growl-top-right' );
//     test.equal( hasClass, true );
//     next();
//   }, 1000 );
// });
//
// Tinytest.addAsync( 'Bert can set a growl-bottom-left message', function ( test, next ) {
//   Bert.alert( 'Testing 123', 'default', 'growl-bottom-left' );
//
//   var bertClasses = document.getElementById( 'bert-alert' ).classList;
//
//   Meteor.setTimeout( function() {
//     var hasClass = bertClasses.contains( 'growl-bottom-left' );
//     test.equal( hasClass, true );
//     next();
//   }, 1000 );
// });
//
// Tinytest.addAsync( 'Bert can set a growl-bottom-right message', function ( test, next ) {
//   Bert.alert( 'Testing 123', 'default', 'growl-bottom-right' );
//
//   var bertClasses = document.getElementById( 'bert-alert' ).classList;
//
//   Meteor.setTimeout( function() {
//     var hasClass = bertClasses.contains( 'growl-bottom-right' );
//     test.equal( hasClass, true );
//     next();
//   }, 1000 );
// });
//
// Tinytest.addAsync( 'Bert can set a custom icon', function ( test, next ) {
//   Bert.alert( 'Testing 123', 'default', 'fixed-top', 'fa fa-amazon' );
//
//   var alertElement = document.getElementById( 'bert-alert' );
//
//   Meteor.setTimeout( function() {
//     var hasClass = alertElement.getElementsByTagName( 'i' )[ 0 ].classList.contains( 'fa-amazon' );
//     test.equal( hasClass, true );
//     next();
//   }, 1000 );
// });
//
// Tinytest.addAsync( 'Bert can set a complex message', function ( test, next ) {
//   Bert.alert({
//     title: 'Now Playing',
//     message: 'Artist &mdash; Song Name',
//     type: 'info',
//     style: 'growl-top-right',
//     icon: 'fa fa-music'
//   });
//
//   Meteor.setTimeout( function() {
//     var bertElement = document.getElementById( 'bert-alert' ),
//         bertClasses = bertElement.classList;
//
//     var alert = {
//       title: bertElement.getElementsByTagName( 'h5' )[ 0 ].innerText,
//       message: bertElement.getElementsByTagName( 'p' )[ 0 ].innerText,
//       type: bertClasses.contains( 'info' ),
//       style: bertClasses.contains( 'growl-top-right' ),
//       icon: bertElement.getElementsByTagName( 'i' )[ 0 ].classList.contains( 'fa-music' )
//     };
//
//     test.equal( alert.title, 'Now Playing' );
//     test.equal( alert.message, 'Artist — Song Name' );
//     test.equal( alert.type, true );
//     test.equal( alert.style, true );
//     test.equal( alert.icon, true );
//     next();
//   }, 1000 );
// });
