# Admin Credentials & Security Guide

## Default Admin Credentials

**Email:** admin@primehoddie.com  
**Password:** Admin123456  
**Access:** http://localhost:3000/admin/login

## ⚠️ IMPORTANT - First Time Setup

### 1. Create Admin Account in Firebase Console
Before the app can work, you MUST create the admin user in Firebase:

1. Go to https://console.firebase.google.com
2. Select your **primehoddies** project
3. Go to **Authentication** → **Users** tab
4. Click **"Add user"**
5. Enter:
   - Email: `admin@primehoddie.com`
   - Password: `Admin123456`
6. Click **"Create user"**

### 2. Add Admin Custom Claims
1. Still in Firebase Console, find the admin user you just created
2. Click on the user email
3. Scroll down to **"Custom claims"** section
4. Click the **edit icon** (pencil)
5. Paste this JSON:
```json
{
  "admin": true
}
```
6. Click **"Save"**

Now the admin account is fully configured!

## Security Best Practices

### Change Default Password
After first login, change your password:
1. Login to admin panel
2. Go to account settings (coming soon)
3. Change password to something secure

### Never Share Credentials
- Keep admin email and password confidential
- Use environment variables for secrets
- Never commit credentials to Git

### Firestore Security Rules
Set up proper security rules in Firebase Console:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - Public read, admin write
    match /products/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth.token.admin == true;
    }
    
    // Orders - User reads own, admin reads all, admin writes
    match /orders/{document=**} {
      allow read: if request.auth.token.admin == true 
        || request.auth.uid == resource.data.userId;
      allow write: if request.auth.token.admin == true;
    }
    
    // Users - Users read own, admin reads all, both write own
    match /users/{userId} {
      allow read: if request.auth.uid == userId 
        || request.auth.token.admin == true;
      allow write: if request.auth.uid == userId 
        || request.auth.token.admin == true;
    }
  }
}
```

## Admin Features Checklist

✅ **Dashboard**
- Revenue summary
- Orders count
- Products count
- Recent orders

✅ **Products Management**
- Add new product
- Edit product
- Delete product
- View inventory

✅ **Orders Management**
- View all orders
- Change order status
- View customer details
- See order items

## Troubleshooting

### "Not authorized as admin" Error
- Make sure custom claims are set correctly
- Verify email matches: admin@primehoddie.com
- Check Firebase Console for the user

### Products Not Showing
- Ensure products collection exists in Firestore
- Check all required fields are present
- Verify Firestore security rules allow reading

### Can't Login
- Verify user exists in Firebase Authentication
- Confirm password is correct (Admin123456)
- Check internet connection
- Try clearing browser cache

### Orders Not Saving
- Ensure orders collection is created
- Verify Firestore security rules are set
- Check user is authenticated
- Confirm customer is logged in when placing order

## Database Setup

### Create Collections in Firestore Console

**Step 1:** Create products collection
- Click "Create collection"
- Name: `products`
- Add first document with sample data

**Step 2:** Create orders collection
- Click "Create collection"  
- Name: `orders`
- This can be empty initially

**Step 3:** Create users collection
- Click "Create collection"
- Name: `users`
- This populates automatically when users register

## Environment Variables

Your `.env.local` already has the necessary Firebase configuration:
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyA17FmT6Im-dkDI3366a0qd3TXBoklO_vE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=primehoddies.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=primehoddies
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=primehoddies.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=398696967384
NEXT_PUBLIC_FIREBASE_APP_ID=1:398696967384:web:7365d7fc96a2b1f3ed3bad
```

**Note:** NEXT_PUBLIC_ variables are visible to the client. Never put sensitive secrets here.

## Production Deployment

### Before Going Live:
1. Change admin password
2. Set up proper Firestore security rules
3. Enable authentication methods needed
4. Configure Firebase backup settings
5. Set up monitoring and logging
6. Implement rate limiting
7. Add SSL certificates
8. Enable CORS restrictions

### Environment Variables for Production:
- Use Vercel Environment Secrets for sensitive data
- Never hardcode credentials
- Rotate keys regularly
- Use separate Firebase projects for dev/prod

## Support & Troubleshooting

If you encounter issues:
1. Check Firebase Console logs
2. Verify all collections exist
3. Confirm custom claims are set
4. Check browser console for errors
5. Review Firestore security rules

For more help, refer to:
- Firebase Documentation: https://firebase.google.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Firestore Documentation: https://firebase.google.com/docs/firestore
