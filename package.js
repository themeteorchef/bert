Package.describe({
  name: "themeteorchef:bert",
  version: "3.0.0",
  summary: "A client side, multi-style alerts system for Meteor.",
  git: "http://github.com/themeteorchef/bert",
  documentation: "README.md",
});

Package.onUse(function (api) {
  api.versionsFrom("2.6");

  api.use(
    ["ecmascript", "templating", "session", "fourseven:scss@4.15.0"],
    "client"
  );

  api.addFiles(
    [
      "templates/bert-alert.html",
      "templates/bert-alert.js",
      "templates/body.html",
      "stylesheets/colors.scss",
      "stylesheets/flexbox.scss",
      "stylesheets/bert.scss",
      "bert.js",
    ],
    "client"
  );

  api.export("Bert");
});

Package.onTest(function (api) {
  api.use(["tinytest", "session", "jquery"]);
  api.use("themeteorchef:bert");
  api.addFiles("tests/client.js", "client");
});
