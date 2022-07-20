const fs = require('fs');

const writeFile = fileContent => {
    // "new Promise" creates a promise *object*
    // The promise's parameter is a function with the parameters "reject" and "resolve".
    // These parameters are themselves functions (ie. reject()/resolve())
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            // if there's an error, reject the Promise and send the error to the Promise `catch()` method
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'File created.'
            });
        })
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'File copied.'
            })
        });
    });
}

// This is a shortened way ofdoing the below commented out code
module.exports = {writeFile, copyFile};

// Written out more fully, the above code would look like:

// module.exports = {
//     writeFile: writeFile,
//     copyFile: copyFile
// }
// Remember: the key is the name that will be used when it's exported. The value is the function name in this domcument

