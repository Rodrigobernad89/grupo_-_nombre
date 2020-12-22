CREATE TABLE `proyecto_integrador_db`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `creation` TIMESTAMP NULL,
  `modification` TIMESTAMP NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `instructions` TEXT NOT NULL,
  `price` DECIMAL NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `stock` INT NOT NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `proyecto_integrador_db`.`users` (
`id` INT NOT NULL AUTO_INCREMENT,
`creation` TIMESTAMP NULL,
`modification` TIMESTAMP NULL,
`first_name` VARCHAR(100) NOT NULL,
`last_name` VARCHAR(100) NOT NULL,
`email` VARCHAR(100) NOT NULL,
`password` VARCHAR(100) NOT NULL,
PRIMARY KEY (`id`));

CREATE TABLE `proyecto_integrador_db`.`extras` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `creation` TIMESTAMP NULL,
  `modification` TIMESTAMP NULL,
  `name` VARCHAR(100) NOT NULL,
  `price` DECIMAL NOT NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`));

CREATE TABLE `proyecto_integrador_db`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `proyecto_integrador_db`.`profiles` (
`id` INT NOT NULL AUTO_INCREMENT,
`name` VARCHAR(100) NOT NULL,
`description` TEXT NOT NULL,
PRIMARY KEY (`id`));

CREATE TABLE `proyecto_integrador_db`.`payment_methods` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `proyecto_integrador_db`.`payment_status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `proyecto_integrador_db`.`shipping_status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`));
CREATE TABLE `proyecto_integrador_db`.`order_status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`));
CREATE TABLE `proyecto_integrador_db`.`cart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `creation` TIMESTAMP NULL,
  `modification` TIMESTAMP NULL,
  `user_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cart_users_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_cart_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `proyecto_integrador_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
CREATE TABLE `proyecto_integrador_db`.`shipping` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `creation` TIMESTAMP NULL,
  `modification` TIMESTAMP NULL,
  `address` VARCHAR(100) NOT NULL,
  `shipping_status_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_shipping_shipping_status_idx` (`shipping_status_id` ASC),
  CONSTRAINT `fk_shipping_shipping_status`
    FOREIGN KEY (`shipping_status_id`)
    REFERENCES `proyecto_integrador_db`.`shipping_status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
CREATE TABLE `proyecto_integrador_db`.`payments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `creation` TIMESTAMP NULL,
  `modification` TIMESTAMP NULL,
  `amount` DECIMAL NULL,
  `user_id` INT NOT NULL,
  `payment_method_id` INT NOT NULL,
  `payment_status_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_payments-users_idx` (`user_id` ASC) ,
  INDEX `fk_payments_payment_methods_idx` (`payment_method_id` ASC) ,
  INDEX `fk_payments_payment_status_idx` (`payment_status_id` ASC) ,
  CONSTRAINT `fk_payments-users`
    FOREIGN KEY (`user_id`)
    REFERENCES `proyecto_integrador_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_payments_payment_methods`
    FOREIGN KEY (`payment_method_id`)
    REFERENCES `proyecto_integrador_db`.`payment_methods` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_payments_payment_status`
    FOREIGN KEY (`payment_status_id`)
    REFERENCES `proyecto_integrador_db`.`payment_status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
CREATE TABLE `proyecto_integrador_db`.`roles_profiles` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `role_id` INT NOT NULL,
    `profile_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_roles_profiles_idx` (`role_id` ASC) ,
    INDEX `fk_profiles_roles_idx` (`profile_id` ASC) ,
    CONSTRAINT `fk_roles`
    FOREIGN KEY (`role_id`)
    REFERENCES `proyecto_integrador_db`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_profiles`
    FOREIGN KEY (`profile_id`)
    REFERENCES `proyecto_integrador_db`.`profiles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
CREATE TABLE `proyecto_integrador_db`.`users_roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_idx` (`user_id` ASC) ,
  INDEX `fk_roles_idx` (`role_id` ASC) ,
  CONSTRAINT `fk_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `proyecto_integrador_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_uses_roles`
    FOREIGN KEY (`role_id`)
    REFERENCES `proyecto_integrador_db`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
CREATE TABLE `proyecto_integrador_db`.`items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cart_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `extras_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_items_cart_idx` (`cart_id` ASC) ,
  INDEX `fk_products_items_idx` (`product_id` ASC) ,
  INDEX `fk_items_extras_idx` (`extras_id` ASC) ,
  CONSTRAINT `fk_items_cart`
    FOREIGN KEY (`cart_id`)
    REFERENCES `proyecto_integrador_db`.`cart` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_items_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `proyecto_integrador_db`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_items_extras`
    FOREIGN KEY (`extras_id`)
    REFERENCES `proyecto_integrador_db`.`extras` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
CREATE TABLE `proyecto_integrador_db`.`orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `creation` TIMESTAMP NULL,
  `modification` TIMESTAMP NULL,
  `total` DECIMAL NOT NULL,
  `order_status_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `cart_id` INT NOT NULL,
  `shipping_id` INT NULL,
  `payment_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_orders_users_idx` (`user_id` ASC) ,
  INDEX `fk_orders_cart_idx` (`cart_id` ASC) ,
  INDEX `fk_orders_shipping_idx` (`shipping_id` ASC) ,
  INDEX `fk_orders_payments_idx` (`payment_id` ASC) ,
  INDEX `fk_orders_order_status_idx` (`order_status_id` ASC) ,
  CONSTRAINT `fk_orders_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `proyecto_integrador_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_cart`
    FOREIGN KEY (`cart_id`)
    REFERENCES `proyecto_integrador_db`.`cart` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_shipping`
    FOREIGN KEY (`shipping_id`)
    REFERENCES `proyecto_integrador_db`.`shipping` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_payments`
    FOREIGN KEY (`payment_id`)
    REFERENCES `proyecto_integrador_db`.`payments` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_order_status`
    FOREIGN KEY (`order_status_id`)
    REFERENCES `proyecto_integrador_db`.`order_status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);





INSERT INTO `proyecto_integrador_db`.`products` (`id`, `name`, `price`, `image`) VALUES ('1', 'Te Negro', '550.75', 'EarlGrey1.png');
INSERT INTO `proyecto_integrador_db`.`products` (`id`, `name`, `price`, `image`) VALUES ('2', 'Te Rojo', '2606.35', 'TeRojo1.jpg');
INSERT INTO `proyecto_integrador_db`.`products` (`id`, `name`, `price`, `image`) VALUES ('3', 'Te Verde', '1701.84', 'TeVerde3.png');
INSERT INTO `proyecto_integrador_db`.`products` (`id`, `name`, `price`, `image`) VALUES ('4', 'Te Oolong', '1621.56', 'oolong.jpg');
INSERT INTO `proyecto_integrador_db`.`products` (`id`, `name`, `price`, `image`) VALUES ('5', 'Te de Manzanilla', '2952.4', 'Manzanilla3.jpg');
INSERT INTO `proyecto_integrador_db`.`products` (`id`, `name`, `price`, `image`) VALUES ('6', 'Te Blanco', ' 1777.16', 'TeBlanco1.jpg');


ALTER TABLE `proyecto_integrador_db`.`users` 
CHANGE COLUMN `creation` `created_at` TIMESTAMP NULL DEFAULT NULL ,
CHANGE COLUMN `modification` `updated_at` TIMESTAMP NULL DEFAULT NULL ;

ALTER TABLE `proyecto_integrador_db`.`cart` 
CHANGE COLUMN `creation` `created_at` TIMESTAMP NULL DEFAULT NULL ,
CHANGE COLUMN `modification` `updated_at` TIMESTAMP NULL DEFAULT NULL ;

ALTER TABLE `proyecto_integrador_db`.`extras`
CHANGE COLUMN `creation` `created_at` TIMESTAMP NULL DEFAULT NULL ,
CHANGE COLUMN `modification` `updated_at` TIMESTAMP NULL DEFAULT NULL ;

ALTER TABLE `proyecto_integrador_db`.`orders`
CHANGE COLUMN `creation` `created_at` TIMESTAMP NULL DEFAULT NULL ,
CHANGE COLUMN `modification` `updated_at` TIMESTAMP NULL DEFAULT NULL ;



ALTER TABLE `proyecto_integrador_db`.`payments`
CHANGE COLUMN `creation` `created_at` TIMESTAMP NULL DEFAULT NULL ,
CHANGE COLUMN `modification` `updated_at` TIMESTAMP NULL DEFAULT NULL ;

ALTER TABLE `proyecto_integrador_db`.`products` 
CHANGE COLUMN `creation` `created_at` TIMESTAMP NULL DEFAULT NULL ,
CHANGE COLUMN `modification` `updated_at` TIMESTAMP NULL DEFAULT NULL ;

ALTER TABLE `proyecto_integrador_db`.`shipping` 
CHANGE COLUMN `creation` `created_at` TIMESTAMP NULL DEFAULT NULL ,
CHANGE COLUMN `modification` `updated_at` TIMESTAMP NULL DEFAULT NULL ;

ALTER TABLE `proyecto_integrador_db`.`orders` 
DROP FOREIGN KEY `fk_orders_payments`,
DROP FOREIGN KEY `fk_orders_shipping`;
ALTER TABLE `proyecto_integrador_db`.`orders` 
ADD COLUMN `quantity` INT NOT NULL AFTER `payment_id`,
CHANGE COLUMN `shipping_id` `shipping_id` INT(11) NULL ,
CHANGE COLUMN `payment_id` `payment_id` INT(11) NULL ;
ALTER TABLE `proyecto_integrador_db`.`orders` 
ADD CONSTRAINT `fk_orders_payments`
  FOREIGN KEY (`payment_id`)
  REFERENCES `proyecto_integrador_db`.`payments` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_orders_shipping`
  FOREIGN KEY (`shipping_id`)
  REFERENCES `proyecto_integrador_db`.`shipping` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

DELETE FROM `proyecto_integrador_db`.`products` WHERE (`id` = '7');
DELETE FROM `proyecto_integrador_db`.`products` WHERE (`id` = '8');
DELETE FROM `proyecto_integrador_db`.`products` WHERE (`id` = '9');
DELETE FROM `proyecto_integrador_db`.`products` WHERE (`id` = '13');

/*DD deletd_at created_at and update_at in tables*/
ALTER TABLE `proyecto_integrador_db`.`roles` ADD COLUMN `created_at` TIMESTAMP NULL DEFAULT NULL;
ALTER TABLE `proyecto_integrador_db`.`roles` ADD COLUMN `updated_at` TIMESTAMP NULL DEFAULT NULL;
ALTER TABLE `proyecto_integrador_db`.`roles` ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL;


ALTER TABLE `proyecto_integrador_db`.`users` ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL;

ALTER TABLE `proyecto_integrador_db`.`users_roles` ADD COLUMN `created_at` TIMESTAMP NULL DEFAULT NULL;
ALTER TABLE `proyecto_integrador_db`.`users_roles` ADD COLUMN `updated_at` TIMESTAMP NULL DEFAULT NULL;
ALTER TABLE `proyecto_integrador_db`.`users_roles` ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL;




insert into roles (id, name, description) values (1, 'Administrador', 'acceso a todos los modulos');
insert into roles (id, name, description) values (2, 'Gerente', 'acceso a todos los modulos');
insert into roles (id, name, description) values (3, 'Limpieza', 'acceso solo al modulo usuarios');
insert into roles (id, name, description) values (4, 'Proveedor', 'acceso solo al modulo de pedidos');
insert into roles (id, name, description) values (5, 'secretaria', 'acceso al modulo de ventas, pedidos y productos');
insert into roles (id, name, description) values (6, 'cliente', 'acceso solo al modulo de compras');

/*poblacion de la tabla usuarios */

insert into users (id, first_name, last_name, email, password) values (1, 'Maria', 'Laje', 'mariaLaje@mjr.com', '123');
insert into users (id, first_name, last_name, email, password) values (2, 'Juan', 'Pablo', 'juanPablo@mjr.com', '456');
insert into users (id, first_name, last_name, email, password) values (3, 'Rodrigo', 'Bernad', 'rodrigoBernad@mjr.com', '789');
insert into users (id, first_name, last_name, email, password) values (4, 'saida', 'Subelza', 'dthurner3@paginegialle.it', '******');
insert into users (id, first_name, last_name, email, password) values (5, 'Sid', 'Woolis', 'swoolis4@nasa.gov', 'uu3WGJ');
insert into users (id, first_name, last_name, email, password) values (6, 'Jena', 'Layfield', 'jlayfield5@phpbb.com', 'FqkVuUdlrXI');
insert into users (id, first_name, last_name, email, password) values (7, 'Stafford', 'O''Dare', 'sodare6@usnews.com', '85qWjj');
insert into users (id, first_name, last_name, email, password) values (8, 'Justis', 'Culver', 'jculver7@meetup.com', 'tlLWm9VK');
insert into users (id, first_name, last_name, email, password) values (9, 'Ward', 'Smalls', 'wsmalls8@dell.com', 'vHbfpF6bAOw');
insert into users (id, first_name, last_name, email, password) values (10, 'Dulcinea', 'Loveridge', 'dloveridge9@slashdot.org', 'HlaGrkDiroUp');
insert into users (id, first_name, last_name, email, password) values (11, 'Briano', 'Howcroft', 'bhowcrofta@usda.gov', 'B15Q8KI6xJ');
insert into users (id, first_name, last_name, email, password) values (12, 'Wilburt', 'Cloy', 'wcloyb@foxnews.com', 'peD972');
insert into users (id, first_name, last_name, email, password) values (13, 'Manny', 'Raspison', 'mraspisonc@nbcnews.com', 'X8z0Ay');
insert into users (id, first_name, last_name, email, password) values (14, 'Padget', 'Ausiello', 'pausiellod@ucoz.ru', '0dK4E2Qyu3Ht');
insert into users (id, first_name, last_name, email, password) values (15, 'Jeni', 'Whicher', 'jwhichere@technorati.com', 'qGBjCsrV');
insert into users (id, first_name, last_name, email, password) values (16, 'Carly', 'Blade', 'cbladef@flickr.com', 'YQ8yBy5X');
insert into users (id, first_name, last_name, email, password) values (17, 'Lannie', 'Spoors', 'lspoorsg@photobucket.com', 'uJomrYzO2QYE');
insert into users (id, first_name, last_name, email, password) values (18, 'Melisent', 'Sloy', 'msloyh@slashdot.org', 'SNTt2ZmViD9');
insert into users (id, first_name, last_name, email, password) values (19, 'Rose', 'Lefever', 'rlefeveri@state.gov', 'DEw8nLaiWj');
insert into users (id, first_name, last_name, email, password) values (20, 'Clarke', 'Eddisford', 'ceddisfordj@msu.edu', '2er9S7YRfoV');

/*poblacion de la tabla users_roles*/
insert into users_roles (id, user_id, role_id) values (1,1,1);
insert into users_roles (id, user_id, role_id) values (2,2,2);
insert into users_roles (id, user_id, role_id) values (3,3,1);
insert into users_roles (id, user_id, role_id) values (4,4,2);

ALTER TABLE `proyecto_integrador_db`.`cart` 
ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL AFTER `user_id`;

ALTER TABLE `proyecto_integrador_db`.`extras` 
ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL AFTER `active`;

ALTER TABLE `proyecto_integrador_db`.`items` 
ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL AFTER `extras_id`;

ALTER TABLE `proyecto_integrador_db`.`order_status` 
ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL AFTER `description`;

ALTER TABLE `proyecto_integrador_db`.`orders` 
ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL AFTER `quantity`;

ALTER TABLE `proyecto_integrador_db`.`payment_methods` 
ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL AFTER `description`;

ALTER TABLE `proyecto_integrador_db`.`payment_status` 
ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL AFTER `description`;

ALTER TABLE `proyecto_integrador_db`.`payments` 
ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL AFTER `payment_status_id`;

ALTER TABLE `proyecto_integrador_db`.`products` 
ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL AFTER `stock`;

ALTER TABLE `proyecto_integrador_db`.`profiles` 
ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL AFTER `description`;



ALTER TABLE `proyecto_integrador_db`.`roles_profiles` 
ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL AFTER `profile_id`;

ALTER TABLE `proyecto_integrador_db`.`shipping` 
ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL AFTER `shipping_status_id`;

ALTER TABLE `proyecto_integrador_db`.`shipping_status` 
ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL AFTER `description`;

UPDATE `proyecto_integrador_db`.`products` SET `description` = 'El té blanco es antioxidante, mejora tu sistema inmunitario y frena el envejecimiento celular. En cuanto a su poder vitamínico, el té blanco tiene un gran aporte de vitamina C, que también refuerza el sistema inmunitario y te protege de resfriados y procesos víricos. Otro nutriente que forma parte de la composición del té blanco es la vitamina E, que está ligada a la mejora de los trastornos oculares, las funciones mentales y la salud cardiovascular.', `instructions` = 'Tiempo de infusión de 5 minutos, calentar el agua preferentemente a 75 grados. Ideal para la tarde.' WHERE (`id` = '6');
UPDATE `proyecto_integrador_db`.`products` SET `description` = 'Una de las propiedades más destacadas del té negro es que contribuye a disminuir el nivel de colesterol en sangre. También, ayuda a controlar la presión sanguínea y es ideal para consumirse antes de las comidas, ya que prepara el aparato digestivo para trabajar correctamente.', `instructions` = 'Tiempo de infusión de 4 minutos. Calentar el agua preferentemente a 95 grados. Ideal para la mañana.' WHERE (`id` = '1');
UPDATE `proyecto_integrador_db`.`products` SET `description` = 'El té rojo, también conocido como Pu Erh, ejerce una acción diurética que favorece la eliminación de toxinas y evita la retención de líquidos. Es perfecto para ayudarnos en el proceso de la digestión. Además, esta estimulación también acelera la metabolización de los alimentos. Además, era muy conocido antiguamente como remedio natural para reducir la grasa de la sangre.', `instructions` = 'Tiempo de infusión de 4 minutos. Calentar el agua preferentemente a 85 grados. Ideal para la tarde.' WHERE (`id` = '2');
UPDATE `proyecto_integrador_db`.`products` SET `description` = 'El té verde posee un mayor poder antioxidantes, por eso ayuda a prevenir el envejecimiento. Es rico en polifenoles que tienen efectos como la reducción de la inflamación y protegen contra las enfermedades cardiovasculares y sus factores de riesgo, incluida la hipertensión arterial. Incrementa la formación de hueso. Además, con una alta concentración de vitamina C, el té verde fortalece al sistema inmunológico contra resfríos, gripes y otras infecciones.', `instructions` = 'Tiempo de infusión de 2 minutos, calentar el agua preferentemente a 85 grados. Ideal para el dia y la noche' WHERE (`id` = '3');
UPDATE `proyecto_integrador_db`.`products` SET `description` = 'El té azul ayuda a fortalecer el sistema inmunológico. contribuye a reducir el colesterol, la presión arterial y el nivel de azúcar en la sangre. Por si fuera poco, se sabe que protege al hígado, mejora las defensas y contribuye a quemar grasas. También se lo utiliza para luchar contra el estrés, y su poder para fortalecer los huesos o limitar los efectos de la diabetes.', `instructions` = 'Tiempo de infusión de 7 minutos, calentar el agua preferentemente a 90 grados. Ideal para la mañana o la tarde' WHERE (`id` = '4');
UPDATE `proyecto_integrador_db`.`products` SET `description` = 'Las principales propiedades de esta hierba son antiinflamatorias, antialérgicas, antibacterianas y sedantes. Además, posee buenas ventajas digestivas y es muy buena para tratar afecciones respiratorias como ser el asma, el resfrío y la fiebre. También, a aquellas personas que no pueden dormir se les aconseja que beban una infusión de manzanilla para conseguir sueños más profundos.', `instructions` = 'Tiempo de infusión de 2 minutos, calentar el agua preferentemente a 85 grados. Ideal para antes de irse a dormir' WHERE (`id` = '5');
