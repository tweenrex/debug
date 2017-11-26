<template>
   <div
    class="dragnabbit"
    :style="{ transform: 'translate3d(' + x + 'px,' + y + 'px,' + ( dragging ? 5 : 0 ) + 'px)' }">
        <div class="content-wrapper">
            <div class="drag-title" :class="{ 'dragnabbit--dragging' : dragging }" @mousedown="onDown" @touchstart="onDown">{{title}}</div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { save, load } from '../utilities/storage'

const positionKeyPrefix = 'tweenrex.dragnabbit'

export default {
    name: 'dragnabbit',
    props: ['saveId', 'title'],
    data: () => ({
        dragging: false,
        x: 10,
        y: 10,
        offsetX: 0,
        offsetY: 0
    }),
    created() {
        // attempt to load position from previous load
        var position = load(positionKeyPrefix, this.saveId)
        if (position) {
            this.x = position.x
            this.y = position.y
        }
        window.addEventListener('resize', this.onResize)
    },
    mounted() {
        if (!this.isInViewPort()) {
            this.savePosition()
        }
    },
    destroyed() {
        window.removeEventListener('resize', this.onResize)
    },

    methods: {
        setEvents() {
            var method = (this.dragging ? 'add' : 'remove') + 'EventListener',
                events = {
                    mousemove: this.onMove,
                    mouseup: this.onUp,
                    mouseleave: this.onUp,
                    touchmove: this.onMove,
                    touchend: this.onUp,
                    touchleave: this.onUp,
                    touchcancel: this.onUp
                }

            for (var key in events) {
                document[method](key, events[key])
            }
        },

        onDown(e) {
            this.dragging = true
            e = e.touches ? e.touches[0] : e
            var rect = this.$el.getBoundingClientRect()
            this.offsetX = e.clientX - rect.left
            this.offsetY = e.clientY - rect.top
            this.setEvents()

            if (!this.isInViewPort()) {
                this.savePosition()
            }

            e.preventDefault()
        },
        isInViewPort() {
            var rect = this.$el.getBoundingClientRect()
            var totalWidth = window.innerWidth
            if (rect.right > totalWidth) {
                this.x = window.innerWidth - rect.width
                return false
            }
            return true
        },
        onUp(e) {
            this.dragging = false
            this.setEvents()
            e.preventDefault()
        },
        onMove(e) {
            if (this.dragging) {
                e.preventDefault()
                e = e.touches ? e.touches[0] : e
                this.x = e.clientX - this.offsetX
                this.y = e.clientY - this.offsetY
                this.savePosition()
            }
        },
        onResize() {
            if (!this.isInViewPort()) {
                this.savePosition()
            }
        },
        savePosition() {
            if (this.saveId) {
                const position = {
                    x: this.x,
                    y: this.y
                }
                localStorage.setItem(positionKeyPrefix + '.' + this.saveId, JSON.stringify(position))
            }
        }
    }
}
</script>

<style scoped>
.dragnabbit {
    display: inline-block;
    position: fixed;
    top: 0;
    left: 0;
}

/* Stylistic choices */
.dragnabbit {
    font-family: Arial;
    z-index: 9000;
    will-change: transform;
    transform-style: preserve-3d;
}

.drag-title {
    background-color: #f1f1f1;
    font-size: 10pt;
    font-weight: bold;
    width: 100%;
    cursor: grab;
    position: relative;
    z-index: 9000;
    text-align: center;
    padding-top: 3px;
    padding-bottom: 3px;
}
.dragnabbit--dragging {
    cursor: grabbing;
}

.content-wrapper {
    outline: dashed 2px #222;
}

.dragnabbit:after {
    content: ' ';
    background: #000;
    box-shadow: 0 0px 20px 5px #000;
    display: block;
    height: 100%;
    left: 0;
    opacity: 0.1;
    position: absolute;
    top: 0;
    transform: translateZ(-2px);
    transition: opacity 0.4s ease-in-out, transform 0.4s cubic-bezier(0.15, 0.8, 0.3, 1.2);
    width: 100%;
    z-index: -1;
}

.dragnabbit--dragging:after {
    opacity: 0.3;
    transform: translateZ(-5px);
}
</style>
