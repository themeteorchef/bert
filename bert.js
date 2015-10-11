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
      hideDelay: 3500,
      style: 'fixed-top',
      type: 'default'
    };
  }

  alert( message, type, style, icon ) {
    if ( this.isVisible() ) {
      this.hide();
      setTimeout( () => { this.handleAlert( message, type, style, icon ); }, 300 );
    } else {
      this.handleAlert( message, type, style, icon );
    }
  }

  isVisible() {
    return $( '.bert-alert' ).hasClass( 'show' );
  }

  handleAlert() {
    this.registerClickHandler();
    this.setBertOnSession( arguments );
    setTimeout( () => { this.show(); }, 300 );
    this.bertTimer();
  }

  registerClickHandler() {
    $( '.bert-alert' ).off( 'click' );
    $( '.bert-alert' ).on( 'click', () => { this.hide(); } );
  }

  bertTimer() {
    clearTimeout( this.timer );
    this.timer = setTimeout( () => { this.hide(); }, this.defaults.hideDelay );
    return this.timer;
  }

  show() {
    $( '.bert-alert' ).addClass( 'show' );
    setTimeout( () => { $( '.bert-alert' ).addClass( 'animate' ); }, 300 );
    this.bertTimer();
  }

  hide() {
    $( '.bert-alert' ).removeClass( 'animate' );
    setTimeout( () => { $( '.bert-alert' ).removeClass( 'show' ); }, 300 );
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
