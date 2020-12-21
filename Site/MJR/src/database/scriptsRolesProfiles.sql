ALTER TABLE `proyecto_integrador_db`.`profiles` ADD COLUMN `link` VARCHAR(45) NULL  AFTER `deleted_at` ;
ALTER TABLE `proyecto_integrador_db`.`profiles` ADD COLUMN `updated_at` TIMESTAMP NULL DEFAULT NULL  AFTER `created_at` ;
ALTER TABLE `proyecto_integrador_db`.`profiles` ADD COLUMN `created_at` TIMESTAMP NULL DEFAULT NULL  AFTER `link` ;
ALTER TABLE `proyecto_integrador_db`.`roles_profiles` ADD COLUMN `created_at` TIMESTAMP NULL DEFAULT NULL  AFTER `deleted_at` , ADD COLUMN `updated_at` TIMESTAMP NULL DEFAULT NULL  AFTER `created_at` ;

INSERT INTO `proyecto_integrador_db`.`profiles` (`name`, `deleted_at`) VALUES ('usuarios', 'administracion usuarios');
