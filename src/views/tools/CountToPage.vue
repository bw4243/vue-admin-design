<template>
  <div class="count-to-page">
    <Hints>
      <template slot="hintName">监督模型配置管理模块</template>
      <template slot="hintInfo">
        <p>系统支持通过修改设置配置项来自定义监督模型规则参数</p>
      </template>
    </Hints>
    <el-row class="count-to-box" :gutter="20">
      <el-col :span="24">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <div slot="header" class="title">自定义配置</div>
          <div class="cont-wrapper">
            <div class="cont-set-data">
              <span>合同管理监督规则配置项</span>
            </div>
            <div class="box-cont-set">
              <div class="cont-set-item">
                <label>合同签订最小金额：</label><el-input v-model="startVal" />
              </div>
              <div class="cont-set-item">
                <label>合同未履约最大超期时间</label><el-input v-model="endVal" />
              </div>
              <div class="cont-set-item">
                <label>合同拆分最小数量：</label><el-input v-model="duration" />
              </div>
              <div class="cont-set-item">
                <label>合同签订主体起始风险等级：</label><el-input v-model="decimals" />
              </div>
              <div class="cont-set-item">
                <label>保函录入最大超期时间（天）:</label><el-input v-model="separator" />
              </div>
              <div class="cont-set-item">
                <label>退保函最大超期时间（天）：</label><el-input v-model="prefix" />
              </div>
              <div class="cont-set-item">
                <label>合同签订风险系数控制模型分值最小值：</label><el-input v-model="suffix" />
              </div>
              <div class="cont-set-item">
                <label>：</label><el-input v-model="suffix" />
              </div>
              <div class="cont-set-item">
                <el-button type="primary" @click="handleStart">保存</el-button>
                <el-button type="danger" @click="handlePause">取消</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Hints from '@/components/Hints'
import CountTo from 'vue-count-to'
export default {
  name: 'CountToPage',
  components: { Hints, CountTo },
  data() {
    return {
      startVal: 0,
      endVal: 2020,
      duration: 4000,
      decimals: 0,
      separator: ',',
      prefix: '￥ ',
      suffix: ' rmb'
    }
  },
  methods: {
    handleStart() {
      this.$refs.countBox.start()
    },
    handlePause() {
      this.$refs.countBox.pauseResume()
    }
  }
}
</script>

<style lang="less">
.count-to-page {
  .box-cont {
    display: flex;
    height: 300px;
    box-sizing: border-box;
    span {
      display: block;
      width: 110px;
      height: 50px;
      margin: 125px auto;
      font-size: 42px;
      text-align: center;
      color: #30B08F;
    }
    &.add {
      span {
        color: #E65D6E;
      }
    }
  }
  .cont-wrapper {
    height: 300px;
    padding: 30px 50px 30px 50px;
    box-sizing: border-box;
    .cont-set-item {
      display: inline-block;
      width: 49%;
      margin-bottom: 10px;
      label {
        display: inline-block;
        vertical-align: middle;
        width: 40%;
      }
      .el-input {
        width: 50%;
      }
    }
    .cont-set-data {
      height: 100px;
      span {
        display: block;
        width: 270px;
        margin: 10px auto 0;
        font-size: 42px;
        text-align: center;
        color: #F6416C;
      }
    }
  }
}
</style>
