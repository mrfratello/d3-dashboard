import axios from 'axios'
import { CURRENCY_FILL } from './types'


export const fillCurrencyList = payload => ({
        type: CURRENCY_FILL,
        payload
    })

export const fetchCurrencyList = dispatch =>
    axios.get(`/api/currency`)
        .then(
            ({data}) => dispatch(fillCurrencyList(data))
        )
