// @remove-file-on-eject
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const fs = require('fs-extra');
const path = require('path');
const chalk = require('react-dev-utils/chalk');
const execSync = require('child_process').execSync;
const spawn = require('react-dev-utils/crossSpawn');
const { defaultBrowsers } = require('react-dev-utils/browsersHelper');
const os = require('os');
const verifyTypeScriptSetup = require('./utils/verifyTypeScriptSetup');

function isInGitRepository() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

function isInMercurialRepository() {
  try {
    execSync('hg --cwd . root', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

function tryGitInit(appPath) {
  let didInit = false;
  try {
    execSync('git --version', { stdio: 'ignore' });
    if (isInGitRepository() || isInMercurialRepository()) {
      return false;
    }

    execSync('git init', { stdio: 'ignore' });
    didInit = true;

    execSync('git add -A', { stdio: 'ignore' });
    execSync('git commit -m "Initial commit from Create React App"', {
      stdio: 'ignore',
    });
    return true;
  } catch (e) {
    if (didInit) {
      // If we successfully initialized but couldn't commit,
      // maybe the commit author config is not set.
      // In the future, we might supply our own committer
      // like Ember CLI does, but for now, let's just
      // remove the Git files to avoid a half-done state.
      try {
        // unlinkSync() doesn't work on directories.
        fs.removeSync(path.join(appPath, '.git'));
      } catch (removeErr) {
        // Ignore.
      }
    }
    return false;
  }
}

module.exports = function(
  appPath,
  appName,
  verbose,
  originalDirectory,
  template
) {
  const ownPath = path.dirname(
    require.resolve(path.join(__dirname, '..', 'package.json'))
  );
  const appPackage = require(path.join(appPath, 'package.json'));
  // AAA-modification, always use yarn
  const useYarn = true; // fs.existsSync(path.join(appPath, 'yarn.lock'));

  // Copy over some of the devDependencies
  appPackage.dependencies = appPackage.dependencies || {};

  // ######################
  // AAA-MODIFICATION START
  // ######################
  const useTypeScript = true; // we will always use typescript!
  // ######################
  // AAA-MODIFICATION END
  // ######################

  // Setup the script rules
  appPackage.scripts = {
    start: 'aaa-react-scripts-ts start',
    build: 'aaa-react-scripts-ts build',
    test: 'aaa-react-scripts-ts test --env=jsdom',
    eject: 'aaa-react-scripts-ts eject',
    apollo: 'apollo',
    gql: 'yarn gql:auth && yarn gql:introspect && yarn gql:types',
    'gql:auth': 'node graphql/getAuthorization.js',
    'gql:introspect': 'apollo service:download graphql/schema.json',
    'gql:types':
      'apollo client:codegen src/IGQLQueries.d.ts --target typescript --localSchemaFile "graphql/schema.json" --includes "src/**/*.gql" --outputFlat',
  };

  // ######################
  // AAA-MODIFICATION START
  // ######################
  // we want to use .eslintrc instead!
  // Setup the eslint config
  // appPackage.eslintConfig = {
  //   extends: 'react-app',
  // };
  // ######################
  // AAA-MODIFICATION END
  // ######################

  // Setup the browsers list
  appPackage.browserslist = defaultBrowsers;

  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackage, null, 2) + os.EOL
  );

  const readmeExists = fs.existsSync(path.join(appPath, 'README.md'));
  if (readmeExists) {
    fs.renameSync(
      path.join(appPath, 'README.md'),
      path.join(appPath, 'README.old.md')
    );
  }

  // Copy the files for the user
  const templatePath = template
    ? path.resolve(originalDirectory, template)
    : path.join(ownPath, useTypeScript ? 'template-typescript' : 'template');
  if (fs.existsSync(templatePath)) {
    fs.copySync(templatePath, appPath);
  } else {
    console.error(
      `Could not locate supplied template: ${chalk.green(templatePath)}`
    );
    return;
  }

  // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
  // See: https://github.com/npm/npm/issues/1862
  try {
    fs.moveSync(
      path.join(appPath, 'gitignore'),
      path.join(appPath, '.gitignore'),
      []
    );
  } catch (err) {
    // Append if there's already a `.gitignore` file there
    if (err.code === 'EEXIST') {
      const data = fs.readFileSync(path.join(appPath, 'gitignore'));
      fs.appendFileSync(path.join(appPath, '.gitignore'), data);
      fs.unlinkSync(path.join(appPath, 'gitignore'));
    } else {
      throw err;
    }
  }

  let command;
  let args, argsDev, resolutions;

  if (useYarn) {
    command = 'yarnpkg';
    args = ['add'];
    argsDev = ['add', '-D']; // AAA-specfic: .template.dependencies.json manages devDependencies
  } else {
    command = 'npm';
    args = ['install', '--save', verbose && '--verbose'].filter(e => e);
    argsDev = ['install', '--save-dev', verbose && '--verbose'].filter(e => e); // AAA-specfic: .template.dependencies.json manages devDependencies
  }

  // ######################
  // AAA-MODIFICATION START
  // ######################
  // application normal and dev-dependencies are fully managed and version pinned in the .template.dependencies.json!

  // // Install dev dependencies
  // const types = [
  //   '@types/node',
  //   '@types/react',
  //   '@types/react-dom',
  //   '@types/jest',
  //   'typescript',
  // ];

  // console.log(
  //   `Installing ${types.join(', ')} as dev dependencies ${command}...`
  // );
  // console.log();

  // const devProc = spawn.sync(command, args.concat('-D').concat(types), {
  //   stdio: 'inherit',
  // });
  // if (devProc.status !== 0) {
  //   console.error(`\`${command} ${args.concat(types).join(' ')}\` failed`);
  //   return;
  // }

  // Install additional template dependencies, if present
  const templateDependenciesPath = path.join(
    appPath,
    '.template.dependencies.json'
  );
  if (fs.existsSync(templateDependenciesPath)) {
    const templateDependencies = require(templateDependenciesPath).dependencies;
    args = args.concat(
      Object.keys(templateDependencies).map(key => {
        return `${key}@${templateDependencies[key]}`;
      })
    );

    const templateDevDependencies = require(templateDependenciesPath)
      .devDependencies;
    argsDev = argsDev.concat(
      Object.keys(templateDevDependencies).map(key => {
        return `${key}@${templateDevDependencies[key]}`;
      })
    );

    resolutions = require(templateDependenciesPath).resolutions;

    fs.unlinkSync(templateDependenciesPath);
  } else {
    // AAA-specific: throw!
    throw new Error(
      `AAA-specific: .template.dependencies.json does not exist at ${templateDependenciesPath}!`
    );
  }

  // first enforce resolutions (yarn specific) in package.json as defined!
  // rewrite the package.json...
  // see https://yarnpkg.com/lang/en/docs/selective-version-resolutions/
  // see https://github.com/yarnpkg/yarn/issues/3951
  if (resolutions) {
    console.log(`Adding resoutions (yarn specific) to package.json...`);
    console.log();

    const appPackageRewrite = require(path.join(appPath, 'package.json'));
    appPackageRewrite.resolutions = resolutions;

    fs.writeFileSync(
      path.join(appPath, 'package.json'),
      JSON.stringify(appPackageRewrite, null, 2)
    );
  }

  // Install react and react-dom for backward compatibility with old CRA cli
  // which doesn't install react and react-dom along with react-scripts
  // or template is presetend (via --internal-testing-template)

  console.log(`Installing dev dependencies using ${command}...`);
  console.log();

  const procDev = spawn.sync(command, argsDev, {
    stdio: 'inherit',
  });
  if (procDev.status !== 0) {
    console.error(`\`${command} ${argsDev.join(' ')}\` failed`);
    return;
  }

  // if (!isReactInstalled(appPackage) || template) {
  // always do this!
  console.log(`Installing app dependencies using ${command}...`);
  console.log();

  const proc = spawn.sync(command, args, {
    stdio: 'inherit',
  });
  if (proc.status !== 0) {
    console.error(`\`${command} ${args.join(' ')}\` failed`);
    return;
  }
  // }

  // ######################
  // AAA-MODIFICATION END
  // ######################
  if (useTypeScript) {
    verifyTypeScriptSetup();
  }

  if (tryGitInit(appPath)) {
    console.log();
    console.log('Initialized a git repository.');
  }

  // Display the most elegant way to cd.
  // This needs to handle an undefined originalDirectory for
  // backward compatibility with old global-cli's.
  let cdpath;
  if (originalDirectory && path.join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }

  // Change displayed command to yarn instead of yarnpkg
  const displayedCommand = useYarn ? 'yarn' : 'npm';

  console.log();
  console.log(`Success! Created ${appName} at ${appPath}`);
  console.log('Inside that directory, you can run several commands:');
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} start`));
  console.log('    Starts the development server.');
  console.log();
  console.log(
    chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}build`)
  );
  console.log('    Bundles the app into static files for production.');
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} test`));
  console.log('    Starts the test runner.');
  console.log();
  console.log(
    chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}eject`)
  );
  console.log(
    '    Removes this tool and copies build dependencies, configuration files'
  );
  console.log(
    '    and scripts into the app directory. If you do this, you can’t go back!'
  );
  console.log();
  console.log('We suggest that you begin by typing:');
  console.log();
  console.log(chalk.cyan('  cd'), cdpath);
  console.log(`  ${chalk.cyan(`${displayedCommand} start`)}`);
  if (readmeExists) {
    console.log();
    console.log(
      chalk.yellow(
        'You had a `README.md` file, we renamed it to `README.old.md`'
      )
    );
  }
  console.log();
  console.log('Happy hacking!');
};

function isReactInstalled(appPackage) {
  const dependencies = appPackage.dependencies || {};

  return (
    typeof dependencies.react !== 'undefined' &&
    typeof dependencies['react-dom'] !== 'undefined'
  );
}
