<template>

  <div id="app">
    <img id="image" src="./assets/logo.png">
  </div>
</template>

<script>
import { TweenRex } from '@tweenrex/core'
import { interpolate } from '@tweenrex/render'
import { cubicBezier } from 'just-curves'
import { player, visualize } from '../src'

import Dragnabbit from '../src/components/Dragnabbit'
import EasingGraph from '../src/components/EasingGraph'

const easing = cubicBezier(0.5, 0, 0.5, 1)

export default {
    name: 'app',
    components: {
        dragnabbit: Dragnabbit,
        'easing-graph': EasingGraph
    },
    mounted() {
        let target = document.querySelector('#image')

        let tween = TweenRex({
            duration: 3500,
            subscribe: interpolate({
                targets: target,
                easing: visualize(easing),
                transform: ['rotateY(0deg)', 'rotateY(360deg)']
            }),
            onPlay() {
                target.style.transformOrigin = '50% 50%'
            },
            onFinish() {
                tween.restart()
            }
        })

        player(tween)

        tween.play()

        this.tween = tween
    },
    destroyed() {
        this.tween.pause()
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
