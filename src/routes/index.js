const express = require('express')
const router = express.Router()

// Database connection

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/bermejales', (req, res) => {
    res.render('./plugins/Sevilla/Pbermejales_v4')
})

router.get('/sofia', (req, res) => {
    res.render('./plugins/Bulgaria/Psofia_v2')
})

router.get('/patra', (req, res) => {
    res.render('./plugins/Grecia/Ppatra_v2')
})

router.get('/automatico', (req, res) => {
    res.render('./buscador/index')
})

module.exports = router;