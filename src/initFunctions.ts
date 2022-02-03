//- Npm and ts initialization
//===========================

import { spawn } from 'child_process';

const initialization = async (projectName: string, flags: string[]) => {
    const projectRoot = `${process.cwd()}/${projectName}`;
    const npmInitCommand = flags.includes('-q') ? "npm init" : "npm init -y";

    const npmInit = () => new Promise((resolve, reject) => {
        spawn(npmInitCommand, {
            shell:true,
            cwd:projectRoot,
            stdio: [process.stdin, process.stdout, process.stderr]
            })
            .on('close', (code: number) => {
                if (code === 0) {
                    resolve(0);
                    console.log("-> npm init: DONE!");
                }
                else {
                    console.log("ERROR executing npm init");
                    reject(1);
                }
            });
    });

    const tscInit = () => new Promise((resolve, reject) => {
        spawn("tsc --init", {
            shell:true,
            cwd:projectRoot,
            stdio: [process.stdin, process.stdout, process.stderr]
            })
            .on('close', (code: number) => {
                if (code === 0) {
                    resolve(0);
                    console.log("-> tsc --init: DONE!");
                }
                else {
                    console.log("ERROR executing tsc --init");
                    reject(1);
                }
            });
    });
    
    return [await npmInit(), await tscInit()];
};

export default initialization;