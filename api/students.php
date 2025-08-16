<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$segments = explode('/', trim($path, '/'));

switch ($method) {
    case 'GET':
        if (isset($segments[2]) && is_numeric($segments[2])) {
            // GET /api/students/{id}
            getStudent($segments[2]);
        } else {
            // GET /api/students
            getStudents();
        }
        break;
    
    case 'POST':
        // POST /api/students
        createStudent();
        break;
    
    case 'PUT':
        if (isset($segments[2]) && is_numeric($segments[2])) {
            // PUT /api/students/{id}
            updateStudent($segments[2]);
        }
        break;
    
    case 'DELETE':
        if (isset($segments[2]) && is_numeric($segments[2])) {
            // DELETE /api/students/{id}
            deleteStudent($segments[2]);
        }
        break;
    
    default:
        sendResponse(['error' => 'Method not allowed'], 405);
}

function getStudents() {
    global $pdo;
    
    $search = $_GET['search'] ?? '';
    $limit = (int)($_GET['limit'] ?? 10);
    $offset = (int)($_GET['offset'] ?? 0);
    
    $whereClause = '';
    $params = [];
    
    if ($search) {
        $whereClause = "WHERE CONCAT(first_name, ' ', last_name) LIKE ? OR department LIKE ? OR address LIKE ?";
        $searchTerm = "%$search%";
        $params = [$searchTerm, $searchTerm, $searchTerm];
    }
    
    // Get total count
    $countSql = "SELECT COUNT(*) as total FROM student_inventory $whereClause";
    $countStmt = $pdo->prepare($countSql);
    $countStmt->execute($params);
    $total = $countStmt->fetch()['total'];
    
    // Get students
    $sql = "SELECT * FROM student_inventory $whereClause ORDER BY id DESC LIMIT ? OFFSET ?";
    $params[] = $limit;
    $params[] = $offset;
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $students = $stmt->fetchAll();
    
    // Convert date objects to strings for JSON
    foreach ($students as &$student) {
        if ($student['birth_date']) {
            $student['birth_date'] = date('Y-m-d', strtotime($student['birth_date']));
        }
    }
    
    sendResponse([
        'students' => $students,
        'total' => (int)$total
    ]);
}

function getStudent($id) {
    global $pdo;
    
    $stmt = $pdo->prepare("SELECT * FROM student_inventory WHERE id = ?");
    $stmt->execute([$id]);
    $student = $stmt->fetch();
    
    if (!$student) {
        sendResponse(['error' => 'Student not found'], 404);
    }
    
    // Convert date to string for JSON
    if ($student['birth_date']) {
        $student['birth_date'] = date('Y-m-d', strtotime($student['birth_date']));
    }
    
    sendResponse($student);
}

function createStudent() {
    global $pdo;
    
    $data = getJsonInput();
    
    $required = ['first_name', 'last_name'];
    validateRequired($data, $required);
    
    $fields = [
        'department', 'year', 'level', 'last_name', 'first_name', 'middle_name',
        'photo_path', 'nickname', 'birth_date', 'birth_place', 'gender', 'religion',
        'nationality', 'address', 'contact_number', 'father_name', 'father_age',
        'father_education', 'father_occupation', 'father_employer', 'father_work_place',
        'father_citizenship', 'father_contact', 'mother_name', 'mother_age',
        'mother_education', 'mother_occupation', 'mother_employer', 'mother_work_place',
        'mother_citizenship', 'mother_contact', 'guardian_name', 'guardian_age',
        'guardian_education', 'guardian_occupation', 'guardian_employer',
        'guardian_work_place', 'guardian_citizenship', 'guardian_contact'
    ];
    
    $columns = [];
    $placeholders = [];
    $values = [];
    
    foreach ($fields as $field) {
        if (isset($data[$field])) {
            $columns[] = $field;
            $placeholders[] = '?';
            $values[] = $data[$field];
        }
    }
    
    $sql = "INSERT INTO student_inventory (" . implode(', ', $columns) . ") VALUES (" . implode(', ', $placeholders) . ")";
    
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);
        
        $studentId = $pdo->lastInsertId();
        
        // Return the created student
        getStudent($studentId);
    } catch (PDOException $e) {
        sendResponse(['error' => 'Failed to create student: ' . $e->getMessage()], 500);
    }
}

function updateStudent($id) {
    global $pdo;
    
    $data = getJsonInput();
    
    $fields = [
        'department', 'year', 'level', 'last_name', 'first_name', 'middle_name',
        'photo_path', 'nickname', 'birth_date', 'birth_place', 'gender', 'religion',
        'nationality', 'address', 'contact_number', 'father_name', 'father_age',
        'father_education', 'father_occupation', 'father_employer', 'father_work_place',
        'father_citizenship', 'father_contact', 'mother_name', 'mother_age',
        'mother_education', 'mother_occupation', 'mother_employer', 'mother_work_place',
        'mother_citizenship', 'mother_contact', 'guardian_name', 'guardian_age',
        'guardian_education', 'guardian_occupation', 'guardian_employer',
        'guardian_work_place', 'guardian_citizenship', 'guardian_contact'
    ];
    
    $updates = [];
    $values = [];
    
    foreach ($fields as $field) {
        if (isset($data[$field])) {
            $updates[] = "$field = ?";
            $values[] = $data[$field];
        }
    }
    
    if (empty($updates)) {
        sendResponse(['error' => 'No fields to update'], 400);
    }
    
    $values[] = $id;
    $sql = "UPDATE student_inventory SET " . implode(', ', $updates) . " WHERE id = ?";
    
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);
        
        if ($stmt->rowCount() === 0) {
            sendResponse(['error' => 'Student not found'], 404);
        }
        
        // Return the updated student
        getStudent($id);
    } catch (PDOException $e) {
        sendResponse(['error' => 'Failed to update student: ' . $e->getMessage()], 500);
    }
}

function deleteStudent($id) {
    global $pdo;
    
    try {
        // First delete related children
        $stmt = $pdo->prepare("DELETE FROM student_children WHERE student_id = ?");
        $stmt->execute([$id]);
        
        // Then delete the student
        $stmt = $pdo->prepare("DELETE FROM student_inventory WHERE id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() === 0) {
            sendResponse(['error' => 'Student not found'], 404);
        }
        
        sendResponse(['message' => 'Student deleted successfully']);
    } catch (PDOException $e) {
        sendResponse(['error' => 'Failed to delete student: ' . $e->getMessage()], 500);
    }
}
?>
