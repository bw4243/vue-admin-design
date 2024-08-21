<template>
  <div class="user-center-wrapper clear-fix">
    <el-card shadow="always" :body-style="{padding: '50px'}">
      <div class="user-avatar">
        <img src="../assets/img/avatar.png" alt="avatar">
      </div>
      <ul class="user-info">
        <li>
          <label>用户名：</label>
          <span>{{ userInfo.username }}</span>
        </li>
        <li>
          <label>部门：</label>
          <span>{{ userInfo.roles }}</span>
        </li>
        <li>
          <label>岗位：</label>
          <span>{{ userInfo.gw }}</span>
        </li>
        <li>
          <label>电话号码：</label>
          <span>{{ userInfo.phone }}</span>
        </li>
        <li>
          <label>邮箱：</label>
          <span>{{ userInfo.email }}</span>
        </li>
        <li>
          <label>入职时间：</label>
          <span>{{ userInfo.createtime }}</span>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/login'

export default {
  name: 'UserCenter',
  data() {
    return {
      userInfo: {
        username: '张三',
        roles: '信息化部',
        gw: '信息技术',
        phone: '13112341234',
        createtime: '2019-01-01',
        email: 'name001@xx.com'
      }
    }
  },
  created() {
    getUserInfo().then(res => {
      this.userInfo = res
    })
  }
}
</script>

<style lang="less">
.user-center-wrapper {
  .user-avatar {
    float: left;
    width: 150px;
    height: 150px;
  }
  .user-info {
    float: left;
    width: 800px;
    margin-left: 50px;
    margin-bottom: 50px;
    li {
      height: 34px;
      line-height: 34px;
      label,
      span {
        display: inline-block;
        vertical-align: middle;
      }
      label {
        width: 80px;
        margin-right: 12px;
        text-align: right;
      }
    }
  }
}
</style>
