class BertAlert {
  constructor() {
    this.styles = [
      'fixed-top',
      'fixed-bottom',
      'growl-top-left',
      'growl-top-right',
      'growl-bottom-left',
      'growl-bottom-right'
    ];

    this.types = [
      'default',
      'success',
      'info',
      'warning',
      'danger'
    ];

    this.icons = {
      default: 'fa fa-bell',
      success: 'fa fa-check',
      info: 'fa fa-info',
      warning: 'fa fa-warning',
      danger: 'fa fa-remove'
    };

    this.defaults = {
      autoHide: true,
      hideDelay: 3500,
      style: 'growl-top-right',
      type: 'default'
    };

    setTimeout( () => {
      this.bertAlert = document.getElementById( 'bert-alert' );
    }, 300 );
  }

  alert() {
    if ( this.isVisible() ) {
      this.hide( () => { this.handleAlert( arguments ); });
    } else {
      this.handleAlert( arguments );
    }
  }

  isVisible() {
    return this.bertAlert.classList.contains( 'show' );
  }

  handleAlert( alert ) {
    this.registerClickHandler();
    this.setBertOnSession( alert );
    setTimeout( () => { this.show(); }, 25 );

    if ( this.defaults.autoHide ) {
      this.bertTimer();
    }
  }

  registerClickHandler() {
    this.bertAlert.removeEventListener( 'click', this.handleClick );
    this.handleClick = this.bertAlert.addEventListener( 'click', () => { this.hide(); } );
  }

  bertTimer() {
    clearTimeout( this.timer );
    this.timer = setTimeout( () => { this.hide(); }, this.defaults.hideDelay );
    return this.timer;
  }

  show() {
    let alert        = this.bertAlert,
        alertClasses = alert.classList;

    alertClasses.add( 'show' );
    setTimeout( () => { alertClasses.add( 'animate' ); }, 25 );
  }

  hide( callback ) {
    let alert        = this.bertAlert,
        alertClasses = alert.classList;

    alertClasses.remove( 'animate' );

    setTimeout( () => {
      alertClasses.remove( 'show' );
      Session.set( 'bertAlert', null );
    }, 500 ); // Animation delay is 800ms, this should fire as it completes.

    if ( callback ) {
      // If we have a callback (chained alert), then we want to wait until
      // above hide functions have finished before calling it.
      setTimeout( () => { callback(); }, 510 );
    }
  }

  setBertOnSession( alert ) {
    if ( typeof alert[0] === 'object' ) {
      let type = alert[0].type || this.defaults.type;

      Session.set( 'bertAlert', {
        title: alert[0].title || "",
        message: alert[0].message || "",
        type: type,
        style: alert[0].style || this.defaults.style,
        icon: alert[0].icon || this.icons[ type ]
      });
    } else {
      let type = alert[1] || this.defaults.type;

      Session.set( 'bertAlert', {
        message: alert[0] || "",
        type: type,
        style: alert[2] || this.defaults.style,
        icon: alert[3] || this.icons[ type ]
      });
    }
  }
}

Bert = new BertAlert();
