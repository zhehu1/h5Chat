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
-- Table structure for table `chat_info`
--

DROP TABLE IF EXISTS `chat_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickName` varchar(50) NOT NULL COMMENT '昵称',
  `picture` varchar(2000) DEFAULT '/images/shuijiao.jpg' COMMENT '用户头像',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `address` varchar(200) DEFAULT NULL COMMENT '住址',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱\n',
  `tel` varchar(20) DEFAULT NULL COMMENT '手机号',
  `sex` int(1) DEFAULT NULL COMMENT '性别',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `chat_info_id_uindex` (`id`),
  CONSTRAINT `chat_info_fk` FOREIGN KEY (`id`) REFERENCES `chat_login` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_info`
--

LOCK TABLES `chat_info` WRITE;
/*!40000 ALTER TABLE `chat_info` DISABLE KEYS */;
INSERT INTO `chat_info` VALUES (1,'1123','/images/shuijiao.jpg',NULL,'1',NULL,NULL,NULL,'2016-04-10 23:12:41'),(2,'1234','/images/shuijiao.jpg',NULL,NULL,NULL,NULL,NULL,'2016-04-10 23:12:41');
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
  `last_login_time` datetime NOT NULL COMMENT '上次登录时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `chat_login_id_uindex` (`id`),
  UNIQUE KEY `chat_login_loginName_uindex` (`loginName`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='用户登录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_login`
--

LOCK TABLES `chat_login` WRITE;
/*!40000 ALTER TABLE `chat_login` DISABLE KEYS */;
INSERT INTO `chat_login` VALUES (1,'123','123','2016-04-10 21:42:44'),(2,'1234','123456','2016-04-10 22:04:43');
/*!40000 ALTER TABLE `chat_login` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-04-11 20:55:12
