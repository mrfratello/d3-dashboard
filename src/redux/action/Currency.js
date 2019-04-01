import axios from 'axios'
import { CURRENCY_FILL } from './types'
import { dateGOSTR } from '../../locale'


export const fillCurrencyList = payload => ({
        type: CURRENCY_FILL,
        payload
    })

export const fetchCurrencyList = dispatch =>
    axios.get(`/api/currency`)
        .then(
            ({data}) => dispatch(fillCurrencyList(data))
        )

export const fetchCurrencyRate = ({id, name, code, dateFrom, dateTo, itemId}) =>
    axios.get(`/api/currency/${id}`, {params: {
        dateFrom: dateGOSTR.format(new Date(dateFrom)),
        dateTo: dateGOSTR.format(new Date(dateTo))
    }})
    .then(({data}) => ({
        id: itemId,
        label: `[${code}] ${name}`,
        set: data.map(item => ({
            ...item,
            rate: item.rate / item.nominal,
            date: dateGOSTR.parse(item.date)
        }))
    }))
