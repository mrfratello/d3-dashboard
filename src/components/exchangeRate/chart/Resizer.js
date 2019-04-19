import * as d3 from 'd3'


export class ExchangeRateChartResizer {

    constructor(self) {
        this.self = self
    }

    resizeChart() {
        const self = this.self
        const faux = self.props.connectFauxDOM('svg', 'chart')
        self.svg = d3.select(faux)
            .attr('width', self.props.width)
            .attr('height', self.props.height)
        this.resizeScales()
            .resizeAxes()
        self.updateChart()
    }

    resizeScales() {
        const self = this.self
        self.scaleRate
            .range([self.bottomY, self.topY])
        self.scaleDate
            .range([self.leftX, self.rightX])
        return this
    }

    resizeAxes() {
        const self = this.self
        self.axisRate
            .attr('transform', `translate(${self.leftX}, 0)`)
        self.axisDate
            .attr('transform', `translate(0, ${self.bottomY})`)
        return this
    }
}

export default ExchangeRateChartResizer
