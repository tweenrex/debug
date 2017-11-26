<template>
    <div class="playback-control--root">
        <dragnabbit :title="title">
            <div class="playback-control--contents">
                <div class="playback-control--scubber-section">
                    <input class="playback-control--scrubber" type="range" min="0" :max="controller.duration" step="1"
                        :value="controller.currentTime | round"
                        @mousedown="scrubberMouseDown"
                        @mouseup="scrubberMouseUp"
                        @input="scrubberChanged"
                        @change="scrubberChanged" />
                </div>
                <div class="playback-control--controls">
                    <div class="playback-control--left-section">
                        <div>
                            <input class="playback-control--rate-input" type="number" min="-300" max="300" step="25"
                            :value="controller.playbackRate | toPercent"
                            @input="rateChanged" />
                            <span>%</span>
                        </div>
                    </div>
                    <div>
                        <div class="playback-control--play-button" @click="playPause">
                            <svg v-if="controller.isPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <rect x="3" y="2" width="7.3" height="20" />
                                <rect x="13.7" y="2" width="7.3" height="20" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M3 22v-20l18 10-18 10z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="playback-control--right-section">
                        <span class="playback-control--time">{{controller.currentTime | round}}</span>
                        <span>/</span> {{controller.duration}} ms
                    </div>
                </div>
            </div>
        </dragnabbit>
    </div>
</template>

<script>
import Dragnabbit from './Dragnabbit'

export default {
    name: 'playback-control',
    props: ['controller', 'title'],
    components: {
        dragnabbit: Dragnabbit
    },
    filters: {
        round(v) {
            return Math.round(v)
        },
        toPercent(v) {
            return (!v ? 0 : Math.round(v * 100))
        }
    },
    created() {
        this.subscription = this.controller.subscribe(this.updateProgress)
    },
    destroyed() {
        this.subscription()
    },
    data() {
        return {
            pausedForScrubbing: false,
            rate: 1,
            time: 0,
            subscription: undefined
        }
    },
    methods: {
        playPause() {
            if (this.controller.isPlaying) {
                this.controller.pause()
            } else {
                this.controller.play()
            }
            // vue has no way to detect isPlaying has changed (it is a getter function)
            this.$forceUpdate()
        },
        nextRate(n) {
            this.controller.playbackRate = n / 100;
        },
        rateChanged(evt) {
            this.nextRate(+evt.currentTarget.value)
        },
        scrubberChanged(evt) {
            this.controller.seek(+evt.currentTarget.value)
        },
        scrubberMouseDown(evt) {
            if (this.controller) {
                if (this.controller.isPlaying) {
                    this.pausedForScrubbing = true
                }
                this.controller.pause()
            }
        },
        scrubberMouseUp(evt) {
            if (this.controller && this.pausedForScrubbing) {
                this.pausedForScrubbing = false
                this.controller.play()
            }
        },
        updateProgress(o) {
            this.$data.time = this.controller.currentTime
        }
    }
}
</script>

<style scoped>
.playback-control--root {
    font-family: Arial;
    font-size: 10pt;
}
.playback-control--contents {
    background-color: white;
    text-align: center;
    width: 320px;
}
.playback-control--scubber-section {
    padding-left: 10px;
    padding-right: 10px;
}
.playback-control--controls {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
}
.playback-control--controls > * {
    flex-basis: 33.333%;
}

.playback-control--rate-input {
    color: #7bc7c4;
    border: none;
    font-family: Arial;
    font-size: 10pt;
    text-align: center;
    width: 40px;
}
.playback-control--play-button {
    cursor: pointer;
    display: inline-block;
    height: 20px;
    width: 20px;
}
.playback-control--left-section {
    text-align: left;
}
.playback-control--right-section {
    text-align: right;
}
.playback-control--time {
    color: #7bc7c4;
    font-weight: bold;
}
.playback-control--scrubber {
    -webkit-appearance: none;
    margin: 6.65px 0;
    width: 100%;
}
.playback-control--scrubber:focus {
    outline: none;
}
.playback-control--scrubber::-webkit-slider-runnable-track {
    background: #d2d2d2;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border-radius: 0px;
    border: 0.2px solid #000000;
    cursor: pointer;
    height: 3.7px;
    width: 100%;
}
.playback-control--scrubber::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #ffffff;
    box-shadow: 0px 0px 0px rgba(0, 0, 62, 0.67), 0px 0px 0px rgba(0, 0, 88, 0.67);
    border: 1.3px solid #000000;
    border-radius: 11px;
    cursor: pointer;
    height: 17px;
    margin-top: -6.85px;
    width: 17px;
}
.playback-control--scrubber:focus::-webkit-slider-runnable-track {
    background: #ffffff;
}
.playback-control--scrubber::-moz-range-track {
    background: #d2d2d2;
    border-radius: 0px;
    border: 0.2px solid #000000;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    cursor: pointer;
    height: 3.7px;
    width: 100%;
}
.playback-control--scrubber::-moz-focus-outer {
    /* remove focus border in firefox */
    border: 0;
}
.playback-control--scrubber::-moz-range-thumb {
    background: #ffffff;
    box-shadow: 0px 0px 0px rgba(0, 0, 62, 0.67), 0px 0px 0px rgba(0, 0, 88, 0.67);
    border: 1.3px solid #000000;
    border-radius: 11px;
    cursor: pointer;
    height: 17px;
    width: 17px;
}
.playback-control--scrubber::-ms-track {
    color: transparent;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    height: 3.7px;
    width: 100%;
}
.playback-control--scrubber::-ms-fill-lower {
    background: #929292;
    border: 0.2px solid #000000;
    border-radius: 0px;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
}
.playback-control--scrubber::-ms-fill-upper {
    background: #d2d2d2;
    border: 0.2px solid #000000;
    border-radius: 0px;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
}
.playback-control--scrubber::-ms-thumb {
    box-shadow: 0px 0px 0px rgba(0, 0, 62, 0.67), 0px 0px 0px rgba(0, 0, 88, 0.67);
    border: 1.3px solid #000000;
    height: 3.7px;
    border-radius: 11px;
    background: #ffffff;
    cursor: pointer;
    width: 17px;
}
.playback-control--scrubber:focus::-ms-fill-lower {
    background: #d2d2d2;
}
.playback-control--scrubber:focus::-ms-fill-upper {
    background: #ffffff;
}
</style>
