<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$segments = explode('/', trim($path, '/'));

switch ($method) {
    case 'GET':
        if (isset($segments[2]) && is_numeric($segments[2])) {
            // GET /api/admins/{id}
            getAdmin($segments[2]);
        } else {
            // GET /api/admins
            getAdmins();
        }
        break;
    
    case 'POST':
        // POST /api/admins
        createAdmin();
        break;
    
    case 'PUT':
        if (isset($segments[2]) && is_numeric($segments[2])) {
            // PUT /api/admins/{id}
            updateAdmin($segments[2]);
        }
        break;
    
    case 'DELETE':
        if (isset($segments[2]) && is_numeric($segments[2])) {
            // DELETE /api/admins/{id}
            deleteAdmin($segments[2]);
        }
        break;
    
    default:
        sendResponse(['error' => 'Method not allowed'], 405);
}

function getAdmins() {
    global $pdo;
    
    $search = $_GET['search'] ?? '';
    $limit = (int)($_GET['limit'] ?? 10);
    $offset = (int)($_GET['offset'] ?? 0);
    
    $whereClause = '';
    $params = [];
    
    if ($search) {
        $whereClause = "WHERE username LIKE ? OR full_name LIKE ?";
        $searchTerm = "%$search%";
        $params = [$searchTerm, $searchTerm];
    }
    
    // Get total count
    $countSql = "SELECT COUNT(*) as total FROM admins $whereClause";
    $countStmt = $pdo->prepare($countSql);
    $countStmt->execute($params);
    $total = $countStmt->fetch()['total'];
    
    // Get admins (exclude password)
    $sql = "SELECT id, username, full_name, role, created_at FROM admins $whereClause ORDER BY id DESC LIMIT ? OFFSET ?";
    $params[] = $limit;
    $params[] = $offset;
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $admins = $stmt->fetchAll();
    
    sendResponse([
        'admins' => $admins,
        'total' => (int)$total
    ]);
}

function getAdmin($id) {
    global $pdo;
    
    $stmt = $pdo->prepare("SELECT id, username, full_name, role, created_at FROM admins WHERE id = ?");
    $stmt->execute([$id]);
    $admin = $stmt->fetch();
    
    if (!$admin) {
        sendResponse(['error' => 'Admin not found'], 404);
    }
    
    sendResponse($admin);
}

function createAdmin() {
    global $pdo;
    
    $data = getJsonInput();
    
    $required = ['username', 'password', 'full_name'];
    validateRequired($data, $required);
    
    // Hash the password
    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
    
    $role = $data['role'] ?? 'admin';
    
    try {
        $stmt = $pdo->prepare("INSERT INTO admins (username, password, full_name, role) VALUES (?, ?, ?, ?)");
        $stmt->execute([$data['username'], $hashedPassword, $data['full_name'], $role]);
        
        $adminId = $pdo->lastInsertId();
        
        // Return the created admin (without password)
        getAdmin($adminId);
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) { // Duplicate entry
            sendResponse(['error' => 'Username already exists'], 409);
        }
        sendResponse(['error' => 'Failed to create admin: ' . $e->getMessage()], 500);
    }
}

function updateAdmin($id) {
    global $pdo;
    
    $data = getJsonInput();
    
    $updates = [];
    $values = [];
    
    if (isset($data['username'])) {
        $updates[] = "username = ?";
        $values[] = $data['username'];
    }
    
    if (isset($data['password']) && !empty($data['password'])) {
        $updates[] = "password = ?";
        $values[] = password_hash($data['password'], PASSWORD_DEFAULT);
    }
    
    if (isset($data['full_name'])) {
        $updates[] = "full_name = ?";
        $values[] = $data['full_name'];
    }
    
    if (isset($data['role'])) {
        $updates[] = "role = ?";
        $values[] = $data['role'];
    }
    
    if (empty($updates)) {
        sendResponse(['error' => 'No fields to update'], 400);
    }
    
    $values[] = $id;
    $sql = "UPDATE admins SET " . implode(', ', $updates) . " WHERE id = ?";
    
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);
        
        if ($stmt->rowCount() === 0) {
            sendResponse(['error' => 'Admin not found'], 404);
        }
        
        // Return the updated admin
        getAdmin($id);
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) { // Duplicate entry
            sendResponse(['error' => 'Username already exists'], 409);
        }
        sendResponse(['error' => 'Failed to update admin: ' . $e->getMessage()], 500);
    }
}

function deleteAdmin($id) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("DELETE FROM admins WHERE id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() === 0) {
            sendResponse(['error' => 'Admin not found'], 404);
        }
        
        sendResponse(['message' => 'Admin deleted successfully']);
    } catch (PDOException $e) {
        sendResponse(['error' => 'Failed to delete admin: ' . $e->getMessage()], 500);
    }
}
?>
