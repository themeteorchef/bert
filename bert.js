function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
      default: 'fas fa-bell',
      success: 'fas fa-check',
      info: 'fas fa-info',
      warning: 'fas fa-exclamation-triangle',
      danger: 'fas fa-times'
    };

    this.defaults = {
      hideDelay: 3500,
      style: 'fixed-top',
      type: 'default'
    };
  }

  alert() {
    if ( this.isVisible() ) {
      this.hide();
      setTimeout( () => { this.handleAlert( arguments ); }, 300 );
    } else {
      this.handleAlert( arguments );
    }
  }

  isVisible() {
    // return $( '.bert-alert' ).hasClass( 'show' );
    const el = document.getElementsByClassName('bert-alert')[0];
    return el.classList.contains('show');
  }

  handleAlert( alert ) {
    this.registerClickHandler();
    this.setBertOnSession( alert );
    requestAnimationFrame(() => this.show());
    this.bertTimer();
  }

  registerClickHandler() {

    // $( '.bert-alert' ).off( 'click' );
    // $( '.bert-alert' ).on( 'click', () => { this.hide(); } );
    const el = document.getElementsByClassName('bert-alert')[0];
    el.removeEventListener('click', () => {});
    el.addEventListener('click', () => { this.hide(); } );
  }

  bertTimer() {
    clearTimeout( this.timer );
    this.timer = setTimeout( () => { this.hide(); }, this.defaults.hideDelay );
    return this.timer;
  }

  show() {
    // $( '.bert-alert' ).addClass( 'show' ).delay( 25 ).queue( () => {
    //   $( '.bert-alert' ).addClass( 'animate' ).dequeue();
    // });

    const el = document.getElementsByClassName('bert-alert')[0];
    el.classList.add('show');
    delay(25).then(() => el.classList.add('animate'))
  }

  hide() {
    // $( '.bert-alert' ).removeClass( 'animate' );
    // setTimeout( () => {
    //   $( '.bert-alert' ).removeClass( 'show' );
    //   $( '.bert-icon').remove();
    //   Session.set( 'bertAlert', null );
    // }, 300 );
    const el = document.getElementsByClassName('bert-alert')[0];
    el.classList.remove('animate');
    delay(300).then(() => {
      el.classList.remove('show');
      const el2 = document.getElementsByClassName('bert-icon')[0];
      if (el2.parentNode !== null) {
        el2.parentNode.removeChild(el2);
      }
      Session.set( 'bertAlert', null );
    })


  }

  setBertOnSession( alert ) {
    if ( typeof alert[0] === 'object' ) {
      let type = alert[0].type || this.defaults.type;
      const icon = alert[0].icon || this.icons[ type ];

      Session.set( 'bertAlert', {
        title: alert[0].title || "",
        message: alert[0].message || "",
        type: type,
        style: alert[0].style || this.defaults.style,
        icon: `<div class="bert-icon"><i class="${icon}"></i></div>`
      });
    } else {
      let type = alert[1] || this.defaults.type;
      const icon = alert[3] || this.icons[ type ];

      Session.set( 'bertAlert', {
        message: alert[0] || "",
        type: type,
        style: alert[2] || this.defaults.style,
        icon: `<div class="bert-icon"><i class="${icon}"></i></div>`
      });
    }
  }
}

Bert = new BertAlert();
