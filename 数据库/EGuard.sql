CREATE TABLE `Students` (
`union_id` varchar(255) NOT NULL COMMENT '钉钉用户唯一识别id',
`user_id` varchar(255) NULL COMMENT '钉钉userid/学号(企业可自定义)',
`name` varchar(255) NULL COMMENT '学生姓名',
`mobile` varchar(11) NULL COMMENT '联系电话',
`sex` tinyint(1) NULL COMMENT '性别',
`class_id` int(11) NULL COMMENT '班级id',
`department_id` int(11) NULL,
`room_id` int(11) NULL COMMENT '寝室门牌号',
`is_indormi` tinyint(1) NULL DEFAULT 0 COMMENT '是否在寝(0不在寝，1在寝)',
`avatar` varchar(255) NULL COMMENT '用户头像url',
PRIMARY KEY (`union_id`) 
);
CREATE TABLE `Department` (
`department_id` int(11) NOT NULL COMMENT '钉钉部门id/宿舍楼id',
`department_name` varchar(255) NULL COMMENT '钉钉部门名称/宿舍楼名称',
PRIMARY KEY (`department_id`) 
);
CREATE TABLE `Department_admin` (
`union_id` varchar(255) NOT NULL COMMENT '钉钉唯一识别id',
`userid` varchar(255) NULL COMMENT '钉钉userid/员工工号(企业可自定义)',
`name` varchar(255) NULL COMMENT '管理员姓名',
`mobile` varchar(11) NULL COMMENT '管理员电话',
`sex` tinyint(1) NULL COMMENT '管理员性别',
`department_id` int(11) NULL COMMENT '部门id/宿舍楼id',
`is_master` tinyint(1) NULL COMMENT '是否为主管理员(0:副管理员，1:主管理员)',
`avatar` varchar(255) NULL COMMENT '用户头像url',
PRIMARY KEY (`union_id`) 
);
CREATE TABLE `Sign_record` (
`record_id` bigint NOT NULL COMMENT '记录id',
`union_id` varchar(255) NULL COMMENT '钉钉唯一识别id',
`sign_time` timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '签到时间时间戳',
`department_id` int(11) NULL COMMENT '部门id/宿舍楼id',
`sign_state` tinyint(1) NULL COMMENT '签到状态(0:出寝，1:入寝)',
PRIMARY KEY (`record_id`) 
);
CREATE TABLE `Visit_record` (
`record_id` bigint NOT NULL COMMENT '记录id',
`name` varchar(255) NULL COMMENT '访客姓名',
`mobile` varchar(11) NULL COMMENT '联系电话',
`sex` tinyint(1) NULL COMMENT '访客性别',
`id_num` int(20) NULL COMMENT '来访人员身份证号',
`enter_time` timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '来访时间时间戳',
`leave_time` timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '来访结束时间时间戳',
`note` varchar(255) NULL COMMENT '备注',
`department_id` int(11) NULL COMMENT '部门id/宿舍楼id',
`admin_unionid` varchar(255) NULL COMMENT '管理员unionid',
PRIMARY KEY (`record_id`) 
);
CREATE TABLE `Class` (
`class_id` int(11) NOT NULL COMMENT '班级id',
`class_name` varchar(255) NULL COMMENT '班级名称',
`conselor_unionid` varchar(255) NULL COMMENT '辅导员unionid',
`conselor_mobile` varchar(11) NULL COMMENT '辅导员联系电话',
PRIMARY KEY (`class_id`) 
);

ALTER TABLE `Sign_record` ADD CONSTRAINT `fk_Sign_record_Students_1` FOREIGN KEY (`union_id`) REFERENCES `Students` (`union_id`);
ALTER TABLE `Sign_record` ADD CONSTRAINT `fk_Sign_record_Department_1` FOREIGN KEY (`department_id`) REFERENCES `Department` (`department_id`);
ALTER TABLE `Visit_record` ADD CONSTRAINT `fk_Visit_record_Department_1` FOREIGN KEY (`department_id`) REFERENCES `Department` (`department_id`);
ALTER TABLE `Visit_record` ADD CONSTRAINT `fk_Visit_record_Department_admin_1` FOREIGN KEY (`admin_unionid`) REFERENCES `Department_admin` (`union_id`);
ALTER TABLE `Department_admin` ADD CONSTRAINT `fk_Department_admin_Department_1` FOREIGN KEY (`department_id`) REFERENCES `Department` (`department_id`);
ALTER TABLE `Students` ADD CONSTRAINT `fk_Students_Class_1` FOREIGN KEY (`class_id`) REFERENCES `Class` (`class_id`);
ALTER TABLE `Students` ADD CONSTRAINT `fk_Students_Department_1` FOREIGN KEY (`department_id`) REFERENCES `Department` (`department_id`);

