<template>
    <div id="app-video">
        <div class="video-content">
            <h2>视频播放器(video.js)</h2>
            <player-video ref="video" :volume="volume" :src="src"></player-video>
        </div>
        <div class="button-group">
            <el-button class="primary" @click="playVideo">开始视频</el-button>
            <el-button class="primary" @click="stopVideo">暂停视频</el-button>
            <el-button class="primary" @click="reloadVideo">重新加载</el-button>
            <el-button class="primary" @click="forwardVideo">视频快进</el-button>
            <el-button class="primary" @click="backVideo">视频后退</el-button>
            <el-button class="primary" @click="volumeUpVideo">增大音量</el-button>
            <el-button class="primary" @click="volumeDownVideo">降低音量</el-button>
            <el-button class="primary" @click="toggleToDefault">默认频道</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PlayerVideo from '../components/PlayerVideo.vue';

@Component({
    components: {
        PlayerVideo
    },
})
export default class VideoDemo extends Vue {
    private volume = 0.5;
    private src = '/test.mp4';

    public video() {
        return this.$refs.video;
    }

    beforeCreate() {
        this.volume = window.localStorage.volume;
    }

    // 父类组件调用子组件方法，触发播放器功能
    playVideo() {
        this.video.play();
    }
    stopVideo() {
        this.video.stop();
    }
    reloadVideo() {
        this.video.reload();
    }
    forwardVideo() {
        this.video.forward();
    }
    backVideo() {
        this.video.back();
    }
    fullScreenVideo() {
        this.video.fullScreen();
    }
    screenVideo() {
        this.video.exitScreen();
    }
    volumeUpVideo() {
        this.video.volumeUp();
    }
    volumeDownVideo() {
        this.video.volumeDown();
    }
    toggleToDefault() {
        this.video.toggleTv({
            src: {
                type: 'video/mp4',
                src: 'test2.mp4',
            },
            load: 'test2.mp4',
        });
    }
}
</script>


<style lang="less">
#app-video {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    justify-content: center;

    .video-content {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin-right: 20px;
    }

    .button-group {
        margin-top: 20px;
        display: flex;
        flex: 0 0 100px;
        flex-direction: column;
        justify-content: space-between;
        // align-items: center;
    }
}
</style>
  