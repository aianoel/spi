<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'GET') {
    sendResponse(['error' => 'Method not allowed'], 405);
}

getStats();

function getStats() {
    global $pdo;
    
    try {
        // Get total students
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM student_inventory");
        $totalStudents = $stmt->fetch()['count'];
        
        // Get total children
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM student_children");
        $totalChildren = $stmt->fetch()['count'];
        
        // Get total admins
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM admins");
        $totalAdmins = $stmt->fetch()['count'];
        
        // For now, active students = total students (you can add logic for active status later)
        $activeStudents = $totalStudents;
        
        sendResponse([
            'totalStudents' => (int)$totalStudents,
            'totalChildren' => (int)$totalChildren,
            'totalAdmins' => (int)$totalAdmins,
            'activeStudents' => (int)$activeStudents
        ]);
    } catch (PDOException $e) {
        sendResponse(['error' => 'Failed to get stats: ' . $e->getMessage()], 500);
    }
}
?>
