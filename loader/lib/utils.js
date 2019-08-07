const fs = require('fs');
const path = require('path');


function load(module, directory, ignore = []) {
    fs
        .readdirSync(directory, {withFileTypes: true })
        .filter(function (dirent) {
            return (dirent.name.indexOf('.') !== 0) && (!ignore.includes(dirent.name)) && (dirent.name.slice(-3) === '.js');
        })
        .forEach(function (dirent) {
            let model;
            if(dirent.isDirectory())
                model = load({}, dirent.name, ignore);
            else {
                model  = require(path.join(directory, dirent.name));
            }
            const name = dirent.name.slice(0,-3);
            module[name] = model;
        });
    return module;
}

module.exports = {

    load: load

};
