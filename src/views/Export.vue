<template>
    <div class="export-excel">
        <!-- <el-button size="small" type="success" @click="exportExcelByDDArray">二维数组导出</el-button> -->
        <!-- <el-button size="small" type="primary" @click="exportExcelByTable">导出excel</el-button> -->
        <el-button size="small" type="primary" @click="exportExcelByTable">导出excel</el-button>
        <!-- 内容为组件 table -->
        <!-- <el-table ref="table" :data="tableData" style="width: 600px; margin: 0 auto">
        <el-table-column prop="date" label="日期" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="address" label="地址">
          <template slot-scope>
            <el-input :value="123" />
            <span style="display: none">123</span>
          </template>
        </el-table-column>
      </el-table> -->

        <!-- 使用 fixed 属性 table2 -->
        <el-table ref="table" :data="tableData" style="width: 900px; margin: 2em auto 0 auto" max-height="250">
            <el-table-column prop="date" label="日期" width="150"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
            <el-table-column prop="province" label="省份" width="120"> </el-table-column>
            <el-table-column prop="city" label="市区" width="120"> </el-table-column>
            <el-table-column prop="address" label="地址" width="300"> </el-table-column>
            <el-table-column prop="zip" label="邮编" width="120"> </el-table-column>
        </el-table>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { excelExportByTable } from '../utils/xlsx';

@Component({
    components: {
    },
})
export default class ExportView extends Vue {
    private worksheetData = [
        ['S', 'h', 'e', 'e', 't', 'J', 'S'],
        [1, 2, 3, 4, 5],
    ]

    private tableData = [
        {
            date: '2022-07-03',
            name: '前端',
            province: '北京',
            city: '海淀区',
            address: '北京市海淀区上地西路 10街道',
            zip: 110333,
        },
        {
            date: '2022-07-02',
            name: '前端',
            province: '北京',
            city: '海淀区',
            address: '北京市海淀区上地西路 10街道',
            zip: 110333,
        },
        {
            date: '2022-07-04',
            name: '前端',
            province: '北京',
            city: '海淀区',
            address: '北京市海淀区上地西路 10街道',
            zip: 110333,
        },
        {
            date: '2022-07-01',
            name: '前端',
            province: '北京',
            city: '海淀区',
            address: '北京市海淀区上地西路 10街道',
            zip: 110333,
        },
        {
            date: '2022-07-08',
            name: '前端',
            province: '北京',
            city: '海淀区',
            address: '北京市海淀区上地西路 10街道',
            zip: 110333,
        },
        {
            date: '2022-07-06',
            name: '前端',
            province: '北京',
            city: '海淀区',
            address: '北京市海淀区上地西路 10街道',
            zip: 110333,
        },
        {
            date: '2022-07-07',
            name: '前端',
            province: '北京',
            city: '海淀区',
            address: '北京市海淀区上地西路 10街道',
            zip: 110333,
        },
    ]

    //   通过二维数组导出 excel
    // excelExportByDDArrayForDai() {
    //   exportExcelByDoubleDimensArray(this.worksheetData);
    // }

    // 将 table 导出 Excel
    // excelExportByTable() {
    //   exportExcelByTable(this.$refs.table.$el);
    // }
    exportExcelByTable() {
        // const newEl = this.removeFixedDom(this.$refs.table.$el);
        excelExportByTable(this.$refs.table.$el);
    }
    // removeFixedDom(el) {
    //   const newEl = el.cloneNode(true);
    //   newEl.childNodes.forEach((node) => {
    //     if (node.className === 'el-table__fixed') {
    //       node.parentNode.removeChild(node);
    //     }
    //   });
    //   return newEl;
    // }
}

</script>
  
<style>

</style>
  