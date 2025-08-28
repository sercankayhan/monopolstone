# Claude AI Assistant Guidelines for Artificial Stone Website Project

## Project Context
This document outlines how Claude AI will assist throughout the development of the artificial stone manufacturing company's website and dashboard system. Claude will provide development support, code reviews, problem-solving, and technical guidance.

## Claude's Role in the Project

### Development Support
- **Code Generation:** Create React components, API endpoints, and database schemas
- **Code Review:** Analyze code quality, performance, and best practices
- **Debugging:** Help identify and resolve technical issues
- **Architecture Guidance:** Provide recommendations for system design and structure

### Technical Expertise Areas
- **Frontend Development:** React, TypeScript, Tailwind CSS, responsive design
- **Backend Development:** Node.js, Express, MongoDB, API design
- **Database Design:** Schema optimization, query performance, data modeling
- **DevOps:** Deployment strategies, performance optimization, security practices

## Communication Protocols

### Code Requests
When requesting code assistance:
1. **Specify Requirements:** Clearly define functionality needs
2. **Provide Context:** Share existing code structure and dependencies
3. **Define Constraints:** Mention performance, accessibility, or browser requirements
4. **Include Examples:** Provide mockups, wireframes, or reference implementations

### Problem-Solving Format
For technical issues:
```
Problem Description:
- What is happening vs. what should happen
- Steps to reproduce the issue
- Error messages or console logs
- Browser/environment information

Attempted Solutions:
- What has been tried already
- Results of previous attempts

Expected Outcome:
- Desired functionality or resolution
```

### Code Review Process
For code reviews:
1. **Share Complete Context:** Include relevant files and dependencies
2. **Specify Review Focus:** Performance, security, maintainability, etc.
3. **Request Specific Feedback:** Areas of concern or improvement
4. **Include Test Cases:** Current testing approach and coverage

## Development Standards

### Code Quality Guidelines
- **TypeScript Usage:** Strong typing for all components and functions
- **Component Structure:** Functional components with hooks
- **Naming Conventions:** Descriptive, consistent naming patterns
- **Error Handling:** Comprehensive error boundaries and try-catch blocks
- **Performance:** Memoization, lazy loading, and optimization techniques

### Security Best Practices
- **Input Validation:** Client and server-side validation
- **Authentication:** Secure token management and session handling
- **Data Protection:** Encryption for sensitive information
- **API Security:** Rate limiting, CORS configuration, sanitization

### Accessibility Requirements
- **WCAG 2.1 Compliance:** AA level accessibility standards
- **Semantic HTML:** Proper markup structure and roles
- **Keyboard Navigation:** Full keyboard accessibility
- **Screen Reader Support:** ARIA labels and descriptions
- **Color Contrast:** Minimum 4.5:1 ratio for normal text

## Technical Specifications

### Frontend Architecture
```typescript
src/
├── components/
│   ├── ui/           // Reusable UI components
│   ├── layout/       // Layout components
│   └── features/     // Feature-specific components
├── pages/            // Page components
├── hooks/            // Custom React hooks
├── utils/            // Utility functions
├── types/            // TypeScript type definitions
└── styles/           // Global styles and themes
```

### Backend Architecture
```
src/
├── routes/           // API route handlers
├── controllers/      // Business logic controllers
├── models/           // Database models
├── middleware/       // Custom middleware
├── utils/            // Helper functions
├── config/           // Configuration files
└── types/            // TypeScript interfaces
```

### Database Schema Guidelines
- **Consistent Naming:** camelCase for fields, PascalCase for models
- **Data Validation:** Mongoose validators and custom validation
- **Indexing:** Appropriate indexes for query performance
- **Relationships:** Proper referencing and population strategies

## Performance Optimization

### Frontend Performance
- **Code Splitting:** Route-based and component-based splitting
- **Image Optimization:** WebP format, lazy loading, responsive images
- **Bundle Analysis:** Regular bundle size monitoring and optimization
- **Caching Strategies:** Browser caching and service worker implementation

### Backend Performance
- **Database Queries:** Optimized aggregation pipelines and indexes
- **Caching:** Redis for session and query caching
- **API Optimization:** Response compression and pagination
- **Monitoring:** Performance tracking and bottleneck identification

## Responsive Design Strategy

### Breakpoint System
```css
/* Mobile First Approach */
sm: '640px',   // Small devices
md: '768px',   // Medium devices
lg: '1024px',  // Large devices
xl: '1280px',  // Extra large devices
2xl: '1536px'  // 2X Extra large devices
```

### Component Responsiveness
- **Flexible Layouts:** CSS Grid and Flexbox for adaptive layouts
- **Typography Scaling:** Responsive font sizes using clamp()
- **Image Handling:** Responsive images with srcset and sizes
- **Touch Interactions:** Touch-friendly button sizes and gestures

## Testing Approach

### Frontend Testing
```typescript
// Component Testing Example
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  test('displays product information correctly', () => {
    // Test implementation
  });
});
```

### Backend Testing
```javascript
// API Testing Example
describe('Product API', () => {
  test('GET /api/products returns product list', async () => {
    // Test implementation
  });
});
```

### Integration Testing
- **End-to-End:** Complete user journey testing
- **API Integration:** Frontend-backend communication testing
- **Database Integration:** Data persistence and retrieval testing

## Error Handling Patterns

### Frontend Error Handling
```typescript
// Error Boundary Component
class ErrorBoundary extends React.Component {
  // Implementation details
}

// Async Error Handling
const handleAsyncOperation = async () => {
  try {
    const result = await apiCall();
    return result;
  } catch (error) {
    console.error('Operation failed:', error);
    // Error reporting and user notification
  }
};
```

### Backend Error Handling
```javascript
// Global Error Handler
app.use((error, req, res, next) => {
  console.error(error.stack);
  
  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: error.message });
  }
  
  res.status(500).json({ message: 'Internal server error' });
});
```

## Content Management System

### CMS Requirements
- **Content Types:** Products, Images, Pages, Settings
- **User Roles:** Admin, Editor, Viewer permissions
- **Workflow:** Draft, Review, Published states
- **Version Control:** Content history and rollback capabilities

### API Design Patterns
```typescript
// RESTful API Structure
GET    /api/products          // Get all products
GET    /api/products/:id      // Get single product
POST   /api/products          // Create product
PUT    /api/products/:id      // Update product
DELETE /api/products/:id      // Delete product

// Response Format
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

## Deployment and DevOps

### Deployment Pipeline
1. **Development:** Local development with hot reload
2. **Staging:** Pre-production testing environment
3. **Production:** Live production deployment
4. **Monitoring:** Continuous monitoring and alerting

### Environment Configuration
```javascript
// Environment Variables
const config = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  // Other configuration options
};
```

## Support and Maintenance

### Code Documentation
- **JSDoc Comments:** Function and component documentation
- **README Files:** Setup and deployment instructions
- **API Documentation:** Comprehensive endpoint documentation
- **Architecture Diagrams:** System overview and data flow

### Knowledge Transfer
- **Code Walkthroughs:** Explaining complex implementations
- **Best Practices:** Development standards and conventions
- **Troubleshooting Guides:** Common issues and solutions
- **Performance Tips:** Optimization strategies and techniques

## Continuous Improvement

### Code Quality Metrics
- **Code Coverage:** Maintain >80% test coverage
- **Performance Budgets:** Bundle size and load time limits
- **Accessibility Scores:** Regular accessibility audits
- **Security Scans:** Automated vulnerability detection

### Feedback Integration
- **User Analytics:** Usage patterns and pain points
- **Performance Monitoring:** Real-world performance metrics
- **Error Tracking:** Production error monitoring and resolution
- **Feature Requests:** User feedback and enhancement priorities

This document serves as a comprehensive guide for leveraging Claude AI throughout the project lifecycle, ensuring consistent, high-quality development practices and optimal project outcomes.