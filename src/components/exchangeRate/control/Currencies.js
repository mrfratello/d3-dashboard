import { Button } from 'primereact/button'
import Currency from 'Containers/exchangeRate/control/Currency'
import color from '../color'


export const Currencies = ({currencies, onAdd, onRemove}) =>
    <div>
        {currencies.map((currency, i) =>
            <div key={i} className='p-grid p-fluid'>
                <div className='p-col-fixed'>
                    <div style={{
                            width: 15,
                            height: '100%',
                            background: color(currency.id)
                        }} />
                </div>
                <div className='p-col'>
                    <Currency currencyItem={currency} />
                </div>
                <div className='p-col-fixed'>
                    <Button icon="pi pi-times"
                            onClick={() => onRemove(currency)}
                            className="p-button-danger" />
                </div>
            </div>
        )}
        <Button label='Добавить'
                icon="pi pi-plus"
                onClick={() => onAdd()}
                style={{width: 'auto'}} />
    </div>

export default Currencies
