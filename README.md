# AshaBhavan Trust Website

A modern, responsive website for AshaBhavan Trust with an admin panel for content management.

## 📚 Documentation

- **[API Documentation](./API_DOCUMENTATION.md)** - Complete backend API endpoints documentation
- **[Database Design](./DATABASE_DESIGN.md)** - MongoDB schema and database design

## Features

- 🏠 **Home Page**: Image slider and Head of Institute section
- 📖 **About Page**: Mission, Vision, Objectives, and campus photos
- 🖼️ **Gallery**: Student work, programs, photos, and videos
- 👨‍🏫 **Faculties**: Faculty profiles with photos and videos
- 📞 **Contact**: Contact information, social links, and Google Maps integration
- 🔐 **Admin Panel**: Content management system for all pages

## Tech Stack

- **React 19** - UI library
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **React Router DOM** - Routing
- **Zustand** - State management
- **Lucide React** - Icons
- **Axios** - HTTP client
- **Prettier** - Code formatting

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

### Format Code

Format all code with Prettier:
```bash
npm run format
```

## Admin Panel

Access the admin panel at `/admin/login`

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **Important**: Change these credentials in production!

## Constants & Dummy Data

The project uses constants for:
- **API Endpoints**: All backend API endpoints are defined in `src/constants/index.js`
- **Dummy Images**: Placeholder images from Unsplash (replace with actual URLs later)
- **Default Data**: All initial data is stored in constants and can be easily updated
- **Admin Credentials**: Default admin credentials (change in production)

All constants are located in `src/constants/index.js`. The application currently works with dummy data stored in Zustand. When the backend is ready, update the store to fetch data from API endpoints defined in the constants file.

## Project Structure

```
src/
├── components/       # Reusable components (Navbar, Footer, ImageSlider)
├── pages/           # Page components
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Gallery.jsx
│   ├── Faculties.jsx
│   ├── Contact.jsx
│   └── Admin/       # Admin panel pages
├── store/           # Zustand state management
└── App.jsx          # Main app component with routing
```

## Features Details

### Home Page
- Auto-rotating image slider
- Head of Institute profile with photo and description
- Feature highlights

### About Page
- Mission statement
- Vision statement
- Objectives list
- Campus photos gallery

### Gallery Page
- Tabbed interface (All, Student Work, Programs, Photos, Videos)
- Image lightbox for viewing full-size images
- Video embeds

### Faculties Page
- Faculty cards with photos and information
- Faculty videos section

### Contact Page
- Contact information display
- Social media links (Instagram, WhatsApp)
- Google Maps integration
- Contact form

### Admin Panel
- Secure login
- Content management for all pages
- Real-time preview of changes
- Persistent storage using localStorage

## Mobile Responsive

The website is fully responsive and optimized for:
- Mobile devices
- Tablets
- Desktop screens

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the development team.