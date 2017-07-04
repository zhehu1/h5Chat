CREATE DATABASE  IF NOT EXISTS `h5chat` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `h5chat`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: h5chat
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `group_base_info`
--

DROP TABLE IF EXISTS `group_base_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group_base_info` (
  `gid` varchar(36) NOT NULL,
  `groupName` varchar(45) DEFAULT NULL,
  `creatorId` varchar(36) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`gid`),
  KEY `id_idx` (`creatorId`),
  CONSTRAINT `fk_user_and_group` FOREIGN KEY (`creatorId`) REFERENCES `users_base_info` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='群组基本信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_base_info`
--

LOCK TABLES `group_base_info` WRITE;
/*!40000 ALTER TABLE `group_base_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_base_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relation_user_group`
--

DROP TABLE IF EXISTS `relation_user_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relation_user_group` (
  `uid` varchar(36) NOT NULL COMMENT '用户ID',
  `gid` varchar(36) NOT NULL COMMENT '组ID',
  `role` int(11) DEFAULT '0' COMMENT '角色\n0：普通成员\n1： 创建者\n2： 管理员\n',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`uid`,`gid`),
  KEY `fk_gid_idx` (`gid`),
  CONSTRAINT `fk_relation_gid` FOREIGN KEY (`gid`) REFERENCES `group_base_info` (`gid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_relation_uid` FOREIGN KEY (`uid`) REFERENCES `users_base_info` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户与组关联';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relation_user_group`
--

LOCK TABLES `relation_user_group` WRITE;
/*!40000 ALTER TABLE `relation_user_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `relation_user_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relation_user_user`
--

DROP TABLE IF EXISTS `relation_user_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relation_user_user` (
  `uid` varchar(36) NOT NULL COMMENT '用户ID',
  `fuid` varchar(36) NOT NULL COMMENT '好友ID',
  `setId` varchar(45) NOT NULL DEFAULT '0' COMMENT '分组ID， 没有分组默认为0',
  PRIMARY KEY (`uid`,`fuid`),
  KEY `fk_uu_fuid_idx` (`fuid`),
  KEY `fk_uu_setid_idx` (`setId`),
  CONSTRAINT `fk_uu_fuid` FOREIGN KEY (`fuid`) REFERENCES `users_base_info` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_uu_setid` FOREIGN KEY (`setId`) REFERENCES `user_sets` (`setid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_uu_uid` FOREIGN KEY (`uid`) REFERENCES `users_base_info` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户相互关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relation_user_user`
--

LOCK TABLES `relation_user_user` WRITE;
/*!40000 ALTER TABLE `relation_user_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `relation_user_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_sets`
--

DROP TABLE IF EXISTS `user_sets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_sets` (
  `setid` varchar(36) NOT NULL DEFAULT '0' COMMENT '分组ID',
  `uid` varchar(36) NOT NULL COMMENT '用户ID\n',
  `setName` varchar(45) DEFAULT '未分组' COMMENT '分组名',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`setid`,`uid`),
  KEY `fk_set_uid_idx` (`uid`),
  CONSTRAINT `fk_set_uid` FOREIGN KEY (`uid`) REFERENCES `users_base_info` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户分组表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_sets`
--

LOCK TABLES `user_sets` WRITE;
/*!40000 ALTER TABLE `user_sets` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_sets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_base_info`
--

DROP TABLE IF EXISTS `users_base_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_base_info` (
  `uid` varchar(36) NOT NULL COMMENT '用户唯一组件, 通过mysql内置函数uuid()生成',
  `Account` varchar(20) NOT NULL COMMENT '用户账号（唯一）',
  `Password` varchar(64) NOT NULL DEFAULT 'E2A489A5B76AE1E17E672179A6887EFB59256C33A6F857D216F8B41309C74EE6',
  `Pic` varchar(45) DEFAULT NULL COMMENT '用户头像',
  `Tel` varchar(45) DEFAULT NULL COMMENT '手机号',
  `Email` varchar(45) DEFAULT NULL COMMENT '邮箱',
  `Career` varchar(45) DEFAULT NULL COMMENT '职业',
  `Birthday` datetime DEFAULT NULL COMMENT '出生日期',
  `Company` varchar(45) DEFAULT NULL COMMENT '公司',
  `Address` varchar(45) DEFAULT NULL COMMENT '家庭地址',
  `CreateTime` datetime DEFAULT NULL,
  `UpdateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`Account`),
  UNIQUE KEY `Account_UNIQUE` (`Account`),
  UNIQUE KEY `uuid_UNIQUE` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户基本信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_base_info`
--

LOCK TABLES `users_base_info` WRITE;
/*!40000 ALTER TABLE `users_base_info` DISABLE KEYS */;
INSERT INTO `users_base_info` VALUES ('3eac377c-5cad-11e7-bc36-1c1b0d22e2ce','20','E2A489A5B76AE1E17E672179A6887EFB59256C33A6F857D216F8B41309C74EE6','','1','123123','','1900-01-01 08:00:00','1','1','2017-06-29 17:28:01','2017-06-29 18:02:57'),('a0fcee08-5cac-11e7-bc36-1c1b0d22e2ce','21','E2A489A5B76AE1E17E672179A6887EFB59256C33A6F857D216F8B41309C74EE6','','1','123123','','1900-01-01 08:00:00','1','1','2017-06-29 17:23:36','2017-06-29 18:03:02');
/*!40000 ALTER TABLE `users_base_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-07-04 16:29:28
