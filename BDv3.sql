/*
SQLyog Community v13.1.1 (64 bit)
MySQL - 10.1.37-MariaDB : Database - appenfermeria
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`appenfermeria` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `appenfermeria`;

/*Table structure for table `evento` */

DROP TABLE IF EXISTS `evento`;

CREATE TABLE `evento` (
  `tipo_evento` enum('Cumpleaños','Recortadorio','Supervisar','Otro') NOT NULL,
  `observaciones` varchar(150) NOT NULL,
  `id_paciente` char(9) NOT NULL,
  `fecha_evento` datetime NOT NULL,
  `repetir` tinyint(1) DEFAULT '0',
  `id_usuario` char(9) NOT NULL,
  PRIMARY KEY (`id_paciente`,`fecha_evento`),
  KEY `FK_evento_usuario` (`id_usuario`),
  CONSTRAINT `FK_evento_paciente` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`telefono`) ON UPDATE CASCADE,
  CONSTRAINT `FK_evento_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`dni`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `evento` */

/*Table structure for table `grupo` */

DROP TABLE IF EXISTS `grupo`;

CREATE TABLE `grupo` (
  `id` int(5) NOT NULL,
  `nombre` char(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `grupo` */

insert  into `grupo`(`id`,`nombre`) values 
(5,'grupo 5');

/*Table structure for table `grupo_profesor` */

DROP TABLE IF EXISTS `grupo_profesor`;

CREATE TABLE `grupo_profesor` (
  `id_profesor` char(9) NOT NULL,
  `id_grupo` int(5) NOT NULL,
  PRIMARY KEY (`id_profesor`,`id_grupo`),
  KEY `FK_grupo_grupo` (`id_grupo`),
  CONSTRAINT `FK_grupo_grupo` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_grupo_profesor` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id_usuario`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `grupo_profesor` */

/*Table structure for table `mensaje` */

DROP TABLE IF EXISTS `mensaje`;

CREATE TABLE `mensaje` (
  `contenido` varchar(255) NOT NULL,
  `id_usuario` char(9) NOT NULL,
  `id_grupo` int(11) NOT NULL,
  `visto` tinyint(1) DEFAULT '0',
  `hora_envio` datetime NOT NULL,
  PRIMARY KEY (`id_usuario`,`hora_envio`),
  KEY `FK_mensaje_grupo` (`id_grupo`),
  CONSTRAINT `FK_mensaje_grupo` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_mensaje_usario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`dni`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `mensaje` */

/*Table structure for table `paciente` */

DROP TABLE IF EXISTS `paciente`;

CREATE TABLE `paciente` (
  `dni` char(9) DEFAULT NULL,
  `telefono` char(15) NOT NULL,
  `nombre` char(15) DEFAULT NULL,
  `apellidos` varchar(30) DEFAULT NULL,
  `usuario_asignado` char(9) DEFAULT NULL,
  `padecimientos` varchar(750) DEFAULT NULL,
  `observaciones` varchar(750) DEFAULT NULL,
  `medicacion` varchar(750) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `fecha_baja` date DEFAULT NULL,
  `genero` enum('Hombre','Mujer','Indefinido') DEFAULT NULL,
  `localidad` char(20) DEFAULT NULL,
  `id_usuario` char(9) DEFAULT NULL,
  PRIMARY KEY (`telefono`),
  KEY `FK_paciente_usuario` (`id_usuario`),
  CONSTRAINT `FK_paciente_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`dni`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `paciente` */

/*Table structure for table `profesor` */

DROP TABLE IF EXISTS `profesor`;

CREATE TABLE `profesor` (
  `id_usuario` char(9) NOT NULL,
  `email` char(40) NOT NULL,
  `nombre` char(15) DEFAULT NULL,
  `apellidos` varchar(30) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `genero` enum('Hombre','Mujer','Indefinido') NOT NULL,
  PRIMARY KEY (`id_usuario`),
  CONSTRAINT `FK_profesor_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`dni`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `profesor` */

/*Table structure for table `tecnico` */

DROP TABLE IF EXISTS `tecnico`;

CREATE TABLE `tecnico` (
  `id_usuario` char(9) NOT NULL,
  `email` char(40) NOT NULL,
  `nombre` char(15) DEFAULT NULL,
  `apellidos` varchar(30) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `genero` enum('Hombre','Mujer','Indefinido') NOT NULL,
  `id_grupo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `FK_tecnico_grupo` (`id_grupo`),
  CONSTRAINT `FK_tecnico_grupo` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_tecnico_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`dni`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tecnico` */

insert  into `tecnico`(`id_usuario`,`email`,`nombre`,`apellidos`,`telefono`,`fecha_nacimiento`,`genero`,`id_grupo`) values 
('12345678A','pedro@hotmail.com','pedro','jose','65321231','2000-10-10','Hombre',5);

/*Table structure for table `usuario` */

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `dni` char(9) NOT NULL,
  `token` varchar(100) DEFAULT NULL,
  `fecha_vencimiento_token` datetime DEFAULT NULL,
  `baja_usuario` datetime DEFAULT NULL,
  `contrasenya` char(70) NOT NULL,
  `admnistrador` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `usuario` */

insert  into `usuario`(`dni`,`token`,`fecha_vencimiento_token`,`baja_usuario`,`contrasenya`,`admnistrador`) values 
('12345678A','$2y$11$xp.wja2mlISK.Fw87Ypfn.qBxLx04w8kQy/g4Jg3Ma49BiSO6a2QC','2022-11-24 16:53:55',NULL,'8cb2237d0679ca88db6464eac60da96345513964',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
