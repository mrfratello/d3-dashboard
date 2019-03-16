import { Period } from './Period'
import { Currency } from './Currency'


export const ExchangeRateControl = ({model}) => 
    <div>
        <Period model={model} />
        {model.currencies.map((currency, i) => 
            <Currency key={i} currencyItem={currency} />)
        }
    </div>

export default ExchangeRateControl
