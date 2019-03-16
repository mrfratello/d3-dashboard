import { Button } from 'primereact/button'
import { Currency } from './Currency'


export const Currencies = ({currencies, onAdd, onRemove}) =>
    <div>
            {currencies.map((currency, i) =>
                <div key={i} className='p-grid p-fluid'>
                    <div className='p-col-11'>
                        <Currency currencyItem={currency} />
                    </div>
                    <div className='p-col-1' style={{textAlign: 'right'}}>
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
