<template>
  <div class="table-classic-wrapper">
    <Hints>
      <template slot="hintName">风险点大数据监督</template>
      <template slot="hintInfo">
        <p>请及时处理跟进风险点</p>
      </template>
    </Hints>
    <el-card shadow="always">
      <!-- 操作栏 -->
      <div class="control-btns">
        <el-button type="primary" @click="handleCreate">新建数据</el-button>
        <el-button type="primary" @click="expertHelp">专家协助</el-button>
        <el-button type="primary" @click="yjDetail">预警详情</el-button>
        <el-button type="primary" @click="yjfk">预警反馈</el-button>

        <el-button type="primary" @click="ccCheck">抽查核验</el-button>
        <el-button type="primary" @click="checkResult">核验结果</el-button>


        <el-button type="primary" @click="handleImport">导入数据</el-button>
        <el-button type="primary" @click="exportVisible = true">导出数据</el-button>
        <el-button type="danger" @click="batchDelete">批量删除</el-button>
      </div>
      <!-- 查询栏 -->
      <el-form
        ref="searchForm"
        :inline="true"
        :model="listQuery"
        label-width="90px"
        class="search-form"
      >
        <el-form-item label="部门名称">
          <el-input v-model="listQuery.id" placeholder="部门名称" />
        </el-form-item>
        <el-form-item label="风险点">
          <el-input v-model="listQuery.phone" placeholder="风险点" />
        </el-form-item>
        <el-form-item label="处理状态">
          <el-select v-model="listQuery.married" placeholder="处理状态">
            <el-option :value="0" label="已处理" />
            <el-option :value="1" label="未处理" />
         
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格栏 -->
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        size="medium"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="60" />
        <el-table-column prop="id" label="编号" align="center" width="120" sortable />
        <el-table-column prop="name" label="风险点" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>手机: {{ scope.row.phone }}</p>
              <p>爱好: {{ scope.row.hobby }}</p>
              <div slot="reference">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="类别" align="center">
          <template slot-scope="scope">{{ scope.row.sex }}</template>
        </el-table-column>
        <el-table-column label="处理状态" align="center" width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.married" style="width: 200px" @change="selectChange(scope.row)">
              <el-option :value="0" label="未处理" />
              <el-option :value="1" label="已处理" />
          
            </el-select>
          </template>
        </el-table-column>
        
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" :disabled="scope.row.forbid" @click="handleEdit(scope.$index, scope.row)">做出决策</el-button>
            <el-button size="mini" type="primary" :disabled="scope.row.forbid" @click="handleEdit(scope.$index, scope.row)">外部协助</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页栏 -->
      <Pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="fetchData" />
      <!-- 新增/编辑 弹出栏 -->
      <el-dialog
        title="预警信息处置决策"
        :visible.sync="formVisible"
        width="45%"
        class="dialog-form"
        :before-close="handleClose"
      >
        <el-row class="yj-info yj-title">
          <el-col :span="24"><div class="grid-content bg-purple"><h2>01 预警基本信息</h2></div></el-col>
        </el-row >
        <el-row class="yj-info">
          <el-col :span="14"><div class="grid-content bg-purple">费用申请名称：用餐报销申请-花园酒店0620</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light">编号：00001</div></el-col>
        </el-row>
        <el-row class="yj-info">
          <el-col :span="14"><div class="grid-content bg-purple">消费单位：天宁区花园酒店</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light">消费金额：560</div></el-col>
        </el-row>
        <el-row class="yj-info">
          <el-col :span="24"><div class="grid-content bg-purple">预警信息：招待费金额超标（超192元），需要进行核对确认！</div></el-col>
        </el-row >
        <el-row class="yj-info">
          <el-col :span="14"><div class="grid-content bg-purple">模型名称：报销类数据分析模型</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light">模型编号：Bx-0001</div></el-col>
        </el-row>
        
        <el-row class="yj-info">
          <el-col :span="14"><div class="grid-content bg-purple">预警时间：2024-06-21</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light">问题状态：待处理</div></el-col>
        </el-row>
       
        <el-form
          ref="dialogForm"
          :model="dialogForm"
          label-width="120px"
          style="margin-top: 30px;color:black"
        >
         
        <el-row class="yj-info yj-title">
          <el-col :span="24"><div class="grid-content bg-purple"><h2>02 处置决策</h2></div></el-col>
        </el-row >
         
          <el-form-item label="核实结果：" prop="hobby">
            <el-checkbox-group v-model="dialogForm.hobby">
              <el-checkbox label="确实有问题" name="hobby" />
              <el-checkbox label="没问题，误判" name="hobby" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="核实记录">
            <el-input type="textarea" ></el-input>
          </el-form-item>
          <el-row class="yj-info">
            <el-col :span="24"><div class="grid-content bg-purple">下一步：预警反馈</div></el-col>
          </el-row >
          <div class="footer-item">
            <el-button @click="cancleForm">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="submitForm('dialogForm')">提交 </el-button>
          </div>
        </el-form>
      </el-dialog>
      <!-- 专家协助-->
      <el-dialog
        title="专家协助"
        :visible.sync="formVisible2"
        width="45%"
        class="dialog-form"
        :before-close="handleClose"
      >
        <el-row class="yj-info yj-title">
          <el-col :span="24"><div class="grid-content bg-purple"><h2>01 预警基本信息</h2></div></el-col>
        </el-row >
        <el-row class="yj-info">
          <el-col :span="14"><div class="grid-content bg-purple">费用申请名称：用餐报销申请-花园酒店0620</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light">编号：00001</div></el-col>
        </el-row>
        <el-row class="yj-info">
          <el-col :span="14"><div class="grid-content bg-purple">消费单位：天宁区花园酒店</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light">消费金额：560</div></el-col>
        </el-row>
        <el-row class="yj-info">
          <el-col :span="24"><div class="grid-content bg-purple">预警信息：招待费金额超标（超192元），需要进行核对确认！</div></el-col>
        </el-row >
        <el-row class="yj-info">
          <el-col :span="14"><div class="grid-content bg-purple">模型名称：报销类数据分析模型</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light">模型编号：Bx-0001</div></el-col>
        </el-row>
        
        <el-row class="yj-info">
          <el-col :span="14"><div class="grid-content bg-purple">预警时间：2024-06-21</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light">问题状态：待处理</div></el-col>
        </el-row>
       
        <el-form
          ref="dialogForm"
          :model="dialogForm"
          label-width="120px"
          style="margin-top: 30px;color:black"
        >
         
        <el-row class="yj-info yj-title">
          <el-col :span="24"><div class="grid-content bg-purple"><h2>02 协助申请</h2></div></el-col>
        </el-row >
          <el-form-item label="申请原因">
            <el-input type="textarea" ></el-input>
          </el-form-item>
          <el-form-item label="申请对象">
            <el-select v-model="dialogForm.expert" placeholder="法务部-张三">
              <el-option label="法务部-张三" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          
          <div class="footer-item">
            <el-button @click="cancleForm">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="submitForm('dialogForm')">提交 </el-button>
          </div>
        </el-form>
      </el-dialog>
       <!-- 预警详情-->
       <el-dialog
        title="预警详情"
        :visible.sync="formVisible3"
        width="45%"
        class="dialog-form"
        :before-close="handleClose"
      >
        <el-row class="yj-info yj-title">
          <el-col :span="24"><div class="grid-content bg-purple"><h2>预警基本信息</h2></div></el-col>
        </el-row >
        <el-row class="yj-info">
          <el-col :span="14"><div class="grid-content bg-purple">费用申请名称：用餐报销申请-花园酒店0620</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light">编号：00001</div></el-col>
        </el-row>
        <el-row class="yj-info">
          <el-col :span="14"><div class="grid-content bg-purple">消费单位：天宁区花园酒店</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light">消费金额：560</div></el-col>
        </el-row>
        <el-row class="yj-info">
          <el-col :span="24"><div class="grid-content bg-purple">预警信息：招待费金额超标（超192元），需要进行核对确认！</div></el-col>
        </el-row >
        <el-row class="yj-info">
          <el-col :span="14"><div class="grid-content bg-purple">模型名称：报销类数据分析模型</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light">模型编号：Bx-0001</div></el-col>
        </el-row>
        
        <el-row class="yj-info">
          <el-col :span="14"><div class="grid-content bg-purple">预警时间：2024-06-21</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light">问题状态：待处理</div></el-col>
        </el-row>
        <el-row class="yj-info yj-title">
          <el-col :span="24"><div class="grid-content bg-purple"><h2>02决策处置</h2></div></el-col>
        </el-row >
        <el-row class="yj-info">
          <el-col :span="24"><div class="grid-content bg-purple">处置内容:当前用户暂未处理，进行了外部协助</div></el-col>
        </el-row >
        <el-row class="yj-info yj-title">
          <el-col :span="24"><div class="grid-content bg-purple"><h2>03协助申请</h2></div></el-col>
        </el-row >
        <el-row class="yj-info">
          <el-col :span="24"><div class="grid-content bg-purple">申请原因：当前用户对于报销标准并不熟悉。</div></el-col>
        </el-row >
        <el-row class="yj-info">
          <el-col :span="24"><div class="grid-content bg-purple">申请对象：法务部-张三</div></el-col>
        </el-row >
        <el-row class="yj-info">
          <el-col :span="24"><div class="grid-content bg-purple">申请时间：2024-06-25</div></el-col>
        </el-row >
        <el-form
          ref="dialogForm"
          :model="dialogForm"
          label-width="120px"
          style="margin-top: 30px;color:black"
        >
        
            <div class="footer-item">
              <el-button type="primary" :disabled="isSubmit" @click="submitForm('dialogForm')">关闭 </el-button>
            </div>
          </el-form>
      </el-dialog>
       <!-- 预警反馈-->
       <el-dialog
        title="预警反馈"
        :visible.sync="formVisible6"
        width="45%"
        class="dialog-form"
        :before-close="handleClose"
      >
        <el-row class="yj-info yj-title">
          <el-col :span="24"><div class="grid-content bg-purple"><h2>预警基本信息</h2></div></el-col>
        </el-row >
        <el-row class="yj-info">
          <el-col :span="14"><div class="grid-content bg-purple">费用申请名称：用餐报销申请-花园酒店0620</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light">编号：00001</div></el-col>
        </el-row>
        <el-row class="yj-info">
          <el-col :span="14"><div class="grid-content bg-purple">消费单位：天宁区花园酒店</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light">消费金额：560</div></el-col>
        </el-row>
        <el-row class="yj-info">
          <el-col :span="24"><div class="grid-content bg-purple">预警信息：招待费金额超标（超192元），需要进行核对确认！</div></el-col>
        </el-row >
        <el-row class="yj-info">
          <el-col :span="14"><div class="grid-content bg-purple">模型名称：报销类数据分析模型</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light">模型编号：Bx-0001</div></el-col>
        </el-row>
        
        <el-row class="yj-info">
          <el-col :span="14"><div class="grid-content bg-purple">预警时间：2024-06-21</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light">问题状态：待处理</div></el-col>
        </el-row>
        <el-row class="yj-info yj-title">
          <el-col :span="24"><div class="grid-content bg-purple"><h2>02决策处置</h2></div></el-col>
        </el-row >
        <el-row class="yj-info">
          <el-col :span="24"><div class="grid-content bg-purple">处置内容:当前用户暂未处理，进行了外部协助</div></el-col>
        </el-row >
        <el-row class="yj-info yj-title">
          <el-col :span="24"><div class="grid-content bg-purple"><h2>03结果反馈</h2></div></el-col>
        </el-row >
        <el-row class="yj-info">
          <el-form-item label="申请原因">
            <el-input type="textarea" ></el-input>
          </el-form-item>
        </el-row >
        <el-form
          ref="dialogForm"
          :model="dialogForm"
          label-width="120px"
          style="margin-top: 30px;color:black"
        >
        
            <div class="footer-item">
              <el-button type="primary" :disabled="isSubmit" @click="submitForm('dialogForm')">关闭 </el-button>
            </div>
          </el-form>
      </el-dialog>
      <!-- 抽查核验-->
      <el-dialog
        title="抽查核验"
        :visible.sync="formVisible4"
        width="45%"
        class="dialog-form"
        :before-close="handleClose"
      >
        <el-row class="yj-info yj-title">
          <el-col :span="24"><div class="grid-content bg-purple">根据当前抽查比例，系统为你推荐下面费用申请，您也可以<span style="color:blue">换一批</span></div></el-col>
        </el-row >
        <el-table
          :data="tableData2"
          border
          style="width: 100%">
          <el-table-column
            prop="depart"
            label="申请部门"
            width="180">
          </el-table-column>
          <el-table-column
            prop="date"
            label="申请日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="title"
            label="报销名称"
            width="180">
          </el-table-column>
          
          <el-table-column
            prop="innovation"
            label="报销费用">
          </el-table-column>
          <el-table-column
            prop="average"
            label="历史平均值">
          </el-table-column>
        </el-table>
      </el-dialog>
        <!-- 核验结果录入-->
      <el-dialog
        title="核验结果录入"
        :visible.sync="formVisible5"
        width="45%"
        class="dialog-form"
        :before-close="handleClose"
      >
        <el-row class="yj-info yj-title">
          <el-col :span="24"><div class="grid-content bg-purple"><h2>预警基本信息</h2></div></el-col>
        </el-row >
        <el-row class="yj-info">
          <el-col :span="14"><div class="grid-content bg-purple">费用申请名称：用餐报销申请-花园酒店0620</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light">编号：00001</div></el-col>
        </el-row>
        <el-row class="yj-info">
          <el-col :span="14"><div class="grid-content bg-purple">消费单位：天宁区花园酒店</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light">消费金额：560</div></el-col>
        </el-row>
        <el-row class="yj-info">
          <el-col :span="24"><div class="grid-content bg-purple">预警信息：招待费金额超标（超192元），需要进行核对确认！</div></el-col>
        </el-row >
        <el-row class="yj-info">
          <el-col :span="14"><div class="grid-content bg-purple">模型名称：报销类数据分析模型</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light">模型编号：Bx-0001</div></el-col>
        </el-row>
        
        <el-row class="yj-info">
          <el-col :span="14"><div class="grid-content bg-purple">预警时间：2024-06-21</div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light">问题状态：待处理</div></el-col>
        </el-row>
        <el-row class="yj-info yj-title">
          <el-col :span="24"><div class="grid-content bg-purple"><h2>02决策处置</h2></div></el-col>
        </el-row >
        <el-row class="yj-info">
          <el-col :span="24"><div class="grid-content bg-purple">处置内容:对该项报销进行重新核对，确认招待费超标属实，费用超标部分不予报销</div></el-col>
        </el-row >
        <el-row class="yj-info">
          <el-col :span="24"><div class="grid-content bg-purple">处置时间：2024-06-26</div></el-col>
        </el-row >
        <el-row class="yj-info">
          <el-col :span="24"><div class="grid-content bg-purple">附件：<span style="color: blue">财务部复核材料.doc</span></div></el-col>
        </el-row >
        
        
        <el-form
          ref="dialogForm"
          :model="dialogForm"
          label-width="120px"
          style="margin-top: 30px;color:black"
        >
        
          <div class="footer-item">
            <el-button type="primary" :disabled="isSubmit" @click="submitForm('dialogForm')">保存 </el-button>
          </div>
        </el-form>
      </el-dialog>
      <!-- 导入数据 弹出栏 -->
      <el-dialog
        title="导入数据"
        :visible.sync="importVisible"
        width="20%"
      >
        <div class="upload-box">
          <span>选择文件：</span>
          <Upload :files-format="filesFormat">
            <i class="vue-dsn-icon-upload" />上传文件
          </Upload>
        </div>
        <div class="hints">TIP：请选择要导出数据的格式。</div>
        <span slot="footer">
          <el-button @click="cancleImport">取 消</el-button>
          <el-button type="primary" @click="confirmImport">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 导出数据 弹出栏 -->
      <el-dialog
        title="导出数据"
        :visible.sync="exportVisible"
        width="30%"
      >
        <div class="export-data">
          <el-button type="primary" @click="exportTable('xlsx')">EXCEL格式</el-button>
          <el-button type="primary" @click="exportTable('csv')">CSV格式</el-button>
          <el-button type="primary" @click="exportTable('txt')">TXT格式</el-button>
        </div>
        <div class="hints">TIP：请选择要导出数据的格式。</div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getTableList } from '@/api'
import excel from '@/utils/excel'
import Pagination from '@/components/Pagination'
import Upload from '@/components/Upload'
import Hints from '@/components/Hints'

export default {
  name: 'Table',
  components: { Pagination, Upload, Hints },
  data() {
    return {
      // 数据列表加载动画
      listLoading: true,
      // 查询列表参数对象
      listQuery: {
        id: undefined,
        phone: undefined,
        married: undefined,
        currentPage: 1,
        pageSize: 10
      },
      // 新增/编辑提交表单对象
      dialogForm: {
        name: undefined,
        phone: undefined,
        married: undefined,
        hobby: [],
        expert:''
      },
      // 数据总条数
      total: 0,
      // 表格数据数组
      tableData: [],
      // 多选数据暂存数组
      multipleSelection: [],
      // 新增/编辑 弹出框显示/隐藏
      formVisible: false,
      formVisible2: false,
      formVisible3: false,
      formVisible4: false,
      formVisible5: false,
      formVisible6: false,


      // 表单校验 trigger: ['blur', 'change'] 为多个事件触发
  
      // 防止多次连续提交表单
      isSubmit: false,
      // 导入数据 弹出框显示/隐藏
      importVisible: false,
      // 导出文件格式
      filesFormat: '.txt, .csv, .xls, .xlsx',
      // 导出数据 弹出框显示/隐藏
      exportVisible: false,
      tableData2: [{
          depart :'财务部',
          date: '2016-05-02',
          title: '用餐报销申请-花园酒店0620',
          name: '张三',
          innovation: '721元',
          average: '500元'
        }, {
          depart :'合约部',
          date: '2016-05-04',
          title: '办公用品批量采购-b分公司',
          name: '王小虎',
          innovation: '3000元',
          average: '2000元'
        }, {
          depart :'法务部',
          date: '2016-05-01',
          title: '用餐报销-阳光饭店0611',
          name: '李磊',
          innovation: '1500元',
          average: '500元'
        }, {
          depart :'办公室',
          date: '2016-05-03',
          title: '公车(00301)维修费用',
          name: '旺财',
          innovation: '23000元',
          average: '10000元'
        }]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 新建数据
    handleCreate() {
      this.formVisible = true
      this.dialogForm.name = undefined
      this.dialogForm.phone = undefined
      this.dialogForm.married = undefined
      this.dialogForm.hobby = []
    },
    expertHelp() {
      this.formVisible2 = true
      this.dialogForm.name = undefined
      this.dialogForm.phone = undefined
      this.dialogForm.married = undefined
      this.dialogForm.hobby = []
    },
    yjDetail() {
      this.formVisible3 = true
      this.dialogForm.name = undefined
      this.dialogForm.phone = undefined
      this.dialogForm.married = undefined
      this.dialogForm.hobby = []
    },
    yjfk() {
      this.formVisible6 = true
      this.dialogForm.name = undefined
      this.dialogForm.phone = undefined
      this.dialogForm.married = undefined
      this.dialogForm.hobby = []
    },
    ccCheck() {
      this.formVisible4 = true
      this.dialogForm.name = undefined
      this.dialogForm.phone = undefined
      this.dialogForm.married = undefined
      this.dialogForm.hobby = []
    },
    checkResult() {
      this.formVisible5 = true
      this.dialogForm.name = undefined
      this.dialogForm.phone = undefined
      this.dialogForm.married = undefined
      this.dialogForm.hobby = []
    },
    // 编辑数据
    handleEdit(index, row) {
      console.log(index, row)
      this.formVisible = true
      this.dialogForm.name = row.name
      this.dialogForm.phone = row.phone
      this.dialogForm.married = row.married
      this.dialogForm.hobby = row.hobby.split('、')
    },
    // 删除数据
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('此操作将删除选中数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 此处可添加--删除接口
        // 删除成功调用fetchData方法更新列表
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 批量删除
    batchDelete() {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: '请先选择要删除的数据！',
          type: 'warning'
        })
      } else {
        this.handleDelete()
      }
    },
    // 新增/编辑弹出框 关闭时操作
    handleClose() {
      this.formVisible = false
      this.$refs.dialogForm.resetFields()
    },
    // 获取数据列表
    fetchData() {
      this.listLoading = true
      // 获取数据列表接口
      getTableList(this.listQuery).then(res => {
        const data = res.data
        if (data.code === 0) {
          this.total = data.data.total
          this.tableData = data.data.list
          this.listLoading = false
        }
      }).catch(() => {
        this.listLoading = false
      })
    },
    // 查询数据
    onSubmit() {
      this.listQuery.currentPage = 1
      this.fetchData()
    },
    // 导入数据
    handleImport() {
      this.importVisible = true
    },
    // 新增/编辑表单确认提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 此处添加 新增/编辑数据的接口 新增成功后调用fetchData方法更新列表
          // 先 this.isSubmit = true 接口返回成功后 再 this.isSubmit = false
          this.formVisible = false
        } else {
          this.isSubmit = false
          return false
        }
      })
    },
    // 新增/编辑表单取消提交
    cancleForm() {
      this.$refs.dialogForm.resetFields()
      this.formVisible = false
    },
    // 导入数据弹出栏 确认操作
    confirmImport() {
      // 此处添加 后台接收的接口，将导入的数据传给后台处理
      this.importVisible = false
    },
    // 导入数据弹出栏 取消操作
    cancleImport() {
      // 将导入的数据清空
      this.importVisible = false
    },
    // 导出数据--excle格式
    exportTable(type) {
      if (this.tableData.length) {
        const params = {
          header: ['编号', '姓名', '性别', '手机', '学历', '婚姻状况', '禁止编辑', '爱好'],
          key: ['id', 'name', 'sex', 'phone', 'education', 'married', 'forbid', 'hobby'],
          data: this.tableData,
          autoWidth: true,
          fileName: '综合表格',
          bookType: type
        }
        excel.exportDataToExcel(params)
        this.exportVisible = false
      }
    },
    // 列表中婚姻状况栏，状态值改变时，调用
    selectChange(row) {
      // 此处添加后台接口，成功后调用fetchData方法更新列表
    },
    // 列表中禁止编辑栏，状态值改变时，调用
    stateChange(row) {
      // 此处添加后台接口，成功后调用fetchData方法更新列表
    }
  }
}
</script>

<style lang="less">
.table-classic-wrapper {
  .el-card {
    min-height: 656px;
  }
  .control-btns {
    margin-bottom: 20px;
  }
  .search-form {
    padding-top: 18px;
    margin-bottom: 15px;
    background-color: #f7f8fb;
  }
  .el-table thead {
    font-weight: 600;
    th {
      background-color: #f2f3f7;
    }
  }
  .dialog-form {
    .el-input {
      width: 380px;
    }
    .footer-item {
      margin-top: 50px;
      text-align: right;
    }
  }
  .upload-box,
  .export-data {
    width: 300px;
    margin: 0 auto 30px;
  }
  .upload-box {
    width: 156px;
    .files-upload {
      color: #20a0ff;
    }
  }
  .hints {
    font-size: 12px;
    color: #aaa;
    text-align: center;
  }
  .yj-info {
    font-size: larger;
    color: #30364c;
    margin-bottom: 10px;
  }
  .el-dialog__header {
    background-color:#4c8989;
  }
  .el-dialog__title {
    color:white;
  }
  .el-dialog__body {
    padding: 30px 50px;
  }
  .yj-title {
    margin: 20px auto;
  }
}
</style>
