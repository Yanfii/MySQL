-- -------------------------------------------------------------
-- TablePlus 2.7(246)
--
-- https://tableplus.com/
--
-- Database: perfect_party2
-- Generation Time: 2019-07-25 13:04:13.1650
-- -------------------------------------------------------------


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
  `item_id` int(11) NOT NULL,
  `decor_type` int(11) DEFAULT NULL,
  `transport_details` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  CONSTRAINT `decor_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `vendor_item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Entertainment` (
  `item_id` int(11) NOT NULL,
  `entertainment_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  CONSTRAINT `entertainment_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `vendor_item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Event` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_date` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`event_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `client` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Menu_Item` (
  `item_id` int(11) NOT NULL,
  `dietary_restriction` int(11) DEFAULT NULL,
  `food_care_instruction` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  CONSTRAINT `menu_item_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `vendor_item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Supplier` (
  `supplier_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `contact_info` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Transacted_Items` (
  `transaction_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  PRIMARY KEY (`transaction_id`,`item_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `transacted_items_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`transaction_id`) ON DELETE CASCADE,
  CONSTRAINT `transacted_items_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `vendor_item` (`item_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Transaction` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_date` date NOT NULL,
  `card_num` int(11) NOT NULL,
  `event_id` int(11) DEFAULT NULL,
  `units_purchased` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`transaction_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3250 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Vendor_Item` (
  `item_id` int(11) NOT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `name_description` varchar(255) NOT NULL,
  `cost_per_unit` decimal(9,2) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `vendor_item_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Billing_Info` (`user_id`, `first_name`, `last_name`, `card_num`, `card_type`, `country`, `street_address`, `phone_number`) VALUES ('1', 'Alan', 'Li', '223040', 'Visa', 'Canada', '10 Ketchup Street', '(647)-588-0239'),
('2', 'Billy', 'Bob', '23290409', 'Master Card', 'USA ', '31 Mustard Road', '(423)-239-0234');

INSERT INTO `Client` (`user_id`, `first_name`, `last_name`, `phone_number`) VALUES ('1', 'Alan', 'Li', '(647)-438-1239'),
('2', 'Patrick', 'Zhang', '(329)-466-2934'),
('3', 'Griffin', 'Keglevich', '(416)-845-2999'),
('4', 'Eric', 'Liu', '+2 (529)-933-2019'),
('5', 'Bojack', 'Horseman', '(399)-139-1390'),
('6', 'Billy', 'Bob', '(499)-329-3920');

INSERT INTO `Decor` (`item_id`, `decor_type`, `transport_details`) VALUES ('0', '1', 'fragile, no planes'),
('3', '2', NULL);

INSERT INTO `Entertainment` (`item_id`, `entertainment_type`) VALUES ('4', '1');

INSERT INTO `Event` (`event_id`, `event_date`, `location`, `user_id`, `title`) VALUES ('1', '2019-07-19', 'Waterloo', '1', 'DB Party'),
('2', '2019-07-22', 'Toronto', '1', 'DB AfterParty');

INSERT INTO `Menu_Item` (`item_id`, `dietary_restriction`, `food_care_instruction`) VALUES ('1', '1', 'do not keep overnight'),
('2', '1', 'no freezing');

INSERT INTO `Supplier` (`supplier_id`, `name`, `contact_info`, `type`) VALUES ('0', 'Horse Industries', 'info@horse.com', '0'),
('1', 'Tim Hortons', 'info@tims.com', '1'),
('2', 'Lego', 'info@lego.com', '3');

INSERT INTO `Transacted_Items` (`transaction_id`, `item_id`) VALUES ('1', '0'),
('2', '1'),
('3', '2'),
('4', '4'),
('5', '1'),
('6', '3');

INSERT INTO `Transaction` (`transaction_id`, `transaction_date`, `card_num`, `event_id`, `units_purchased`) VALUES ('1', '2019-07-20', '234902', '2', '1'),
('2', '2019-07-20', '234902', '2', '20'),
('3', '2019-07-20', '234902', '2', '5'),
('4', '2019-07-19', '234902', '1', '4'),
('5', '2019-07-19', '234902', '1', '1'),
('6', '2019-07-19', '234902', '1', '1');

INSERT INTO `Vendor_Item` (`item_id`, `supplier_id`, `name_description`, `cost_per_unit`, `rating`) VALUES ('0', '0', 'Wood Horse', '50.00', '3'),
('1', '1', 'Timbits ', '1.00', '5'),
('2', '1', 'Donuts', '2.00', '4'),
('3', '2', 'Bricks', '3.00', '4'),
('4', '0', 'Dancing Horse', '200.00', '4');




/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;