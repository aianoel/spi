<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$segments = explode('/', trim($path, '/'));

switch ($method) {
    case 'GET':
        if (isset($segments[2]) && $segments[2] === 'student' && isset($segments[3])) {
            // GET /api/children/student/{student_id}
            getChildrenByStudentId($segments[3]);
        } elseif (isset($segments[2]) && is_numeric($segments[2])) {
            // GET /api/children/{id}
            getChild($segments[2]);
        } else {
            // GET /api/children
            getChildren();
        }
        break;
    
    case 'POST':
        // POST /api/children
        createChild();
        break;
    
    case 'PUT':
        if (isset($segments[2]) && is_numeric($segments[2])) {
            // PUT /api/children/{id}
            updateChild($segments[2]);
        }
        break;
    
    case 'DELETE':
        if (isset($segments[2]) && is_numeric($segments[2])) {
            // DELETE /api/children/{id}
            deleteChild($segments[2]);
        }
        break;
    
    default:
        sendResponse(['error' => 'Method not allowed'], 405);
}

function getChildren() {
    global $pdo;
    
    $search = $_GET['search'] ?? '';
    $ageRange = $_GET['ageRange'] ?? '';
    $limit = (int)($_GET['limit'] ?? 10);
    $offset = (int)($_GET['offset'] ?? 0);
    
    $whereClause = '';
    $params = [];
    
    $conditions = [];
    
    if ($search) {
        $conditions[] = "(child_name LIKE ? OR child_school LIKE ?)";
        $searchTerm = "%$search%";
        $params[] = $searchTerm;
        $params[] = $searchTerm;
    }
    
    if ($ageRange) {
        $ages = explode('-', $ageRange);
        if (count($ages) === 2) {
            $conditions[] = "child_age BETWEEN ? AND ?";
            $params[] = (int)$ages[0];
            $params[] = (int)$ages[1];
        }
    }
    
    if (!empty($conditions)) {
        $whereClause = "WHERE " . implode(' AND ', $conditions);
    }
    
    // Get total count
    $countSql = "SELECT COUNT(*) as total FROM student_children $whereClause";
    $countStmt = $pdo->prepare($countSql);
    $countStmt->execute($params);
    $total = $countStmt->fetch()['total'];
    
    // Get children
    $sql = "SELECT * FROM student_children $whereClause ORDER BY id DESC LIMIT ? OFFSET ?";
    $params[] = $limit;
    $params[] = $offset;
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $children = $stmt->fetchAll();
    
    sendResponse([
        'children' => $children,
        'total' => (int)$total
    ]);
}

function getChild($id) {
    global $pdo;
    
    $stmt = $pdo->prepare("SELECT * FROM student_children WHERE id = ?");
    $stmt->execute([$id]);
    $child = $stmt->fetch();
    
    if (!$child) {
        sendResponse(['error' => 'Child not found'], 404);
    }
    
    sendResponse($child);
}

function getChildrenByStudentId($studentId) {
    global $pdo;
    
    $stmt = $pdo->prepare("SELECT * FROM student_children WHERE student_id = ? ORDER BY id");
    $stmt->execute([$studentId]);
    $children = $stmt->fetchAll();
    
    sendResponse($children);
}

function createChild() {
    global $pdo;
    
    $data = getJsonInput();
    
    $required = ['student_id', 'child_name'];
    validateRequired($data, $required);
    
    $fields = ['student_id', 'child_name', 'child_age', 'child_status', 'child_school', 'child_occupation'];
    
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
    
    $sql = "INSERT INTO student_children (" . implode(', ', $columns) . ") VALUES (" . implode(', ', $placeholders) . ")";
    
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);
        
        $childId = $pdo->lastInsertId();
        
        // Return the created child
        getChild($childId);
    } catch (PDOException $e) {
        sendResponse(['error' => 'Failed to create child: ' . $e->getMessage()], 500);
    }
}

function updateChild($id) {
    global $pdo;
    
    $data = getJsonInput();
    
    $fields = ['student_id', 'child_name', 'child_age', 'child_status', 'child_school', 'child_occupation'];
    
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
    $sql = "UPDATE student_children SET " . implode(', ', $updates) . " WHERE id = ?";
    
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);
        
        if ($stmt->rowCount() === 0) {
            sendResponse(['error' => 'Child not found'], 404);
        }
        
        // Return the updated child
        getChild($id);
    } catch (PDOException $e) {
        sendResponse(['error' => 'Failed to update child: ' . $e->getMessage()], 500);
    }
}

function deleteChild($id) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("DELETE FROM student_children WHERE id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() === 0) {
            sendResponse(['error' => 'Child not found'], 404);
        }
        
        sendResponse(['message' => 'Child deleted successfully']);
    } catch (PDOException $e) {
        sendResponse(['error' => 'Failed to delete child: ' . $e->getMessage()], 500);
    }
}
?>
