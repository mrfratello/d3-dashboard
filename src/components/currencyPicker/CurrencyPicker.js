import { connect } from 'react-redux'
import { Dropdown } from 'primereact/dropdown'
import { currencySelector } from '../../redux/selectors'


const CurrencyPickerUI = ({currencies, ...props}) =>
    <Dropdown options={currencies}
              optionLabel='name'
              itemTemplate={({code='', name=''}) => `${code} ${name}`}
              {...props} />

export const CurrencyPicker = connect(
        state => ({ currencies: currencySelector(state) })
    )(CurrencyPickerUI)
export default CurrencyPicker
