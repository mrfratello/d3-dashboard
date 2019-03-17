import { ExchangeRateControl } from './control'
import ExchangeRateChart from './chart/Chart'


export const ExchangeRate = ({model}) =>
    <div>
        <ExchangeRateControl model={model} />
        <ExchangeRateChart width={600} height={400} />
    </div>

export default ExchangeRate
