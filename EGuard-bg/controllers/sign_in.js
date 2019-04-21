'use strict';
const tables = require('../access/db_modules')

var sign_in = async (ctx, next) => {
    // 获取前端传递的formdata
    var formdata = ctx.request.url || '';
    let department_id = formdata.split('department_id=')[1];
    // 向数据库查询该宿舍楼中未到寝学生人数及学生列表
    var noindormi = await tables.Student.findAll({
        where: {
            department_id: department_id,
            is_indormi: 0
        }
    });
    let result = [];
    let noindormi_list = [];
    for(let i of noindormi){
        noindormi_list.push(i.dataValues);
    }
    result.push(noindormi_list);
    console.log(noindormi_list.length);
    let max_num = 5;   //最大分页数
    // let page =  Math.ceil(noindormi_list/max_num);
    let config = {
        total: noindormi_list.length,
        max_num: max_num,
        page: Math.ceil(noindormi_list.length/max_num)
    }
    console.log(config);
    result.push(config);
    console.log(JSON.stringify(result));
    // resuly = JSON.stringify(noindormi_list);   
  
    ctx.type = 'application/json;charset=UTF-8';
    ctx.body = JSON.stringify(result);
}

module.exports = {
    'GET /sign_in': sign_in,
};