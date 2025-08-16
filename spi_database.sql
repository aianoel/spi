-- SPI (Student Profile Information) Database
-- Ready to upload to Hostinger MySQL
-- Generated for MySQL 5.7+

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `full_name`, `role`, `created_at`) VALUES
(1, 'admin', '$2b$10$ApDcLlayp0Vw2imr5SPat.QtvXC4BMpTKuxKKtqVuVknMsJh85N/i', 'System Administrator', 'admin', '2025-08-10 14:50:26');

-- --------------------------------------------------------

--
-- Table structure for table `student_inventory`
--

CREATE TABLE `student_inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department` varchar(100) DEFAULT NULL,
  `year` varchar(50) DEFAULT NULL,
  `level` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `photo_path` varchar(255) DEFAULT NULL,
  `nickname` varchar(100) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `birth_place` varchar(150) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `religion` varchar(100) DEFAULT NULL,
  `nationality` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact_number` varchar(50) DEFAULT NULL,
  `father_name` varchar(150) DEFAULT NULL,
  `father_age` int(11) DEFAULT NULL,
  `father_education` varchar(150) DEFAULT NULL,
  `father_occupation` varchar(150) DEFAULT NULL,
  `father_employer` varchar(150) DEFAULT NULL,
  `father_work_place` varchar(150) DEFAULT NULL,
  `father_citizenship` varchar(100) DEFAULT NULL,
  `father_contact` varchar(100) DEFAULT NULL,
  `mother_name` varchar(150) DEFAULT NULL,
  `mother_age` int(11) DEFAULT NULL,
  `mother_education` varchar(150) DEFAULT NULL,
  `mother_occupation` varchar(150) DEFAULT NULL,
  `mother_employer` varchar(150) DEFAULT NULL,
  `mother_work_place` varchar(150) DEFAULT NULL,
  `mother_citizenship` varchar(100) DEFAULT NULL,
  `mother_contact` varchar(100) DEFAULT NULL,
  `guardian_name` varchar(150) DEFAULT NULL,
  `guardian_age` int(11) DEFAULT NULL,
  `guardian_education` varchar(150) DEFAULT NULL,
  `guardian_occupation` varchar(150) DEFAULT NULL,
  `guardian_employer` varchar(150) DEFAULT NULL,
  `guardian_work_place` varchar(150) DEFAULT NULL,
  `guardian_citizenship` varchar(100) DEFAULT NULL,
  `guardian_contact` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_inventory`
--

INSERT INTO `student_inventory` (`id`, `department`, `year`, `level`, `last_name`, `first_name`, `middle_name`, `photo_path`, `nickname`, `birth_date`, `birth_place`, `gender`, `religion`, `nationality`, `address`, `contact_number`, `father_name`, `father_age`, `father_education`, `father_occupation`, `father_employer`, `father_work_place`, `father_citizenship`, `father_contact`, `mother_name`, `mother_age`, `mother_education`, `mother_occupation`, `mother_employer`, `mother_work_place`, `mother_citizenship`, `mother_contact`, `guardian_name`, `guardian_age`, `guardian_education`, `guardian_occupation`, `guardian_employer`, `guardian_work_place`, `guardian_citizenship`, `guardian_contact`) VALUES
(4, 'Elementary', 'Grade 1', 'San Antonio', 'Baron', 'Norman', 'Morallos', '6770c9791558f820.png', 'Mike', '1998-04-21', 'Kawit Cavite', 'Male', 'Catholic', 'Filipino', 'San Naba Patungo Brgy 77 Cavite', '09090912123', 'Jack Sparrow', 78, NULL, NULL, NULL, NULL, NULL, NULL, 'Neneng B', 65, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'Senior High School', 'Grade 11', 'Saint Lucia, STEM', 'Javier', 'Allen', 'Arviola', '4c569d00eba107ba.jpg', 'Allen', '2008-11-04', 'Naic, Cavite', 'Male', 'Catholic', 'Pilipino', 'Brgy. kanluran Pilaez St. Naic, Cavite', '09271327038', 'Ritchie N. Javier', 47, NULL, NULL, NULL, NULL, NULL, NULL, 'Teresita Arviola', 46, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'Senior High School', 'Grade 11', 'St. Lucia, STEM', 'Misena', 'Uno Miguel', 'Buendia', '7c56d5472d294518.jpg', 'Uno', '2009-05-31', 'Naic, Cavite', 'Male', 'Catholic', 'Filipino', 'Precious Ville Subdivision, Blk 4 Lot 18-20, Naic, Cavite.', '09757125817', 'Jefferson V. Misena', 40, NULL, NULL, NULL, NULL, NULL, NULL, 'Happy B. Misena', 37, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'Senior High School', 'Grade 11', 'Saint Lucia', 'Credito', 'Clarisse', 'Maraan', '923c42cbc8e5a74f.jpg', 'Risse', '2009-06-11', 'Trece martires', 'Female', 'Catholic', 'Filipino', '141 sapa', '09156022429', 'Sonny Credito', 51, NULL, NULL, NULL, NULL, NULL, NULL, 'Hersey', 38, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 'Senior High School', 'Grade 12', 'Section Lady of Guadalupe, STEM Strand', 'Rosendo', 'Izy Neah', 'Gruta', 'bc61e6fe6a06ebfe.jpeg', 'Izy', '2008-05-12', 'Mandaluyong', 'Female', 'Catholic', 'Filipino', 'Phase 2, Block 17, Lot 25, Wellington Residences, Tanza, Cavite', '09277763960', 'Iverson Rosendo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Sharon Gruta', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 'Senior High School', '12', 'Lady of Guadalupe, STEM Strand', 'Quemuel', 'Tyrese Gibson', 'Mendoza', '372889d2f722984b.jfif', NULL, '2008-02-27', 'San Lorenzo Hospital', 'Male', 'Catholicism', 'Filipino', '0264 Ibayo Silangan, Naic, Cavite', '0998-351-4746', 'Lawrence', 49, NULL, NULL, NULL, NULL, NULL, NULL, 'Celeste M. Quemuel', 48, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(20, 'Elementary', 'Grade 2', 'St felicity', 'Carta', 'Annieka Liza', 'Roxas', '4d3c2316a3387d4d.jpeg', 'Kitty', '2017-11-14', 'Naic cavite', 'Female', 'Catholic', 'Filipino', 'Bayside st. Bancaan naic cavite', '09056235706', 'Emmanuel M. Carta III', 33, NULL, NULL, NULL, NULL, NULL, NULL, 'Katrina May R. Carta', 29, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(21, 'Elementary', 'Grade 2', 'St. Felicity', 'Bachar', 'Kourtney Shanelle', 'Grepo', 'd238bb1ae39d9f7a.jpeg', 'Shanelle', '2018-08-23', 'Naic, Cavite', 'Female', 'Roman Catholic', 'Filipino', 'Northdale Villas Blk 41 Lot 13 Timalan Balsahan, Naic, Cavite', '09453428492', 'Jimel Bachar', 30, NULL, NULL, NULL, NULL, NULL, NULL, 'Maryjoe Bachar', 26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(23, 'Elementary', 'Grade 6', 'St. Mary', 'Abad', 'Isabella Samantha', 'Villa', '0b61f7ecb7de00c5.jpg', 'Bella', '2014-05-19', 'Naic cavite', 'Female', 'Catholic', 'Filipino', '009 Brgy. Calubcob Naic Cavite', '09555638655', 'Earl Bryan Abad', 40, NULL, NULL, NULL, NULL, NULL, NULL, 'Arabelle Abad', 36, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(31, 'Elementary', 'Grade 2', 'St. Felicity', 'Velasco', 'Javen', 'Tolentino', '1105629ea099bbed.jpg', 'Javen', '2017-12-05', 'Texas, USA', 'Male', '(Born Again) Christian', 'US/Filipino', '21 J.P Rizal St. Kanluran Naic Cavite 4110', '0945-560-3856', 'Jerome Piol Velasco', 52, NULL, NULL, NULL, NULL, NULL, NULL, 'Honeylet Tolentino Velasco', 45, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student_children`
--

CREATE TABLE `student_children` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `child_name` varchar(150) DEFAULT NULL,
  `child_age` int(11) DEFAULT NULL,
  `child_status` varchar(50) DEFAULT NULL,
  `child_school` varchar(150) DEFAULT NULL,
  `child_occupation` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `student_children_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_inventory` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_children`
--

INSERT INTO `student_children` (`id`, `student_id`, `child_name`, `child_age`, `child_status`, `child_school`, `child_occupation`) VALUES
(2, 4, 'Mike Baron', 25, 'Single', 'N', 'N/A'),
(3, 6, 'Maria Zabkiel A. Javier', 9, 'Single', 'Immaculate Conception School of Naic Inc.', 'Student'),
(4, 8, 'Yza Marie B. Misena', 9, 'Single', 'Naic Elem. School', 'Student'),
(5, 8, 'Samantha Marie B. Misena', 8, 'Single', 'Naic Elem. School', 'Student'),
(6, 8, 'Sophia Marie B. Misena', 8, 'Single', 'Naic Elem. School', 'Student'),
(7, 11, 'Herson Credito', 13, 'Single', 'Centro de naic', 'None'),
(8, 11, 'Sonny Credito', 51, 'Married', 'N/A', 'Tricycle driver'),
(9, 11, 'Anicia Credito', 70, 'Married', 'N/A', 'None'),
(19, 17, 'Izy Neah Rosendo', 17, 'Single', 'Immaculate Conception School of Naic Inc.', 'Student'),
(20, 17, 'Izen Rosendo', 9, 'Single', 'ABC School', 'Student'),
(21, 19, 'Corallie Daphne M. Quemuel', 22, 'Single', 'Philippine College of Health Sciences', 'Intern'),
(22, 20, 'Emmanuel R. Carta VII', 6, 'Single', 'ICS', 'N/A'),
(23, 21, 'Atasha Avonnie', 4, 'Single', 'Sacred of Heart Montessori School', 'N/A'),
(30, 31, 'Janella Velasco', 10, 'Single', 'ICSNI', 'Student'),
(31, 31, 'Julianne Velasco', 17, 'Single', 'ISCNI', 'Student'),
(32, 31, 'Levy Tolentino', 78, 'Married', 'N/A', 'None'),
(33, 31, 'Luz Tolentino', 81, 'Married', 'N/A', 'None');

-- --------------------------------------------------------

-- Set AUTO_INCREMENT values

ALTER TABLE `admins` AUTO_INCREMENT = 2;
ALTER TABLE `student_inventory` AUTO_INCREMENT = 32;
ALTER TABLE `student_children` AUTO_INCREMENT = 34;

COMMIT;