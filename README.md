# tpstart
### A node.js script to generate your TypeScript project.

### TypeScript required! [ npm install -g typescript ]

#### - Usage: tpstart {ProjectName} {Flag}

##### You can run -> npx tpstart {ProjectName} {Flag}

It requires the project name as the first argument and accepts subsequent flags.

Admitted flags are:
* '-h': Print this message
* '-b': Create the build directory (instead of the 'dist' dir) naming the the main file as 'app.js' (instead of 'index.js')
* '-q': npm asks you questions to generate the package.json file"

The output scaffolding has the following structure:

>PROJECT_NAME/
>
>├── dist
>
>├── package.json
>
>├── src
>
>│   └── index.ts
>
>└── tsconfig.json

The project is configured in order to be compiled with webpack in a bundle.js file.
  
<sub>
  If you clone the repository run "npm i" to install dependencies.
</sub>
