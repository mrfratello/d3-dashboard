const express = require('express')
const router = express.Router()
const request = require('request-promise-native')
const iconv = require('iconv-lite')
const parser = require('fast-xml-parser')
const d3 = require('d3')
const dateFormat = d3.timeFormat("%d/%m/%Y");


router.get('/currency', function (req, res) {
    request({
        uri: 'http://www.cbr.ru/scripts/XML_daily.asp',
        qs: {
            date_req: dateFormat(new Date())
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
            value: parseFloat(item.Value.replace(',', '.'))
        })))
        .then(data => res.json(data))
})

module.exports = router