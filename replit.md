# Overview

This is a Student Profile Information (SPI) system - a full-stack web application for managing student records, their children's information, and administrative users. The system features a public enrollment form as the main landing page for new student registrations, and a secure admin dashboard for educational institutions to manage student data, family information, and generate reports. It includes role-based authentication with admin and staff access levels for secure management of sensitive student data.

## Application Entry Points
- **Main Landing Page (/)**: Student enrollment form - first display when system starts
- **Admin Dashboard (/admin)**: Protected administrative interface for managing student data
- **Admin Login (/login)**: Authentication page for administrative users

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React with TypeScript**: Modern component-based UI built with React 18 and TypeScript for type safety
- **Vite Build System**: Fast development server and optimized production builds
- **Wouter Router**: Lightweight client-side routing for navigation between pages
- **TanStack Query**: Server state management for API calls, caching, and synchronization
- **shadcn/ui Components**: Consistent design system built on Radix UI primitives with Tailwind CSS
- **Form Management**: React Hook Form with Zod validation for type-safe form handling

## Backend Architecture
- **Express.js API**: RESTful API server handling authentication, CRUD operations, and data validation
- **Session-based Authentication**: Express sessions with bcrypt password hashing for secure login
- **Middleware Pattern**: Request logging, error handling, and authentication middleware
- **In-Memory Storage**: Development storage implementation with planned database integration
- **Type-safe Schema**: Shared TypeScript types between client and server

## Database Design
- **PostgreSQL with Drizzle ORM**: Type-safe database operations with schema-first approach
- **Three Main Entities**:
  - Admins: System users with role-based permissions (admin/staff)
  - Students: Complete student profiles with personal and academic information
  - Children: Student family information linked to student records
- **Comprehensive Student Schema**: Includes personal details, family information, academic data, and parent/guardian contact details

## Authentication & Authorization
- **Session Management**: Server-side sessions with configurable expiration
- **Role-based Access**: Admin and staff roles with different permission levels
- **Protected Routes**: Admin routes (/admin/*) require authentication
- **Public Access**: Enrollment form accessible without authentication
- **Password Security**: Bcrypt hashing with salt rounds for password storage
- **Secure Navigation**: Discrete admin login access from public forms

## UI/UX Architecture
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Component Library**: Comprehensive UI components from shadcn/ui for consistency
- **Multi-step Forms**: Progressive enrollment form with validation and navigation
- **Toast Notifications**: User feedback system for actions and errors
- **Modal System**: Reusable modal components for forms and confirmations
- **Dual Interface**: Public enrollment form + protected admin dashboard

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity for production
- **drizzle-orm**: Type-safe ORM for database operations
- **express-session**: Session management middleware
- **connect-pg-simple**: PostgreSQL session store integration

## Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **@hookform/resolvers**: Form validation integration
- **wouter**: Lightweight React router
- **date-fns**: Date manipulation and formatting

## UI Components & Styling
- **@radix-ui/react-***: Accessible UI primitive components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Consistent icon library

## Development & Build Tools
- **vite**: Fast build tool and development server
- **typescript**: Type safety across the application
- **drizzle-kit**: Database schema management and migrations
- **esbuild**: JavaScript bundling for production server

## Security & Validation
- **bcryptjs**: Password hashing and verification
- **zod**: Runtime type validation and schema parsing