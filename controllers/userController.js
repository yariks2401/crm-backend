const fs = require('fs');
const users = JSON.parse(
    fs.readFileSync(`${__dirname}/../Jsons/user.json`)
);


class UserController {
    constructor() {}

    getAllUsers = (req, res) => {
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: { users },
        })
    }

    getUserById = (req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        res.status(200).json({
            status: 'success',
            data: { user },
        })
    }

    setNewUser = (req, res) => {
        const id = users[users.length - 1].id + 1;
        const newUser = Object.assign({id}, req.body)
        users.push(newUser);
        fs.writeFile(`${__dirname}/Jsons/user.json`, JSON.stringify(users),err=>{
            res.status(201).json({
                status: 'success',
                data: { newUser },
            })
        })
    }

    updateUserById = (req, res) => {
        const id = Number(req.params.id);
        const data = req.body;
        let numberOfElement = null;
        let userData = null;
        for (let i=0; i<users.length; i++) {
            if(users[i].id===id) {
                numberOfElement = i;
                userData = {...users[i], ...data}
                break;
            }
        }
        users[numberOfElement] = userData;
        fs.writeFile(`${__dirname}/Jsons/user.json`, JSON.stringify(users),err=>{
            res.status(200).json({
                status: 'success',
                data: { userData },
            })
        })
    }

    deleteUserById = (req, res) => {
        const id = Number(req.params.id);
        const updatedUsers = users.filter(user => user.id !== id);
        fs.writeFile(`${__dirname}/Jsons/user.json`, JSON.stringify(updatedUsers),err => {
            res.status(204).json({
                status: 'success',
                data: null,
            })
        })
    }
}

module.exports = new UserController();