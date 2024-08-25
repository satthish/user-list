// src/pages/_app.tsx
import { AppProps } from 'next/app';
import { UserProvider } from '@/context/UsersContext';
import Layout from '@/components/common/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </Layout>
  );
}

export default MyApp;
