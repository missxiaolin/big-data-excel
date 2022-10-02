<template>
    <div>
        <el-button size="small" type="success" :disabled="pending" @click="exportCsvBtn">导出 CSV 表格</el-button>
        <div class="control">
            <div>
                <span ref="progress" :style="{ width: `${csvProcess}%` }" class="progress general-5s"></span>
            </div>
            <div>
                <img :src="src" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {
    },
})
export default class BigData extends Vue {
    private src = 'https://pics7.baidu.com/feed/ae51f3deb48f8c5429f2b0f0cd84b2ffe1fe7f00.jpeg?token=3aada23a6ce4d48a6087314bb9514688'
    private pending = false
    private csvProcess = 0

    // 创建模拟数据
    async exportCsvBtn() {
        try {
            this.pending = true;
            await exportCsv(10000 * 100, 2000, (process) => {
                // 进度条更新
                console.log('process', process);
                this.csvProcess = process;
            });
        } catch (error) {
            // alert(error);
        } finally {
            this.pending = false;
        }
    }
}
</script>
    

<style>
.title {
    color: #fff;
}

.smooth {
    color: aqua;
}

.control {
    background: rgb(121 121 102 / 30%);
    width: 90%;
    height: 3px;
    border-radius: 5px;
    margin: 10px auto;
}

.control .progress {
    display: block;
    width: 30%;
    height: 3px;
    background: #34c91f;
    border-radius: 5px;
}

.smooth {
    transition: 0.5s linear;
}

.control .timer {
    font-size: 12px;
}
</style>
    