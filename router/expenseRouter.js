const express = require('express')
const router = express.Router()
const { expenseController } = require('../controller')

router.get('/expense', expenseController.getData)
router.get('/expense/detail', expenseController.getDetail)
router.post('/expense', expenseController.addData)
router.patch('/expense', expenseController.editData)
router.delete('/expense', expenseController.deleteData)
router.get('/expense/category', expenseController.getTotalBasedOnCategory)
router.get('/expense/date-range', expenseController.getTotalBasedOnDateRange)

module.exports = router