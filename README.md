<div align="center">
  <img src="./src/assets/images/Logo-videobelajar.png" alt="VideoBelajar Logo" width="200"/>
  
  # 🎓 VideoBelajar - Online Learning Platform
  
  **Modern video learning platform built with React, Vite, and Tailwind CSS**
  
  [![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://video-belajar-app.vercel.app)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
  [![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
  
</div>

---

## ✨ Features

- 🎨 **Modern UI/UX** - Clean and intuitive interface with smooth animations
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🔍 **Smart Search** - Real-time course filtering and category-based search
- ⚡ **Lightning Fast** - Built with Vite for instant hot module replacement
- ♿ **Accessible** - WCAG compliant with keyboard navigation support
- 🎯 **Atomic Design** - Scalable component architecture
- 🔐 **Form Validation** - Client-side validation with instant feedback
- 🎭 **Dynamic Routing** - Seamless navigation with React Router

---

## 🚀 Live Demo

Experience the app live: **[video-belajar-app.vercel.app](https://video-belajar-app.vercel.app)**

---

### 🔐 Authentication
Clean and secure login/register interface with social login integration.

---

## 🛠️ Tech Stack

### Core
- **[React 19](https://react.dev)** - Latest React with improved performance
- **[Vite 8](https://vitejs.dev)** - Next generation frontend tooling
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework

### Routing & Navigation
- **[React Router DOM 7](https://reactrouter.com)** - Declarative routing for React

### Development Tools
- **ESLint** - Code linting and quality checks
- **PostCSS** - CSS transformations
- **Autoprefixer** - Automatic vendor prefixing

---

## 📦 Project Structure

```
src/
├── assets/              # Images, icons, and static files
│   └── images/          # Logo, backgrounds, avatars
├── components/          # React components (Atomic Design)
│   ├── atoms/           # Basic building blocks
│   │   ├── Button.jsx
│   │   ├── InputField.jsx
│   │   └── Badge.jsx
│   ├── molecules/       # Combinations of atoms
│   │   ├── CourseCard.jsx
│   │   ├── FormGroup.jsx
│   │   └── SocialButton.jsx
│   └── organisms/       # Complex UI sections
│       ├── Navbar.jsx
│       ├── HeroSection.jsx
│       ├── CourseSection.jsx
│       └── Footer.jsx
├── pages/               # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   └── Register.jsx
├── App.jsx              # Main app component with routing
├── main.jsx             # Application entry point
└── index.css            # Global styles and Tailwind config
```

---

## 🎯 Key Highlights

### 🧩 Atomic Design Pattern

Components are organized following Atomic Design methodology:
- **Atoms** → Small, reusable components (buttons, inputs)
- **Molecules** → Combinations of atoms (form groups, cards)
- **Organisms** → Complex sections (navbar, hero, footer)
- **Pages** → Complete page layouts

### 🎨 Custom Design System
```css
Primary Color:   #34A853 (Green)
Secondary Color: #FF9900 (Orange)
Accent Color:    #F64920 (Red)
Background:      #FFFDF3 (Cream)
```

### 📱 Responsive Breakpoints
```
Mobile:  < 640px
Tablet:  640px - 1024px
Desktop: > 1024px
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn installed
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/alfarizyalief3-dotcom/Video-Belajar-App.git
   cd Video-Belajar-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
# or
yarn build
```

The optimized production build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

---

## 📚 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

---

## 🎨 Component Examples

### Button Component
```jsx
import Button from './components/atoms/Button';

<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>
```

### Course Card
```jsx
import CourseCard from './components/molecules/CourseCard';

<CourseCard course={{
  title: "UI/UX Design Mastery",
  mentor: "Rina Kusuma",
  price: "Rp 450K",
  rating: "4.9 (3.4K)"
}} />
```

---

## 🔧 Configuration

### Tailwind CSS Custom Theme


Custom colors and fonts are defined in `src/index.css`:

```css
@theme {
  --color-primary: #34A853;
  --color-secondary: #FF9900;
  --color-accent: #F64920;
  --color-bg-premium: #FFFDF3;
  --font-heading: 'Poppins', sans-serif;
  --font-sans: 'DM Sans', sans-serif;
}
```

### Vite Configuration

The project uses Vite with React and Tailwind CSS plugins:

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

---

## 🌟 Features in Detail

### 🔍 Smart Course Filtering
- Category-based filtering (All, Marketing, Design, Business, etc.)
- Real-time search across course titles, mentors, and descriptions
- Instant results with smooth animations

### 🎯 Dynamic Rating System
- Visual star rating display
- Percentage-based fill calculation
- Support for decimal ratings (e.g., 4.8/5)

### 🔐 Form Validation
- Real-time email format validation
- Password strength requirements
- Instant error feedback
- Clear error messages

### 📱 Mobile-First Design
- Hamburger menu for mobile navigation
- Touch-friendly interactive elements
- Optimized images for different screen sizes
- Smooth transitions and animations

---

## 🎓 Learning Resources

This project demonstrates:
- ✅ Modern React patterns (Hooks, Functional Components)
- ✅ Component composition and reusability
- ✅ State management with useState
- ✅ Side effects with useEffect
- ✅ Client-side routing with React Router
- ✅ Responsive design with Tailwind CSS
- ✅ Form handling and validation
- ✅ Atomic Design methodology

---

## 📈 Performance

- ⚡ **Fast Initial Load** - Optimized bundle size with code splitting
- 🔄 **Instant HMR** - Hot Module Replacement for rapid development
- 📦 **Small Bundle** - Tree-shaking and minification
- 🖼️ **Lazy Loading** - Images load on demand
- 🎯 **Optimized Assets** - Compressed images and fonts

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Alief Alfarizy**

- GitHub: [@alfarizyalief3-dotcom](https://github.com/alfarizyalief3-dotcom)
- Project Link: [Video-Belajar-App](https://github.com/alfarizyalief3-dotcom/Video-Belajar-App)

---

## 🙏 Acknowledgments

- [React](https://react.dev) - The library for web and native user interfaces
- [Vite](https://vitejs.dev) - Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework
- [Unsplash](https://unsplash.com) - Beautiful free images
- [DiceBear](https://dicebear.com) - Avatar generation API

---

<div align="center">
  
  ### ⭐ Star this repo if you find it helpful!
  
  Made with ❤️ by Alief Alfarizy
  
</div>
