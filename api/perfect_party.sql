/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `Billing_Info` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `card_num` int(11) NOT NULL,
  `card_type` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `street_address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`first_name`,`last_name`,`card_num`),
  CONSTRAINT `billing_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `client` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Client` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Decor` (
  `name_description` varchar(255) NOT NULL,
  `decor_type` int(11) DEFAULT NULL,
  `transport_details` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name_description`),
  CONSTRAINT `decor_ibfk_1` FOREIGN KEY (`name_description`) REFERENCES `vendor_item` (`name_description`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Entertainment` (
  `name_description` varchar(255) NOT NULL,
  `entertainment_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`name_description`),
  CONSTRAINT `entertainment_ibfk_1` FOREIGN KEY (`name_description`) REFERENCES `vendor_item` (`name_description`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Event` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`event_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `client` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Menu_Item` (
  `name_description` varchar(255) NOT NULL,
  `dietary_restriction` int(11) DEFAULT NULL,
  `food_care_instruction` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name_description`),
  CONSTRAINT `menu_item_ibfk_1` FOREIGN KEY (`name_description`) REFERENCES `vendor_item` (`name_description`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Supplier` (
  `name` varchar(255) NOT NULL,
  `contact_info` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Transaction` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `card_num` int(11) NOT NULL,
  `event_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3250 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Vendor_Item` (
  `name_description` varchar(255) NOT NULL,
  `cost_per_unit` decimal(9,2) DEFAULT NULL,
  `supplier_name` varchar(255) DEFAULT NULL,
  `units` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `transaction_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`name_description`),
  KEY `supplier_name` (`supplier_name`),
  KEY `transaction_id` (`transaction_id`),
  CONSTRAINT `vendor_item_ibfk_1` FOREIGN KEY (`supplier_name`) REFERENCES `supplier` (`name`),
  CONSTRAINT `vendor_item_ibfk_2` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Billing_Info` (`user_id`, `first_name`, `last_name`, `card_num`, `card_type`, `country`, `street_address`, `phone_number`) VALUES ('1', 'alan', 'li', '223040', 'visa', 'Canada', '10 Ketchup Street', '23424jr9'),
('2', 'billy', 'bob ', '23290409', 'master card', 'USA ', '31 Mustard Road', '190040404040');

INSERT INTO `Client` (`user_id`, `first_name`, `last_name`, `phone_number`) VALUES ('1', 'alan', 'li', '6475239013'),
('2', 'patrick', 'zhang', '4534923409'),
('3', 'griffin', 'k', 'abcdstring'),
('4', 'test', 'dummy', '+1 (529)-933-2019'),
('5', 'Bojana', 'B', '949-249-2309');

INSERT INTO `Decor` (`name_description`, `decor_type`, `transport_details`) VALUES ('decorative horse', '0', NULL);

INSERT INTO `Entertainment` (`name_description`, `entertainment_type`) VALUES ('entertaining horse', '1');

INSERT INTO `Event` (`event_id`, `date`, `location`, `user_id`, `title`) VALUES ('1', '2019-07-19', 'waterloo', '1', 'db party');

INSERT INTO `Menu_Item` (`name_description`, `dietary_restriction`, `food_care_instruction`) VALUES ('food horse', NULL, 'refrigerate at -50 fahrenheit');

INSERT INTO `Supplier` (`name`, `contact_info`, `type`) VALUES ('horse industries', 'info@horse.industries.com', '0');

INSERT INTO `Transaction` (`transaction_id`, `date`, `card_num`, `event_id`) VALUES ('999', '2019-07-19', '234902', '1'),
('1000', '2019-07-19', '234902', '1'),
('3249', '2019-07-19', '234902', '1');

INSERT INTO `Vendor_Item` (`name_description`, `cost_per_unit`, `supplier_name`, `units`, `rating`, `transaction_id`) VALUES ('decorative horse', '50.00', 'horse industries', '2', '4', '3249'),
('entertaining horse', '25.00', 'horse industries', '10', '3', '1000'),
('food horse', '0.55', 'horse industries', '50', '4', '999');




/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;