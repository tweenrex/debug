<template>
     <div class="slider" @mousedown="drag">
        <div class="track" data-name="track"></div>
        <div class="thumb" @mousedown="drag" data-name="thumb"></div>
    </div>
</template>

<script>
export default {
    name: 'slider',
    created() {
        document.addEventListener('mousemove', this.onDocumentMouseMove)
        document.addEventListener('mouseup', this.onDocumentMouseUp)
        window.addEventListener('resize', this.onResize)
    },
    destroyed() {
        document.removeEventListener('mousemove', this.onDocumentMouseMove)
        document.removeEventListener('mouseup', this.onDocumentMouseUp)
        window.removeEventListener('resize', this.onResize)
    },
    mounted() {
        this.thumbEl = this.$el.querySelector('[data-name="thumb"]')
        this.trackEl = this.$el.querySelector('[data-name="track"]')
    },
    props: ['value', 'max'],
    watch: {
        value(val) {
            this.seek(val)
        },
        isDragging(val) {
            if (val) {
                this.$emit('dragbegin')
            } else {
                this.$emit('dragend')
            }
        }
    },
    data() {
        return {
            isDragging: false,
            dragTarget: undefined,
            thumbEl: undefined,
            trackEl: undefined,
            maxSize: 0
        }
    },
    methods: {
        drag(evt) {
            // prevent user select on drag
            evt.preventDefault()
            this.isDragging = true
            this.dragTarget = 'track'
            this.dragged(evt)
        },
        calcMaxSize() {
            this.maxSize = this.$el.parentElement.clientWidth
        },
        dragged(evt) {
            const rect = this.trackEl.getBoundingClientRect()
            const x = minMax(evt.clientX - rect.x, 0, rect.width)

            this.$emit('change', Math.round(x * this.max / rect.width))
        },
        onDocumentMouseMove(evt) {
            if (this.isDragging && this.dragTarget === 'track') {
                // update track event
                this.dragged(evt)
            }

            if (evt.which !== 1) {
                // cancel drag if mouse is no longer held down
                this.isDragging = false
            }
        },
        onDocumentMouseUp(evt) {
            this.isDragging = false
            this.dragTarget = undefined
        },
        onResize(evt) {
            this.calcMaxSize()
        },
        seek(val) {
            this.calcMaxSize()

            const offset = Math.round(val * this.maxSize / this.max) - 10
            this.thumbEl.style.transform = 'translateX(' + offset + 'px)'
        }
    }
}
</script>

<style scoped>
.slider {
    position: relative;
    user-select: none;
}
.thumb {
    height: 20px;
    width: 20px;
    box-sizing: border-box;
    background-color: white;
    border: solid 1px black;
    border-radius: 30px;
    position: relative;
    z-index: 1;
    transform: translatex(-10px);
    left: 0;
    top: 0;
    cursor: pointer;
    will-change: transform;
}
.track {
    position: absolute;
    top: calc(50% - 3px);
    height: 6px;
    width: 100%;
    background-color: black;
}
</style>
