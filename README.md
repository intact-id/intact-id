# Intact ID website

Marketing site for Intact ID: the homepage and one landing page per product.

| Route | Page |
| --- | --- |
| `/` | Homepage (`src/pages/HomePage.jsx`) |
| `/kyc` | KYC landing page (`src/pages/KycPage.jsx`) |

The header is shared (`src/components/Nav.jsx`). Images live in `public/site-assets/`.
Each page's styles are scoped to its root class (`.pg-home`, `.pg-kyc`) so pages can't affect each other.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # output in dist/, deployed by Vercel
```

To add a product page: create `src/pages/<Name>Page.jsx`, add a `<Route>` in `src/App.jsx`,
and point its menu item in `Nav.jsx` at the new path.
