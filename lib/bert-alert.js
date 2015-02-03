/*
* Controller: bertAlert
* Template: /lib/bert-alert.html
*/

/*
* Helpers
*/

Template.bertAlert.helpers({
  alert: function(){
    // Get and return our bertAlert session variable to our alert template.
    var bert = Session.get('bertAlert');
    return bert;
  }
});
