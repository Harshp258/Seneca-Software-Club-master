# Seneca Software Club Website

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Responsive Design](#responsive-design)
7. [Creative Elements](#creative-elements)
8. [API Routes](#api-routes)
9. [Authentication](#authentication)
10. [Database](#database)
11. [Future Enhancements](#future-enhancements)
12. [Contributors](#contributors)
13. [License](#license)

## Introduction

The Seneca Software Club Website is a dynamic, full-stack web application designed to foster a community of passionate developers, innovators, and tech enthusiasts at Seneca College. This platform provides students with a space to enhance their coding skills, collaborate on exciting projects, and stay updated with the latest trends in software development.

## Features

1. **User Authentication**
   - Secure sign-up and sign-in functionality
   - Password hashing for enhanced security
   - Session management using NextAuth.js

2. **User Profiles**
   - Customizable user profiles with name, email, course, and student ID
   - Profile picture upload functionality
   - Ability to update profile information and change password

3. **Feed System**
   - Real-time post creation and display
   - Support for text, image, and video content
   - Like and comment functionality on posts
   - Character limit counter for posts

4. **To-Do List**
   - Personal task management system
   - Add, toggle, and delete tasks
   - Responsive design for easy mobile use

5. **Club Members Directory**
   - Display of all club members with their details
   - Animated member cards with hover effects

6. **About Page**
   - Detailed information about the club's mission and activities
   - Floating animation for the club logo

7. **Responsive Navigation**
   - Sticky header with dropdown menu for user actions
   - Mobile-friendly navigation with collapsible menu

8. **Home Page**
   - Welcome message for new visitors
   - Feature highlights for signed-in users
   - Display of recent posts

9. **Footer**
   - Club branding and copyright information
   - Social media links
   - Contact information

## Technologies Used

- Next.js for server-side rendering and API routes
- React for building user interfaces
- MongoDB for database management
- NextAuth.js for authentication
- CSS Modules for styling
- React Icons for UI icons
- bcrypt for password hashing

## Installation

1. Clone the repository:
git clone [https://github.com//seneca-software-club.git](https://github.com/Harshp258/Seneca-Software-Club-master/)

2. Navigate to the project directory:

cd Seneca-Software-Club-Master

3. Install dependencies:

npm install

4. Set up environment variables in a `.env.local` file:

MONGODB_URI=mongodb+srv://srushti:srushti@cluster0.13uvasm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
NEXTAUTH_SECRET=8f9a1b3c7d2e4f6g5h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f
CLOUDINARY_CLOUD_NAME=dm2javuce
CLOUDINARY_API_KEY=	
599864365527848
CLOUDINARY_API_SECRET=2246p0_vfm2M0ygmJOS8vh3gzwo


5. Run the development server:

npm run dev



## Usage

After starting the development server, navigate to `http://localhost:3000` in your web browser to access the website.

## Responsive Design

- Fluid layouts that adapt to various screen sizes
- Mobile-first approach ensuring compatibility across devices
- Responsive navigation that collapses into a hamburger menu on smaller screens
- Flexible grid systems for member directory and post displays

## Creative Elements

1. **Animated Hover Effects**
- Scale and shadow changes on interactive elements
- Color transitions on buttons and links

2. **Custom Iconography**
- Use of React Icons for a cohesive visual language
- Custom styling of icons to match the overall design theme

3. **Floating Animations**
- Subtle floating animation on the club logo in the About page
- Hover animations on member cards in the directory

4. **Color Scheme**
- High-contrast color palette for readability
- Use of Seneca's primary red color for branding consistency

5. **Typography**
- Custom font (Share Tech Mono) for headings to emphasize the tech theme
- Readable sans-serif font for body text

6. **Loading States**
- Custom loading messages and animations for asynchronous operations

7. **Form Styling**
- Consistent styling across all forms with focus effects
- Icon integration in input fields for visual cues

## API Routes

- `/api/auth/*` - Authentication routes handled by NextAuth.js
- `/api/users/profile` - User profile management
- `/api/users/password` - Password update functionality
- `/api/posts` - Post creation and retrieval
- `/api/posts/:id/like` - Post liking functionality
- `/api/posts/:id/comment` - Commenting on posts
- `/api/todos` - To-do list management

## Authentication

- Implemented using NextAuth.js
- Supports credential authentication
- Secure password hashing with bcrypt
- JWT token-based session management

## Database

- MongoDB used as the primary database
- Mongoose ODM for data modeling and management
- Schemas defined for Users, Posts, and Todos

## Future Enhancements

1. Implement real-time notifications for post interactions
2. Add a messaging system for direct communication between members
3. Integrate a calendar feature for club events and meetings
4. Implement a project showcase section for members to display their work

## Contributors

- [Harsh Patel](https://github.com/Harshp258)
- [Srushti Patel](https://github.com/SrushtiP1)



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributors

- Harsh Patel (hpatel371@myseneca.ca)
- Srushti Patel (spatel664@myseneca.ca)

