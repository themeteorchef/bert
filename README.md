## Bert - Client Side Curmudgeon
Bert is a client-side, multi-display alerts system for Meteor.

![Angry Bert](http://i0.kym-cdn.com/photos/images/original/000/417/099/955.jpg)

## Installation

`meteor add themeteorchef:bert`

#### Features
- Multiple Styles (Fixed Top, Fixed Bottom, and Four-Corner Growl)
- Multiple Types (Default, Success, Info, Warning, and Danger)
- Optional Animations

#### Contents

1. Basic Usage
2. API & Defaults
3. Customization
4. Contributing
5. License

#### Basic Usage
Bert is angry, but surprisingly easy to get along with. Getting Bert into your app requires two steps:

1. Include the `{{>bertAlert}}` template somewhere in your app. Bert recommends placing this either just inside your `<body>` tag, or, if you're using something like [Iron Router](https://github.com/eventedmind/iron-router), just inside your layout template.

2. When you want to throw an alert in your code simply call:
```js
Bert.alert('<message>', '<type>', '<style>');
```

That's it! Bert will handle the rest. For example, if we wanted to tell Ernie to pick up his rubber duckies, we might call:

```js
Bert.alert('Ernie, tubby time is over! Pick up your duckies, now!', 'danger', 'growl-top-right');
```
...which would get us something like this:

![Danger Alert Example](http://cl.ly/ZbPa/Image%202015-02-03%20at%2011.56.44%20AM.png)

#### API & Defaults
Bert wants to make sure that your users know how angry (or happy) he is about what they're doing. Bert comes with a handful of ways to get the point across:

- `<type>`
  - `default` (default)
  - `success`
  - `info`
  - `warning`
  - `danger`


- `<style>`
  - `fixed-top` (default)
  - `fixed-bottom`
  - `growl-top-left`
  - `growl-top-right`
  - `growl-bottom-left`
  - `growl-bottom-right`

If you'd like (recommended), you can set any of the values above as defaults, along with a handful of other settings:

```js
Bert = {
 defaults: {
  animated: true,
  // Accepts: true or false.
  animationSpeed: 300,
  // Accepts: integer value in milliseconds.
  // Note: this value needs to match the speed of the CSS transition-duration
  // property on the .bert-alert.animated class. If it doesn't, Bert will freak out.
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
```
To set a new default, just call `Bert.defaults.<setting>` in your client code. For example, to disable Bert's `autoHide` functionality, you would set `Bert.defaults.autoHide = false;`.

#### Customization
Bert was designed to be easily customized to fit your application's styles. The basic template for a Bert alert is:

```html
<template name="bertAlert">
  <div class="bert-alert {{alert.style}} {{alert.type}} clearfix">
    <div class="container">
      <p>{{{alert.message}}}</p>
      {{#if alert.dismissable}}
        <span>&times;</span>
      {{/if}}
    </div> <!-- end .container -->
  </div> <!-- end .bert-alert -->
</template>
```

Nice and simple! All of [the CSS](https://github.com/themeteorchef/bert/tree/master/lib/bert.css) is easily overridden, too. Dress Bert up!

**Note**: the handlebars helper for outputting Bert `{{{alert.message}}}` makes use of Handlebar's triple mustache convention to prevent escaping of HTML characters. This means you can pass any HTML to Bert and he'll render it inside the alert. For example:

```
Bert.alert("<h1>Hiya</h1>", 'danger', 'growl-top-right');
```

Keep in mind: this means you're responsible for styling anything you add.

##### Animation Speed
A quick note about animation speed. If `animated` is set to `true` in the defaults, you can specify the speed at which your alerts come in and out of view. Keep in mind this requires two changes: setting the `animationSpeed` value in `Bert.defaults` as well as specifying the animation speed in your CSS. For example, if we wanted to change Bert's default speed of `300` milliseconds to be a bit slower, we would do:

```js
// Somewhere in our client code.
Bert.defaults.animationSpeed = 1000;
```

```css
.bert-alert.animated {
  transition-duration: 1s;
}
```

Notice the difference? Our `animationSpeed` property is in milliseconds, while our `transition-duration` property is in seconds. Of note, fractional seconds are set in the by prefixing your value with a dot `transition-duration: .5s`, or, `transition-duration: 1.5s`.

#### Contributing
Contributing, forking, and dorking is fully encouraged with Bert! If you'd like to help out with the package, take a look at the [contribution guide](https://github.com/themeteorchef/bert/wiki/Contribution-Guide) and start hacking :)

#### License
The code for this package is licensed under the [MIT License](http://opensource.org/licenses/MIT).
