const Generator = require("yeoman-generator");
const FS = require("fs");
const Path = require("path");

function scanFiles(dir, parentPath = "") {
  const files = FS.readdirSync(dir);

  let output = [];
  for (const file of files) {
    if (file.length <= 2) {
      continue;
    }

    const stats = FS.statSync(Path.join(dir, file));
    if (stats.isDirectory()) {
      const subfiles = scanFiles(
        Path.join(dir, file),
        Path.join(parentPath, file)
      );
      output = output.concat(subfiles);
    } else {
      output.push(Path.join(parentPath, file));
    }
  }

  return output;
}

module.exports = class extends Generator {
  // The name `constructor` is important here
  // eslint-disable-next-line no-useless-constructor
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // // Next, add your custom code
    // this.option('babel'); // This method adds support for a `--babel` flag
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "packageName",
        message: "Your package name"
      },
      {
        type: "input",
        name: "familyName",
        message: "Family name of iconset"
      },
      // {
      //   type: "input",
      //   name: "packageAuthor",
      //   message: "Author (name, <email>)",
      //   store: true
      // },
      // {
      //   type: "input",
      //   name: "packageReposUrl",
      //   message: "URL of git repos",
      //   store: true
      // }
    ]);
  }

  writing() {
    const { answers } = this;
    const templateDir = Path.join(__dirname, "templates");
    const files = scanFiles(templateDir);

    for (const file of files) {
      const sourcePath = this.templatePath(file);
      const destPath = this.destinationPath(file);
      this.fs.copyTpl(sourcePath, destPath, {
        ...answers
      });
    }
  }
};
