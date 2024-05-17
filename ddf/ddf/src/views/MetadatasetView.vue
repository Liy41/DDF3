<template> 
 <div>
       <div style="margin-bottom: 10pt">
        <span class="demonstration">Domain: </span>
        <el-cascader
          v-model="value"
          :options="options"
          @change="handleChange"
          @active-item-change="handleItemChange">
          </el-cascader>
        <el-input v-model="input" placeholder="请输入记录数" style="width: 200pt; margin-left: 10pt"></el-input>
        <el-button type="primary" icon="el-icon-search" style="margin-left: 10pt" @click="search()">提交</el-button>
        <el-button type="primary" icon="el-icon-search" style="margin-left: 10pt">预览</el-button>
        <el-button type="primary">下载<i class="el-icon-download el-icon--right" style="margin-left: 10pt"></i></el-button>
  </div>
    <div>
        <el-table
        :data="tableData" style="width: 100%">
        <el-table-column prop="domain_name" label="Domain" width="180"> </el-table-column>
        <el-table-column prop="variable_name" label="Variable Name" width="180"> </el-table-column>
        <el-table-column prop="variable_label" label="Variable Label"> </el-table-column>
        <el-table-column prop="variable_type" label="Type"> </el-table-column> 
         <el-table-column prop="ct_name" label="Code"> </el-table-column>        
        <el-table-column prop="variable_core" label="Core"> </el-table-column> 

        <el-table-column label="操作">  
                    <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"  @click="handleCreate">编辑</el-button>
        </el-table-column>  
        </el-table>    
    </div>
    <div>
          <el-dialog :visible.sync="dialogFormVisible">
      <el-form
        :model="configForm"
        ref="dataForm"
        label-position="left"
        label-width="90px"
        style="width: 200px; margin-left:50px;"
      >
        <!-- <el-form-item label="变量名称" prop="configForm">
          <el-input type="textarea" :rows="1" v-model="configForm.variablename"></el-input> -->
        <!-- </el-form-item> -->
        <el-form-item label="Min" prop="min">
          <el-input v-model="configForm.min" />
        </el-form-item>
        <el-form-item label="Max" prop="max">
          <el-input v-model="configForm.max" />
        </el-form-item>
        <el-form-item label="Median" prop="median">
          <el-input v-model="configForm.median" />
        </el-form-item>
        <el-form-item label="Codelist" prop="codelist" >
            <el-select
    v-model="value"
    multiple
    filterable
    allow-create
    default-first-option
    placeholder="请选择code">
    <el-option
      v-for="item in code"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createData() ">确定</el-button>
      </div>
    </el-dialog>
    </div>

 
<div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="totalItems">
    </el-pagination>

  </div>
    </div>
</template>


  <script>
  import axios from 'axios';
  axios.defaults.headers.common['User-Agent'] = "Thunder Client (https://www.thunderclient.com)";
    export default {

      data() {
        return {
          input: "",
          configForm: {
            variablename: "",
            min: "",
            max: "",
            median: "",
          },
          dialogFormVisible: false,
          domain:'',
          currentPage:1,
          totalItems:1,
          pages:1,
          input:'',
          variablename:'',
          tableData: [
          ],
         value: [],
         code:[ { "value": "Female", "label": "女性" },
                { "value": "Male", "label": "男性" }],
        options: [{
          value: 'sdtm',
          label: 'SDTM',
          children: [{
            value: 'specpurpose',
            label: 'Special Purpose',
            children: [{
              value: 'dm',
              label: 'DM'
            }, {
              value: 'co',
              label: 'CO'
            }, {
              value: 'SV',
              label: 'SV'
            }, {
              value: 'se',
              label: 'SE'
            }]
          }, {
            value: 'interventions',
            label: 'Interventions',
            children: [{
              value: 'cm',
              label: 'CM'
            }, {
              value: 'ex',
              label: 'EX'
            }]
          }]
        }, {
          value: 'zujian',
          label: 'ADAM',
          children: [{
            value: 'occds',
            label: 'OCCDS',
            children: [{
              value: 'adae',
              label: 'ADAE'
            }, {
              value: 'adcm',
              label: 'ADCM'
            }]
          }, {
            value: 'adsl',
            label: 'ADSL' 
          }, {
            value: 'data',
            label: 'BDS',
            children: [{
              value: 'adlb',
              label: 'ADLB'
            }, {
              value: 'adeg',
              label: 'ADEG'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: 'EDC',
          // children: [{
          //   value: 'axure',
          //   label: 'Axure Components'
          // }, {
          //   value: 'sketch',
          //   label: 'Sketch Templates'
          // }, {
          //   value: 'jiaohu',
          //   label: '组件交互文档'
          // }]
        }]
        
      };
         },
      // },
       methods: {

        //如果多个页面需要调用这个方法 可以单独提出来作为一个js，别的vue直接import进来用就可以
      //注意await方式调用时需要将方法设置为 async 意思为异步方法 页面不会一直卡住等待这个请求（可以尝试一下新写个页面 方法里面直接睡1000S  理解同步异步区别）
      async initLoadDate(page, domain){
        //构造domain
        let domainName = "domain_name in (\"" + domain + "\")";
        // 拼接请求头--无固定格式 一般看后端要求
        let headersList = {
          "Accept": "*/*",
          "Authorization": "Bearer NULL"
        }
        //拼接请求参数--目前可变参数只设置了 page第几页  
        let formdata = new FormData();
        formdata.append("varlist", "*");
        formdata.append("keytablename", "DDF-VARIABLE-LIST");
        formdata.append("page", page);
        formdata.append("pagesize", "10");
        formdata.append("filter", domainName);

        let reqOptions = {
          url: "https://api.data42.cn/lms/v1/ddf-query.php",
          method: "POST",
          headers: headersList,
          data: formdata,
        }
        //前后端交互
        let response = await axios.request(reqOptions);
        var resultDate = response.data;
        //按照我的理解，他返回的error是个错误标识，如果错误则直接弹框信息  需要与后端确认
        if(resultDate.error){
          alert(resultDate.message);
          return;
        }
        //设置数据总数
        this.totalItems = resultDate.total;
        //设置表格数据  注意此次后端是直接以数组形式返回的，所以可以直接赋值   若是其它格式则需要转换一下，使用push方法添加到数组中，push前注意 清空原有数据
        this.tableData = resultDate.records;
        this.variablename = resultDate.variable_name;
      },
        handleCreate() {
      this.configForm = {
        variablename: "",
        min: "",
        max: "",
        median: ""
      };
      this.dialogFormVisible = true;
    },
    //添加增加题目
    async createData() {
      const params = this.configForm;
      console.log(params);   
      alert(JSON.stringify(params))
 
      //如果需要调用接口，请打开注释
    //   const res = await saveSubject(params);
    //   console.log(res);
    //   if (res.code === "0000") {
    //     this.$message({
    //       type: "info",
    //       message: "保存成功",
    //     });
    //     this.dialogFormVisible = false;
    //     this.getQuerySubjectList();
    //     return;
    //   }
    //   this.$message({
    //     type: "error",
    //     message: "保存失败",
    //   });
    },
      handleCurrentChange(val) {
        this.initLoadDate(val, this.domain);
      },
      handleItemChange(){
        return;
      },
      search(){
        alert('我开始搜索啦'+this.input)
      },
      handleChange(value) {
        console.log(value);
      },  
      openForm() {
      this.dialogFormVisible = true; // 显示模态框
    },
    submitForm() {
      // 处理表单提交逻辑
    }
    },
    //mounted或者created 表示页面的生命周期 可以去了解一下有哪些
    //这次使用的mounted表示它在Vue实例的挂载元素被创建和插入到DOM中后被调用
    mounted(){
      this.domain = this.$route.query.domain;
      this.initLoadDate(1, this.domain);
      console.log(variable_name);
      form.configForm.variablename = this.resultDate[0].variable_name;
    },
    watch :{
      '$route'(to, from) {
        if (to.query.domain !== from.query.domain) {
          this.domain = to.query.domain;
          this.initLoadDate(1, this.domain);
          this.currentPage=1;
      }
    } 
    }

    }
  </script>
<style scoped>
</style>