import type { Metadata, Viewport } from 'next';
import { Mulish } from 'next/font/google';
import './globals.css';
import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/server';
import { Button } from '@/components/ui/button';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';
import ThemeSwitch from '@/components/theme-switch';
import GoBack from '@/components/ui/go-back-button';
import { config } from '@/site/config';

const font = Mulish({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: config.name,
  description: config.description,
  icons: [
    { rel: 'icon', url: './apple-touch-icon.png' },
    { rel: 'apple-touch-icon', url: './apple-touch-icon.png' },
  ],
  appleWebApp: {
    statusBarStyle: 'black-translucent',
    title: config.name,
    capable: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'contain',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafd' },
    { media: '(prefers-color-scheme: dark)', color: '#020814' },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = getKindeServerSession();
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={font.className}
        style={{
          minHeight: '100dvh',
        }}
      >
        <ReactQueryProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            {!(await isAuthenticated()) ? (
              <main className='auth grid h-screen w-screen sm:grid-cols-2'>
                <section className='auth-content col-span-1 flex flex-col items-center justify-center p-8 shadow-lg'>
                  <div className='auth-content-center'>
                    <div className='text mb-16'>
                      <small>Welcome to </small>
                      <h2 className='text-2xl font-bold leading-10'>
                        {config.name}
                      </h2>
                      <p className='mt-2 text-sm text-foreground/70'>
                        {config.description}
                      </p>
                    </div>
                    <div className='mt-4 flex flex-col space-y-4'>
                      <LoginLink className='btn'>
                        <Button className='block w-full'>Login</Button>
                      </LoginLink>
                      <p className='text-center text-sm'>or</p>
                      <RegisterLink>
                        <Button variant='outline' className='block w-full'>
                          Register
                        </Button>
                      </RegisterLink>
                    </div>
                  </div>
                </section>
                <div className='relative col-span-1 hidden select-none overflow-hidden rounded-l-3xl bg-gradient-to-r from-primary/5 to-background sm:block'></div>
              </main>
            ) : (
              <main className='app flex min-h-[100dvh] flex-col'>
                <section className='app-content p-3 flex flex-col overflow-y-auto relative'>
                  {children}
                </section>
              </main>
            )}
            <Toaster richColors />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
