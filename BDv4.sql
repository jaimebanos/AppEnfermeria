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
  `email_usuario` char(75) NOT NULL,
  PRIMARY KEY (`id_paciente`,`fecha_evento`),
  KEY `FK_evento_usuario` (`email_usuario`),
  CONSTRAINT `FK_evento_paciente` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`telefono`) ON UPDATE CASCADE,
  CONSTRAINT `FK_evento_usuario` FOREIGN KEY (`email_usuario`) REFERENCES `usuario` (`email`) ON UPDATE CASCADE
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

/*Table structure for table `grupo_profesor` */

DROP TABLE IF EXISTS `grupo_profesor`;

CREATE TABLE `grupo_profesor` (
  `email_profesor` char(75) NOT NULL,
  `id_grupo` int(5) NOT NULL,
  PRIMARY KEY (`email_profesor`,`id_grupo`),
  KEY `FK_grupo_grupo` (`id_grupo`),
  CONSTRAINT `FK_grupo_grupo` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_grupo_profesor` FOREIGN KEY (`email_profesor`) REFERENCES `profesor` (`email_usuario`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `grupo_profesor` */

/*Table structure for table `mensaje` */

DROP TABLE IF EXISTS `mensaje`;

CREATE TABLE `mensaje` (
  `contenido` varchar(255) NOT NULL,
  `email_usuario` char(9) NOT NULL,
  `id_grupo` int(11) NOT NULL,
  `visto` tinyint(1) DEFAULT '0',
  `hora_envio` datetime NOT NULL,
  PRIMARY KEY (`email_usuario`,`hora_envio`),
  KEY `FK_mensaje_grupo` (`id_grupo`),
  CONSTRAINT `FK_mensaje_grupo` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_mensaje_usario` FOREIGN KEY (`email_usuario`) REFERENCES `usuario` (`email`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `mensaje` */

/*Table structure for table `paciente` */

DROP TABLE IF EXISTS `paciente`;

CREATE TABLE `paciente` (
  `dni` char(9) DEFAULT NULL,
  `telefono` char(15) NOT NULL,
  `nombre` char(15) DEFAULT NULL,
  `apellidos` varchar(30) DEFAULT NULL,
  `usuario_asignado` char(75) DEFAULT NULL,
  `padecimientos` varchar(750) DEFAULT NULL,
  `observaciones` varchar(750) DEFAULT NULL,
  `medicacion` varchar(750) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `fecha_baja` date DEFAULT NULL,
  `genero` enum('Hombre','Mujer','Indefinido') DEFAULT NULL,
  `localidad` char(20) DEFAULT NULL,
  PRIMARY KEY (`telefono`),
  KEY `FK_paciente_usuario` (`usuario_asignado`),
  CONSTRAINT `FK_paciente_usuario` FOREIGN KEY (`usuario_asignado`) REFERENCES `usuario` (`email`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `paciente` */

insert  into `paciente`(`dni`,`telefono`,`nombre`,`apellidos`,`usuario_asignado`,`padecimientos`,`observaciones`,`medicacion`,`fecha_nacimiento`,`fecha_baja`,`genero`,`localidad`) values 
('1231312A','+34747486442','manolo','pedro','pedrojose@hotmail.com',NULL,'le gusta el futbol',NULL,'2022-12-01',NULL,'Hombre',NULL);

/*Table structure for table `profesor` */

DROP TABLE IF EXISTS `profesor`;

CREATE TABLE `profesor` (
  `email_usuario` char(9) NOT NULL,
  `nombre` char(15) DEFAULT NULL,
  `apellidos` varchar(30) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `genero` enum('Hombre','Mujer','Indefinido') NOT NULL,
  PRIMARY KEY (`email_usuario`),
  CONSTRAINT `FK_profesor_usuario` FOREIGN KEY (`email_usuario`) REFERENCES `usuario` (`email`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `profesor` */

/*Table structure for table `tecnico` */

DROP TABLE IF EXISTS `tecnico`;

CREATE TABLE `tecnico` (
  `email_usuario` char(75) NOT NULL,
  `nombre` char(15) DEFAULT NULL,
  `apellidos` varchar(30) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `genero` enum('Hombre','Mujer','Indefinido') NOT NULL,
  `id_grupo` int(11) DEFAULT NULL,
  PRIMARY KEY (`email_usuario`),
  KEY `FK_tecnico_grupo` (`id_grupo`),
  CONSTRAINT `FK_tecnico_grupo` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_tecnico_usuario` FOREIGN KEY (`email_usuario`) REFERENCES `usuario` (`email`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tecnico` */

insert  into `tecnico`(`email_usuario`,`nombre`,`apellidos`,`telefono`,`fecha_nacimiento`,`genero`,`id_grupo`) values 
('pedrojose@hotmail.com','pedro','jose','675842210','2000-10-10','Hombre',NULL);

/*Table structure for table `usuario` */

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `email` char(75) NOT NULL,
  `token` varchar(100) DEFAULT NULL,
  `fecha_vencimiento_token` datetime DEFAULT NULL,
  `baja_usuario` datetime DEFAULT NULL,
  `contrasenya` char(70) NOT NULL,
  `admnistrador` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `usuario` */

insert  into `usuario`(`email`,`token`,`fecha_vencimiento_token`,`baja_usuario`,`contrasenya`,`admnistrador`) values 
('pedrojose@hotmail.com','$2y$11$.NibMvCrs.vzNKD4L2b9wO5OUSQQYyxX5TmZUhopHV0QI23Xo1BjK','2022-11-25 17:14:05',NULL,'8cb2237d0679ca88db6464eac60da96345513964',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
