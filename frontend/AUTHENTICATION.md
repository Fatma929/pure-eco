# PureEco Authentication Flow Documentation

## Overview
This document describes the complete authentication system implemented for PureEco, including login, signup, and global state management.

## Architecture

### File Structure
```
src/
├── contexts/
│   └── AuthContext.tsx          # Global authentication state management
├── pages/
│   └── auth/
│       ├── Login.tsx            # Login page component
│       ├── Signup.tsx           # Signup page component
│       └── index.ts             # Barrel export
├── components/
│   ├── ProtectedRoute.tsx       # Route guard for authenticated pages
│   └── Navbar.tsx               # Updated with logout functionality
└── App.tsx                      # Updated with routing and auth provider
```

## Components

### 1. AuthContext.tsx
**Purpose**: Manages global authentication state and provides auth methods

**Key Features**:
- **State Management**: Stores current user and loading state
- **Persistence**: Saves user data to localStorage for session persistence
- **Methods**:
  - `login(email, password)`: Simulates login (replace with API call)
  - `signup(email, password, organizationName)`: Simulates signup
  - `logout()`: Clears user state and localStorage

**Usage**:
```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Use auth context
}
```

### 2. Login Page (Login.tsx)
**Purpose**: Handles user authentication

**Features**:
- ✅ Email validation (must be valid email format)
- ✅ Password validation (minimum 6 characters)
- ✅ Show/hide password toggle
- ✅ Error handling and display
- ✅ Responsive design (works on mobile, tablet, desktop)
- ✅ Clean minimalist UI with white/slate theme
- ✅ Loading state with spinner
- ✅ Link to signup page

**Form Validation** (using Zod):
```typescript
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
```

### 3. Signup Page (Signup.tsx)
**Purpose**: Handles new user registration

**Features**:
- ✅ Organization name field (required)
- ✅ Email validation
- ✅ Password validation with strength requirements
- ✅ Password confirmation matching
- ✅ Show/hide password toggles
- ✅ Terms of Service acceptance
- ✅ Error handling
- ✅ Responsive design
- ✅ Loading state

**Form Validation** (using Zod):
```typescript
const signupSchema = z.object({
  organizationName: z.string().min(2, 'Organization name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
```

### 4. ProtectedRoute.tsx
**Purpose**: Guards routes that require authentication

**Features**:
- Redirects unauthenticated users to login page
- Shows loading spinner while checking auth status
- Seamlessly redirects authenticated users to requested page

**Usage**:
```typescript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## Form Validation
**Libraries Used**:
- `react-hook-form`: Efficient form state management
- `zod`: Schema validation
- `@hookform/resolvers`: Integration between react-hook-form and zod

**Benefits**:
- ✅ Client-side validation for better UX
- ✅ Type-safe validation schemas
- ✅ Minimal re-renders
- ✅ Custom error messages

## Design System

### Colors
- **Primary**: Emerald (#10B981)
- **Background**: White/Slate gray (#F1F5F9)
- **Text**: Slate-900 (#0F172A)
- **Borders**: Slate-200 (#E2E8F0)
- **Errors**: Red (#DC2626)

### Responsive Breakpoints
- **Mobile**: < 640px (focus on single column, hamburger menu)
- **Tablet**: 640px - 1024px (2-column layouts where possible)
- **Desktop**: 1024px+ (full multi-column layouts)

### Key Classes Used
- `min-h-screen`: Full height page
- `bg-gradient-to-br`: Subtle gradient backgrounds
- `shadow-md shadow-slate-200/50`: Subtle shadows
- `focus:ring-emerald-500`: Accessible focus states
- `transition`: Smooth animations

## Routing Structure

```
/login              → Login page (public)
/signup             → Signup page (public)
/                   → Dashboard (protected)
/*                  → Redirects to /
```

## User State Structure

```typescript
interface AuthUser {
  id: string;              // Unique user ID
  email: string;           // User email
  organizationName?: string; // Organization (only for signed-up users)
}
```

## Integration with Navbar

The Navbar component has been updated to:
- Display user information
- Show organization name (if available)
- Provide logout functionality
- Display user initial in avatar
- Work responsively on all devices

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

All required packages are already installed:
- `react-hook-form`
- `zod`
- `@hookform/resolvers`
- `react-router-dom`

### 2. Run Development Server
```bash
npm run dev
```

The app will start at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

## API Integration (TODO)

**Current State**: The authentication uses simulated API calls

**To Integrate with Real Backend**:

1. Update AuthContext.tsx login method:
```typescript
const login = useCallback(async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  // Handle token storage and user state
}, []);
```

2. Add Bearer token to requests:
```typescript
headers: {
  'Authorization': `Bearer ${localStorage.getItem('authToken')}`
}
```

3. Handle token expiration and refresh

## Testing Credentials (Demo Mode)

Since the app uses simulated auth:
- **Email**: Any valid email format (e.g., user@example.com)
- **Password**: Any string with 6+ characters
- The auth status persists in localStorage

## Accessibility Features

- ✅ Semantic HTML structure
- ✅ Form labels properly associated with inputs
- ✅ Error messages clearly linked to fields
- ✅ Keyboard navigation support
- ✅ Focus indicators on interactive elements
- ✅ Color contrast meets WCAG standards
- ✅ Loading states prevent double submission

## Security Considerations

**Current Implementation**:
- Passwords stored in component state only (demo mode)
- User data persisted in localStorage (for demo)

**Production Recommendations**:
- Never store passwords on client side
- Use secure HTTP-only cookies for tokens
- Implement CSRF protection
- Use HTTPS for all auth endpoints
- Implement rate limiting on login/signup endpoints
- Add 2FA for sensitive accounts
- Sanitize and validate all inputs server-side
- Store password hashes server-side only

## Future Enhancements

- [ ] Social login (Google, GitHub, etc.)
- [ ] Email verification
- [ ] Password reset flow
- [ ] Two-factor authentication
- [ ] User profile editing
- [ ] Role-based access control
- [ ] OAuth 2.0 integration
- [ ] Custom form validation messages per field

## Troubleshooting

### Issue: "useAuth must be used within an AuthProvider"
**Solution**: Ensure the component is within the `<AuthProvider>` in App.tsx

### Issue: Routes not working
**Solution**: Check that `<BrowserRouter>` wraps the entire app in main.tsx or root layout

### Issue: User data not persisting
**Solution**: Check browser's localStorage is enabled. Data persists across page refreshes.

### Issue: Form validation not triggering
**Solution**: Ensure `@hookform/resolvers` is properly integrated with the schema

## Support

For questions or issues regarding the authentication system, please refer to:
- React Hook Form docs: https://react-hook-form.com/
- Zod documentation: https://zod.dev/
- React Router docs: https://reactrouter.com/
