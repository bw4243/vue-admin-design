<template>
  <div class="home-wrapper">
    <div class="date-row">
      <div v-for="(item, index) in cardInfoData" :key="index" class="data-col">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <div class="date-block">
            <i :class="[ item.icon ]" :style="{ background: item.color }" class="icon-box" />
            <div class="date-cont">
              <CountTo class="count" :start-val="0" :end-val="item.count" :duration="3000" />
              <p class="title">{{ item.title }}</p>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <el-row class="date-box" :gutter="20">
      <el-col :span="12">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsPie :title="text" type="pie" :data="chartsPieData" class="data-desc" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <div class="data-desc data-lang-box">
            <div class="data-lang-title">部门监督数据量Top5</div>
            <div v-for="(item, index) in langsData" :key="index" class="data-lang-item">
              <label>{{ item.name }}</label>
              <el-progress :percentage="item.value" :stroke-width="16" :color="item.color" />
            </div>
          </div>
        </el-card>
      </el-col>
      
    </el-row>
    <el-row class="date-box" :gutter="20">
      <el-col :span="12">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsBar :title="title" :data="commonChartsData" class="data-chart" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsLine :title="title2" :data="commonChartsData" class="data-chart" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import ChartsPie from '@/components/Charts/ChartsPie'
import ChartsBar from '@/components/Charts/ChartsBar'
import ChartsLine from '@/components/Charts/ChartsLine'
export default {
  name: 'Home',
  components: { CountTo, ChartsPie, ChartsBar, ChartsLine },
  data() {
    return {
      text: '数据来源',
      title: '近七天发现监督风险点数量',
      title2: '近七天访问人数数量',

      langsData: [
        { name: '监督办公室', value: 45, color: '#2d8cf0' },
        { name: '计划财务部', value: 32, color: '#19be6b' },
        { name: '内审法务部', value: 4, color: '#ff9900' },
        { name: '合约管理部', value: 13, color: '#e46cbb' },
        { name: '信息中心', value: 6, color: '#9a66e4' }
      ],
      cardInfoData: [
        { title: '近期监督信息数量', icon: 'vue-dsn-icon-dianji', count: 5, color: '#2d8cf0' },
        { title: '待处理监督信息', icon: 'vue-dsn-icon-xinzeng', count: 1, color: '#19be6b' },
        { title: '超时处理', icon: 'vue-dsn-icon-xinfeng', count: 1, color: '#ff9900' }
      ],
      chartsPieData: [
        { value: 3, name: '监督邮箱' },
        { value: 5, name: '监督小程序' },
        { value: 24, name: '财务系统' },
        { value: 9, name: '工程管理平台' },
        { value: 3, name: '人力资源系统' }
      ],
      commonChartsData: {
        Mon: 78,
        Tue: 92,
        Wed: 116,
        Thu: 82,
        Fri: 38,
        Sat: 22,
        Sun: 100
      }
    }
  }
}
</script>

<style lang="less">
@import "../assets/less/home";
</style>
