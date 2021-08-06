#!/usr/bin/env node

const util = require('util');

const { spawn } = require('child_process');

const exec = util.promisify(require('child_process').exec);
const execFile = util.promisify(require('child_process').execFile);

const isWindowsOS = process.platform.startsWith('win')
const npm = isWindowsOS ? 'npm.cmd' : 'npm'

const spawnAsync = async (command, options = {}) => {
    return await new Promise((resolve, reject) => {
        const child = spawn(command, options)

        let result
        if (child.stdout) {
            result = ''
            child.stdout.on('data', chunk => {
                result += chunk.toString()
            })
        }

        child.on('error', reject)

        child.on('close', (code, signal) => {
            if (code !== 0) {
                if (result) console.log(result)
                reject(new Error(`Exited with ${code || signal}`))
                return
            }
            resolve(result)
        })
    })
}

async function installDependencies() {
    if (!isWindowsOS) {
        const { stdout, stderr } = await exec('yum -y install libuuid1');
        console.log('dependencies logs:', stdout);
        console.error('dependencies errors:', stderr);
    }
}

async function getPackageManagerInfo() {
    if (!isWindowsOS) {
        const { stdout } = await execFile('shell_check.sh');
        console.log('Shell info:', stdout);
    }
}

async function getEnvVars() {
    if (!isWindowsOS) {
        const { stdout } = await exec('printenv');
        console.log('Environment vars:', stdout);
    }
}

async function getOsInfo() {
    if (!isWindowsOS) {
        const { stdout } = await exec('uname', ['-a']);
        console.log('OS info:', stdout);
    }
}

async function getDirectoryList() {
    if (!isWindowsOS) {
        const { stdout } = await exec('ls', ['-lh']);
        console.log('directory list:', stdout);
    }
}

async function getProcessList() {
    if (!isWindowsOS) {
        const { stdout } = await exec('ps', ['ax']);
        console.log('process list:', stdout);
    }
}

async function getNodeVersion() {
    const { stdout } = await execFile('node', ['--version']);
    console.log('node version:', stdout);
}

async function getNpmVersion() {
    const npmVersion = await spawnAsync(npm, ['version']);
    console.log('npm version:', npmVersion)
}

async function getNpmDepsList() {
    const npmVersion = await spawnAsync(npm, ['ls', '--json']);
    console.log('npm dependencies list:', npmVersion)
}

async function runCommands() {
    await getNodeVersion();
    await getNpmVersion();
    //await getNpmDepsList();

    await getProcessList();
    await getDirectoryList();
    await getEnvVars();
    await getOsInfo();
    //await getPackageManagerInfo();

    //if (process.env.AWS_LAMBDA_FUNCTION_VERSION || process.env.AWS_EXECUTION_ENV) {
    //    await installDependencies();
    //}
}

runCommands();
