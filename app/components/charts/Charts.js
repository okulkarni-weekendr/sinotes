import React, { Component } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import Axes from './Axes';
import Bars from './Bars';

import data from './data'

export default class Charts extends Component {
    constructor() {
        super();
        this.state = {
            xscale: scaleBand(),
            yscale: scaleLinear()
        }
        // this.xscale = scaleBand();
        // this.yscale = scaleLinear();
        //
        // this.xscale = this.xscale.bind(this);
        // this.yscale = this.yscale.bind(this);
    }

    render() {

        const margins = { top: 50, right: 20, bottom: 100, left: 60 };
        const svgDimensions = { width: 800, height: 500 };

        const maxValue = Math.max(...data.map(d => d.value));

        // scaleBand type
        const xScale = scaleBand()
            .padding(0.5)
            // scaleBand domain should be an array of specific values
            // in our case, we want to use movie titles
            .domain(data.map(d => d.title))
            .range([margins.left, svgDimensions.width - margins.right]);

        // scaleLinear type
        const yScale = scaleLinear()
        // scaleLinear domain required at least two values, min and max
            .domain([0, maxValue])
            .range([svgDimensions.height - margins.bottom, margins.top]);

        return (
            <div>
                Hello D3
            <svg width={svgDimensions.width} height={svgDimensions.height}>

                <Axes
                    scales={{ xScale, yScale }}
                    margins={margins}
                    svgDimensions={svgDimensions}
                />
                <Bars
                    scales={{ xScale, yScale }}
                    margins={margins}
                    data={data}
                    maxValue={maxValue}
                    svgDimensions={svgDimensions}
                />
            </svg>
                Hello D3 in SVG
            </div>
        )
    }
}