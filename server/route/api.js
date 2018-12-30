const express = require('express')
const router = express.Router()
const request = require('request-promise-native')
const iconv = require('iconv-lite')
const parser = require('fast-xml-parser')
const d3 = require('d3')
const dateCentralBankFormat = d3.timeFormat("%d/%m/%Y");
const dateParseLocalFormat = d3.timeParse("%d.%m.%Y");


router.get('/currency', function (req, res) {
    request({
        uri: 'http://www.cbr.ru/scripts/XML_daily.asp',
        qs: {
            date_req: dateCentralBankFormat(new Date())
        },
        encoding: null
    })
        .then(response => iconv.decode(response, 'win1251'))
        .then(xml => parser.parse(xml, {ignoreAttributes: false, attributeNamePrefix: ''}))
        .then(data => data.ValCurs.Valute)
        .then(data => data.map(item => ({
            id: item.ID,
            code: item.CharCode,
            name: item.Name,
            rate: parseFloat(item.Value.replace(',', '.'))
        })))
        .then(data => res.json(data))
})

router.get('/currency/:currencyId', function (req, res) {
    const now = new Date()
    const {currencyId} = req.params
    let {dateFrom, dateTo} = req.query
    dateTo = dateTo ? dateParseLocalFormat(dateTo) : now
    dateFrom = dateFrom ? dateParseLocalFormat(dateFrom) : d3.timeDay.offset(dateTo, -7)

    request({
        uri: 'http://www.cbr.ru/scripts/XML_dynamic.asp',
        qs: {
            date_req1: dateCentralBankFormat(dateFrom),
            date_req2: dateCentralBankFormat(dateTo),
            VAL_NM_RQ: currencyId
        }
    })
        .then(xml => parser.parse(xml, {ignoreAttributes: false, attributeNamePrefix: ''}))
        .then(data => data.ValCurs.Record)
        .then((data=[]) => data.map(item => ({
            date: item.Date,
            nominal: item.Nominal,
            rate: parseFloat(item.Value.replace(',', '.'))
        })))
        .then(data => res.json(data))
})

module.exports = router