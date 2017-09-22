'use strict';

const path = require('path');
const fs = require('fs');
const child = require('child_process');
const Conf = require('conf');
const inquirer = require('inquirer');
const env = require('yeoman-environment').createEnv();
const chalk = require('chalk');
const figures = require('figures');
const minimist = require('minimist');

const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

const isWin = /^win/.test(process.platform);
const addonKey = 'ngx-rocket-addon';
const disabledAddons = 'disabled-addons';
const appName = path.basename(process.argv[1]);
const help = `${chalk.bold(`Usage:`)} ${appName} ${chalk.blue(`[new|update|config|list|<script>]`)} [options]\n`;


const detailedHelp = `
${chalk.yellow('Usage:')}
  nge [command] name [options]
  
${chalk.yellow('Available commands:')}
${chalk.green('n, new')} [name] 
    Creates a new enterprise app.
${chalk.green('u, update')}
    Updates an existing app or add-on.
${chalk.green('c, config')}
    Configures add-ons to use for new apps.
    All available add-ons are used by default.
${chalk.green('l, list')}
  Lists available add-ons.
  -n, --npm    Show installable add-ons on NPM
  
${chalk.green('<script>')}
  Runs specified script from your ${chalk.red(`package.json`)}.
  Works just like ${chalk.bold(`npm run <script>`)}
`;

const banner = `
             ______ 
 _ _  __ _  |  ____| ___ ____ ____ _  _ ____ ___ _
| ' \\/ _\`||  ____| - C L I
|_||_\\__, /|______| _  ____ __ _ _______  _ ___ _
     |___/  V1.3.7  ANGULAR 2 ENTERPRISE APP KIT

`;

 

class NgECli {
    constructor(args) {
        this._args = args;
        this._options = minimist(args, {
            boolean: ['help', 'npm', 'addon'],
            alias: {
                n: 'npm',
                a: 'addon'
            }
        });
        this._config = new Conf({
            defaults: {
                disabledAddons: {}
            }
        });

        env.register(require.resolve('nge-generator'), 'nge-generator');
        env.register(require.resolve('nge-generator-addon'), 'nge-generator-addon');
    }

    run() {
        updateNotifier({pkg}).notify();

        if (this._options.help) {
            return this._help(true);
        }
        switch (this._args[0]) {
            case 'n':
            case 'new':
                return this.generate(false, this._args.slice(1), this._options.addon);
                this._exit(`Says ${chalk.blue('nge new')}`);

            case 'u':
            case 'update':
                this._exit(`Says ${chalk.blue('nge update')}`);
                return this.generate(true, this._args.slice(1), this._options.addon);

            case 'c':
            case 'config':
                this._exit(`Says ${chalk.blue('nge config')}`);
                return this.configure();

            case 'l':
            case 'list':
                this._exit(`Says ${chalk.blue('nge list')}`);
                return this.list(this._options.npm);

            default:
                this._exit(`Says ${chalk.blue('Ha-ah! You cant tell me nothing!')}`);

        }
    }

    runScript(args) {
        const name = args[0];
    }

    generate(update, args, addon) {
    }

    configure() {
    }

    list(npm) {
    }

    _findAddons() {}

    _findPackageJson(basePath) {}

    _help(details) {
        console.log(banner);
        console.log(detailedHelp);
    }

    _exit(error, code = 1) {
        console.error(error);
        process.exit(code);
    }
}

module.exports = NgECli;
