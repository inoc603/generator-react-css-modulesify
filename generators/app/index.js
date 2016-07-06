'use strict';
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the solid ' + chalk.red('generator-react-css-modulesify') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'project name',
      default: this.appname
    }, {
      type: 'input',
      name: 'desc',
      message: 'project description',
      default: ''
    }, {
      type: 'input',
      name: 'author',
      message: 'project author',
      default: ''
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: {
    gulp: function () {
      this.fs.copy(
        this.templatePath('gulpfile.babel.js'),
        this.destinationPath('gulpfile.bable.js')
      );

      this.fs.copy(
        this.templatePath('gulplib.js'),
        this.destinationPath('gulplib.js')
      );
    },

    packageJSON: function () {
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        {
          name: this.props.name,
          desc: this.props.desc,
          author: this.props.author
        }
      );
    },

    git: function () {
      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      );
    },

    babel: function () {
      this.fs.copy(
        this.templatePath('.babelrc'),
        this.destinationPath('.babelrc')
      );
    },

    editorConfig: function () {
      this.fs.copy(
        this.templatePath('.editorconfig'),
        this.destinationPath('.editorConfig')
      );
    },

    index: function () {
      this.fs.copy(
        this.templatePath('index.html'),
        this.destinationPath('index.html')
      );
    },

    src: function () {
      this.fs.copy(
        this.templatePath('src/components/app.js'),
        this.destinationPath('src/components/app.js')
      );

      this.fs.copy(
        this.templatePath('src/css/app.css'),
        this.destinationPath('src/css/app.css')
      );

      this.fs.copy(
        this.templatePath('src/main.js'),
        this.destinationPath('src/main.js')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
