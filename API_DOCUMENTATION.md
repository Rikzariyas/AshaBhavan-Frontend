# API Documentation - AshaBhavan Trust Backend

This document describes all API endpoints for the AshaBhavan Trust website backend.

**Base URL:** `http://localhost:9002/api`

**Authentication:** JWT tokens

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

```http
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

## Gallery Endpoints

### 4. Get Gallery

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

### 5. Update Gallery Item

**PATCH** `/gallery/:id`

**Description:** Update a specific gallery item (admin only)

**Headers:**

```http
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**URL Parameters:**

- `id`: Gallery item ID

**Request Body (Form Data):**

- `category`: String (`studentWork`, `programs`, `photos`) - optional
- `title`: String - optional
- `image`: File (image file) - optional (only if updating the image)

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Gallery item updated successfully",
  "data": {
    "id": "item_id",
    "url": "https://example.com/updated-image.jpg",
    "category": "studentWork",
    "title": "Updated Title"
  }
}
```

**Error Response (404 Not Found):**

```json
{
  "success": false,
  "message": "Gallery item not found"
}
```

---

### 6. Upload Gallery Image

**POST** `/gallery/upload`

**Description:** Upload a new gallery image (admin only)

**Headers:**

```http
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

### 7. Delete Gallery Item

**DELETE** `/gallery/:id`

**Description:** Delete a gallery item (admin only)

**Headers:**

```http
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
