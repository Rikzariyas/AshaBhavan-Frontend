// API Endpoints
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',

  // Home
  GET_SLIDER_IMAGES: '/home/slider',
  UPDATE_SLIDER_IMAGES: '/home/slider',
  GET_HEAD_OF_INSTITUTE: '/home/head-of-institute',
  UPDATE_HEAD_OF_INSTITUTE: '/home/head-of-institute',

  // About
  GET_ABOUT_DATA: '/about',
  UPDATE_ABOUT_DATA: '/about',

  // Gallery
  GET_GALLERY: '/gallery',
  UPDATE_GALLERY: '/gallery',
  UPLOAD_GALLERY_IMAGE: '/gallery/upload',
  DELETE_GALLERY_IMAGE: '/gallery/:id',

  // Courses
  GET_COURSES: '/courses',
  GET_COURSE_BY_ID: '/courses/:id',
  CREATE_COURSE: '/courses',
  UPDATE_COURSE: '/courses/:id',
  DELETE_COURSE: '/courses/:id',
  GET_COURSE_VIDEOS: '/courses/videos',
  UPLOAD_COURSE_VIDEO: '/courses/videos',

  // Contact
  GET_CONTACT_INFO: '/contact',
  UPDATE_CONTACT_INFO: '/contact',
  SUBMIT_CONTACT_FORM: '/contact/submit',
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
    '/images/courses/course-1.jpg',
    '/images/courses/course-2.jpg',
    '/images/courses/course-3.jpg',
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
      name: 'Mathematics',
      subject: 'Mathematics',
      photo: DUMMY_IMAGES.COURSES[0],
      description:
        'Comprehensive mathematics course covering advanced calculus, algebra, and mathematical reasoning. Perfect for students seeking strong analytical skills.',
      email: 'math@ashabhavan.org',
      qualifications: ['Advanced Level', 'Problem Solving'],
      duration: '12 months',
    },
    {
      id: 2,
      name: 'Science',
      subject: 'Science',
      photo: DUMMY_IMAGES.COURSES[1],
      description:
        'Hands-on science course focusing on physics, chemistry, and biology. Learn through experimental learning and practical applications.',
      email: 'science@ashabhavan.org',
      qualifications: ['Practical Skills', 'Scientific Method'],
      duration: '12 months',
    },
    {
      id: 3,
      name: 'English Language',
      subject: 'English',
      photo: DUMMY_IMAGES.COURSES[2],
      description:
        'English language and literature course emphasizing creative writing, communication skills, and critical thinking.',
      email: 'english@ashabhavan.org',
      qualifications: ['Communication', 'Literary Analysis'],
      duration: '12 months',
    },
  ],

  COURSE_VIDEOS: [
    {
      id: 1,
      title: 'Introduction to Our Courses',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      courseId: 1,
      description: 'Learn about our comprehensive course offerings and teaching methodologies',
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
