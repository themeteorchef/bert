Package.describe({
  name: "jirikrepl:bert",
  version: "2.2.3",
  summary: "A client side, multi-style alerts system for Meteor.",
  git: "https://github.com/jirikrepl/bert",
  documentation: "README.md",
});

Package.onUse(function (api) {
  api.versionsFrom("1.2.0.2");

  api.use(
    ["ecmascript", "templating", "session", "fourseven:scss@4.14.2"],
    "client"
  );

  api.use("jquery", "client", { weak: true });

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
