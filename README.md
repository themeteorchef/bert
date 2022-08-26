### Bert
Bert is a client side, multi-style alerts system for Meteor.

![Say what again!](https://cl.ly/0d3O121h021t/bert.jpg)

#### Contents
1. Installation
2. Upgrade Warning
3. Changes & Deprecations in v2.0.*
4. Basic Usage
5. API & Defaults
6. Customization
7. Tests
4. Contributing
5. License

#### Installation
Bert has a weak dependency on jQuery (similar as Blaze), so you can add jQuery to your Meteor app from a [CDN](https://code.jquery.com/) or a [Meteor package](https://atmospherejs.com/meteor/jquery):
```
meteor add jquery
```

To get Bert into your app, just run the following command from within your project's directory:

```
meteor add themeteorchef:bert
```

#### Upgrade Warning
Bert wasn't too happy about this one. Because Bert relies on the `ecmascript` package, v2.0.* is _not_ compatible with versions of Meteor before 1.2. This means that if you attempt to update Bert in a Meteor application using a version < 1.2, you will receive an error in your terminal. For now, applications that need to remain below 1.2 are advised to pin Bert to `1.1.0`: `meteor add bert@1.1.0`. Bert apologizes for this.

#### Changes & Deprecations in v2.x
Bert hit the gym since v1.0 came out and has dropped some fat and put on a bit of muscle. If you were working with Bert prior to version 2.0 here are a few things to keep in mind:

1. Bert no longer requires you to add the `{{> bertAlert}}` template tag manually. This is automatically added to your application's `<body></body>` tag.
2. <strike>Bert has added support for icons via the `fortawesome:fontawesome` package</strike>. **As of v2.2.0, you are responsible for providing the FontAwesome dependency. This allows you to use any version of that library that you'd like.** [Instructions for installation are found here](https://fontawesome.com/start).
3. Bert has dropped support for setting the following defaults: `animated`, `animationSpeed`, `autoHide`, and `dismmissable`.
4. Like other notification systems, Bert can now be dismissed with a single click, anywhere on the message.
5. Bert went to some self-actualization classes and realized he prefers to always be animated and always hide on his own. Of course, you can suggest how fast he should hide and he'll listen.
6. Bert started experimenting with meditation and found that while he enjoyed CSS, he found [Sass](http://sass-lang.com) to be much more...zen. His CSS is written in Sass, but can still be overridden with plain CSS. Namaste.

Despite having totally ripped abs now—and aside from the changes to defaults mentioned above—Bert's API is 100% backwards compatible. Bert doesn't forget where he came from. Represent.

#### Basic Usage
There are two ways to display messages with Bert. The classic way, passing a message, type, and style:

```
Bert.alert( 'Yes, I do Mind!', 'danger', 'growl-top-right' );
```

And now in v2.0 we also get the Advanced method...

```
// alert with custom hideDelay
Bert.alert({
  title: 'Now Playing',
  message: 'Ernie &mdash; Rubber Duckie',
  type: 'info',
  style: 'growl-top-right',
  icon: 'fas fa-music',
  hideDelay: 5000,
});

// permanent alert without any hide delay
Bert.alert({
  title: 'Now Playing',
  message: 'Ernie &mdash; Rubber Duckie',
  type: 'info',
  style: 'growl-top-right',
  icon: 'fas fa-music',
  permanent: true, // alert stays open without hideDelay
});
```

It's important to point out that the Classic version has also picked up support for adding an icon, but requires that you specify all arguments before it:

```
Bert.alert( 'Ernie, pick up your rubber duckies, now!', 'danger', 'fixed-top', 'fas fa-frown-open' );
```

#### API & Defaults
Bert wants to make sure that your users know how angry (or happy) he is about what they're doing. Bert comes with a handful of ways to get the point across:

- `Bert.types`
  - `default` (default)
  - `success`
  - `info`
  - `warning`
  - `danger`


- `Bert.styles`
  - `fixed-top` (default)
  - `fixed-bottom`
  - `growl-top-left`
  - `growl-top-right`
  - `growl-bottom-left`
  - `growl-bottom-right`


- `Bert.icons` (based on the type passed to Bert)
  - `default`: `'fas fa-bell'`,
  - `success`: `'fas fa-check'`,
  - `info`: `'fas fa-info'`,
  - `warning`: `'fas fa-exclamation-triangle'`,
  - `danger`: `'fas fa-times'`

If you'd like (recommended), you can set any of the values above as defaults, along with a few other settings:

```js
Bert.defaults = {
  hideDelay: 3500,
  // Accepts: a number in milliseconds.
  permanent: false,
  // Accepts: boolean
  style: 'fixed-top',
  // Accepts: fixed-top, fixed-bottom, growl-top-left,   growl-top-right,
  // growl-bottom-left, growl-bottom-right.
  type: 'default'
  // Accepts: default, success, info, warning, danger.
};
```
To add new types and styles, you can call `Bert.types.push( '<type>' )` or `Bert.styles.push( '<style>' )` from anywhere on the client. To change the icon used for one of the pre-defined types, you can call `Bert.icons.<type> = 'fas fa-icon-name'`, or add a new one by calling `Bert.icons[ 'new-type' ] = 'fas fa-icon-name'`. **Heads up**: The `fas` part is defining which sub-library of FontAwesome you're using (solid, regular, and light). Again, Bert _DOES NOT_ load FontAwesome for you, so which classes you use will be dependent on which version of the library you load on your own.

To set a new default, just call `Bert.defaults.<setting>` in your client code. For example, to change Bert's hide delay (how long Bert stays on screen), you can set `Bert.defaults.hideDelay = 2000`. Here, this would make Bert's alerts go away after two seconds instead of three and a half.

#### Customization
Bert was designed to be easily customized to fit your application's styles. The basic template for a Bert alert is:

```html
<template name="bertAlert">
  <div class="bert-alert {{alert.style}} {{alert.type}} clearfix">
    <div class="bert-container">
      <div class="bert-gem">
        <i class="fa {{alert.icon}}"></i>
      </div>
      <div class="bert-content">
        {{#if alert.title}}<h5>{{alert.title}}</h5>{{/if}}
        <p>{{{alert.message}}}</p>
      </div>
    </div>
  </div>
</template>
```

Nice and simple! All of [the CSS](https://github.com/themeteorchef/bert/tree/master/stylesheets/bert.scss) is easily overridden, too. Dress Bert up!

**Note**: the Spacebars helper for outputting Bert `{{{alert.message}}}` makes use of Spacebar's triple mustache convention to prevent escaping of HTML characters. This means you can pass any HTML to Bert and he'll render it inside the alert. For example:

```
Bert.alert( '<h1>Hiya</h1>', 'danger', 'growl-top-right' );
```

![](https://tmc-post-content.s3.amazonaws.com/bert-with-html.gif)

**Fair warning**: this means you're responsible for styling anything you add. Bert is totally flexible thanks to his yoga practice but he's not _that_ flexible.

##### Custom Types/Styles
Bert comes with everything you need out of the box, but is extremely flexible when it comes to adding new types and styles of alerts. For example, we can add some CSS for a new type called `game-added` and use Bert's advanced method for setting alerts:

```javascript
Bert.alert({
  type: 'game-added',
  style: 'growl-bottom-right',
  title: 'Game Added',
  message: 'Final Fantasy VII',
  icon: 'fas fa-gamepad'
});
```
The value of `type` simply gets added to Bert as a CSS class, so we can tweak the colors just by adding a little CSS on the client:

```
.bert-alert.game-added {
  background: purple;
  color: #fff;
}
```

![Customizing Bert's styles](https://tmc-post-content.s3.amazonaws.com/bert-customization.gif)

#### Tests
Bert comes with a suite of TinyTest-based tests to ensure that all of your alerts make it to the client as intended. To run the tests, open up your terminal and type:

```
meteor test-packages themeteorchef:bert
```

Pop open your browser http://localhost:3000. Verify tests are passing. **Note**: if your app is already running on `http://localhost:3000`, you can run tests separately by running `meteor test-packages themeteorchef:bert --port 3001`.

![](https://tmc-post-content.s3.amazonaws.com/Screen-Shot-2015-10-14-12-00-57.png)

#### Contributing
Contributing, forking, and dorking is fully encouraged with Bert! If you'd like to help out with the package, take a look at the [contribution guide](https://github.com/themeteorchef/bert/wiki/Contribution-Guide) and start hacking :)

#### License
The code for this package is licensed under the [MIT License](http://opensource.org/licenses/MIT).
