<template>
    <dragnabbit saveId="'once'">
    <div class="toolbar">
         <div class="toolbar-line">
            <div class="">
               <select class="dropdown" :value="rate" @change="updateRate">
                  <option value="2">2x</option>
                  <option value="1.75">1.75x</option>
                  <option value="1.5">1.5x</option>
                  <option value="1.25">1.25x</option>
                  <option value="1">1x</option>
                  <option value="0.75">0.75x</option>
                  <option value="0.5">0.5x</option>
                  <option value="0.25">0.25x</option>
               </select>
            </div>
            <div class="fill">
               <ja-slider @change="updateTime" @dragbegin="onDragTimeBegin" @dragend="onDragTimeEnd" :value="time" :max="duration"></ja-slider>
            </div>
         </div>
         <div class="toolbar-line">
            <select class="dropdown">
               <option selected="selected">Timeline 1</option>
            </select>
            <div class="fill"></div>
            <div class="tool-item" @click="playPause">
                <svg v-if="isPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <rect x="3" y="2" width="7.3" height="20" />
                  <rect x="13.7" y="2" width="7.3" height="20" />
               </svg>
               <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M3 22v-20l18 10-18 10z"/>
               </svg>
            </div>
            <div class="tool-item" @click="cancel">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
               <path d="M2 2h20v20h-20z"/>
            </svg>
            </div>

            <div class="fill"></div>
            <div class="tool-label current-time">{{time}} / {{duration}} ms</div>
         </div>
      </div>
    </dragnabbit>
</template>

<script>
export default {
    components: {
        slider: Slider
    },
    data() {
        return {
            timelineId: 'Timeline 1',
            time: undefined,
            duration: undefined,
            isPlaying: false,
            isPausedForSeeking: false,
            isActive: false,
            isForwards: true,
            repeat: 1,
            rate: 1
        }
    },
    methods: {
        cancel() {},
        info() {},
        playPause() {
            if (this.isPlaying) {
            } else {
            }
        },
        updateTime(time) {},
        toggleDirection() {},
        updateRate(evt) {
            const rate = +evt.currentTarget.value * (this.isForwards ? 1 : -1)
        },
        onDragTimeBegin() {
            if (this.isPlaying) {
                this.isPausedForSeeking = true
                this.playPause()
            }
        },
        onDragTimeEnd() {
            if (this.isPausedForSeeking) {
                this.isPausedForSeeking = false
                this.playPause()
            }
        },
        onSubscriptionUpdate(type, store) {
            if (store.state.id !== this.timelineId) {
                return
            }

            const timing = store.state.timing
            const playerConfig = store.state.playerConfig

            this.time = (timing.time || 0).toFixed(0)
            this.duration = timing.duration
            this.isPlaying = timing.playing
            this.isActive = timing.active
            this.isForwards = timing.rate >= 0
            this.rate = Math.abs(timing.rate || 1)
        }
    }
}
</script>

<style scoped>
.fill {
    flex-basis: auto;
    flex-shrink: 1;
    flex-grow: 1;
}
.toolbar {
    height: 100%;
}
.dropdown {
    appearance: none;
    background: none;
    border: none;
    color: white;
    overflow-y: hidden;
}

.dropdown > option {
    background-color: black;
    padding: 2px 10px;
}

.dropdown:focus {
    outline: none;
}

.toolbar-line {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 35px;
}

.toolbar-line * {
    margin-left: 14px;
    margin-right: 0;
}
.toolbar-line :first-child {
    margin-left: 15px;
}
.toolbar-line :last-child {
    margin-right: 15px;
}

.tool-label {
    flex-grow: 0;
    flex-shrink: 0;
    font-size: 16px;
    color: white;
    fill: white;
}
.tool-label input[type='number'] {
    background-color: transparent;
    color: white;
    border: none;
    text-align: center;
    width: 45px;
}

.rate {
    cursor: pointer;
    font-size: 14px;
    width: 14px;
}

.current-time {
    flex-basis: 120px;
    text-align: right;
}

.tool-item {
    width: 24px;
    flex-basis: 24px;
    flex-grow: 0;
    flex-shrink: 0;
    color: white;
    fill: white;
    cursor: pointer;
    font-size: 12px;
}
.tool-item.enabled {
    fill: blue;
}
</style>
