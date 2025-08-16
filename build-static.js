// Build script for static deployment to Hostinger
const fs = require('fs');
const path = require('path');

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Copy main index.html
fs.copyFileSync(
    path.join(__dirname, 'index.html'),
    path.join(distDir, 'index.html')
);

// Copy client directory
const clientSrc = path.join(__dirname, 'client');
const clientDest = path.join(distDir, 'client');

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

copyDir(clientSrc, clientDest);

// Copy shared directory
const sharedSrc = path.join(__dirname, 'shared');
const sharedDest = path.join(distDir, 'shared');
copyDir(sharedSrc, sharedDest);

// Create .htaccess for proper routing on shared hosting
const htaccess = `
RewriteEngine On
RewriteBase /

# Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} ^/client/
RewriteRule ^client/(.*)$ /client/index.html [L]

# Redirect root to main page
DirectoryIndex index.html

# Enable GZIP compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
`;

fs.writeFileSync(path.join(distDir, '.htaccess'), htaccess.trim());

console.log('✅ Static build completed successfully!');
console.log('📁 Files are ready in the /dist directory');
console.log('🚀 Upload the contents of /dist to your Hostinger hosting');
console.log('');
console.log('📋 Deployment Instructions:');
console.log('1. Upload all files from /dist to your public_html folder');
console.log('2. Make sure .htaccess is uploaded for proper routing');
console.log('3. Access your site at your domain name');
console.log('4. Use admin/admin for demo login credentials');
