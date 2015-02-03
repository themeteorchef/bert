/*
* Bert
* Client-side curmudgeon for Meteor.
* http://github.com/themeteorchef/bert
*/

// Define the global Bert object.
Bert = {
 acceptedStyles: [
  'fixed-top',
  'fixed-bottom',
  'growl-top-left',
  'growl-top-right',
  'growl-bottom-left',
  'growl-bottom-right'
 ],
 acceptedTypes: [
  'default',
  'success',
  'info',
  'warning',
  'danger'
 ],
 defaults: {
  animated: true,
  // Accepts: true or false.
  animationSpeed: 300,
  // Accepts: integer value in milliseconds.
  // Note: this value needs to match the speed of the CSS transition-duration
  // property on the .bert-alert.animated class. If it doesn't, Bert will freak.
  autoHide: true,
  // Accepts: true or false.
  dismissable: true,
  // Accepts: true or false.
  hideDelay: 3500,
  // Accepts: integer value in milliseconds.
  style: "fixed-top",
  // Accepts: fixed-top, fixed-bottom, growl-top-left, growl-top-right,
  // growl-bottom-left, growl-bottom-right.
  type: "default"
  // Accepts: default, success, info, warning, danger.
 }
}

// Method: Bert.open()
Bert.open = function(bert) {
  // Toggle visible class on Bert.
  bert.addClass('visible');

  // If Bert is animated, toggle the class and then run the animation.
  if ( Bert.defaults.animated ){
    bert.addClass('animated');
    setTimeout(function(){
      bert.addClass('move');
    }, 100);
  }

  // Reset our timer.
  clearTimeout(Bert.timer);
}

// Method: Bert.close()
Bert.close = function(bert) {
  // Remove animated class.
  bert.removeClass('move');

  // Define a function to call to handle closing Bert.
  var handleClose = function(bert){
    // Toggle visible class on Bert.
    bert.removeClass('visible');

    // Reset bertAlert session variable.
    Session.set("bertAlert", null);

    // Reset our timer.
    clearTimeout(Bert.timer);
  }

  // If Bert is animated, wrap our call to handleClose in a setTimeout.
  if ( Bert.defaults.animated ){
    setTimeout(function(){
      handleClose(bert);
      bert.removeClass('animated');
    }, Bert.defaults.animationSpeed);
  } else {
    handleClose(bert);
  }
}

// Method: Bert.dismiss()
Bert.dismiss = function(bert){
  // Add a click event to Bert.
  bert.on('click', 'span', function(){
    Bert.close(bert);
  });
}

// Method: Bert.alert()
Bert.alert = function(message, type, style){
  // Get access to Bert in the DOM.
  var bertAlert = $('.bert-alert');

  // Wrap all of our reveal functions and settings in a function that can be
  // called based on Bert's current visibility.
  var setupBert = function(bertAlert){
    // Set some defauls for our type and style checks.
    var hasType  = true;
    var hasStyle = true;

    // Double check our type argument to make sure it's accepted by Bert.
    if ( Bert.acceptedTypes.indexOf(type) == -1 ){
      hasType = false;
    }

    // Double check our style argument to make sure it's accepted by Bert.
    if ( Bert.acceptedStyles.indexOf(style) == -1 ){
      hasStyle = false;
    }

    // Set Bert's contents based on our arguments and settings.
    Session.set("bertAlert", {
      dismissable: Bert.defaults.dismissable,
      message: message || null,
      style: hasStyle == true ? style : Bert.defaults.style,
      type: hasType == true ? type : Bert.defaults.type
    });

    // Wake up, Bert.
    Bert.open(bertAlert);

    // If we defined autoHide, get our delay and run a setTimeout.
    // Set our timeout equal to a variable on the global object so
    // we can reset it if we change our alert during a previous loop.
    if ( Bert.defaults.autoHide ) {
      Bert.timer = setTimeout(function(){
        // Go to bed, Bert.
        Bert.close(bertAlert);
      }, Bert.defaults.hideDelay);
    }

    // If Bert is dismissable, call to add our click event.
    if ( Bert.defaults.dismissable ){
      Bert.dismiss(bertAlert);
    }
  }

  // If Bert is already visible in the DOM, go ahead and close him up before we
  // update him with our new message.
  if ( bertAlert.is(':visible') ){
    // If Bert is visible, close him up.
    Bert.close(bertAlert);

    // After waiting a second, go ahead and open Bert back up.
    if ( Bert.defaults.animated ){
      setTimeout(function(){
        setupBert(bertAlert);
      }, Bert.defaults.animationSpeed + 300);
    } else {
      setupBert(bertAlert);
    }
  } else {
    // If Bert isn't on screen yet, just go ahead and reveal him.
    setupBert(bertAlert);
  }
}
