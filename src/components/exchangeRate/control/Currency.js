import { CurrencyPicker } from 'Components/currencyPicker/CurrencyPicker'


export const Currency = ({currencyItem, updateCurrency}) =>
    <CurrencyPicker value={currencyItem.currency}
                    onChange={e => updateCurrency({
                        currencyId: e.target.value.id,
                        id: currencyItem.id
                    })}
                    autoWidth={false}
                    placeholder='Валюта' />

export default Currency
