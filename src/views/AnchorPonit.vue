<template>
    <div class="main">
        <!-- 菜单区域 -->
        <div class="nav">
            <a href="javascript:" @click="goAnchor('#Javascript')">Javascript</a>
            <a href="javascript:" @click="goAnchor('#Java')">Java</a>
            <a href="javascript:" @click="goAnchor('#Go')">GO</a>
        </div>

        <!-- 内容区域 -->

        <div class="item">
            <div class="title" id="Javascript">Javascript</div>
            <div class="content"></div>
        </div>

        <div class="item">
            <div class="title" id="Java">Java</div>
            <div class="content"></div>
        </div>

        <div class="item">
            <div class="title" id="Go">Go</div>
            <div class="content"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {
    },
})
export default class AnchorPonit extends Vue {
    // 标签滚动
    goAnchor(selector: any) {
        this.$el.querySelector(selector).scrollIntoView({
            behavior: 'smooth', // 平滑过渡
            block: 'start',
        });
    }
}
</script>

<style scoped>
.main {
    width: 600px;
    margin: 0 auto;
    margin-top: 20px;
}

.nav a {
    text-decoration: none;
    color: #333;
    padding: 0 10px;
    margin: 0 5px;
    background: #21bb60;
    line-height: 2;
}

.nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.item {
    margin-top: 120px;
}

.title {
    background: #2cd278;
    line-height: 2;
}

.content {
    height: 300px;
    background: #eeeeee;
}
</style>
    