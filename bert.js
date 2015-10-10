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
      default: 'fa-bell',
      success: 'fa-check',
      info: 'fa-info',
      warning: 'fa-warning',
      danger: 'fa-remove'
    };

    this.defaults = {
      custom: false,
      animationSpeed: 300,
      autoHide: true,
      hideDelay: 3500,
      style: 'fixed-top',
      type: 'default'
    };
  }

  alert( message, type, style, icon ) {
    if ( this.isVisible() ) {
      this.hide();
      setTimeout( () => { this.handleAlert( message, type, style, icon ); }, 1000 );
    } else {
      this.handleAlert( message, type, style, icon );
    }
  }

  isVisible() {
    return $( '.bert-alert' ).hasClass( 'show' );
  }

  handleAlert() {
    this.setBertOnSession( arguments );
    setTimeout( () => { this.show(); }, 100 );
    setTimeout( () => { this.hide(); }, this.defaults.hideDelay );
  }

  show() {
    $( '.bert-alert' ).addClass( 'show' );
    setTimeout( () => { $( '.bert-alert' ).addClass( 'animate' ); }, 100 );
    clearTimeout( bertTimer );
  }

  hide() {
    $( '.bert-alert' ).removeClass( 'animate' );
    setTimeout( () => { $( '.bert-alert' ).removeClass( 'show' ); }, 300 );
    setTimeout( () => { this.setBertOnSession( null ); }, 500 );
    clearTimeout( bertTimer );
  }

  setBertOnSession( alert ) {
    if ( alert !== null ) {
      let type = alert[1] || this.defaults.type;

      Session.set( 'bertAlert', {
        message: alert[0] || "",
        type: type,
        style: alert[2] || this.defaults.style,
        icon: alert[3] || this.icons[ type ]
      });
    } else {
      Session.set( 'bertAlert', null );
    }
  }
}

Bert = new BertAlert();
