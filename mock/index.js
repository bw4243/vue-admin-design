const Mock = require('mockjs'); // 导入依赖模块

// 返回一个函数
module.exports = function(app){
    // 监听 http 请求
    app.get('/api/test', function(rep, res){
        // 设置要返回的数据
        let json = {
            "code": 0,
            "data": {
                "total": 100,
                "list": [
                    {
                        "id": 1001,
                        "name": "用餐报销申请-花园酒店0620",
                        "sex": "报销",
                        "phone": 15266001235,
                        "education": "高中",
                        "married": 1,
                        "forbid": false,
                        "hobby": "招待费金额超标（超192元）"
                    },
                    {
                        "id": 1002,
                        "name": "用餐报销-阳光饭店0611",
                        "sex": "报销",
                        "phone": 15266006621,
                        "education": "大专",
                        "married": 1,
                        "forbid": false,
                        "hobby": "招待费包含不允许报销项目（白酒）"
                    },
                    {
                        "id": 1003,
                        "name": "公车(00301)维修费用",
                        "sex": "采购",
                        "phone": 15264848125,
                        "education": "大学",
                        "married": 0,
                        "forbid": false,
                        "hobby": "车辆维修费超标，超季度标准1200元"
                    },
                    {
                        "id": 1004,
                        "name": "办公用品批量采购-b分公司",
                        "sex": "采购",
                        "phone": 15248491001,
                        "education": "初中",
                        "married": 0,
                        "forbid": false,
                        "hobby": "办公用品购买数量异常"
                    },
                    {
                        "id": 1005,
                        "name": "南京出差打车费0624",
                        "sex": "报销",
                        "phone": 15248411021,
                        "education": "大学",
                        "married": 0,
                        "forbid": false,
                        "hobby": "打车费用超过标准（超12元）"
                    },
                    {
                        "id": 1006,
                        "name": "南京出差住宿0603",
                        "sex": "报销",
                        "phone": 15298621500,
                        "education": "大专",
                        "married": 1,
                        "forbid": false,
                        "hobby": "住宿费超标（超123元）"
                    },
                    {
                        "id": 1007,
                        "name": "宣传周宣传海报等物料印刷费用",
                        "sex": "报销",
                        "phone": 15267499461,
                        "education": "高中",
                        "married": 1,
                        "forbid": false,
                        "hobby": "申请的审批流程错误"
                    }
                ]
            },
            "errorInfo": null
        }
        res.json(Mock.mock(json));
    });
    app.get('/api/test2', function(rep, res){
        // 设置要返回的数据
        let json = {
            "code": 0,
            "data": {
                "total": 100,
                "list": [
                    {
                        "id": 1,
                        "name": "合同签订监督规则",
                        "sex": "ct-000001",
                        "education": "启动中",
                        "married": 1,
                        "forbid": false,
                        "hobby": "2024-05-02 12:00"
                    },
                    {
                        "id": 2,
                        "name": "合同拆分监督规则",
                        "sex": "ct-000002",
                        "education": "启动中",
                        "married": 1,
                        "forbid": false,
                        "hobby": "2024-05-02 12:00"
                    },
                    {
                        "id": 3,
                        "name": "合同支付监督规则",
                        "sex": "ct-000003",
                        "education": "启动中",
                        "married": 0,
                        "forbid": false,
                        "hobby": "2024-05-02 12:00"
                    },
                    {
                        "id": 4,
                        "name": "施工图设计监督",
                        "sex": "con-000001",
                        "education": "启动中",
                        "married": 0,
                        "forbid": false,
                        "hobby": "2024-05-02 12:00"
                    },
                    {
                        "id": 5,
                        "name": "资金存放监督规则",
                        "sex": "fn-000001",
                        "education": "启动中",
                        "married": 0,
                        "forbid": false,
                        "hobby": "2024-05-02 12:00"
                    },
                    {
                        "id": 6,
                        "name": "费用报销监督规则",
                        "sex": "fy-0000001",
                        "education": "启动中",
                        "married": 1,
                        "forbid": false,
                        "hobby": "2024-05-02 12:00"
                    },
                    {
                        "id": 7,
                        "name": "投融资监督规则",
                        "sex": "ty-0000001",
                        "education": "启动中",
                        "married": 1,
                        "forbid": false,
                        "hobby": "2024-05-02 12:00"
                    }
                ]
            },
            "errorInfo": null
        }
        res.json(Mock.mock(json));
    });
}
