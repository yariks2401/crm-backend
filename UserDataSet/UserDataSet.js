const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

class UserDataSet {

    constructor(createdUser) {
        this.createdUser = createdUser;
    }

    setCreateData = (req, res) => {
        const id = uuidv4();
        const users = this.getData();
        const newUser = Object.assign({id}, this.createdUser)
        users.push(newUser);
        fs.writeFile(`${__dirname}/Jsons/user.json`, JSON.stringify(users),err => {
            res.status(201).json({
                status: 'success',
                data: { newUser },
            })
        })
    }

    setUpdatedData = () => {

    }

    setDeleteData = () => {

    }

    getData = () => {
        return JSON.parse(
            fs.readFileSync(`${__dirname}/../Jsons/user.json`)
        );
    }
}

module.exports = UserDataSet;