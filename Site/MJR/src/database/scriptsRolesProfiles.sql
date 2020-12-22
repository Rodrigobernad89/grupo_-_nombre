/*==================N   o   t   a   ====================*/
/*Nombre de usuario y contraseña de ´rueba */
/*  usario :    rodrigoBernad@mjr.com
    contraseña: 789  */
ALTER TABLE `proyecto_integrador_db`.`profiles` ADD COLUMN `created_at` TIMESTAMP NULL DEFAULT NULL  AFTER `deleted_at` ;
ALTER TABLE `proyecto_integrador_db`.`profiles` ADD COLUMN `updated_at` TIMESTAMP NULL DEFAULT NULL  AFTER `created_at` ;

ALTER TABLE `proyecto_integrador_db`.`profiles` ADD COLUMN `link` VARCHAR(45) NULL  AFTER `deleted_at` ;
ALTER TABLE `proyecto_integrador_db`.`roles_profiles` ADD COLUMN `created_at` TIMESTAMP NULL DEFAULT NULL  AFTER `deleted_at` ;
ALTER TABLE `proyecto_integrador_db`.`roles_profiles` ADD COLUMN `updated_at` TIMESTAMP NULL DEFAULT NULL  AFTER `created_at` ;

INSERT INTO `proyecto_integrador_db`.`profiles` (`name`, `description`, `link`) VALUES ('usuarios', 'administracion del modulo usuarios', 'users');
INSERT INTO `proyecto_integrador_db`.`profiles` (`name`, `description`, `link`) VALUES ('roles', 'administracion del modulo roles', 'roles');
INSERT INTO `proyecto_integrador_db`.`profiles` (`name`, `description`, `link`) VALUES ('productos', 'administracion modulo productos', 'products');
INSERT INTO `proyecto_integrador_db`.`profiles` (`name`, `description`, `link`) VALUES ('nuevo producto', 'crear nuevo producto', 'products/crear');

INSERT INTO `proyecto_integrador_db`.`roles_profiles` (`role_id`, `profile_id`) VALUES ('1', '1');
INSERT INTO `proyecto_integrador_db`.`roles_profiles` (`role_id`, `profile_id`) VALUES ('1', '2');
INSERT INTO `proyecto_integrador_db`.`roles_profiles` (`role_id`, `profile_id`) VALUES ('1', '3');
INSERT INTO `proyecto_integrador_db`.`roles_profiles` (`role_id`, `profile_id`) VALUES ('1', '4');
INSERT INTO `proyecto_integrador_db`.`roles_profiles` (`role_id`, `profile_id`) VALUES ('2', '1');
INSERT INTO `proyecto_integrador_db`.`roles_profiles` (`role_id`, `profile_id`) VALUES ('2', '3');


