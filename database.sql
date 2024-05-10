-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: mysql
-- Thời gian đã tạo: Th5 10, 2024 lúc 04:25 AM
-- Phiên bản máy phục vụ: 8.0.28
-- Phiên bản PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `estateadvance`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `assignmentbuilding`
--

CREATE TABLE `assignmentbuilding` (
  `id` bigint NOT NULL,
  `staffid` bigint NOT NULL,
  `buildingid` bigint NOT NULL,
  `createddate` datetime DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `createdby` varchar(255) DEFAULT NULL,
  `modifiedby` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Đang đổ dữ liệu cho bảng `assignmentbuilding`
--

INSERT INTO `assignmentbuilding` (`id`, `staffid`, `buildingid`, `createddate`, `modifieddate`, `createdby`, `modifiedby`) VALUES
(1, 2, 1, NULL, NULL, NULL, NULL),
(2, 2, 3, NULL, NULL, NULL, NULL),
(3, 3, 1, NULL, NULL, NULL, NULL),
(4, 3, 4, NULL, NULL, NULL, NULL),
(5, 4, 2, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `assignmentcustomer`
--

CREATE TABLE `assignmentcustomer` (
  `id` bigint NOT NULL,
  `staffid` bigint NOT NULL,
  `customerid` bigint NOT NULL,
  `createddate` datetime DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `createdby` varchar(255) DEFAULT NULL,
  `modifiedby` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `building`
--

CREATE TABLE `building` (
  `id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `street` varchar(255) DEFAULT NULL,
  `ward` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `structure` varchar(255) DEFAULT NULL,
  `numberofbasement` int DEFAULT NULL,
  `floorarea` int DEFAULT NULL,
  `direction` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `rentprice` int DEFAULT NULL,
  `rentpricedescription` text,
  `servicefee` varchar(255) DEFAULT NULL,
  `carfee` varchar(255) DEFAULT NULL,
  `motofee` varchar(255) DEFAULT NULL,
  `overtimefee` varchar(255) DEFAULT NULL,
  `waterfee` varchar(255) DEFAULT NULL,
  `electricityfee` varchar(255) DEFAULT NULL,
  `deposit` varchar(255) DEFAULT NULL,
  `payment` varchar(255) DEFAULT NULL,
  `renttime` varchar(255) DEFAULT NULL,
  `decorationtime` varchar(255) DEFAULT NULL,
  `brokeragetee` decimal(13,2) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `linkofbuilding` varchar(255) DEFAULT NULL,
  `map` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `createddate` datetime DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `createdby` varchar(255) DEFAULT NULL,
  `modifiedby` varchar(255) DEFAULT NULL,
  `managername` varchar(255) DEFAULT NULL,
  `managerphone` varchar(255) DEFAULT NULL,
  `status` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Đang đổ dữ liệu cho bảng `building`
--

INSERT INTO `building` (`id`, `name`, `street`, `ward`, `district`, `structure`, `numberofbasement`, `floorarea`, `direction`, `level`, `rentprice`, `rentpricedescription`, `servicefee`, `carfee`, `motofee`, `overtimefee`, `waterfee`, `electricityfee`, `deposit`, `payment`, `renttime`, `decorationtime`, `brokeragetee`, `type`, `note`, `linkofbuilding`, `map`, `avatar`, `createddate`, `modifieddate`, `createdby`, `modifiedby`, `managername`, `managerphone`, `status`) VALUES
(1, 'Nam Giao Building Tower', '59 phan xích long', 'Phường 2', 'QUAN_1', NULL, 2, 500, NULL, NULL, 15, '15 triệu/m2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TANG_TRET,NGUYEN_CAN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Anh Nam-Chị Linh', '0915354727', 1),
(2, 'ACM Tower', '96 cao thắng', 'Phường 4', 'QUAN_2', NULL, 2, 650, NULL, NULL, 18, '18 triệu/m2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'NGUYEN_CAN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Chú Thuận', '0173546263', 1),
(3, 'Alpha 2 Building Tower', '153 nguyễn đình chiểu', 'Phường 6', 'QUAN_1', NULL, 1, 200, NULL, NULL, 20, '20 triệu/m2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'NOI_THAT', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cô Lý', '0555532578', 1),
(4, 'IDD 1 Building', '111 Lý Chính Thắng', 'Phường 7', 'QUAN_4', NULL, 1, 200, NULL, NULL, 12, '12 triệu/m2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TANG_TRET,NGUYEN_CAN,NOI_THAT', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Anh Long', '017345253', 1),
(6, 'test', NULL, NULL, NULL, NULL, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Anh Long', '017345253', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `buildingimage`
--

CREATE TABLE `buildingimage` (
  `id` bigint NOT NULL,
  `building_id` bigint NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createddate` datetime DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `createdby` varchar(255) DEFAULT NULL,
  `modifiedby` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customer`
--

CREATE TABLE `customer` (
  `id` bigint NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createddate` datetime DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `createdby` varchar(255) DEFAULT NULL,
  `modifiedby` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Đang đổ dữ liệu cho bảng `customer`
--

INSERT INTO `customer` (`id`, `fullname`, `phone`, `email`, `createddate`, `modifieddate`, `createdby`, `modifiedby`) VALUES
(3, 'CCC', '0589382745', 'ccc@gmail.com', '2024-05-09 16:07:48', '2024-05-09 16:07:48', 'anonymousUser', 'anonymousUser'),
(5, 'CCC', '05893826666', 'ddd@gmail.com', '2024-05-09 16:55:19', '2024-05-09 16:55:19', 'anonymousUser', 'anonymousUser'),
(6, 'Chí Kha', '1234554321', 'abc123@gmail.com', '2024-05-09 18:10:18', '2024-05-09 18:10:18', 'anonymousUser', 'anonymousUser'),
(7, 'Chí Kha', '1234554321', 'abc123@gmail.com', '2024-05-10 02:54:59', '2024-05-10 02:54:59', 'anonymousUser', 'anonymousUser'),
(8, 'Chí Kha 2', '1234567890', 'abc1233@gmail.com', '2024-05-10 02:57:36', '2024-05-10 02:57:36', 'anonymousUser', 'anonymousUser'),
(9, 'Chí Kha 3', '1234554324', 'abc14453@gmail.com', '2024-05-10 03:23:03', '2024-05-10 03:23:03', 'anonymousUser', 'anonymousUser');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rentarea`
--

CREATE TABLE `rentarea` (
  `id` bigint NOT NULL,
  `value` int DEFAULT NULL,
  `buildingid` bigint DEFAULT NULL,
  `createddate` datetime DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `createdby` varchar(255) DEFAULT NULL,
  `modifiedby` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Đang đổ dữ liệu cho bảng `rentarea`
--

INSERT INTO `rentarea` (`id`, `value`, `buildingid`, `createddate`, `modifieddate`, `createdby`, `modifiedby`) VALUES
(1, 100, 1, NULL, NULL, NULL, NULL),
(2, 200, 1, NULL, NULL, NULL, NULL),
(3, 200, 2, NULL, NULL, NULL, NULL),
(4, 300, 2, NULL, NULL, NULL, NULL),
(5, 400, 2, NULL, NULL, NULL, NULL),
(6, 300, 3, NULL, NULL, NULL, NULL),
(7, 400, 3, NULL, NULL, NULL, NULL),
(8, 500, 3, NULL, NULL, NULL, NULL),
(9, 100, 4, NULL, NULL, NULL, NULL),
(10, 400, 4, NULL, NULL, NULL, NULL),
(11, 250, 4, NULL, NULL, NULL, NULL),
(24, 700, 6, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role`
--

CREATE TABLE `role` (
  `id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `createddate` datetime DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `createdby` varchar(255) DEFAULT NULL,
  `modifiedby` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Đang đổ dữ liệu cho bảng `role`
--

INSERT INTO `role` (`id`, `name`, `code`, `createddate`, `modifieddate`, `createdby`, `modifiedby`) VALUES
(1, 'Quản lý', 'MANAGER', NULL, NULL, NULL, NULL),
(2, 'Quản trị hệ thống', 'ADMIN', NULL, NULL, NULL, NULL),
(3, 'Nhân viên', 'STAFF', NULL, NULL, NULL, NULL),
(4, 'KHÁCH HÀNG', 'CUSTOMER', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `transaction`
--

CREATE TABLE `transaction` (
  `id` bigint NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `customerid` bigint NOT NULL,
  `createddate` datetime DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `createdby` varchar(255) DEFAULT NULL,
  `modifiedby` varchar(255) DEFAULT NULL,
  `staffid` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` bigint NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `status` int NOT NULL,
  `createddate` datetime DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `createdby` varchar(255) DEFAULT NULL,
  `modifiedby` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `fullname`, `phone`, `email`, `status`, `createddate`, `modifieddate`, `createdby`, `modifiedby`) VALUES
(1, 'nguyenvana', '$2a$10$/RUbuT9KIqk6f8enaTQiLOXzhnUkiwEJRdtzdrMXXwU7dgnLKTCYG', 'nguyen van a', NULL, NULL, 1, NULL, NULL, NULL, NULL),
(2, 'nguyenvanb', '$2a$10$/RUbuT9KIqk6f8enaTQiLOXzhnUkiwEJRdtzdrMXXwU7dgnLKTCYG', 'nguyen van b', NULL, NULL, 1, NULL, NULL, NULL, NULL),
(3, 'nguyenvanc', '$2a$10$/RUbuT9KIqk6f8enaTQiLOXzhnUkiwEJRdtzdrMXXwU7dgnLKTCYG', 'nguyen van c', NULL, NULL, 1, NULL, NULL, NULL, NULL),
(4, 'nguyenvand', '$2a$10$/RUbuT9KIqk6f8enaTQiLOXzhnUkiwEJRdtzdrMXXwU7dgnLKTCYG', 'nguyen van d', NULL, NULL, 1, NULL, NULL, NULL, NULL),
(5, 'cus', '$2a$10$wqtM8HO6NZttShJZ0WqImOVZBoe/R35FYD4pbnckwUlmD5njkfkRq', 'Cus1', '012345', 'cus1@gmail.com', 1, '2024-03-16 16:10:03', '2024-03-16 16:10:35', 'anonymousUser', 'anonymousUser');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_role`
--

CREATE TABLE `user_role` (
  `id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `createddate` datetime DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `createdby` varchar(255) DEFAULT NULL,
  `modifiedby` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Đang đổ dữ liệu cho bảng `user_role`
--

INSERT INTO `user_role` (`id`, `role_id`, `user_id`, `createddate`, `modifieddate`, `createdby`, `modifiedby`) VALUES
(1, 1, 1, NULL, NULL, NULL, NULL),
(2, 3, 2, NULL, NULL, NULL, NULL),
(3, 3, 3, NULL, NULL, NULL, NULL),
(4, 3, 4, NULL, NULL, NULL, NULL),
(5, 4, 5, NULL, NULL, NULL, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `assignmentbuilding`
--
ALTER TABLE `assignmentbuilding`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_building` (`staffid`),
  ADD KEY `fk_building_user` (`buildingid`);

--
-- Chỉ mục cho bảng `assignmentcustomer`
--
ALTER TABLE `assignmentcustomer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_customer` (`staffid`),
  ADD KEY `fk_customer_user` (`customerid`);

--
-- Chỉ mục cho bảng `building`
--
ALTER TABLE `building`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `buildingimage`
--
ALTER TABLE `buildingimage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_building_image_building` (`building_id`);

--
-- Chỉ mục cho bảng `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `rentarea`
--
ALTER TABLE `rentarea`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rentarea_building` (`buildingid`);

--
-- Chỉ mục cho bảng `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_customer_transaction` (`customerid`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Chỉ mục cho bảng `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_role` (`user_id`),
  ADD KEY `fk_role_user` (`role_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `assignmentbuilding`
--
ALTER TABLE `assignmentbuilding`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `assignmentcustomer`
--
ALTER TABLE `assignmentcustomer`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `building`
--
ALTER TABLE `building`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `buildingimage`
--
ALTER TABLE `buildingimage`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `customer`
--
ALTER TABLE `customer`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `rentarea`
--
ALTER TABLE `rentarea`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `role`
--
ALTER TABLE `role`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `assignmentbuilding`
--
ALTER TABLE `assignmentbuilding`
  ADD CONSTRAINT `fk_building_user` FOREIGN KEY (`buildingid`) REFERENCES `building` (`id`),
  ADD CONSTRAINT `fk_user_building` FOREIGN KEY (`staffid`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `assignmentcustomer`
--
ALTER TABLE `assignmentcustomer`
  ADD CONSTRAINT `fk_customer_user` FOREIGN KEY (`customerid`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `fk_user_customer` FOREIGN KEY (`staffid`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `buildingimage`
--
ALTER TABLE `buildingimage`
  ADD CONSTRAINT `fk_building_image_building` FOREIGN KEY (`building_id`) REFERENCES `building` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `rentarea`
--
ALTER TABLE `rentarea`
  ADD CONSTRAINT `rentarea_building` FOREIGN KEY (`buildingid`) REFERENCES `building` (`id`);

--
-- Các ràng buộc cho bảng `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `fk_customer_transaction` FOREIGN KEY (`customerid`) REFERENCES `customer` (`id`);

--
-- Các ràng buộc cho bảng `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `fk_role_user` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `fk_user_role` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
