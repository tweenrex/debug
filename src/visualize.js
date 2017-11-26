import Vue from 'vue'
import { stringHash } from './utilities/hash'
import EasingGraph from './components/EasingGraph'

const debugAttName = 'tweenrex-visualize-id'

function linear(o) {
    // default easing, returns same as passed
    return o
}

export function visualize(options) {
    // replace as options if simple function is passed
    options = typeof options === 'function' ? { easing: options } : options || {}

    // ensure an easing function and title based on function name
    const easing = options.easing || linear
    const title = options.title || options.easing.name || 'Visualizer'
    const id = '_' + stringHash(title)

    // turn off to deactive effects of this wrapped function
    let isActive = true
    let instance

    // attempt to find an existing instance.
    // This is intended to avoid duplicate controls during hot-reloading
    let el = document.querySelector('[' + debugAttName + '=' + id + ']')
    if (el && el.__vue__) {
        // use existing instance if available
        instance = el.__vue__
    } else {
        el = document.body.appendChild(document.createElement('div'))
        // mount new vue instance otherwise
        instance = new Vue({
            // create new element with debug name id
            el: el,
            data: {
                x: 0
            },
            computed: {
                y() {
                    // calculate progression
                    return easing(this.x)
                }
            },
            render(e) {
                // use render function here to pass props directly
                const data = {
                    attrs: {
                        [debugAttName]: id
                    }
                };

                return e('div', data, [
                    e(EasingGraph, {
                        props: {
                            title: title,
                            easing: easing,
                            x: this.x,
                            y: this.y
                        }
                    })
                ])
            }
        })
    }

    // return wrapped function
    return offset => {
        if (isActive) {
            // if has been deactivated, don't update this instance
            instance.$data.x = offset
        }
        // pass through function to whatever called it
        return easing(offset)
    }
}
