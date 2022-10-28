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

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id_usuario` char(9) NOT NULL,
  `email` char(40) NOT NULL,
  `nombre` char(15) DEFAULT NULL,
  `apellidos` varchar(30) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `Fecha_nacimiento` date DEFAULT NULL,
  `genero` enum('Hombre','Mujer','Indefinido') NOT NULL,
  PRIMARY KEY (`id_usuario`),
  CONSTRAINT `FK_admin_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`dni`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `admin` */

insert  into `admin`(`id_usuario`,`email`,`nombre`,`apellidos`,`telefono`,`Fecha_nacimiento`,`genero`) values 
('89765432P','juan@torreAledua.org','juan',NULL,NULL,NULL,'Hombre');

/*Table structure for table `alumno` */

DROP TABLE IF EXISTS `alumno`;

CREATE TABLE `alumno` (
  `id_usuario` char(9) NOT NULL,
  `email` char(40) NOT NULL,
  `nombre` char(15) DEFAULT NULL,
  `apellidos` varchar(30) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `Fecha_nacimiento` date DEFAULT NULL,
  `genero` enum('Hombre','Mujer','Indefinido') NOT NULL,
  PRIMARY KEY (`id_usuario`),
  CONSTRAINT `FK_alumno_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`dni`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `alumno` */

/*Table structure for table `mensaje` */

DROP TABLE IF EXISTS `mensaje`;

CREATE TABLE `mensaje` (
  `contenido` varchar(255) NOT NULL,
  `id_usuario_emisor` char(9) NOT NULL,
  `id_usuario_receptor` char(9) NOT NULL,
  `visto` tinyint(1) DEFAULT '0',
  `emision` datetime NOT NULL,
  PRIMARY KEY (`id_usuario_emisor`,`emision`),
  KEY `FK_mensaje_usuario_receptor` (`id_usuario_receptor`),
  CONSTRAINT `FK_mensaje_usario_emisor` FOREIGN KEY (`id_usuario_emisor`) REFERENCES `usuario` (`dni`) ON UPDATE CASCADE,
  CONSTRAINT `FK_mensaje_usuario_receptor` FOREIGN KEY (`id_usuario_receptor`) REFERENCES `usuario` (`dni`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `mensaje` */

/*Table structure for table `notificacion` */

DROP TABLE IF EXISTS `notificacion`;

CREATE TABLE `notificacion` (
  `contenido` varchar(150) NOT NULL,
  `id_paciente` char(9) NOT NULL,
  `emision` datetime NOT NULL,
  `visto` tinyint(1) DEFAULT '0',
  `id_usuario` char(9) NOT NULL,
  PRIMARY KEY (`id_paciente`,`emision`),
  KEY `FK_notificacion_usuario` (`id_usuario`),
  CONSTRAINT `FK_notificacion_paciente` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`dni`) ON UPDATE CASCADE,
  CONSTRAINT `FK_notificacion_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`dni`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `notificacion` */

/*Table structure for table `paciente` */

DROP TABLE IF EXISTS `paciente`;

CREATE TABLE `paciente` (
  `dni` char(9) NOT NULL,
  `nombre` char(15) NOT NULL,
  `apellidos` varchar(30) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `id_usuario` char(5) DEFAULT NULL,
  `patologias` varchar(500) DEFAULT NULL,
  `Fecha_nacimiento` date DEFAULT NULL,
  `genero` enum('Hombre','Mujer','Indefinido') NOT NULL,
  `localidad` char(20) NOT NULL,
  `observaciones` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`dni`),
  KEY `FK_paciente_usuario` (`id_usuario`),
  CONSTRAINT `FK_paciente_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`dni`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `paciente` */

insert  into `paciente`(`dni`,`nombre`,`apellidos`,`telefono`,`id_usuario`,`patologias`,`Fecha_nacimiento`,`genero`,`localidad`,`observaciones`) values 
('10274895D','Fran','Ibañez Moreno','675409768',NULL,NULL,NULL,'Hombre','torre aledua',NULL),
('12345679B','Carmen','Gil Rodrigez','675956381',NULL,NULL,NULL,'Mujer','valencia',NULL),
('18273645B','Jose','Martinez Lopez','675409639',NULL,NULL,NULL,'Hombre','castellon',NULL),
('18922163S','Maria','Gomez Muñoz','675406579',NULL,NULL,NULL,'Mujer','torre aledua',NULL),
('19988756G','Alfonso','Martinez Jimenez','675123456',NULL,NULL,NULL,'Hombre','torre aledua',NULL),
('81276354V','Victor','Ruiz Sanchez','677249639',NULL,NULL,NULL,'Hombre','valencia',NULL),
('87654321A','Manuel','Fernandez Gonzalez','675409639',NULL,NULL,NULL,'Hombre','valencia',NULL);

/*Table structure for table `profesor` */

DROP TABLE IF EXISTS `profesor`;

CREATE TABLE `profesor` (
  `id_usuario` char(9) NOT NULL,
  `email` char(40) NOT NULL,
  `nombre` char(15) DEFAULT NULL,
  `apellidos` varchar(30) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `Fecha_nacimiento` date DEFAULT NULL,
  `genero` enum('Hombre','Mujer','Indefinido') NOT NULL,
  PRIMARY KEY (`id_usuario`),
  CONSTRAINT `FK_profesor_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`dni`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `profesor` */

/*Table structure for table `usuario` */

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `dni` char(9) NOT NULL,
  `token` varchar(100) DEFAULT NULL,
  `Fecha_vencimiento_token` datetime DEFAULT NULL,
  `contrasenya` char(64) NOT NULL,
  PRIMARY KEY (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `usuario` */

insert  into `usuario`(`dni`,`token`,`Fecha_vencimiento_token`,`contrasenya`) values 
('12345678A','$2y$11$.Nmtmtp6yYK81PhR4o2wcuBUlLskwC.apcdJJmD6BmINsMkB/NK3u',NULL,'8cb2237d0679ca88db6464eac60da96345513964'),
('89765432P',NULL,NULL,'1234');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
