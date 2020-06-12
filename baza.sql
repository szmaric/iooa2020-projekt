-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u8
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 12, 2020 at 06:02 PM
-- Server version: 5.5.62-0+deb8u1
-- PHP Version: 5.6.40-0+deb8u8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `szmaric`
--

-- --------------------------------------------------------

--
-- Table structure for table `Admin`
--

CREATE TABLE IF NOT EXISTS `Admin` (
`sifra_admina` int(5) NOT NULL,
  `username` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Admin`
--

INSERT INTO `Admin` (`sifra_admina`, `username`, `password`, `email`) VALUES
(30, 'sanja', 'sanja', 'szmaric@veleri.hr'),
(34, 'test', 'test', 'test@email.com'),
(35, 'test', '1', 'email@email');

-- --------------------------------------------------------

--
-- Table structure for table `Rezervacija`
--

CREATE TABLE IF NOT EXISTS `Rezervacija` (
`sifra_rezervacije` int(5) NOT NULL,
  `ime` varchar(50) NOT NULL,
  `prezime` varchar(50) NOT NULL,
  `ime_slavljenika` varchar(50) NOT NULL,
  `br_uzvanika` int(3) NOT NULL,
  `god_slavljenika` int(2) NOT NULL,
  `kontakt` varchar(15) NOT NULL,
  `email` varchar(35) NOT NULL,
  `napomena` varchar(300) DEFAULT NULL,
  `datum` date NOT NULL,
  `vrijeme` time NOT NULL,
  `status_rezervacije` varchar(20) NOT NULL,
  `sifra_admina` int(5) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Rezervacija`
--

INSERT INTO `Rezervacija` (`sifra_rezervacije`, `ime`, `prezime`, `ime_slavljenika`, `br_uzvanika`, `god_slavljenika`, `kontakt`, `email`, `napomena`, `datum`, `vrijeme`, `status_rezervacije`, `sifra_admina`) VALUES
(3, 'Sanja', 'žmarić', 'test', 10, 10, '091 576 0337', 'szmaric@veleri.hr', '', '2020-06-05', '14:10:00', 'otkazano', NULL),
(6, 'Sanja', 'žmarić', 'test', 10, 10, '091 191 1991', 'szmaric@veleri.hr', '', '2020-06-21', '18:14:00', '', NULL),
(7, 'Sanja', 'test', 'test', 10, 10, '091 191 1991', 'szmaric@veleri.hr', '', '2020-06-12', '17:32:00', '', NULL),
(10, 'Sanja', 'žmarić', 'test', 10, 10, '091 191 1991', 'szmaric@veleri.hr', '', '2020-06-12', '18:00:00', 'otkazano', NULL),
(12, 'sanja', 'SANJA', 'sanja', 9, 6, '02222222', 'sanja@sanja.com', '', '2020-06-28', '19:00:00', '', NULL),
(13, 'ana', 'anic', 'marko', 10, 8, '091000000', 'szmaric@veleri.hr', '', '2020-07-01', '19:00:00', 'otkazano', NULL),
(14, 'test', 'žmarić', 'test', 10, 10, '091 576 0337', 'szmaric@veleri.hr', '', '2020-07-01', '19:00:00', 'otkazano', NULL),
(19, 'Sanja', 'test', 'test', 10, 8, '091 191 1991', 'szmaric@veleri.hr', '', '2020-06-05', '07:00:00', '', NULL),
(23, 'Sanja', 'test', 'test', 7, 5, '091000000', 'szmaric@veleri.hr', '', '2020-06-17', '00:56:00', '', NULL),
(24, 'Sanja', 'test', 'test', 10, 8, '091 576 0337', 'sanja@sanja.com', '', '2020-07-01', '19:00:00', '', NULL),
(25, 'petar', 'petar', 'petar', 6, 6, '091000000', 'petar@petar.com', '', '2020-07-07', '19:30:00', '', NULL),
(26, 'Sanja', 'test', 'test', 7, 5, '091 191 1991', 'szmaric@veleri.hr', '', '2020-07-01', '19:21:00', '', NULL),
(30, 'ana', 'lana', 'kana', 11, 6, '091000000', 'szmaric@veleri.hr', '', '2020-06-12', '02:00:00', 'otkazano', NULL),
(31, 'sanja', 'anic', 'marko', 9, 10, '091000000', 'szmaric@veleri.hr', '', '2020-06-12', '04:00:00', 'otkazano', NULL),
(32, 'test', 'anic', 'test', 9, 10, '091 576 0337', 'szmaric@veleri.hr', '', '2020-06-27', '17:48:00', '', NULL),
(33, 'petar', 'anic', 'petar', 7, 5, '091000000', 'szmaric@veleri.hr', '', '2020-06-28', '21:45:00', '', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admin`
--
ALTER TABLE `Admin`
 ADD PRIMARY KEY (`sifra_admina`), ADD KEY `sifra_admina` (`sifra_admina`);

--
-- Indexes for table `Rezervacija`
--
ALTER TABLE `Rezervacija`
 ADD PRIMARY KEY (`sifra_rezervacije`), ADD KEY `FK_sifra_admina` (`sifra_admina`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Admin`
--
ALTER TABLE `Admin`
MODIFY `sifra_admina` int(5) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT for table `Rezervacija`
--
ALTER TABLE `Rezervacija`
MODIFY `sifra_rezervacije` int(5) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=34;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Rezervacija`
--
ALTER TABLE `Rezervacija`
ADD CONSTRAINT `FK_sifra_admina` FOREIGN KEY (`sifra_admina`) REFERENCES `Admin` (`sifra_admina`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
