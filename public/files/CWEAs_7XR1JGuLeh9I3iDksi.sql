-- MySQL dump 10.13  Distrib 5.6.19, for osx10.7 (i386)
--
-- Host: 127.0.0.1    Database: HTML5Chat
-- ------------------------------------------------------
-- Server version	5.6.24

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
-- Table structure for table `chat_friend`
--

DROP TABLE IF EXISTS `chat_friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_friend` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `userId` int(11) DEFAULT NULL COMMENT '用户id',
  `friendId` int(11) DEFAULT NULL COMMENT '好友id',
  `setId` int(11) DEFAULT NULL COMMENT '所属组别',
  `status` int(1) DEFAULT '0' COMMENT '状态（0：正常，1：删除）',
  PRIMARY KEY (`id`),
  KEY `userId_idx` (`userId`),
  KEY `groupId_idx` (`setId`),
  KEY `friend_fk_frientId_idx` (`friendId`),
  CONSTRAINT `friend_fk_frientId` FOREIGN KEY (`friendId`) REFERENCES `chat_login` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `friend_fk_setId` FOREIGN KEY (`setId`) REFERENCES `chat_friendSet` (`setId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `friend_fk_userId` FOREIGN KEY (`userId`) REFERENCES `chat_login` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='好友关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_friend`
--

LOCK TABLES `chat_friend` WRITE;
/*!40000 ALTER TABLE `chat_friend` DISABLE KEYS */;
INSERT INTO `chat_friend` VALUES (1,1,2,1,0),(2,1,5,1,0),(3,1,6,2,0);
/*!40000 ALTER TABLE `chat_friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_friendSet`
--

DROP TABLE IF EXISTS `chat_friendSet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_friendSet` (
  `setId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `setName` varchar(45) DEFAULT '我的好友',
  `isDefault` int(1) NOT NULL DEFAULT '1' COMMENT '是否为默认分组(0：是，1：不是)',
  PRIMARY KEY (`setId`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `chat_login` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='好友分组，组名';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_friendSet`
--

LOCK TABLES `chat_friendSet` WRITE;
/*!40000 ALTER TABLE `chat_friendSet` DISABLE KEYS */;
INSERT INTO `chat_friendSet` VALUES (1,1,'我的好友',0),(2,1,'1234',1),(3,9,'我的好友',0);
/*!40000 ALTER TABLE `chat_friendSet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_group`
--

DROP TABLE IF EXISTS `chat_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_group` (
  `groupId` int(11) NOT NULL AUTO_INCREMENT COMMENT '群组Id',
  `groupName` varchar(100) NOT NULL COMMENT '群组名',
  `create_by` int(11) NOT NULL COMMENT '创建者Id',
  `create_in` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`groupId`),
  UNIQUE KEY `groupId_UNIQUE` (`groupId`),
  KEY `chat_group_fk_creater_idx` (`create_by`),
  CONSTRAINT `chat_group_fk_creater` FOREIGN KEY (`create_by`) REFERENCES `chat_login` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='群';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_group`
--

LOCK TABLES `chat_group` WRITE;
/*!40000 ALTER TABLE `chat_group` DISABLE KEYS */;
INSERT INTO `chat_group` VALUES (2,'qwerqw',1,'2016-05-11 14:20:08');
/*!40000 ALTER TABLE `chat_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_groupUser`
--

DROP TABLE IF EXISTS `chat_groupUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_groupUser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `role` int(1) DEFAULT '1' COMMENT '角色（0：创建者，1：普通用户，2：管理员）',
  `create_in` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `chat_groupUser_fk_groupId_idx` (`groupId`),
  CONSTRAINT `chat_groupUser_fk_groupId` FOREIGN KEY (`groupId`) REFERENCES `chat_group` (`groupId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `chat_groupUser_fk_userId` FOREIGN KEY (`id`) REFERENCES `chat_login` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_groupUser`
--

LOCK TABLES `chat_groupUser` WRITE;
/*!40000 ALTER TABLE `chat_groupUser` DISABLE KEYS */;
INSERT INTO `chat_groupUser` VALUES (2,2,1,1,'2016-05-11 14:20:08');
/*!40000 ALTER TABLE `chat_groupUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_info`
--

DROP TABLE IF EXISTS `chat_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickName` varchar(50) NOT NULL COMMENT '昵称',
  `picture` varchar(50) DEFAULT '/images/shuijiao.jpg' COMMENT '用户头像',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `address` varchar(200) DEFAULT NULL COMMENT '住址',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱\n',
  `tel` varchar(20) DEFAULT NULL COMMENT '手机号',
  `sex` int(1) DEFAULT NULL COMMENT '性别',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `chat_info_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_info`
--

LOCK TABLES `chat_info` WRITE;
/*!40000 ALTER TABLE `chat_info` DISABLE KEYS */;
INSERT INTO `chat_info` VALUES (1,'用户1234133','/userImg/cHwv8B_F_x3CUObrIQlf0d63.png','2000-04-25','awesffwe','286808713@qq.com','13276683373',1,'2016-04-10 23:12:41','2016-05-10 20:15:46'),(2,'这是另一个账号','/userImg/vChKxEf4RMRPFu0o8vG9M0fw.png','2016-05-10','123123','123123','123123',1,'2016-04-12 22:08:30','2016-05-10 20:16:07'),(3,'asd','/images/shuijiao.jpg',NULL,NULL,NULL,NULL,NULL,'2016-04-13 15:51:50','2016-04-24 19:11:24'),(4,'asdf','/images/shuijiao.jpg',NULL,NULL,NULL,NULL,NULL,'2016-04-13 16:01:41','2016-04-24 19:11:24'),(5,'我是test','userImg/yehPQoBjYOSpWXX1pwK5KySv.jpg','2016-03-29','1234','3124','3124',1,'2016-04-24 20:43:52','2016-04-24 20:45:35'),(6,'test1','/images/shuijiao.jpg',NULL,NULL,NULL,NULL,NULL,'2016-04-24 20:44:30','2016-04-24 20:44:30'),(7,'test2','/images/shuijiao.jpg',NULL,NULL,NULL,NULL,NULL,'2016-04-24 20:45:10','2016-04-24 20:45:10'),(9,'test3','/images/shuijiao.jpg',NULL,NULL,NULL,NULL,NULL,'2016-05-11 14:08:41','2016-05-11 14:08:41');
/*!40000 ALTER TABLE `chat_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_login`
--

DROP TABLE IF EXISTS `chat_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_login` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户唯一ID',
  `loginName` varchar(100) NOT NULL COMMENT '登录名',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '用户状态  :0—正常;1—冻结',
  `last_login_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '上次登录时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `chat_login_id_uindex` (`id`),
  UNIQUE KEY `chat_login_loginName_uindex` (`loginName`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='用户登录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_login`
--

LOCK TABLES `chat_login` WRITE;
/*!40000 ALTER TABLE `chat_login` DISABLE KEYS */;
INSERT INTO `chat_login` VALUES (1,'123','1234',0,'2016-05-10 23:08:20'),(2,'1234','123456',0,'2016-05-10 22:56:16'),(5,'test','123',0,'2016-04-24 20:45:44'),(6,'test1','123',0,'2016-05-11 14:43:59'),(7,'test2','123',0,'0000-00-00 00:00:00'),(9,'test3','123',0,'0000-00-00 00:00:00');
/*!40000 ALTER TABLE `chat_login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_msgRecord`
--

DROP TABLE IF EXISTS `chat_msgRecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_msgRecord` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '消息唯一ID',
  `from` varchar(45) DEFAULT NULL COMMENT '消息发送者',
  `to` varchar(45) DEFAULT NULL COMMENT '消息接收者',
  `msg` varchar(5000) DEFAULT NULL COMMENT '消息内容',
  `type` int(1) DEFAULT '1' COMMENT '消息类型（1：文本，2：图片：3.文件）',
  `time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '消息发送时间',
  `state` int(1) DEFAULT '1' COMMENT '消息阅读状态（1：未读，2：已读）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_msgRecord`
--

LOCK TABLES `chat_msgRecord` WRITE;
/*!40000 ALTER TABLE `chat_msgRecord` DISABLE KEYS */;
INSERT INTO `chat_msgRecord` VALUES (8,'2','1','{\"from\":\"uId2\",\"msg\":\"1234\",\"to\":\"uId1\"}',1,'2016-05-10 19:38:01',1),(9,'2','1','{\"from\":\"uId2\",\"msg\":\"1234<img src=\'/emjoy/19@2x.png\' class=\'emjoy\'/><img src=\'/emjoy/20@2x.png\' class=\'emjoy\'/><img src=\'/emjoy/12@2x.png\' class=\'emjoy\'/><img src=\'/emjoy/16@2x.png\' class=\'emjoy\'/>1234\",\"to\":\"uId1\"}',1,'2016-05-10 19:40:04',1),(10,'2','1','{\"from\":\"uId2\",\"msg\":[{\"linkPath\":\"/files/3EhHmk3f018hDLLGoDAKeS27.pdf\",\"name\":\"校历.pdf\"}],\"to\":\"uId1\"}',3,'2016-05-10 19:41:13',1),(11,'2','1','{\"from\":\"uId2\",\"msg\":\"12341234\",\"to\":\"uId1\"}',1,'2016-05-10 20:05:17',1),(12,'1','2','{\"from\":\"uId1\",\"msg\":\"1234<img src=\'/emjoy/10@2x.png\' class=\'emjoy\'/>\",\"to\":\"uId2\"}',1,'2016-05-10 20:05:22',1),(13,'1','2','{\"from\":\"uId1\",\"msg\":[{\"linkPath\":\"/userImg/Zu_Y4InnuufdIye1M7A2NeoQ.jpg\",\"name\":\"7ff1630ajw1eq2qgxix32j217l0wc7ph.jpg\"}],\"to\":\"uId2\"}',2,'2016-05-10 20:05:30',1),(14,'1','2','{\"from\":\"uId1\",\"msg\":[{\"linkPath\":\"/files/Dqbj4VkamzsJW8Ex1lttp2eu.pdf\",\"name\":\"校历.pdf\"}],\"to\":\"uId2\"}',3,'2016-05-10 20:05:35',1),(15,'1','2','{\"from\":\"uId1\",\"msg\":\"123\",\"to\":\"uId2\"}',1,'2016-05-10 20:14:02',1),(16,'2','1','{\"from\":\"uId2\",\"msg\":\"123\",\"to\":\"uId1\"}',1,'2016-05-10 20:16:34',1),(17,'2','1','{\"from\":\"uId2\",\"msg\":[{\"linkPath\":\"/userImg/273oRrO8tArgc1RWn12EiypH.png\",\"name\":\"alipay.png\"}],\"to\":\"uId1\"}',2,'2016-05-10 20:17:11',1),(18,'2','1','{\"from\":\"uId2\",\"msg\":[{\"linkPath\":\"/files/PXk-cdENXTFsX16j8tT8avUA.pdf\",\"name\":\"校历.pdf\"}],\"to\":\"uId1\"}',3,'2016-05-10 20:20:05',1),(19,'2','1','{\"from\":\"uId2\",\"msg\":[{\"linkPath\":\"/files/wkHmPTDTMIbbBICFyjlzy7f9.pdf\",\"name\":\"校历.pdf\"}],\"to\":\"uId1\"}',3,'2016-05-10 20:20:18',1),(20,'2','1','{\"from\":\"uId2\",\"msg\":[{\"linkPath\":\"/files/93b8YCCrlmcnj3g6QARzJ2gj.jpg\",\"name\":\"7ff1630ajw1eq2qgxix32j217l0wc7ph.jpg\"}],\"to\":\"uId1\"}',3,'2016-05-10 20:22:03',1),(21,'2','1','{\"from\":\"uId2\",\"msg\":[{\"linkPath\":\"/userImg/F3Su4HfAHDVJK_mCRiLdHxxb.doc\",\"name\":\"202120317_胡哲_毕业设计论文.doc\"}],\"to\":\"uId1\"}',2,'2016-05-10 20:22:06',1),(22,'2','1','{\"from\":\"uId2\",\"msg\":[{\"linkPath\":\"/files/6eugQ3HwFrqNDy0KQcuMCrcX.pdf\",\"name\":\"校历.pdf\"}],\"to\":\"uId1\"}',3,'2016-05-10 20:22:13',1),(23,'1','1','{\"from\":\"uId1\",\"msg\":[{\"linkPath\":\"/userImg/yXq_n2btPNBTnK-gK9MgTaWi.jpg\",\"name\":\"7ff1630ajw1eq2qgxix32j217l0wc7ph.jpg\"}],\"to\":\"uId1\"}',2,'2016-05-10 20:22:58',1),(24,'1','1','{\"from\":\"uId1\",\"msg\":[{\"linkPath\":\"/userImg/VkFYNk8HPblioswlVKMHMH35.jpg\",\"name\":\"7ff1630ajw1eq2qgxix32j217l0wc7ph.jpg\"}],\"to\":\"uId1\"}',2,'2016-05-10 20:24:56',1),(25,'1','2','{\"from\":\"uId1\",\"msg\":[{\"linkPath\":\"/userImg/9fSJXJeyJNsIb1j45T3j_NOe.jpg\",\"name\":\"7ff1630ajw1eq2qgxix32j217l0wc7ph.jpg\"}],\"to\":\"uId2\"}',2,'2016-05-10 20:25:15',1),(26,'1','2','{\"from\":\"uId1\",\"msg\":[{\"linkPath\":\"/userImg/5tb-F7gXk87BqeVDdRLZN7bY.jpg\",\"name\":\"7ff1630ajw1eq2qgxix32j217l0wc7ph.jpg\"}],\"to\":\"uId2\"}',2,'2016-05-10 20:26:08',1),(27,'2','1','{\"from\":\"uId2\",\"msg\":\"123456\",\"to\":\"uId1\"}',1,'2016-05-10 20:56:40',1),(28,'1','2','{\"from\":\"uId1\",\"msg\":\"123456\",\"to\":\"uId2\"}',1,'2016-05-10 21:01:14',1),(29,'2','1','{\"from\":\"uId2\",\"msg\":\"123456789\",\"to\":\"uId1\"}',1,'2016-05-10 21:04:13',1),(30,'2','1','{\"from\":\"uId2\",\"msg\":\"1235\",\"to\":\"uId1\"}',1,'2016-05-10 21:07:13',1),(31,'2','1','{\"from\":\"uId2\",\"msg\":\"124<img src=\'/emjoy/10@2x.png\' class=\'emjoy\'/><img src=\'/emjoy/20@2x.png\' class=\'emjoy\'/>\",\"to\":\"uId1\"}',1,'2016-05-10 21:08:48',1),(32,'2','1','{\"from\":\"uId2\",\"msg\":\"23141324\",\"to\":\"uId1\"}',1,'2016-05-10 21:11:47',1),(33,'2','1','{\"from\":\"uId2\",\"msg\":[{\"linkPath\":\"/userImg/xEjN5uag8Q9zm_PGwh-5rUQN.jpg\",\"name\":\"7ff1630ajw1eq2qgxix32j217l0wc7ph.jpg\"}],\"to\":\"uId1\"}',2,'2016-05-10 21:12:31',1),(34,'2','1','{\"from\":\"uId2\",\"msg\":[{\"linkPath\":\"/userImg/RwBNZ1ZXBTbYyChiRXXyf10j.jpg\",\"name\":\"7ff1630ajw1eq2qgxix32j217l0wc7ph.jpg\"}],\"to\":\"uId1\"}',2,'2016-05-10 21:12:43',1),(35,'2','1','{\"from\":\"uId2\",\"msg\":\"1234124\",\"to\":\"uId1\"}',1,'2016-05-10 21:15:04',1),(36,'2','1','{\"from\":\"uId2\",\"msg\":\"<img src=\'/emjoy/12@2x.png\' class=\'emjoy\'/>1234\",\"to\":\"uId1\"}',1,'2016-05-10 22:49:04',1),(37,'2','1','{\"from\":\"uId2\",\"msg\":\"134124\",\"to\":\"uId1\"}',1,'2016-05-10 22:49:15',1),(38,'2','1','{\"from\":\"uId2\",\"msg\":\"145135\",\"to\":\"uId1\"}',1,'2016-05-10 22:49:20',1),(39,'2','1','{\"from\":\"uId2\",\"msg\":\"23414\",\"to\":\"uId1\"}',1,'2016-05-10 22:49:57',1),(40,'2','1','{\"from\":\"uId2\",\"msg\":\"12341\",\"to\":\"uId1\"}',1,'2016-05-10 22:50:31',1),(41,'2','1','{\"from\":\"uId2\",\"msg\":\"1234234\",\"to\":\"uId1\"}',1,'2016-05-10 22:51:34',1),(42,'2','1','{\"from\":\"uId2\",\"msg\":\"134134\",\"to\":\"uId1\"}',1,'2016-05-10 22:52:09',1),(43,'1','1','{\"from\":\"uId1\",\"msg\":\"1324\",\"to\":\"uId1\"}',1,'2016-05-10 22:54:29',1),(44,'2','1','{\"from\":\"uId2\",\"msg\":\"1234\",\"to\":\"uId1\"}',1,'2016-05-10 22:54:42',1),(45,'1','2','{\"from\":\"uId1\",\"msg\":\"qwerqwt\",\"to\":\"uId2\"}',1,'2016-05-10 22:54:55',1),(46,'1','2','{\"from\":\"uId1\",\"msg\":\"<img src=\'/emjoy/19@2x.png\' class=\'emjoy\'/><img src=\'/emjoy/10@2x.png\' class=\'emjoy\'/><img src=\'/emjoy/15@2x.png\' class=\'emjoy\'/>12341324\",\"to\":\"uId2\"}',1,'2016-05-10 22:56:33',1),(47,'2','1','{\"from\":\"uId2\",\"msg\":\"<img src=\'/emjoy/19@2x.png\' class=\'emjoy\'/>12341234\",\"to\":\"uId1\"}',1,'2016-05-10 22:56:40',1),(48,'2','1','{\"from\":\"uId2\",\"msg\":[{\"linkPath\":\"/userImg/BkKaOjEjzrZMg-mbxVjnHXwX.jpg\",\"name\":\"7ff1630ajw1eq2qgxix32j217l0wc7ph.jpg\"}],\"to\":\"uId1\"}',2,'2016-05-10 22:56:45',1),(49,'2','1','{\"from\":\"uId2\",\"msg\":[{\"linkPath\":\"/files/zeo8nv1IMDYsmyABm6STndlY.doc\",\"name\":\"202120317_胡哲_毕业设计论文.doc\"}],\"to\":\"uId1\"}',3,'2016-05-10 22:56:51',1),(50,'1','2','{\"from\":\"uId1\",\"msg\":\"1234\",\"to\":\"uId2\"}',1,'2016-05-10 23:08:24',1),(51,'2','1','{\"from\":\"uId2\",\"msg\":\"13455\",\"to\":\"uId1\"}',1,'2016-05-10 23:08:34',1);
/*!40000 ALTER TABLE `chat_msgRecord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_resetPwd`
--

DROP TABLE IF EXISTS `chat_resetPwd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_resetPwd` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uId` int(11) NOT NULL COMMENT '用户ID',
  `verifyCode` varchar(50) NOT NULL COMMENT '验证字符串',
  `status` varchar(45) NOT NULL COMMENT '可用（0：可用，1：不可用）',
  `create_in` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `id_idx` (`uId`),
  CONSTRAINT `id` FOREIGN KEY (`uId`) REFERENCES `chat_login` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户找回密码验证表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_resetPwd`
--

LOCK TABLES `chat_resetPwd` WRITE;
/*!40000 ALTER TABLE `chat_resetPwd` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_resetPwd` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-05-16 17:20:05
