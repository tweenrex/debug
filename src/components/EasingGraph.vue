<template>
<div class="easing-graph--root">
<dragnabbit :title="title">
    <div class="easing-graph--contents">
        <div class="easing-graph--graph">
            <svg class="easing-graph--visualizer" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-20 -20 140 140">
            <g class="easing-graph--grid">
                <line x1="0" y1="0" x2="0" y2="100"></line>
                <line x1="0" y1="0" x2="100" y2="0"></line>
                <line x1="25" y1="0" x2="25" y2="100"></line>
                <line x1="0" y1="25" x2="100" y2="25"></line>
                <line x1="50" y1="0" x2="50" y2="100"></line>
                <line x1="0" y1="50" x2="100" y2="50"></line>
                <line x1="75" y1="0" x2="75" y2="100"></line>
                <line x1="0" y1="75" x2="100" y2="75"></line>
                <line x1="100" y1="0" x2="100" y2="100"></line>
                <line x1="0" y1="100" x2="100" y2="100"></line>
            </g>
            <g class="easing-graph--axes">
                <path d="M0,0V100H100"></path>
            </g>
            <path :d="easingPath" class="easing-graph--easing-path" ></path>
            <circle class="easing-graph--ball" :style="{ transform: ballTransform }" cx="0" cy="100" r="4"></circle>
            </svg>
        </div>
         <div>
            <span class="easing-graph--graph-label">let n = </span>
            <span class="easing-graph--graph-value"> {{xFormatted}}; </span>
            <span class="easing-graph--graph-label">f(n) = </span>
            <span class="easing-graph--graph-value">{{yFormatted}}</span>
        </div>
    </div>
</dragnabbit>
</div>
</template>

<script>
import Dragnabbit from './Dragnabbit'

function easingToPath({ easing, gridSize, sampleCount }) {
    var pathString = ''
    for (let i = 0; i <= sampleCount; i += 1) {
        pathString +=
            (i === 0 ? 'M' : i === 1 ? 'L' : ' ') +
            i * gridSize / sampleCount +
            ',' +
            (gridSize - gridSize * easing(i / sampleCount))
    }
    return pathString
}

const gridSize = 100
const sampleCount = 250

export default {
    name: 'easing-graph',
    props: ['easing', 'x', 'y', 'title'],
    components: {
        dragnabbit: Dragnabbit
    },
    computed: {
        easingPath() {
            return easingToPath({
                easing: this.easing,
                gridSize,
                sampleCount
            })
        },
        xFormatted() {
            return this.x.toFixed(3)
        },
        yFormatted() {
            return this.y.toFixed(3)
        },
        ballTransform() {
            return 'translate(' + gridSize * this.x + 'px,' + -(gridSize * this.y) + 'px)'
        }
    }
}
</script>

<style scoped>
.easing-graph--contents {
    background-color: white;
    color: #333333;
    font-family: Arial;
    font-size: 10pt;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-left: 13px;
    padding-right: 13px;
    text-align: center;
}
.easing-graph--graph--label {
    font-style: italic;
}
.easing-graph--graph-value {
    color: #7bc7c4;
    font-weight: bold;
}
.easing-graph--graph-title {
    font-weight: bold;
}
.easing-graph--graph {
    height: 180px;
    padding-bottom: 10px;
    width: 180px;
}
.easing-graph--visualizer {
    height: 100%;
    left: 50%;
    overflow: visible;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
}
.easing-graph--grid > line {
    stroke: #e2e2e2;
    stroke-width: 0.5;
    stroke-linecap: round;
}
.easing-graph--axes > path {
    fill: transparent;
    stroke: #cccccc;
    stroke-width: 1;
    stroke-linecap: round;
}
.easing-graph--easing-path {
    fill: transparent;
    stroke: #808080;
    stroke-width: 1;
    stroke-opacity: 0.6;
}
.easing-graph--ball {
    fill: #7bc7c4;
    stroke: transparent;
}
</style>
