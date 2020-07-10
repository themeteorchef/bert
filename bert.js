import 'animate.css';

// Helper function got get a single element with the class name
function getElementByClassName(className) {
  const elems = document.getElementsByClassName(className);
  return elems.length > 0 ? elems[0] : undefined;
}

class BertAlert {
  constructor() {
    // lookup animate.css classes from bert styles
    this.animation = new Map([
      ['fixed-top', {in: 'fadeInDownBig', out: 'fadeOutUpBig'}],
      ['fixed-bottom', {in: 'fadeInUpBig', out: 'fadeOutDownBig'}],
      ['growl-top-left', {in: 'fadeInLeftBig', out: 'fadeOutLeftBig'}],
      ['growl-top-right', {in: 'fadeInRightBig', out: 'fadeOutRightBig'}],
      ['growl-bottom-left', {in: 'fadeInLeftBig', out: 'fadeOutLeftBig'}],
      ['growl-bottom-right', {in: 'fadeInRightBig', out: 'fadeOutRightBig'}]
    ]);

    this.animClasses = {
      in: ['animate__fadeInDownBig', 'animate__fadeInUpBig', 'animate__fadeInLeftBig', 'animate__fadeInRightBig'],
      out: ['animate__fadeOutDownBig', 'animate__fadeOutUpBig', 'animate__fadeOutLeftBig', 'animate__fadeOutRightBig']
    };

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

    this.clickHandler = () => this.hide();
  }

  alert() {
    if( this.isVisible() ) {
      this.hide();
      setTimeout( () => { this.handleAlert( arguments ); }, 300 );
    } else {
      this.handleAlert( arguments );
    }
  }

  isVisible() {
    return getElementByClassName('bert-alert').classList.contains('show');
  }

  getAnimation() {
    // always get animation type from the current
    // session bert style
    const session = Session.get('bertAlert');
    return this.animation.get(session?.style || this.defaults.style);
  }

  handleAlert( alert ) {
    this.registerClickHandler();
    this.setBertOnSession( alert );
    requestAnimationFrame(() => {
      this.show();
      this.bertTimer();
    });
  }

  registerClickHandler() {
    const ba = getElementByClassName('bert-alert');
    ba.removeEventListener('click', this.clickHandler);
    ba.addEventListener('click', this.clickHandler);
  }

  bertTimer() {
    clearTimeout( this.timer );
    this.timer = setTimeout( () => { this.hide(); }, this.defaults.hideDelay );
    return this.timer;
  }

  show() {
    const ba = getElementByClassName('bert-alert');
    const self = this;
    const anim = self.getAnimation();
    requestAnimationFrame(() => {
      ba.classList.add('show', 'animate__animated', `animate__${anim.in}`);
    });
  }

  hide() {
    const anim = this.getAnimation();
    const ba = getElementByClassName('bert-alert');
    // by removing all in animation styles, this will self-heal with timing issues
    ba.classList.remove( ...this.animClasses.in );
    ba.classList.add( 'animate__animated', `animate__${anim.out}` );
    setTimeout( () => {
      ba.classList.remove( 'show' );
      // by removing all out animation styles, this will self-heal with timing issues
      ba.classList.remove( 'animate__animated', ...this.animClasses.out );
      getElementByClassName('bert-icon')?.remove();
      Session.set( 'bertAlert', null );
      // flush is required to make sure that the alert helper
      // toggles from null to a valid object
      Tracker.flush();
    }, 200 );
  }

  setBertOnSession( alert ) {
    // args can come in as an object or ordered arguments
    const style = alert[0].style || alert[2] || this.defaults.style;
    const title = alert[0].title || '';
    const message =  alert[0].message || alert[0] || '';
    const type = alert[0].type || alert[1] || this.defaults.type;
    const iconClass = alert[0].icon || alert[3] || this.icons[ type ];
    const icon = `<div class="bert-icon"><i class="${iconClass}"></i></div>`;

    const baData = {
      title,
      message,
      type,
      style,
      icon
    };

    Session.set( 'bertAlert', baData);
  }
}

Bert = new BertAlert();
