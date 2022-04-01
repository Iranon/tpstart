#! /usr/bin/env node

import { stat, mkdir, writeFile } from 'fs/promises';
import { exit } from 'process';
import { helpMessage } from './help';
import initialization from './initFunctions';
import setJsons from './setJsons';

//const args = process.argv.slice(2); // command line arguments start at position 2
let projectName = (process.argv[2] && /^[a-zA-Z0-9][a-zA-Z0-9_\/-]*$/.test(process.argv[2])) ? process.argv[2] : "";
let flags: string[] = process.argv.slice(3).filter(flag => /^[-][a-zA-Z]$/.test(flag));

//- Scaffolding
//-----------------------------
const buildFlag: string | undefined = flags.find((arg => arg === '-b'));
let srcDir = "src";
let outDir = buildFlag ? "build" : "dist";
let main = buildFlag ? "app.js" : "index.js";
const generateScaffolding = async () => {
    if (projectName) {
        //check if the directory exists (if not fs.stat throw an error and trigger the catch branch)
        try {
            await stat(`./${projectName}`);
            console.log('\nERROR: A directory with the same name already exists\n');
            exit(-1);
        }
        catch { //if the directory not exists yet
            try {
                //Source Directory
                await mkdir(`./${projectName}/${srcDir}`, {recursive: true});
                //Output Directory
                await mkdir(`./${projectName}/${outDir}`, {recursive: true});
                console.log(`Made '${srcDir}' and '${outDir}' folders inside '${projectName}' directory`);
                await writeFile(`./${projectName}/${srcDir}/${main}`, "");
                console.log(`Created '${main}' file in '${srcDir}'`);
            }
            catch (err) {
                console.log(err);
                exit(-1);
            }
        }
    }
    else {
        console.log('\n' + helpMessage + '\n');
        exit(0);
    }
};

// Running
//---------
//if the help flag is called print help and exit
if (flags.includes('-h')) { console.log(helpMessage); exit(0); }

generateScaffolding()
.then(
    () => initialization(projectName, flags)
    .then(
        () => setJsons(`${process.cwd()}/${projectName}`, outDir, main)
    ).catch(err => console.log(err))
)
.catch(err => console.log(err));
