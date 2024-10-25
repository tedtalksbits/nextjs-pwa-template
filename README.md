This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Libraries Used

This project includes the following libraries:

- **mongoose**: Elegant MongoDB object modeling for Node.js.
- **shadcn/radix**: A utility-first CSS framework for rapidly building custom user interfaces.
- **@tremor/react**: A React library for building data-driven dashboards.
- **@tanstack-query**: Powerful data synchronization and caching for React.
- **tailwindcss**: A utility-first CSS framework for rapid UI development.
- **@kinde-oss/kinde-auth-nextjs**: Kinde authentication SDK for Next.js.

## Requirements 🚨

- Kinde account to use this project. [Kinde Docs](https://docs.kinde.com/developer-tools/sdks/backend/nextjs-sdk/)
- MongoDB url, local or cloud, to use this project. [MongoDB installation locally](https://www.mongodb.com/docs/manual/installation/)

## Getting Started

### 1. Create a `.env.local` file in the root of your project and add the following environment variables:

```env
# MongoDB URL
NEXT_PUBLIC_MONGODB_URI=your_mongodb_url_here

# Kinde environment variables
KINDE_CLIENT_ID=your_kinde_client_id_here
KINDE_CLIENT_SECRET=your_kinde_client_secret_here
KINDE_DOMAIN=your_kinde_domain_here
```

see the `.example.env.local` file for an example.

### 2. Install dependencies

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
