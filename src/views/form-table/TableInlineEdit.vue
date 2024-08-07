<template>
  <div class="table-inline-edit">
    <Hints>
      <template slot="hintName">规则模型管理</template>
      
    </Hints>
    <el-card shadow="always">
      <el-table v-loading="listLoading" :data="tableList" tooltip-effect="dark" style="width: 100%" size="medium">
        <el-table-column prop="id" label="序号" align="center" width="120" />
        <el-table-column prop="name" label="规则名称" align="center" />
        <el-table-column label="规则名称" align="center">
          <template slot-scope="{row}">{{ row.sex }}</template>
        </el-table-column>
        <el-table-column label="最近一次运行时间" align="center" min-width="300px">
          <template slot-scope="{row}">
            <template v-if="row.editable">
              <el-input v-model="row.hobby" style="width: 300px;" />
              <el-button class="cancel-btn" type="warning" @click="cancelEdit(row)">取消</el-button>
            </template>
            <span v-else>{{ row.hobby }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="education" label="当前状态" align="center" />
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="{row}">
            <el-button type="danger" size="small" @click="confirmEdit(row)">停止</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getTableList2 } from '@/api'
import Hints from '@/components/Hints'

export default {
  name: 'TableInlineEdit',
  components: { Hints },
  data() {
    return {
      listLoading: true,
      tableList: [],
      listQuery: {
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取数据列表
    fetchData() {
      this.listLoading = true
      // 获取数据列表接口
      getTableList2(this.listQuery).then(res => {
        const data = res.data
        if (data.code === 0) {
          this.tableList = data.data.list.map(item => {
            this.$set(item, 'editable', false)
            item.originalHobby = item.hobby
            return item
          })
          console.log(this.tableList)
          this.listLoading = false
        }
      }).catch(() => {
        this.listLoading = false
      })
    },
    cancelEdit(row) {
      row.hobby = row.originalHobby
      row.editable = false
    },
    confirmEdit(row) {
      this.$confirm('此操作将暂停该, 是否继续?', '提示', {
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
      })
    }
  }
}
</script>

<style lang="less">
.table-inline-edit {
  .el-table thead {
    font-weight: 600;
    th {
      padding: 16px 0 15px!important;
      background-color: #f2f3f7;
    }
  }
}
</style>
