/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50723
Source Host           : localhost:3306
Source Database       : webdatabase

Target Server Type    : MYSQL
Target Server Version : 50723
File Encoding         : 65001

Date: 2020-12-07 13:54:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for entercheck
-- ----------------------------
DROP TABLE IF EXISTS `entercheck`;
CREATE TABLE `entercheck` (
  `username` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `identity` int(11) DEFAULT NULL,
  PRIMARY KEY (`username`),
  KEY `identity` (`identity`)
) ENGINE=InnoDB AUTO_INCREMENT=11112 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of entercheck
-- ----------------------------
INSERT INTO `entercheck` VALUES ('10001', '1', '1');
INSERT INTO `entercheck` VALUES ('10002', '2', '1');
INSERT INTO `entercheck` VALUES ('10003', '3', '1');
INSERT INTO `entercheck` VALUES ('11111', '11', '2');

-- ----------------------------
-- Table structure for noticecontent
-- ----------------------------
DROP TABLE IF EXISTS `noticecontent`;
CREATE TABLE `noticecontent` (
  `studentID` int(11) NOT NULL,
  `noticeID` int(11) NOT NULL,
  `state` int(11) DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`studentID`,`noticeID`),
  KEY `notice` (`noticeID`),
  CONSTRAINT `notice` FOREIGN KEY (`noticeID`) REFERENCES `noticelist` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student` FOREIGN KEY (`studentID`) REFERENCES `students` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of noticecontent
-- ----------------------------
INSERT INTO `noticecontent` VALUES ('10001', '20003', '1', '阿阿阿');
INSERT INTO `noticecontent` VALUES ('10001', '20005', '1', '我不知道');
INSERT INTO `noticecontent` VALUES ('10001', '20011', '1', '啦啦啦,我是卖报的小行家');
INSERT INTO `noticecontent` VALUES ('10001', '20012', '1', '哈哈哈哈');
INSERT INTO `noticecontent` VALUES ('10001', '20013', '0', null);
INSERT INTO `noticecontent` VALUES ('10001', '20014', '0', null);
INSERT INTO `noticecontent` VALUES ('10002', '20003', '1', '哈哈哈');
INSERT INTO `noticecontent` VALUES ('10002', '20005', '0', null);
INSERT INTO `noticecontent` VALUES ('10002', '20011', '0', null);
INSERT INTO `noticecontent` VALUES ('10002', '20013', '0', null);
INSERT INTO `noticecontent` VALUES ('10002', '20014', '0', null);
INSERT INTO `noticecontent` VALUES ('10003', '20005', '0', null);
INSERT INTO `noticecontent` VALUES ('10003', '20011', '0', null);
INSERT INTO `noticecontent` VALUES ('10003', '20013', '0', null);
INSERT INTO `noticecontent` VALUES ('10003', '20014', '0', null);

-- ----------------------------
-- Table structure for noticelist
-- ----------------------------
DROP TABLE IF EXISTS `noticelist`;
CREATE TABLE `noticelist` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `maker` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `object` set('班长','所有人','体育委员','学习委员','团支书','党员','其他') CHARACTER SET utf8 DEFAULT '所有人',
  `deadline` date DEFAULT NULL,
  `Claim` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=20015 DEFAULT CHARSET=swe7;

-- ----------------------------
-- Records of noticelist
-- ----------------------------
INSERT INTO `noticelist` VALUES ('20003', '通知3', '辅导员', '学习委员', '2020-11-24', '交钱');
INSERT INTO `noticelist` VALUES ('20005', '通知5', '辅导员', '所有人', '2020-12-01', '交钱');
INSERT INTO `noticelist` VALUES ('20011', '尝试1', '尝试1', '所有人', '2020-12-06', '尝试1');
INSERT INTO `noticelist` VALUES ('20012', '尝试2', '尝试2', '班长,学习委员', '2020-12-26', '尝试2');
INSERT INTO `noticelist` VALUES ('20013', '尝试3', '尝试3', '所有人', '2020-12-27', '尝试3');
INSERT INTO `noticelist` VALUES ('20014', '关于长的帅的人的信息收集通知', '辅导员', '所有人', '2020-12-26', '长的帅的都能收到通知');

-- ----------------------------
-- Table structure for students
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `ID` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `major` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `class` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `sex` enum('女','男') DEFAULT NULL,
  `position` enum('学生','班长','团支书','学习委员','体育委员','党员') DEFAULT '学生',
  PRIMARY KEY (`ID`),
  CONSTRAINT `studentID` FOREIGN KEY (`ID`) REFERENCES `entercheck` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10004 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of students
-- ----------------------------
INSERT INTO `students` VALUES ('10001', '王二', '计算机', '火箭班', '18', '男', '班长');
INSERT INTO `students` VALUES ('10002', '张三', '计算机', '炮兵班', '20', '女', '体育委员');
INSERT INTO `students` VALUES ('10003', '李四', '计算机', '计嵌1802', '19', '男', '学生');
