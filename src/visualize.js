import Vue from 'vue'
import EasingGraph from './components/EasingGraph.vue'
import { debug } from 'util';

function linear(o) {
    return o
}

export function visualize(options) {
    options = typeof options === 'function' ? { easing: options } : options || {}
    let easing = options.easing || linear
    let title = options.title || options.easing.name

    let el = document.createElement('div')
    document.body.appendChild(el)

    const instance = new Vue({
        el,
        data: {
            x: 0,
            easing: easing
        },
        computed: {
            y() {
              return this.easing(this.x)
            }
        },
        render(e) {
            return e(EasingGraph, {
                props: {
                    title: title,
                    easing: this.easing,
                    x: this.x,
                    y: this.y
                }
            })
        }
    })

    return offset => {
        instance.$data.x = offset
        return offset
    }
}
