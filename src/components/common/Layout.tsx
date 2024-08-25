import React from 'react';
import { Container } from '@mui/material';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <Container maxWidth="lg" className='my-2'>
            <main style={{ flex: '1 0 auto' }}>
                {children}
            </main>
        </Container>
        <Footer />
    </div>
  );
}

export default Layout;
