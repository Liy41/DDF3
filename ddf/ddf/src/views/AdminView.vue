<template> 
 <div>
    <!-- <div style="margin-bottom: 10pt">
        <el-input v-model="input" placeholder="请输入内容" style="width: 200pt"></el-input>
        <el-button type="primary" icon="el-icon-search" style="margin-left: 10pt">搜索</el-button>
        <el-button type="primary">上传<i class="el-icon-upload el-icon--right" style="margin-left: 10pt"></i></el-button>
    </div>
    <div>
        <el-table
        :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column label="操作">  
        <el-button type="primary"> 编辑 </el-button>
        <el-button type="danger"> 删除 </el-button> 
         </el-table-column>     
        </el-table> 
    </div>
<div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div> -->
  </div>
</template>


  <script>
    export default {
            methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      }
    }
  </script>
