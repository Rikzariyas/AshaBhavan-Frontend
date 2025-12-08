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
    name: 'Sr. Ambuja',
    title: 'Director Ashabhavan',
    description:
      'Director is in charge of the personnel and servants. Director is responsible for their admis-sion, appointment, training arrangements and disciplinary actions. She is the director of the trainees, resposible for their admission, training arrangements, rehabilitation, discipline and all disciplinary actions. She is authorised to take disciplinary action against the employees, make enquiries and it found necessary, to terminate the service or dismiss the employees. She shall do so only after getting the sanction of the President. An employee who is dismissed or whose service are terminated may appeal to the governing body whose decision shall be final.',
    photo: DUMMY_IMAGES.HEAD_OF_INSTITUTE,
  },

  ABOUT: {
    mission:
      'AshaBhavan is dedicated to creating a more equitable society by providing vocational training, skill development, and social welfare support to vulnerable communities, particularly persons with disabilities and women. We provide guidance and vocational training for the holistic growth of physically handicapped young women, offering free education and accommodation while addressing the individual needs of each student.',
    vision:
      'To be a leading center for vocational training and empowerment, promoting independence, dignity, and rehabilitation for persons with disabilities. We envision a just society that encourages the potential of people with disabilities to become contributing, self-reliant, and dignified individuals in mainstream society.',
    objectives: [
      'Provide quality education academically, vocationally, and spiritually to persons with disabilities',
      'Create a supportive environment that fosters individual growth, employability, and social inclusion',
      'Promote holistic developmental opportunities that widen horizons and capacities',
      'Encourage creativity and self-discovery through various training programs',
      'Empower disabled youngsters to unlock their potential and achieve all-round development',
      'Build confidence and provide career support through accessibility and employment placement',
      "Foster women's independence and dignity through skill development",
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
    phone: '+91 9496719471',
    email: 'ashabhavandirector@gmail.com',
    instagram: 'https://www.instagram.com/ashabhavanannamanada?igsh=M25naXhtaTliZmdw',
    youtube: 'https://youtube.com/@ashabhavanannamanada4633?si=-RsRPhTCUmfP3syA',
    whatsapp: 'https://wa.me/919496719471',
    address: 'Ashabhavan, Annamanada P.O, Thrissur, Kerala, Pin. 680741',
    mapLocation:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1062.4380081479148!2d76.32606360025486!3d10.234400245653442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0805f36ccc2797%3A0x1e99bc969c2fb7f5!2sAshabhavan%20annamanada!5e1!3m2!1sen!2sin!4v1765029590429!5m2!1sen!2sin',
    // workingHours: {
    //   weekdays: '9:00 AM - 5:00 PM',
    //   saturday: '9:00 AM - 1:00 PM',
    //   sunday: 'Closed',
    // },
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
