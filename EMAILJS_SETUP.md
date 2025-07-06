### 4. Get Public Key
1. Go to **Account** → **API Keys**
2. Copy your **Public Key** (e.g., `user_123abc456def`)

### 5. Set Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 6. Add GitHub Secrets
1. Go to your GitHub repository
2. **Settings** → **Secrets and variables** → **Actions**
3. Add these secrets:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

## 🧪 Testing

### Local Testing
1. Set up your `.env.local` file
2. Run `npm run dev`
3. Test the contact form at `http://localhost:3000`
