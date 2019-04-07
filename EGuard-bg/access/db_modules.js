'use strict';

const Sequelize = require('sequelize');
const db_config = require('./db_config');


// 创建一个sequelize对象实例
var sequelize = new Sequelize(db_config.database, db_config.username, db_config.password, {
    host: db_config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

// 定义模型，告诉Sequelize如何映射数据库表
var Class = sequelize.define('class', {
    class_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    class_name: Sequelize.STRING(255),
    conselor_unionid: Sequelize.STRING(50),
    conselor_mobile: Sequelize.INTEGER(11),
    conselor_name: Sequelize.STRING(50)
}, {
        timestamps: false,
        freezeTableName: true
    });

var Department = sequelize.define('department', {
    department_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    department_name: Sequelize.STRING(255)
}, {
        timestamps: false,
        freezeTableName: true
    });

var Department_admin = sequelize.define('department_admin', {
    union_id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    userid: Sequelize.STRING(255),
    name: Sequelize.STRING(255),
    mobile: Sequelize.STRING(11),
    sex: Sequelize.BOOLEAN,
    department_id: Sequelize.INTEGER(11),
    is_master: Sequelize.BOOLEAN,
    avatar: Sequelize.STRING(255)
}, {
        timestamps: false,
        freezeTableName: true
    });

var Sign_record = sequelize.define('sign_record', {
    record_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    union_id: Sequelize.STRING(50),
    sign_time: Sequelize.DATE,
    department_id: Sequelize.INTEGER(11),
    sign_state: Sequelize.BOOLEAN,
}, {
        timestamps: false,
        freezeTableName: true
    });

var Student = sequelize.define('student', {
    union_id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    userid: Sequelize.STRING(255),
    name: Sequelize.STRING(255),
    mobile: Sequelize.STRING(11),
    sex: Sequelize.BOOLEAN,
    class_id: Sequelize.INTEGER(11),
    department_id: Sequelize.INTEGER(11),
    room_id: Sequelize.INTEGER(11),
    is_indormi: Sequelize.BOOLEAN,
    avatar: Sequelize.STRING(255)
}, {
        timestamps: false,
        freezeTableName: true
    });

var Visit_record = sequelize.define('visit_record', {
    record_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    name: Sequelize.STRING(255),
    mobile: Sequelize.STRING(11),
    sex: Sequelize.BOOLEAN,
    id_num: Sequelize.INTEGER(20),
    enter_time: Sequelize.DATE,
    leave_time: Sequelize.DATE,
    note: Sequelize.STRING(255),
    department_id: Sequelize.INTEGER(11),
    admin_unionid: Sequelize.STRING(50)
}, {
        timestamps: false,
        freezeTableName: true
    });

// var now = Date.now();
// // 插入数据
//     (async () => {
//         var dog = await Pet.create({
//             id: 'd-' + now,
//             name: 'Odie',
//             gender: false,
//             birth: '2008-08-08',
//             createdAt: now,
//             updatedAt: now,
//             version: 0
//         });
//         console.log('created: ' + JSON.stringify(dog));
//     })();

// // 查询数据
//     (async () => {
//         var pets = await Pet.findAll({
//             where: {
//                 name: 'Gaffey'
//             }
//         });
//         console.log(`find ${pets.length} pets:`);
//         for (let p of pets) {
//             console.log(JSON.stringify(p));
//         }
//     })();

// // 更新数据
//     (async () => {
//         var p = await queryFromSomewhere();
//         p.gender = true;
//         p.updatedAt = Date.now();
//         p.version ++;
//         await p.save();
//     })();
 
// // 删除数据
//     (async () => {
//         var p = await queryFromSomewhere();
//         await p.destroy();
//     })();


    module.exports = {
        Class : Class,
        Department : Department, 
        Department_admin : Department_admin, 
        Sign_record : Sign_record, 
        Student : Student, 
        Visit_record : Visit_record
    }