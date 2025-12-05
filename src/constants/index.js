// API Endpoints
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9002/api'

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  // Gallery
  GET_GALLERY: '/gallery',
  EDIT_GALLERY_ITEM: '/gallery/:id',
  UPLOAD_GALLERY_IMAGE: '/gallery/upload',
  DELETE_GALLERY_IMAGE: '/gallery/:id',
}

// Dummy Images - Replace with actual URLs later
export const DUMMY_IMAGES = {
  SLIDER: ['/images/slider/slider-1.jpg', '/images/slider/slider-2.jpg'],
  HEAD_OF_INSTITUTE: '/images/head-of-institute.png',
  ABOUT: ['/images/about/about-1.jpg', '/images/about/about-2.jpg', '/images/about/about-3.jpg'],
  GALLERY: {
    STUDENT_WORK: [
      '/images/gallery/student-work-1.jpg',
      '/images/gallery/student-work-2.jpg',
      '/images/gallery/student-work-3.jpg',
    ],
    PROGRAMS: [
      '/images/gallery/programs-1.jpg',
      '/images/gallery/programs-2.jpg',
      '/images/gallery/programs-3.jpg',
    ],
    PHOTOS: [
      '/images/gallery/photos-1.jpg',
      '/images/gallery/photos-2.jpg',
      '/images/gallery/photos-3.jpg',
    ],
  },
  COURSES: [
    '/images/courses/Tailoring Course.png',
    '/images/courses/Embroidery Course.png',
    '/images/courses/FDGT Course.png',
    '/images/courses/Computer Course.png',
  ],
  PLACEHOLDER: '/images/placeholder.jpg',
}

// Dummy Data Constants
export const DUMMY_DATA = {
  HEAD_OF_INSTITUTE: {
    name: 'Dr. John Doe',
    title: 'Head of Institute',
    description:
      'With over 20 years of experience in education, Dr. John Doe has been leading our institution with dedication and vision. His commitment to excellence and student success has shaped our institution into what it is today.',
    photo: DUMMY_IMAGES.HEAD_OF_INSTITUTE,
  },

  ABOUT: {
    mission:
      'To provide quality education and holistic development to every student, fostering creativity, critical thinking, and character building. We strive to create an environment where students can discover their potential and become responsible citizens.',
    vision:
      'To be a leading educational institution that nurtures future leaders and responsible citizens. We envision a world where every student has access to quality education and opportunities for growth.',
    objectives: [
      'Provide quality education accessible to all',
      'Foster holistic development of students',
      'Promote innovation and creativity',
      'Build strong character and values',
      'Create a safe and inclusive learning environment',
      'Encourage community engagement and social responsibility',
    ],
    photos: DUMMY_IMAGES.ABOUT,
  },

  GALLERY: {
    studentWork: DUMMY_IMAGES.GALLERY.STUDENT_WORK,
    programs: DUMMY_IMAGES.GALLERY.PROGRAMS,
    photos: DUMMY_IMAGES.GALLERY.PHOTOS,
  },

  COURSES: [
    {
      id: 1,
      name: 'Tailoring Course',
      subject: 'Tailoring',
      photo: DUMMY_IMAGES.COURSES[0],
      description:
        'Hands-on skills training includes mastery in garment construction, alteration and repair techniques. Precision and attention to detail help develop fine motor skills. Entrepreneurial opportunities to start their own tailoring business or work in garment manufacturing.',
    },
    {
      id: 2,
      name: 'Embroidery',
      subject: 'Embroidery',
      photo: DUMMY_IMAGES.COURSES[1],
      description:
        'Embroidery has its traditional importance. It can be calming and meditative, promoting relaxation and focus. Adds value to garments with attractive stitching patterns. Helps students achieve self-sufficiency in life and secure jobs in private and public sectors.',
    },
    {
      id: 3,
      name: 'Fashion Designing & Garment Technology (FDGT)',
      subject: 'FDGT',
      photo: DUMMY_IMAGES.COURSES[2],
      description:
        'Government recognized course under Kerala Technical Education. Students are engaged with regular classes, industrial visits, internships, and project works. Develop skills in garment construction, textile science, and fashion illustration. Career opportunities in fashion designing and styling.',
    },
    {
      id: 4,
      name: 'Computer Courses',
      subject: 'Computer',
      photo: DUMMY_IMAGES.COURSES[3],
      description:
        'Our students are very much interested in computer courses such as MS Office, DTP, English and Malayalam Typing. We are preparing them for exams. Our computer courses have recognition from the Indian Computer Academy.',
    },
  ],

  CONTACT: {
    phone: '+91 1234567890',
    email: 'info@ashabhavan.org',
    instagram: 'https://instagram.com/ashabhavan',
    whatsapp: 'https://wa.me/911234567890',
    address: '123 Education Street, City, State 123456, India',
    mapLocation:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841338846597!2d-73.98825768459418!3d40.75889597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890',
    workingHours: {
      weekdays: '9:00 AM - 5:00 PM',
      saturday: '9:00 AM - 1:00 PM',
      sunday: 'Closed',
    },
  },
}

// Admin Constants
export const ADMIN_CONSTANTS = {
  DEFAULT_USERNAME: 'admin',
  DEFAULT_PASSWORD: 'admin123', // Change in production
  TOKEN_STORAGE_KEY: 'ashabhavan_admin_token',
  REFRESH_TOKEN_STORAGE_KEY: 'ashabhavan_refresh_token',
}

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
}

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Unauthorized. Please login again.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Validation error. Please check your input.',
}

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  UPDATE_SUCCESS: 'Updated successfully',
  DELETE_SUCCESS: 'Deleted successfully',
  CREATE_SUCCESS: 'Created successfully',
}
