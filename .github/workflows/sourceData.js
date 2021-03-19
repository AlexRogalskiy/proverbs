const fs = require('fs');
const path = require('path');
const os = require('os');

const sourceFilePath = path.resolve(path.dirname(__filename), 'sourceData.json');
const targetFilePath = path.resolve(os.tmpdir(), 'sourceData.json');

function run(args) {
    const changeSet = args[0];

    if (!changeSet) {
        throw new Error(`Invalid input change-set provided: ${changeSet}, should be non-empty`)
    }

    console.log(`Processing input json change-set: ${changeSet}`);

    const rawData = fs.readFileSync(sourceFilePath);
    const jsonData = JSON.parse(rawData.toString());

    const result = jsonData.filter(obj => {
        const fileName = path.basename(obj.sourceFile);

        console.log(`Checking input json data file: ${fileName} for a change-set`);

        return changeSet.includes(fileName);
    });

    fs.writeFile(targetFilePath, JSON.stringify(result), (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`\n>>> JSON data has been successfully saved to path: ${targetFilePath}\n`);
        }
    });
}

run(process.argv.slice(2));
