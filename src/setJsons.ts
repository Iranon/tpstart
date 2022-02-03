import {readFile, writeFile} from 'fs/promises';

const setJsons = async (projectRoot: string, outDir: string, main: string) => {
    try {
        //- Set package.json
        //========================================================================================
        let packageJson = JSON.parse( await readFile(`${projectRoot}/package.json`, 'utf-8') );
        packageJson["main"] = main;
        packageJson["scripts"].build = 'tsc';
        packageJson["scripts"].start = `npm run build && node ./${outDir}/${main}`;
        await writeFile(`${projectRoot}/package.json`, JSON.stringify(packageJson, null, 2));

        //- Set tsconfig.json
        //========================================================================================
        let tsConfig = (await readFile(`${projectRoot}/tsconfig.json`, 'utf-8'))
        .replace(/^.*\/\/\s*"outDir":\s*".\/".*$/gm, `    "outDir": "./${outDir}",`); //set outDir
        //append include and exclude directives before the last '}'
        tsConfig = tsConfig.substring(0, tsConfig.lastIndexOf('}')-1) +
        ',\n\n  "include": ["src/**/*"],\n  "exclude": ["node_modules"]\n' +
        tsConfig.substring(tsConfig.lastIndexOf('}'));
        await writeFile(`${projectRoot}/tsconfig.json`, tsConfig);
    }
    catch (err) {
        console.log(err);
    }
};

export default setJsons;