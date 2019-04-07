 
 const tables = require('../access/db_modules')

 // 查询数据
 async function queryUnionid() {
    let person = await tables.Department_admin.findAll({
        where: {
            union_id: '1eZ4iPca85HInlgxLdyV5NwiEiE'
        }
    });

    console.log('person:'+person);
    console.log(person[0].name)
    // person = JSON.stringify(a);
    // console.log('inner:'+a);
    // console.log('inner:'+typeof a);
    // return person;
    // ctx.set("Content-Type", "application/json");
    // ctx.body = a || '默认';
}


module.exports = {
    queryPerson : queryUnionid
}