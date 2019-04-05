import { Component } from 'react'
import debounce from 'lodash.debounce'
import pick from 'lodash.pick'


export const withD3Chart = ({
    updateOn = ['data']
}) => WrappedComponent => 
    class WithD3Chart extends Component {

        componentDidMount() {
            this.component.updateChart = debounce(this.component.updateChart, 500)
            this.component.initChart()
        }

        componentDidUpdate(prevProps) {
            const updatedProps = props => pick(props, updateOn)
            if (this.component.shouldUpdate(updatedProps(this.props), updatedProps(prevProps))) {
                this.component.updateChart()
            }
        }

        render() {
            return <WrappedComponent ref={ref => this.component = ref} {...this.props} />
        }
    }

export default withD3Chart
