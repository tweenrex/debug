import Vue from 'vue'
import PlaybackControl from './components/PlaybackControl'
import { stringHash } from './utilities/hash'

const debugAttName = 'tweenrex-player-id'

export function player(tween) {
    // replace as options if simple function is passed
    let options = typeof tween.tween !== 'undefined' ? tween : { tween }
    const title = options.title || 'Player'
    const id = '_' + stringHash(title)

    // turn off to deactive effects of this wrapped function
    let isActive = true

    // attempt to find an existing instance.
    // This is intended to avoid duplicate controls during hot-reloading
    let el = document.querySelector('[' + debugAttName + '=' + id + ']')
    if (el && el.__vue__) {
        // use existing instance if available
        el.__vue__.$data.controller = options.tween
    } else {
        el = document.body.appendChild(document.createElement('div'))
        // mount new vue instance otherwise
        new Vue({
            // create new element with debug name id
            el: el,
            data: {
                controller: options.tween
            },
            render(e) {
                // use render function here to pass props directly
                const data = {
                    attrs: {
                        [debugAttName]: id
                    }
                };

                return e('div', data, [
                    e(PlaybackControl, {
                        props: {
                            title: title,
                            controller: this.controller
                        }
                    })
                ])
            }
        })
    }
}
