# PrimeHoddie E-Commerce Platform - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Firebase Configuration  
Your Firebase credentials are already in `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyA17FmT6Im-dkDI3366a0qd3TXBoklO_vE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=primehoddies.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=primehoddies
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=primehoddies.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=398696967384
NEXT_PUBLIC_FIREBASE_APP_ID=1:398696967384:web:7365d7fc96a2b1f3ed3bad
```

### 3. Create Admin Account in Firebase Console
1. Go to https://console.firebase.google.com
2. Select "primehoddies" project
3. Go to Authentication > Users
4. Click "Add user"
5. Email: `admin@primehoddie.com`
6. Password: `Admin123456` (change this after login!)
7. Click "Custom claims" button and add:
```json
{
  "admin": true
}
```

### 4. Set Up Firestore Collections
In Firebase Console, create these Firestore collections:

#### Collection: products
```
Fields:
- name: string
- price: number
- description: string
- category: string
- image: string (URL)
- stock: number
- inStock: boolean
- createdAt: timestamp
- updatedAt: timestamp
```

#### Collection: orders
```
Fields:
- userId: string
- items: array of {productId, productName, price, quantity, color, size}
- total: number
- subtotal: number
- tax: number
- shipping: number
- status: string (pending|confirmed|shipped|delivered|cancelled)
- shippingAddress: object
- createdAt: timestamp
- updatedAt: timestamp
```

#### Collection: users
```
Fields:
- name: string
- email: string
- phone: string (optional)
- role: string (customer|admin)
- createdAt: timestamp
- updatedAt: timestamp
```

### 5. Run Development Server
```bash
npm run dev
```

Visit:
- Shop: http://localhost:3000
- Admin: http://localhost:3000/admin/login

## Admin Features

### Dashboard
- View revenue summary
- Total orders count
- Total products count
- Recent orders preview

### Product Management
- Add new products
- Edit product details
- Delete products
- View stock levels

### Order Management
- View all customer orders
- Update order status (pending → confirmed → shipped → delivered)
- View order details and shipping address
- Track customer information

## User Roles

### Customer
- Browse shop
- Add to cart
- Customize Hoddies (3D)
- Place orders
- View order history (coming soon)

### Admin
- Full access to admin dashboard
- Manage products (add/edit/delete)
- Manage orders (view/update status)
- View analytics

## Database Schema

### Products
Store product inventory with pricing, descriptions, and stock info.

### Orders  
Track customer orders with items, shipping, and status updates.

### Users
User profiles for customers and admins with authentication data.

## File Structure

```
app/
├── admin/
│   ├── login/          # Admin authentication
│   ├── dashboard/      # Admin home
│   ├── products/       # Product management
│   │   ├── new/        # Add product
│   │   └── [id]/       # Edit product
│   └── orders/         # Order management
├── auth/               # User authentication
├── shop/               # Product catalog
├── customize/          # 3D customizer
├── cart/               # Shopping cart
└── checkout/           # Checkout flow

lib/
├── firebase.ts         # Firebase config
├── firestore-service.ts # Database operations
├── db-types.ts         # TypeScript interfaces
├── store.ts            # Zustand state management
└── auth-store.ts       # Auth state

src/
├── components/         # React components
└── sections/           # Homepage sections
```

## Important Notes

1. **Admin Credentials**: Change password after first login
2. **Firebase Rules**: Configure Firestore security rules for production
3. **Images**: Use image URLs or upload to Firebase Storage
4. **Customizer**: 3D preview uses React Three Fiber

## Troubleshooting

**Admin login fails:**
- Verify custom claims are set in Firebase Console
- Check email and password match

**Products not showing:**
- Ensure products collection is created in Firestore
- Verify product documents have all required fields

**Orders not saving:**
- Check Firestore orders collection is created
- Verify user is authenticated

## Next Steps

1. Configure Firestore security rules
2. Set up payment processing (Stripe)
3. Add email notifications
4. Deploy to production
5. Change admin credentials

For support, check the main README.md or Firebase documentation.
