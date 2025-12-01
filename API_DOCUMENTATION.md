# API Documentation - AshaBhavan Trust Backend

This document describes all API endpoints for the AshaBhavan Trust website backend.

**Base URL:** `http://localhost:3000/api`

**Authentication:** JWT tokens (to be implemented)

- Include token in header: `Authorization: Bearer <token>`

---

## Authentication Endpoints

### 1. Admin Login

**POST** `/auth/login`

**Description:** Authenticate admin user and receive JWT token

**Request Body:**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "admin_id",
      "username": "admin",
      "role": "admin"
    }
  }
}
```

**Error Response (401 Unauthorized):**

```json
{
  "success": false,
  "message": "Invalid credentials",
  "error": "Invalid username or password"
}
```

---

### 2. Refresh Token

**POST** `/auth/refresh`

**Description:** Refresh access token using refresh token

**Request Body:**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "token": "new_access_token",
    "refreshToken": "new_refresh_token"
  }
}
```

---

### 3. Logout

**POST** `/auth/logout`

**Description:** Logout admin user (invalidate token)

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## Home Page Endpoints

### 4. Get Slider Images

**GET** `/home/slider`

**Description:** Get all slider images for home page

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "images": [
      {
        "id": "image_id_1",
        "url": "https://example.com/image1.jpg",
        "order": 1,
        "alt": "Image description",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

---

### 5. Update Slider Images

**PUT** `/home/slider`

**Description:** Update slider images (admin only)

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "images": [
    {
      "url": "https://example.com/new-image1.jpg",
      "order": 1,
      "alt": "New image description"
    }
  ]
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Slider images updated successfully",
  "data": {
    "images": [...]
  }
}
```

---

### 6. Get Head of Institute

**GET** `/home/head-of-institute`

**Description:** Get head of institute information

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "name": "Dr. John Doe",
    "title": "Head of Institute",
    "description": "With over 20 years of experience...",
    "photo": "https://example.com/photo.jpg",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 7. Update Head of Institute

**PUT** `/home/head-of-institute`

**Description:** Update head of institute information (admin only)

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "name": "Dr. John Doe",
  "title": "Head of Institute",
  "description": "Updated description...",
  "photo": "https://example.com/new-photo.jpg"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Head of institute updated successfully",
  "data": {
    "name": "Dr. John Doe",
    "title": "Head of Institute",
    "description": "Updated description...",
    "photo": "https://example.com/new-photo.jpg"
  }
}
```

---

## About Page Endpoints

### 8. Get About Data

**GET** `/about`

**Description:** Get about page data (mission, vision, objectives, photos)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "mission": "To provide quality education...",
    "vision": "To be a leading educational institution...",
    "objectives": [
      "Provide quality education accessible to all",
      "Foster holistic development of students"
    ],
    "photos": [
      {
        "id": "photo_id_1",
        "url": "https://example.com/photo1.jpg",
        "order": 1
      }
    ]
  }
}
```

---

### 9. Update About Data

**PUT** `/about`

**Description:** Update about page data (admin only)

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "mission": "Updated mission statement...",
  "vision": "Updated vision statement...",
  "objectives": ["Objective 1", "Objective 2"],
  "photos": [
    {
      "url": "https://example.com/new-photo.jpg",
      "order": 1
    }
  ]
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "About data updated successfully",
  "data": {...}
}
```

---

## Gallery Endpoints

### 10. Get Gallery

**GET** `/gallery`

**Description:** Get all gallery items (student work, programs, photos, videos)

**Query Parameters:**

- `category` (optional): Filter by category (`studentWork`, `programs`, `photos`, `videos`)
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "studentWork": [
      {
        "id": "item_id_1",
        "url": "https://example.com/work1.jpg",
        "title": "Student Artwork",
        "category": "studentWork",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "programs": [...],
    "photos": [...],
    "videos": [
      {
        "id": "video_id_1",
        "title": "Annual Day",
        "url": "https://www.youtube.com/embed/...",
        "thumbnail": "https://example.com/thumbnail.jpg",
        "category": "programs",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "pages": 3
  }
}
```

---

### 11. Update Gallery

**PUT** `/gallery`

**Description:** Update gallery items (admin only)

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "studentWork": [
    {
      "url": "https://example.com/new-work.jpg",
      "title": "New Student Work"
    }
  ],
  "programs": [...],
  "photos": [...],
  "videos": [
    {
      "title": "New Video",
      "url": "https://www.youtube.com/embed/...",
      "thumbnail": "https://example.com/thumbnail.jpg"
    }
  ]
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Gallery updated successfully",
  "data": {...}
}
```

---

### 12. Upload Gallery Image

**POST** `/gallery/upload`

**Description:** Upload a new gallery image (admin only)

**Headers:**

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**

- `image`: File (image file)
- `category`: String (`studentWork`, `programs`, `photos`)
- `title`: String (optional)

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "id": "new_image_id",
    "url": "https://example.com/uploaded-image.jpg",
    "category": "studentWork",
    "title": "Uploaded Image"
  }
}
```

---

### 13. Delete Gallery Item

**DELETE** `/gallery/:id`

**Description:** Delete a gallery item (admin only)

**Headers:**

```
Authorization: Bearer <token>
```

**URL Parameters:**

- `id`: Gallery item ID

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Gallery item deleted successfully"
}
```

---

## Faculties Endpoints

### 14. Get All Faculties

**GET** `/faculties`

**Description:** Get all faculty members

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "faculties": [
      {
        "id": "faculty_id_1",
        "name": "Dr. Jane Smith",
        "subject": "Mathematics",
        "photo": "https://example.com/photo.jpg",
        "description": "Ph.D. in Mathematics...",
        "email": "jane.smith@ashabhavan.org",
        "qualifications": ["Ph.D. Mathematics", "M.Sc. Applied Mathematics"],
        "experience": "15 years",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

---

### 15. Get Faculty by ID

**GET** `/faculties/:id`

**Description:** Get a specific faculty member

**URL Parameters:**

- `id`: Faculty ID

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "faculty_id_1",
    "name": "Dr. Jane Smith",
    "subject": "Mathematics",
    "photo": "https://example.com/photo.jpg",
    "description": "Ph.D. in Mathematics...",
    "email": "jane.smith@ashabhavan.org",
    "qualifications": ["Ph.D. Mathematics"],
    "experience": "15 years"
  }
}
```

---

### 16. Create Faculty

**POST** `/faculties`

**Description:** Create a new faculty member (admin only)

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "name": "Dr. New Faculty",
  "subject": "Science",
  "photo": "https://example.com/photo.jpg",
  "description": "Faculty description...",
  "email": "new.faculty@ashabhavan.org",
  "qualifications": ["Ph.D. Science"],
  "experience": "10 years"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Faculty created successfully",
  "data": {
    "id": "new_faculty_id",
    "name": "Dr. New Faculty",
    ...
  }
}
```

---

### 17. Update Faculty

**PUT** `/faculties/:id`

**Description:** Update a faculty member (admin only)

**Headers:**

```
Authorization: Bearer <token>
```

**URL Parameters:**

- `id`: Faculty ID

**Request Body:**

```json
{
  "name": "Updated Name",
  "subject": "Updated Subject",
  "photo": "https://example.com/new-photo.jpg",
  "description": "Updated description...",
  "email": "updated@ashabhavan.org",
  "qualifications": ["Updated Qualification"],
  "experience": "20 years"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Faculty updated successfully",
  "data": {...}
}
```

---

### 18. Delete Faculty

**DELETE** `/faculties/:id`

**Description:** Delete a faculty member (admin only)

**Headers:**

```
Authorization: Bearer <token>
```

**URL Parameters:**

- `id`: Faculty ID

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Faculty deleted successfully"
}
```

---

### 19. Get Faculty Videos

**GET** `/faculties/videos`

**Description:** Get all faculty videos

**Query Parameters:**

- `facultyId` (optional): Filter by faculty ID

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "videos": [
      {
        "id": "video_id_1",
        "title": "Innovative Teaching Methods",
        "url": "https://www.youtube.com/embed/...",
        "facultyId": "faculty_id_1",
        "description": "Exploring modern teaching methodologies",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

---

### 20. Upload Faculty Video

**POST** `/faculties/videos`

**Description:** Upload a new faculty video (admin only)

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "title": "New Teaching Video",
  "url": "https://www.youtube.com/embed/...",
  "facultyId": "faculty_id_1",
  "description": "Video description..."
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Video uploaded successfully",
  "data": {
    "id": "new_video_id",
    "title": "New Teaching Video",
    ...
  }
}
```

---

## Contact Endpoints

### 21. Get Contact Info

**GET** `/contact`

**Description:** Get contact information

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "phone": "+91 1234567890",
    "email": "info@ashabhavan.org",
    "instagram": "https://instagram.com/ashabhavan",
    "whatsapp": "https://wa.me/911234567890",
    "address": "123 Education Street, City, State 123456",
    "mapLocation": "https://www.google.com/maps/embed?pb=...",
    "workingHours": {
      "weekdays": "9:00 AM - 5:00 PM",
      "saturday": "9:00 AM - 1:00 PM",
      "sunday": "Closed"
    }
  }
}
```

---

### 22. Update Contact Info

**PUT** `/contact`

**Description:** Update contact information (admin only)

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "phone": "+91 9876543210",
  "email": "newemail@ashabhavan.org",
  "instagram": "https://instagram.com/newhandle",
  "whatsapp": "https://wa.me/919876543210",
  "address": "New Address",
  "mapLocation": "https://www.google.com/maps/embed?pb=...",
  "workingHours": {
    "weekdays": "8:00 AM - 6:00 PM",
    "saturday": "9:00 AM - 2:00 PM",
    "sunday": "Closed"
  }
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Contact info updated successfully",
  "data": {...}
}
```

---

### 23. Submit Contact Form

**POST** `/contact/submit`

**Description:** Submit contact form from website

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Contact form message..."
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Thank you for your message. We will get back to you soon."
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized. Please login again."
}
```

### 403 Forbidden

```json
{
  "success": false,
  "message": "Forbidden. You don't have permission to access this resource."
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details (only in development)"
}
```

---

## Notes

1. All timestamps are in ISO 8601 format (UTC)
2. Image URLs should be absolute URLs
3. File uploads should be handled via multipart/form-data
4. Pagination is optional but recommended for large datasets
5. JWT tokens expire after 24 hours (configurable)
6. Refresh tokens expire after 7 days (configurable)
