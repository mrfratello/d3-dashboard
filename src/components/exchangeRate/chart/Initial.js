import * as d3 from 'd3'
import { dateGOSTR } from '../../../locale'


export class ExchangeRateChartInitial {

    constructor(self) {
        this.self = self
    }

    initChart() {
        const self = this.self
        const faux = self.props.connectFauxDOM('svg', 'chart')
        self.svg = d3.select(faux)
                .attr('width', self.props.width)
                .attr('height', self.props.height)
        self.initSizes()
        this.initScales()
            .initAxis()
            .initAim()
            .initLines()
        self.props.animateFauxDOM(800)
    }

    initScales() {
        const self = this.self
        self.scaleRate = d3.scaleLinear()
            .range([self.bottomY, self.topY])
            .domain([0, 1])
        self.scaleDate = d3.scaleTime()
            .range([self.leftX, self.rightX])
            .domain([new Date(), new Date()])
        return this
    }

    initAxis() {
        const self = this.self
        self.axisRate = self.svg.append('g')
            .classed(self.CLS_AXIS, true)
            .classed(self.CLS_AXIS_Y, true)
            .attr('transform', `translate(${self.leftX}, 0)`)
        self.axisDate = self.svg.append('g')
            .classed(self.CLS_AXIS, true)
            .classed(self.CLS_AXIS_X, true)
            .attr('transform', `translate(0, ${self.bottomY})`)

        const axisRateFn = d3.axisLeft()
            .scale(self.scaleRate)
        self.axisRate
            .call(axisRateFn)

        const axisDateFn = d3.axisBottom()
            .scale(self.scaleDate)
            .tickFormat(dateGOSTR.format)
        self.axisDate
            .call(axisDateFn)
        return this
    }

    initLines() {
        const self = this.self
        self.lineFn = d3.line()
        self.linesContainer = self.svg.append('g')
            .classed(self.CLS_CONTAINER_LINES, true)
        self.markersContainer = self.svg.append('g')
            .classed(self.CLS_CONTAINER_MARKERS, true)
        return this
    }

    initAim() {
        const self = this.self
        self.aimGroup = self.svg.append('g')
            .classed('currency-aim', true)
            .classed('currency-aim_hidden', true)
        self.aimLineY = self.aimGroup.append('line')
            .classed('currency-aim__line', true)
            .classed('currency-aim__line_type_y', true)
            .attr('x1', self.leftX - 1)
            .attr('x2', self.rightX + 1)
            .attr('y1', self.bottomY)
            .attr('y2', self.bottomY)
        self.aimTooltipY = self.aimGroup.append('text')
            .classed('currency-aim__text', true)
            .attr('x', self.rightX + 1)
            .attr('y', self.bottomY)
            .attr('dy', -5)
            .attr('text-anchor', 'end')
            .text(0)
        self.props.animateFauxDOM(800)
        return this
    }
}

export default ExchangeRateChartInitial
