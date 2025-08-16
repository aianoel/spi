-- Setup script for Hostinger MySQL database
-- Run this in your Hostinger phpMyAdmin to create the tables and default admin

-- Create admins table
CREATE TABLE IF NOT EXISTS `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create student_inventory table
CREATE TABLE IF NOT EXISTS `student_inventory` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create student_children table
CREATE TABLE IF NOT EXISTS `student_children` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `child_name` varchar(150) DEFAULT NULL,
  `child_age` int(11) DEFAULT NULL,
  `child_status` varchar(50) DEFAULT NULL,
  `child_school` varchar(150) DEFAULT NULL,
  `child_occupation` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default admin user (username: admin, password: admin123)
INSERT INTO `admins` (`username`, `password`, `full_name`, `role`) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'System Administrator', 'admin');

-- Insert sample student data
INSERT INTO `student_inventory` (`id`, `department`, `year`, `level`, `last_name`, `first_name`, `middle_name`, `photo_path`, `nickname`, `birth_date`, `birth_place`, `gender`, `religion`, `nationality`, `address`, `contact_number`, `father_name`, `father_age`, `father_education`, `father_occupation`, `father_employer`, `father_work_place`, `father_citizenship`, `father_contact`, `mother_name`, `mother_age`, `mother_education`, `mother_occupation`, `mother_employer`, `mother_work_place`, `mother_citizenship`, `mother_contact`, `guardian_name`, `guardian_age`, `guardian_education`, `guardian_occupation`, `guardian_employer`, `guardian_work_place`, `guardian_citizenship`, `guardian_contact`) VALUES
(4, 'Elementary', 'Grade 1', 'San Antonio', 'Baron', 'Norman', 'Morallos', '6770c9791558f820.png', 'Mike', '1998-04-21', 'Kawit Cavite', 'Male', 'Catholic', 'Filipino', 'San Naba Patungo Brgy 77 Cavite', '09090912123', 'Jack Sparrow', 78, 'College Graduate', 'Engineer', 'ABC Company', 'Manila', 'Filipino', '09123456789', 'Neneng B', 65, 'High School Graduate', 'Housewife', 'N/A', 'N/A', 'Filipino', '09987654321', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'Senior High School', 'Grade 11', 'Saint Lucia, STEM', 'Javier', 'Allen', 'Arviola', '4c569d00eba107ba.jpg', 'Allen', '2008-11-04', 'Naic, Cavite', 'Male', 'Catholic', 'Pilipino', 'Brgy. kanluran Pilaez St. Naic, Cavite', '09271327038', 'Ritchie N. Javier', 47, 'College Graduate', 'Business Owner', 'Self-employed', 'Naic, Cavite', 'Filipino', '09123456789', 'Teresita Arviola', 46, 'College Graduate', 'Teacher', 'Department of Education', 'Naic Elementary School', 'Filipino', '09987654321', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'Senior High School', 'Grade 11', 'St. Lucia, STEM', 'Misena', 'Uno Miguel', 'Buendia', '7c56d5472d294518.jpg', 'Uno', '2009-05-31', 'Naic, Cavite', 'Male', 'Catholic', 'Filipino', 'Precious Ville Subdivision, Blk 4 Lot 18-20, Naic, Cavite.', '09757125817', 'Jefferson V. Misena', 40, 'College Graduate', 'OFW', 'Saudi Company', 'Saudi Arabia', 'Filipino', '09123456789', 'Happy B. Misena', 37, 'College Graduate', 'Nurse', 'Naic Hospital', 'Naic, Cavite', 'Filipino', '09987654321', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- Insert sample children data
INSERT INTO `student_children` (`id`, `student_id`, `child_name`, `child_age`, `child_status`, `child_school`, `child_occupation`) VALUES
(2, 4, 'Mike Baron', 25, 'Single', 'N/A', 'N/A'),
(3, 6, 'Maria Zabkiel A. Javier', 9, 'Single', 'Immaculate Conception School of Naic Inc.', 'Student'),
(4, 8, 'Yza Marie B. Misena', 9, 'Single', 'Naic Elem. School', 'Student'),
(5, 8, 'Samantha Marie B. Misena', 8, 'Single', 'Naic Elem. School', 'Student'),
(6, 8, 'Sophia Marie B. Misena', 8, 'Single', 'Naic Elem. School', 'Student');
