#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';

const testDir = process.argv.length > 2 ? process.argv[2] : './';
const fileReg = new RegExp(`^test.+?\js$`);
const funcReg = new RegExp(`^test`);

async function main() {
	//Loop through files and match on fileReg
	for await (const file of walkDir(testDir)) {
		const fileName = path.basename(file);
		if(fileName.match(fileReg)) {
			const p = path.isAbsolute(file) ? file : './' + path.normalize(file);
			const mod = await import(p);
			testModule(p, mod);
		}
	}
}

async function testModule(modName, mod) {
	console.log(modName)

	//Loop through module functions and match on funcReg
	for(const [funcName, func] of Object.entries(mod)) {
		if(funcName.match(funcReg)) {
			process.stdout.write(` - ${funcName}: `);
			try {
				await func();
			} catch(e) {
				process.stdout.write("FAIL\n")
				console.log(e.stack)
				console.log(`Test failed, exiting`)
				process.exit(1)
			}
			process.stdout.write("OK\n")
		}
	}
}

async function* walkDir(dir) {
	for await (const d of await fs.promises.opendir(dir)) {
		const entry = path.join(dir, d.name);
		if (d.isDirectory()){
			yield* walkDir(entry);
		} else {
			yield entry;
		}
	}
}

main();