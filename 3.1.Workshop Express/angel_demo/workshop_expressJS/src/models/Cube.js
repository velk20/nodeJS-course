const db = require('../db.json');
const fs = require('fs');
const path = require('path')
class Cube {
    constructor(name, description, imageUrl, difficultyLevel) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficultyLevel = difficultyLevel;
    }

    static save(cube){
        cube.id = Number(db.cubes[db.cubes.length - 1].id) + 1;
        db.cubes.push(cube);
        const json = JSON.stringify(db, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../db.json'), json);
    }
}

module.exports = Cube;