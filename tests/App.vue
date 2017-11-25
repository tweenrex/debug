<template>

  <div id="app">
    <img id="image" src="./assets/logo.png">
  </div>
</template>

<script>
import { TweenRex } from '@tweenrex/core'
import { interpolate } from '@tweenrex/render'
import { easeInOutExpo } from 'just-curves'
import { visualize } from '../src/visualize'

import Dragnabbit from '../src/components/Dragnabbit'
import EasingGraph from '../src/components/EasingGraph'

export default {
    name: 'app',
    components: {
        dragnabbit: Dragnabbit,
        'easing-graph': EasingGraph
    },
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            easing: easeInOutExpo,
            x: 0,
            y: 0
        }
    },
    mounted() {
        var target = document.querySelector('#image')
        var tween = TweenRex({
            duration: 3500,
            subscribe: interpolate({
                targets: target,
                easing: visualize(this.easing),
                transform: ['rotateY(0deg)', 'rotateY(360deg)']
            }),
            onPlay() {
                target.style.transformOrigin = '50% 50%'
            },
            onFinish() {
                tween.restart()
            }
        })

        tween.play()
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
