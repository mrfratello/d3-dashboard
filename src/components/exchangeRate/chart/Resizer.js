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
            .resizeAim()
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

    resizeAim() {
        const self = this.self
        self.aimLineY
            .attr('x1', self.scaleDate.range()[1])
            .attr('x2', self.scaleDate.range()[0])
            .attr('y1', self.bottomY)
            .attr('y2', self.bottomY)
        self.aimTooltipY
            .attr('x', self.scaleDate.range()[1])
            .attr('y', self.bottomY)

        const rate = self.aimRate.get(self.aimTooltipY.node())
        if (rate) {
            const aimY = self.scaleRate(rate)
            self.aimLineY
                .attr('y1', aimY)
                .attr('y2', aimY)
            self.aimTooltipY
                .attr('y', aimY)
        }
        return this
    }
}

export default ExchangeRateChartResizer
