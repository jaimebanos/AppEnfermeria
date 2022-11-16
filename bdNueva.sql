/*
SQLyog Community v13.1.9 (64 bit)
MySQL - 10.4.24-MariaDB : Database - appenfermeria
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
  `tipo_evento` enum('Cumpleanyos','Recodatorio','Supervisar','Otro') NOT NULL,
  `observaciones` varchar(150) NOT NULL,
  `id_paciente` char(9) NOT NULL,
  `fecha_evento` datetime NOT NULL,
  `id_usuario` char(75) NOT NULL,
  PRIMARY KEY (`id_paciente`,`fecha_evento`),
  KEY `FK_evento_usuario` (`id_usuario`),
  CONSTRAINT `FK_evento_paciente` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`telefono`) ON UPDATE CASCADE,
  CONSTRAINT `FK_evento_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`email`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `evento` */

/*Table structure for table `grupo` */

DROP TABLE IF EXISTS `grupo`;

CREATE TABLE `grupo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` char(15) DEFAULT NULL,
  `fecha_baja` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `grupo` */

insert  into `grupo`(`id`,`nombre`,`fecha_baja`) values 
(1,'grupo 1',NULL),
(2,'grupo 2',NULL),
(3,'grupo 3',NULL),
(4,'grupo 4',NULL);

/*Table structure for table `grupo_profesor` */

DROP TABLE IF EXISTS `grupo_profesor`;

CREATE TABLE `grupo_profesor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_profesor` char(75) NOT NULL,
  `id_grupo` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_id_profesor_id_grupo` (`id_profesor`,`id_grupo`),
  KEY `FK_grupo_profeso_grupo` (`id_grupo`),
  CONSTRAINT `FK_grupo_profeso_grupo` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_grupo_profesor_profesor` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id_usuario`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `grupo_profesor` */

/*Table structure for table `mensaje` */

DROP TABLE IF EXISTS `mensaje`;

CREATE TABLE `mensaje` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contenido` varchar(255) NOT NULL,
  `id_usuario_emisor` char(75) NOT NULL,
  `id_grupo_receptor` int(11) NOT NULL,
  `visto` tinyint(1) DEFAULT 0,
  `hora_envio` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UC_clave_alternativa` (`id_usuario_emisor`,`id_grupo_receptor`,`hora_envio`),
  KEY `FK_mensaje_grupo` (`id_grupo_receptor`),
  CONSTRAINT `FK_mensaje_grupo` FOREIGN KEY (`id_grupo_receptor`) REFERENCES `grupo` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_mensaje_usario` FOREIGN KEY (`id_usuario_emisor`) REFERENCES `usuario` (`email`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `mensaje` */

/*Table structure for table `paciente` */

DROP TABLE IF EXISTS `paciente`;

CREATE TABLE `paciente` (
  `dni` char(9) DEFAULT NULL,
  `telefono` char(15) NOT NULL,
  `nombre` char(15) DEFAULT NULL,
  `apellidos` varchar(30) DEFAULT NULL,
  `usuario_asignado` char(75) DEFAULT 'null',
  `padecimientos` varchar(750) DEFAULT NULL,
  `observaciones` varchar(750) DEFAULT NULL,
  `medicacion` varchar(750) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `fecha_baja` date DEFAULT NULL,
  `genero` enum('Hombre','Mujer') DEFAULT NULL,
  `localidad` char(20) DEFAULT NULL,
  PRIMARY KEY (`telefono`),
  KEY `FK_paciente_usuario` (`usuario_asignado`),
  CONSTRAINT `FK_paciente_usuario` FOREIGN KEY (`usuario_asignado`) REFERENCES `usuario` (`email`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `paciente` */

/*Table structure for table `profesor` */

DROP TABLE IF EXISTS `profesor`;

CREATE TABLE `profesor` (
  `id_usuario` char(75) NOT NULL,
  `nombre` char(15) DEFAULT NULL,
  `apellidos` varchar(30) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `genero` enum('Hombre','Mujer','Indefinido') NOT NULL,
  PRIMARY KEY (`id_usuario`),
  CONSTRAINT `FK_profesor_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`email`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `profesor` */

/*Table structure for table `registro_llamadas` */

DROP TABLE IF EXISTS `registro_llamadas`;

CREATE TABLE `registro_llamadas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tecnico` char(15) NOT NULL,
  `id_paciente` char(15) NOT NULL,
  `inicio_llamada` datetime NOT NULL,
  `final_llamada` datetime NOT NULL,
  `observaciones` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UC_clave_alternativa` (`id_tecnico`,`id_paciente`,`inicio_llamada`,`final_llamada`),
  KEY `FK_registro_llamadas_paciente` (`id_paciente`),
  CONSTRAINT `FK_registro_llamadas_paciente` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`telefono`) ON UPDATE CASCADE,
  CONSTRAINT `FK_registro_llamadas_tecnico` FOREIGN KEY (`id_tecnico`) REFERENCES `tecnico` (`id_usuario`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `registro_llamadas` */

/*Table structure for table `tecnico` */

DROP TABLE IF EXISTS `tecnico`;

CREATE TABLE `tecnico` (
  `id_usuario` char(75) NOT NULL,
  `nombre` char(15) DEFAULT NULL,
  `apellidos` varchar(30) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `genero` enum('Hombre','Mujer','Indefinido') NOT NULL,
  `id_grupo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `FK_tecnico_grupo` (`id_grupo`),
  CONSTRAINT `FK_tecnico_grupo` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_tecnico_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`email`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tecnico` */

insert  into `tecnico`(`id_usuario`,`nombre`,`apellidos`,`telefono`,`fecha_nacimiento`,`genero`,`id_grupo`) values 
('juan@hotmail.com','juan','manolo','12345678','2022-11-11','Hombre',1);

/*Table structure for table `usuario` */

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `email` char(75) NOT NULL,
  `token` varchar(100) DEFAULT NULL,
  `fecha_vencimiento_token` datetime DEFAULT NULL,
  `baja_usuario` datetime DEFAULT NULL,
  `contrasenya` char(70) NOT NULL,
  `admnistrador` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `usuario` */

insert  into `usuario`(`email`,`token`,`fecha_vencimiento_token`,`baja_usuario`,`contrasenya`,`admnistrador`) values 
('juan@hotmail.com','$2y$11$z5HupjFEK8aKJ4ay4P/72.bCW6Q8CxUVPzoro1I3Nqay73soQVy6W','2022-11-28 14:37:02',NULL,'$2y$10$R/jXLUIZdzmKa2VepiLiuO8BQQS5sBNCfiRHCvcNfRZuMpolZRLNi',0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
