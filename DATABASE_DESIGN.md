# MongoDB Database Design - AshaBhavan Trust

This document describes the MongoDB database schema design for the AshaBhavan Trust website backend.

---

## Database: `ashabhavan_db`

---

## Collections

### 1. Users Collection

**Collection Name:** `users`

**Description:** Stores admin user accounts

**Schema:**

```javascript
{
  _id: ObjectId,
  username: String,          // Unique, required
  password: String,          // Hashed password, required
  email: String,             // Unique, required
  role: String,              // "admin" (default), required
  isActive: Boolean,         // Default: true
  lastLogin: Date,           // Optional
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

**Indexes:**

- `username`: Unique index
- `email`: Unique index

**Example Document:**

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "username": "admin",
  "password": "$2b$10$hashedPassword...",
  "email": "admin@ashabhavan.org",
  "role": "admin",
  "isActive": true,
  "lastLogin": ISODate("2024-01-15T10:30:00Z"),
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00Z")
}
```

---

### 2. Slider Images Collection

**Collection Name:** `slider_images`

**Description:** Stores slider images for home page

**Schema:**

```javascript
{
  _id: ObjectId,
  url: String,               // Image URL, required
  alt: String,               // Alt text for image, optional
  order: Number,             // Display order, required, default: 0
  isActive: Boolean,         // Default: true
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

**Indexes:**

- `order`: Ascending index

**Example Document:**

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "url": "https://example.com/slider1.jpg",
  "alt": "School building",
  "order": 1,
  "isActive": true,
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00Z")
}
```

---

### 3. Head of Institute Collection

**Collection Name:** `head_of_institute`

**Description:** Stores head of institute information (single document)

**Schema:**

```javascript
{
  _id: ObjectId,
  name: String,              // Required
  title: String,             // Required
  description: String,       // Required
  photo: String,             // Photo URL, required
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

**Note:** This collection should only contain one document. Use `findOneAndUpdate` with `upsert: true`.

**Example Document:**

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439013"),
  "name": "Dr. John Doe",
  "title": "Head of Institute",
  "description": "With over 20 years of experience...",
  "photo": "https://example.com/head-photo.jpg",
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-15T10:00:00Z")
}
```

---

### 4. About Collection

**Collection Name:** `about`

**Description:** Stores about page data (single document)

**Schema:**

```javascript
{
  _id: ObjectId,
  mission: String,           // Required
  vision: String,            // Required
  objectives: [String],      // Array of objectives, required
  photos: [                  // Array of photo objects
    {
      _id: ObjectId,
      url: String,           // Required
      order: Number,         // Display order
      alt: String            // Optional
    }
  ],
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

**Note:** This collection should only contain one document.

**Example Document:**

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439014"),
  "mission": "To provide quality education...",
  "vision": "To be a leading educational institution...",
  "objectives": [
    "Provide quality education accessible to all",
    "Foster holistic development of students"
  ],
  "photos": [
    {
      "_id": ObjectId("507f1f77bcf86cd799439015"),
      "url": "https://example.com/about1.jpg",
      "order": 1,
      "alt": "Campus photo"
    }
  ],
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-15T10:00:00Z")
}
```

---

### 5. Gallery Collection

**Collection Name:** `gallery`

**Description:** Stores gallery items (student work, programs, photos, videos)

**Schema:**

```javascript
{
  _id: ObjectId,
  type: String,             // "studentWork", "programs", "photos", "videos", required
  url: String,               // Media URL, required
  title: String,             // Optional
  description: String,       // Optional
  thumbnail: String,         // Thumbnail URL (for videos), optional
  category: String,          // Additional categorization, optional
  order: Number,             // Display order, default: 0
  isActive: Boolean,         // Default: true
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

**Indexes:**

- `type`: Index
- `type + order`: Compound index
- `isActive`: Index

**Example Documents:**

**Image:**

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439016"),
  "type": "studentWork",
  "url": "https://example.com/student-work1.jpg",
  "title": "Student Artwork",
  "description": "Beautiful artwork by student",
  "order": 1,
  "isActive": true,
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00Z")
}
```

**Video:**

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439017"),
  "type": "videos",
  "url": "https://www.youtube.com/embed/...",
  "title": "Annual Day Celebration",
  "description": "Annual day event video",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "category": "programs",
  "order": 1,
  "isActive": true,
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00Z")
}
```

---

### 6. Faculties Collection

**Collection Name:** `faculties`

**Description:** Stores faculty member information

**Schema:**

```javascript
{
  _id: ObjectId,
  name: String,              // Required
  subject: String,           // Required
  photo: String,             // Photo URL, required
  description: String,       // Required
  email: String,             // Email, required, unique
  qualifications: [String],   // Array of qualifications
  experience: String,        // Years of experience
  order: Number,             // Display order, default: 0
  isActive: Boolean,         // Default: true
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

**Indexes:**

- `email`: Unique index
- `order`: Ascending index
- `isActive`: Index

**Example Document:**

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439018"),
  "name": "Dr. Jane Smith",
  "subject": "Mathematics",
  "photo": "https://example.com/faculty1.jpg",
  "description": "Ph.D. in Mathematics with 15 years of experience",
  "email": "jane.smith@ashabhavan.org",
  "qualifications": [
    "Ph.D. Mathematics",
    "M.Sc. Applied Mathematics"
  ],
  "experience": "15 years",
  "order": 1,
  "isActive": true,
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-15T10:00:00Z")
}
```

---

### 7. Faculty Videos Collection

**Collection Name:** `faculty_videos`

**Description:** Stores faculty-related videos

**Schema:**

```javascript
{
  _id: ObjectId,
  facultyId: ObjectId,      // Reference to faculties._id, required
  title: String,             // Required
  url: String,               // Video embed URL, required
  description: String,       // Optional
  thumbnail: String,         // Thumbnail URL, optional
  order: Number,             // Display order, default: 0
  isActive: Boolean,         // Default: true
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

**Indexes:**

- `facultyId`: Index
- `facultyId + order`: Compound index

**Example Document:**

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439019"),
  "facultyId": ObjectId("507f1f77bcf86cd799439018"),
  "title": "Innovative Teaching Methods",
  "url": "https://www.youtube.com/embed/...",
  "description": "Exploring modern teaching methodologies",
  "thumbnail": "https://example.com/video-thumbnail.jpg",
  "order": 1,
  "isActive": true,
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00Z")
}
```

---

### 8. Contact Collection

**Collection Name:** `contact`

**Description:** Stores contact information (single document)

**Schema:**

```javascript
{
  _id: ObjectId,
  phone: String,             // Required
  email: String,             // Required
  instagram: String,         // Instagram URL, optional
  whatsapp: String,          // WhatsApp URL, optional
  address: String,           // Required
  mapLocation: String,       // Google Maps embed URL, optional
  workingHours: {
    weekdays: String,        // e.g., "9:00 AM - 5:00 PM"
    saturday: String,        // e.g., "9:00 AM - 1:00 PM"
    sunday: String           // e.g., "Closed"
  },
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

**Note:** This collection should only contain one document.

**Example Document:**

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439020"),
  "phone": "+91 1234567890",
  "email": "info@ashabhavan.org",
  "instagram": "https://instagram.com/ashabhavan",
  "whatsapp": "https://wa.me/911234567890",
  "address": "123 Education Street, City, State 123456, India",
  "mapLocation": "https://www.google.com/maps/embed?pb=...",
  "workingHours": {
    "weekdays": "9:00 AM - 5:00 PM",
    "saturday": "9:00 AM - 1:00 PM",
    "sunday": "Closed"
  },
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-15T10:00:00Z")
}
```

---

### 9. Contact Messages Collection

**Collection Name:** `contact_messages`

**Description:** Stores contact form submissions

**Schema:**

```javascript
{
  _id: ObjectId,
  name: String,              // Required
  email: String,             // Required
  message: String,           // Required
  isRead: Boolean,           // Default: false
  repliedAt: Date,           // Optional
  createdAt: Date             // Auto-generated
}
```

**Indexes:**

- `email`: Index
- `isRead`: Index
- `createdAt`: Descending index

**Example Document:**

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439021"),
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I would like to know more about admission...",
  "isRead": false,
  "repliedAt": null,
  "createdAt": ISODate("2024-01-15T10:00:00Z")
}
```

---

### 10. Refresh Tokens Collection

**Collection Name:** `refresh_tokens`

**Description:** Stores refresh tokens for JWT authentication

**Schema:**

```javascript
{
  _id: ObjectId,
  userId: ObjectId,          // Reference to users._id, required
  token: String,             // Refresh token, required, unique
  expiresAt: Date,           // Token expiration date, required
  isRevoked: Boolean,        // Default: false
  createdAt: Date            // Auto-generated
}
```

**Indexes:**

- `token`: Unique index
- `userId`: Index
- `expiresAt`: TTL index (auto-delete expired tokens)
- `isRevoked`: Index

**Example Document:**

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439022"),
  "userId": ObjectId("507f1f77bcf86cd799439011"),
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": ISODate("2024-01-22T00:00:00Z"),
  "isRevoked": false,
  "createdAt": ISODate("2024-01-15T00:00:00Z")
}
```

---

## Database Relationships

### One-to-Many Relationships:

- `faculties` → `faculty_videos` (one faculty can have many videos)
- `users` → `refresh_tokens` (one user can have many refresh tokens)

### Single Document Collections:

- `head_of_institute` (only one document)
- `about` (only one document)
- `contact` (only one document)

---

## Indexes Summary

| Collection         | Indexes                                                    |
| ------------------ | ---------------------------------------------------------- |
| `users`            | `username` (unique), `email` (unique)                      |
| `slider_images`    | `order`                                                    |
| `gallery`          | `type`, `type + order` (compound), `isActive`              |
| `faculties`        | `email` (unique), `order`, `isActive`                      |
| `faculty_videos`   | `facultyId`, `facultyId + order` (compound)                |
| `contact_messages` | `email`, `isRead`, `createdAt` (descending)                |
| `refresh_tokens`   | `token` (unique), `userId`, `expiresAt` (TTL), `isRevoked` |

---

## Data Validation Rules

1. **Required Fields:** All required fields must be present and non-empty
2. **Email Format:** Email fields must be valid email format
3. **URL Format:** URL fields must be valid URLs
4. **Unique Constraints:** Fields marked as unique must be unique across documents
5. **Date Validation:** Date fields must be valid ISO dates
6. **Array Validation:** Array fields should contain valid data types

---

## Notes

1. Use MongoDB ObjectId for all `_id` fields
2. Timestamps (`createdAt`, `updatedAt`) should be automatically managed
3. Soft deletes: Use `isActive: false` instead of deleting documents
4. TTL indexes can be used for auto-deleting expired refresh tokens
5. Consider using MongoDB transactions for operations that modify multiple collections
6. Implement proper validation at the application level (Mongoose schemas)
7. Use connection pooling for better performance
8. Implement proper error handling and logging
