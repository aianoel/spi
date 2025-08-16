# Student Personal Inventory System

A comprehensive web-based student management system for Immaculate Conception School of Naic Inc.

## Features

- **Student Management**: Add, edit, delete, and search student records
- **Family Information**: Track family composition and children data
- **Printable Forms**: Professional student inventory forms matching official PDF layout
- **Admin Dashboard**: Statistics and administrative controls
- **Database Integration**: MySQL database with PHP backend
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: PHP with MySQL
- **Database**: MySQL (Hostinger compatible)
- **Icons**: Lucide React
- **Routing**: Wouter
- **State Management**: TanStack React Query

## Deployment

### For Hostinger Hosting

1. **Setup Database**:
   - Import `setup-database.sql` in phpMyAdmin
   - Update database credentials in `api/config.php`

2. **Upload Files**:
   - Upload `api/` folder to `public_html/api/`
   - Upload `client/` folder to `public_html/client/`
   - Upload `index.html` to `public_html/`

3. **Default Login**:
   - Username: `admin`
   - Password: `admin123`

## File Structure

```
├── api/                    # PHP backend
│   ├── config.php         # Database configuration
│   ├── students.php       # Student API endpoints
│   ├── children.php       # Children API endpoints
│   ├── auth.php          # Authentication
│   ├── admins.php        # Admin management
│   ├── stats.php         # Dashboard statistics
│   └── .htaccess         # URL routing
├── client/               # React frontend
│   └── src/
│       ├── components/   # React components
│       ├── pages/        # Page components
│       └── lib/          # Utilities and API client
├── shared/               # Shared TypeScript schemas
├── setup-database.sql    # Database setup script
└── index.html           # Entry point (redirects to client)
```

## Development

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Build for production: `npm run build`

## Database Schema

- **admins**: Admin user accounts
- **student_inventory**: Student personal and family information
- **student_children**: Family composition data

## License

Private project for Immaculate Conception School of Naic Inc.
