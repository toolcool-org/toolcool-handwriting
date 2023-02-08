import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

const packageJson = fs.readFileSync(path.join(process.cwd(), './package.json'), 'utf-8');
let version = '1.0.0';

try {
    const parsed = JSON.parse(packageJson);
    version = parsed.version;
} catch (ex) {
    // ...
}

const settings = {
    entryPoints: ['./src/index.ts'],
    bundle: true,
    sourcemap: 'linked', // external
    minify: true,
    target: ['es6'],
    outfile: './dist/toolcool-handwriting.min.js',
    banner: {
        js: `/* 
Tool Cool Handwriting
Version: ${version}
Documentation: https://github.com/toolcool-org/toolcool-handwriting
License: MIT License        
Author: Tool Cool, toolcool.org@gmail.com>                          
*/`,
    },
};

const args = process.argv.slice(2);
const watch = args.length > 1 && args[1].trim().toLowerCase() === 'watch';

if(watch){
    // ------------- watch ---------------
    settings.watch = {
        onRebuild(error, _result) {

            if (error){
                // console.error(error);
            }
            else {
                console.log('Succeeded.');
            }
        },
    };
}

esbuild
    .build(settings)
    .then((_result) => {
        console.log(watch ? 'Watching...' : 'Done.');
    })
    .catch(() => process.exit(1));