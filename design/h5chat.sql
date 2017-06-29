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
-- Table structure for table `users_base_info`
--

DROP TABLE IF EXISTS `users_base_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_base_info` (
  `id` varchar(36) NOT NULL COMMENT '用户唯一组件, 通过mysql内置函数uuid()生成',
  `Account` varchar(20) NOT NULL COMMENT '用户账号（唯一）',
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
  UNIQUE KEY `uuid_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户基本信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_base_info`
--

LOCK TABLES `users_base_info` WRITE;
/*!40000 ALTER TABLE `users_base_info` DISABLE KEYS */;
INSERT INTO `users_base_info` VALUES ('3eac377c-5cad-11e7-bc36-1c1b0d22e2ce','20','','1','a','','1900-01-01 08:00:00','1','1','2017-06-29 17:28:01','2017-06-29 18:00:00'),('a0fcee08-5cac-11e7-bc36-1c1b0d22e2ce','21','','1','23523534534','','1900-01-01 08:00:00','1','1','2017-06-29 17:23:36','2017-06-29 17:56:05');
/*!40000 ALTER TABLE `users_base_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'h5chat'
--

--
-- Dumping routines for database 'h5chat'
--
/*!50003 DROP PROCEDURE IF EXISTS `i_users_base_info` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `i_users_base_info`(
	in _Account varchar(45),
    in _Email varchar(45),
    in _Pic varchar(45),
    in _Tel varchar(45),
    in _Career varchar(45),
    in _Birthday DATETIME,
    in _Company varchar(45),
    in _Address varchar(45)
)
    MODIFIES SQL DATA
    COMMENT '新增用户信息'
BEGIN
	declare _id varchar(36);
	declare _CreateTime DATETIME;
    set _id = uuid();
	set _CreateTime = CURRENT_TIMESTAMP;
	if _Email is null then set _Email = ''; 
    end if;
    if _Account is null then set _Account = ''; 
    end if;
    if _Pic is null then set _Pic = ''; 
    end if;
    if _Tel is null then set _Tel = ''; 
    end if;
	if _Career is null then set _Career = ''; 
    end if;
    if _Birthday is null then set _Birthday = '1900-01-01 08:00:00'; 
    end if;
    if  _Company is null then set  _Company = ''; 
    end if;
    if  _Address is null then set  _Address = ''; 
    end if;
    insert into `users_base_info` (`id`, `Account`, `Email`, `Pic`, `Tel`, `Career`, `Birthday`, `Company`, `Address`, `CreateTime`) values (_id, _Account, _Email, _Pic, _Tel, _Career, _Birthday, _Company, _Address, _CreateTime);
    select _id, _Account, _Email, _Pic, _Tel, _Career, _Birthday, _Company, _Address;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `u_users_base_info` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `u_users_base_info`(
	in _Account varchar(45),
    in _Email varchar(45),
    in _Pic varchar(45),
    in _Tel varchar(45),
    in _Career varchar(45),
    in _Birthday DATETIME,
    in _Company varchar(45),
    in _Address varchar(45)
)
    MODIFIES SQL DATA
    COMMENT '修改用户信息'
BEGIN
	declare _UpdateTime DATETIME;
	set _UpdateTime = CURRENT_TIMESTAMP;
	if _Account is null then set _Account = ''; 
    end if;
	if _Email is null then set _Email = ''; 
    end if;
    if _Pic is null then set _Pic = ''; 
    end if;
    if _Tel is null then set _Tel = ''; 
    end if;
	if _Career is null then set _Career = ''; 
    end if;
    if _Birthday is null then set _Birthday = '1900-01-01 08:00:00'; 
    end if;
    if  _Company is null then set  _Company = ''; 
    end if;
    if  _Address is null then set  _Address = ''; 
    end if;
    UPDATE `users_base_info` SET `Tel`=_Tel, `Email`=_Email, `Career`=_Career, `Birthday`=_Birthday, `Company`=_Company, `Address`=_Address, `UpdateTime`=_UpdateTime WHERE `Account`=_Account;
    select id,Account, Email, Pic, Tel, Career, Birthday, Company, Address from `users_base_info` where `Account`=_Account;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-29 18:01:54
