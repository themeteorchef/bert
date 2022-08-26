/* globals requestAnimationFrame */

class BertAlert {
  constructor() {
    this.styles = [
      'fixed-top',
      'fixed-bottom',
      'growl-top-left',
      'growl-top-right',
      'growl-bottom-left',
      'growl-bottom-right',
    ];

    this.types = [
      'default',
      'success',
      'info',
      'warning',
      'danger',
    ];

    this.icons = {
      default: 'fa-solid fa-bell',
      success: 'fa-solid fa-check',
      info: 'fa-solid fa-circle-info',
      warning: 'fa-solid fa-triangle-exclamation',
      danger: 'fa-solid fa-xmark',
    };

    this.defaults = {
      hideDelay: 3500,
      permanent: false,
      style: 'fixed-top',
      type: 'default',
    };
  }

  alert(...args) {
    if (this.isVisible()) {
      this.hide();
      setTimeout(() => this.handleAlert(args), 300);
    } else {
      this.handleAlert(args);
    }
  }

  isVisible() {
    return $('.bert-alert').hasClass('show');
  }

  handleAlert(alert) {
    this.registerClickHandler();
    this.setBertOnSession(alert);
    requestAnimationFrame(() => this.show());
    this.bertTimer(alert);
  }

  registerClickHandler() {
    $('.bert-alert')
      .off('click')
      .on('click', () => this.hide());
  }

  bertTimer(alert) {
    clearTimeout(this.timer);
    let { hideDelay, permanent } = this.defaults;

    if (typeof alert[0] === 'object') {
      ([{ hideDelay, permanent }] = alert);
    }
    if (!permanent) {
      this.timer = setTimeout(() => this.hide(), hideDelay);
    }
  }

  show() {
    $('.bert-alert').addClass('show').delay(25).queue(() => {
      $('.bert-alert').addClass('animate').dequeue();
    });
  }

  hide() {
    $('.bert-alert').removeClass('animate');
    setTimeout(() => {
      $('.bert-alert').removeClass('show');
      Session.set('bertAlert', null);
    }, 300);
  }

  setBertOnSession(alert) {
    if (typeof alert[0] === 'object') {
      const type = alert[0].type || this.defaults.type;

      Session.set('bertAlert', {
        title: alert[0].title || '',
        message: alert[0].message || '',
        type,
        style: alert[0].style || this.defaults.style,
        icon: alert[0].icon || this.icons[type],
      });
    } else {
      const type = alert[1] || this.defaults.type;

      Session.set('bertAlert', {
        message: alert[0] || '',
        type,
        style: alert[2] || this.defaults.style,
        icon: alert[3] || this.icons[type],
      });
    }
  }
}

// eslint-disable-next-line no-global-assign
Bert = new BertAlert();
