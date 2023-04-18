-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: liberecco
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

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
-- Table structure for table `lib_log`
--

DROP TABLE IF EXISTS `lib_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lib_log` (
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `method` varchar(255) NOT NULL,
  `sendSizeKB` int(11) NOT NULL,
  `elapsedTimeInS` double DEFAULT NULL,
  `receiveSizeKB` int(11) DEFAULT NULL,
  `isAvelon` tinyint(4) NOT NULL,
  `clientId` int(11) DEFAULT NULL,
  `tokenId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_971b4384a6c836880555a6d36ed` (`clientId`),
  KEY `FK_b5b2cb9da5b5c64ddb0f21b52ba` (`tokenId`),
  CONSTRAINT `FK_971b4384a6c836880555a6d36ed` FOREIGN KEY (`clientId`) REFERENCES `lib_client` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_b5b2cb9da5b5c64ddb0f21b52ba` FOREIGN KEY (`tokenId`) REFERENCES `lib_o_auth2_token` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lib_log`
--

LOCK TABLES `lib_log` WRITE;
/*!40000 ALTER TABLE `lib_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `lib_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lib_seeders`
--

DROP TABLE IF EXISTS `lib_seeders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lib_seeders` (
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lib_seeders`
--

LOCK TABLES `lib_seeders` WRITE;
/*!40000 ALTER TABLE `lib_seeders` DISABLE KEYS */;
/*!40000 ALTER TABLE `lib_seeders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lib_command_log`
--

DROP TABLE IF EXISTS `lib_command_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lib_command_log` (
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL,
  `command` varchar(255) NOT NULL,
  `commandInput` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lib_command_log`
--

LOCK TABLES `lib_command_log` WRITE;
/*!40000 ALTER TABLE `lib_command_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `lib_command_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lib_command_instance`
--

DROP TABLE IF EXISTS `lib_command_instance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lib_command_instance` (
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `command` varchar(255) NOT NULL,
  `pid` int(11) NOT NULL,
  `expirationDate` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lib_command_instance`
--

LOCK TABLES `lib_command_instance` WRITE;
/*!40000 ALTER TABLE `lib_command_instance` DISABLE KEYS */;
/*!40000 ALTER TABLE `lib_command_instance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lib_usuarios`
--

DROP TABLE IF EXISTS `lib_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lib_usuarios` (
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `phone` int(11) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `perfil` int(11) DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_f2b0f1666887142f38968d699a` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lib_usuarios`
--

LOCK TABLES `lib_usuarios` WRITE;
/*!40000 ALTER TABLE `lib_usuarios` DISABLE KEYS */;
INSERT INTO `lib_usuarios` VALUES ('2020-07-14 18:47:18','2020-07-14 18:47:19',1,'admin@liberecco.com','Administrator',NULL,'8d416b1961638d578cebe7b71b9105459745cfae68af28d52cb32051e5a0770fa8ff9c4226787667ef030112f475a48f935010b943d11962102e33e9f4e11c00','04a962585335123c902751965dd617a5',NULL,NULL),('2020-07-14 18:47:18','2020-07-14 18:47:19',2,'Admin','Admin',NULL,'f5824268faa5eb7335e43a58f4276afb3b7d3b07ffde853fb9783ef5bcd6d43092c64b60bb3d8d8a021ce102f70da4a8d78609818587bec100fdef8275d63e04','07b5d0a6bc8526ebc380dd44fb13cdd7',NULL,NULL);
/*!40000 ALTER TABLE `lib_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lib_client`
--

DROP TABLE IF EXISTS `lib_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lib_client` (
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `secret` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `enabled` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lib_client`
--

LOCK TABLES `lib_client` WRITE;
/*!40000 ALTER TABLE `lib_client` DISABLE KEYS */;
INSERT INTO `lib_client` VALUES ('2020-07-14 18:46:32','2020-07-14 18:46:32',1,'lib-client','secret','Liberecco Client',1),('2020-07-14 18:46:32','2020-07-14 18:46:32',2,'lib-client-sga','fGx4=yU-j4^jAAjZtV+YTDsm-@R$HAK3',NULL,1),('2020-07-14 18:46:32','2020-07-14 18:46:32',3,'lib-client-al','k4a4yBrqW54L@uX_^p8EMGDFb?qj*TKe',NULL,1),('2020-07-14 18:47:18','2020-07-14 18:47:19',4,'lib-client','secret','Liberecco Client',1),('2020-07-14 18:47:18','2020-07-14 18:47:19',5,'lib-client-sga','fGx4=yU-j4^jAAjZtV+YTDsm-@R$HAK3',NULL,1),('2020-07-14 18:47:18','2020-07-14 18:47:19',6,'lib-client-al','k4a4yBrqW54L@uX_^p8EMGDFb?qj*TKe',NULL,1);
/*!40000 ALTER TABLE `lib_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lib_command_pid`
--

DROP TABLE IF EXISTS `lib_command_pid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lib_command_pid` (
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL,
  `alive` int(11) NOT NULL,
  `softDeleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lib_command_pid`
--

LOCK TABLES `lib_command_pid` WRITE;
/*!40000 ALTER TABLE `lib_command_pid` DISABLE KEYS */;
/*!40000 ALTER TABLE `lib_command_pid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lib_service_expiration`
--

DROP TABLE IF EXISTS `lib_service_expiration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lib_service_expiration` (
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `serviceType` enum('1','2') NOT NULL,
  `expirationDate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lib_service_expiration`
--

LOCK TABLES `lib_service_expiration` WRITE;
/*!40000 ALTER TABLE `lib_service_expiration` DISABLE KEYS */;
/*!40000 ALTER TABLE `lib_service_expiration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lib_log_request`
--

DROP TABLE IF EXISTS `lib_log_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lib_log_request` (
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `body` text,
  `url` varchar(255) NOT NULL,
  `method` varchar(255) NOT NULL,
  `logId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_0cb19cb200f10d63dbacd2b9ca` (`logId`),
  CONSTRAINT `FK_0cb19cb200f10d63dbacd2b9ca4` FOREIGN KEY (`logId`) REFERENCES `lib_log` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lib_log_request`
--

LOCK TABLES `lib_log_request` WRITE;
/*!40000 ALTER TABLE `lib_log_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `lib_log_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lib_log_response`
--

DROP TABLE IF EXISTS `lib_log_response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lib_log_response` (
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `body` text,
  `statusCode` int(11) NOT NULL,
  `logId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_cacc406f1a3a7db71b1e1bb7a6` (`logId`),
  CONSTRAINT `FK_cacc406f1a3a7db71b1e1bb7a6b` FOREIGN KEY (`logId`) REFERENCES `lib_log` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lib_log_response`
--

LOCK TABLES `lib_log_response` WRITE;
/*!40000 ALTER TABLE `lib_log_response` DISABLE KEYS */;
/*!40000 ALTER TABLE `lib_log_response` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lib_o_auth2_token`
--

DROP TABLE IF EXISTS `lib_o_auth2_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lib_o_auth2_token` (
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accessToken` varchar(255) NOT NULL,
  `accessTokenExpiresAt` datetime NOT NULL,
  `refreshToken` varchar(255) NOT NULL,
  `refreshTokenExpiresAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `clientId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e3b5e19e59090f13a65ff9f05d9` (`userId`),
  KEY `FK_041ce1d789d13fb21862ff455bc` (`clientId`),
  CONSTRAINT `FK_041ce1d789d13fb21862ff455bc` FOREIGN KEY (`clientId`) REFERENCES `lib_client` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e3b5e19e59090f13a65ff9f05d9` FOREIGN KEY (`userId`) REFERENCES `lib_usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lib_o_auth2_token`
--

LOCK TABLES `lib_o_auth2_token` WRITE;
/*!40000 ALTER TABLE `lib_o_auth2_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `lib_o_auth2_token` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-14 19:05:02
