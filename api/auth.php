<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$segments = explode('/', trim($path, '/'));

switch ($method) {
    case 'POST':
        if (isset($segments[2]) && $segments[2] === 'login') {
            // POST /api/auth/login
            login();
        } elseif (isset($segments[2]) && $segments[2] === 'logout') {
            // POST /api/auth/logout
            logout();
        }
        break;
    
    case 'GET':
        if (isset($segments[2]) && $segments[2] === 'me') {
            // GET /api/auth/me
            getCurrentUser();
        }
        break;
    
    default:
        sendResponse(['error' => 'Method not allowed'], 405);
}

function login() {
    global $pdo;
    
    $data = getJsonInput();
    
    $required = ['username', 'password'];
    validateRequired($data, $required);
    
    $username = $data['username'];
    $password = $data['password'];
    
    try {
        $stmt = $pdo->prepare("SELECT * FROM admins WHERE username = ?");
        $stmt->execute([$username]);
        $admin = $stmt->fetch();
        
        if (!$admin || !password_verify($password, $admin['password'])) {
            sendResponse(['error' => 'Invalid credentials'], 401);
        }
        
        // Start session
        session_start();
        $_SESSION['admin_id'] = $admin['id'];
        $_SESSION['admin_username'] = $admin['username'];
        
        // Remove password from response
        unset($admin['password']);
        
        sendResponse([
            'user' => $admin,
            'message' => 'Login successful'
        ]);
    } catch (PDOException $e) {
        sendResponse(['error' => 'Login failed: ' . $e->getMessage()], 500);
    }
}

function logout() {
    session_start();
    session_destroy();
    
    sendResponse(['message' => 'Logged out successfully']);
}

function getCurrentUser() {
    session_start();
    
    if (!isset($_SESSION['admin_id'])) {
        sendResponse(['error' => 'Not authenticated'], 401);
    }
    
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("SELECT id, username, full_name, role, created_at FROM admins WHERE id = ?");
        $stmt->execute([$_SESSION['admin_id']]);
        $admin = $stmt->fetch();
        
        if (!$admin) {
            sendResponse(['error' => 'User not found'], 404);
        }
        
        sendResponse($admin);
    } catch (PDOException $e) {
        sendResponse(['error' => 'Failed to get user: ' . $e->getMessage()], 500);
    }
}
?>
