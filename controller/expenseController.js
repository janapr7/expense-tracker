const fs = require('fs')

module.exports = {
    getData: (req, res) => {
        let expense = fs.readFileSync('./data/expense.json')
        res.status(200).send(JSON.parse(expense))
    },
    getDetail: (req, res) => {
        let expense = JSON.parse(fs.readFileSync('./data/expense.json'))
        let idx = expense.findIndex(item => item.id == req.query.id)

        res.status(200).send(JSON.stringify(expense[idx]))
    },
    addData: (req, res) => {
        let expense = JSON.parse(fs.readFileSync('./data/expense.json'))
        
        if(req.body.id == undefined){
            let maxId = 0
            for(let exp of expense){
                if(exp.id > maxId){
                    maxId = exp.id
                }
            }
    
            req.body.id = maxId + 1
        }
    
        expense.push(req.body)

        fs.writeFileSync('./data/expense.json', JSON.stringify(expense))
        res.status(200).send(JSON.parse(fs.readFileSync('./data/expense.json')))
    },
    editData: (req, res) => {
        let expense = JSON.parse(fs.readFileSync('./data/expense.json'))
        let idx = expense.findIndex(item => item.id == req.query.id)

        for(let prop in expense[idx]){
            for(let bodyProp in req.body){
                if(prop == bodyProp){
                    expense[idx][prop] = req.body[bodyProp]
                }
            }
        }

        fs.writeFileSync('./data/expense.json', JSON.stringify(expense))
        res.status(200).send(JSON.parse(fs.readFileSync('./data/expense.json')))
    },
    deleteData: (req, res) => {
        let expense = JSON.parse(fs.readFileSync('./data/expense.json'))
        let idx = expense.findIndex(item => item.id == req.query.id)

        expense.splice(idx,1)

        fs.writeFileSync('./data/expense.json', JSON.stringify(expense))
        res.status(200).send(JSON.parse(fs.readFileSync('./data/expense.json')))
    },
    getTotalBasedOnDateRange: (req, res) => {
        let expense = JSON.parse(fs.readFileSync('./data/expense.json'))
        let result = {
            "since" : req.query.since,
            "until" : req.query.until,
            "totalItem" : 0,
            "totalExpense" : 0
        }

        let since = new Date(req.query.since)
        let until = new Date(req.query.until)

        for(exp of expense){
            var isSuitable = true
            var expDate = new Date(exp.date)
            if(expDate < since && req.query.since != undefined){
                isSuitable = false
            } else if(expDate > until && req.query.until != undefined){
                isSuitable = false
            }

            if(isSuitable){
                result.totalItem += 1
                result.totalExpense += exp.nominal
            } 
        }

        res.status(200).send(JSON.stringify(result))
    },
    getTotalBasedOnCategory: (req, res) => {
        let expense = JSON.parse(fs.readFileSync('./data/expense.json'))
        let result = {
            "category" : req.query.cat,
            "totalItem" : 0,
            "totalExpense" : 0
        }

        for(exp of expense){
            if(req.query.cat == undefined){
                result.totalItem += 1
                result.totalExpense += exp.nominal
            } else if(exp.category == req.query.cat){
                result.totalItem += 1
                result.totalExpense += exp.nominal
            }
        }

        res.status(200).send(JSON.stringify(result))
    }
}