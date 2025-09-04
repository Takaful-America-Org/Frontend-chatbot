import React from 'react';
import BackgroundPattern from './BackgroundPattern';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div
      className="
        min-h-screen relative overflow-x-hidden overflow-y-hidden flex flex-col
        bg-[linear-gradient(135deg,var(--deep)_0%,var(--navy)_100%)]
        text-[var(--text-dark)]
      "
    >
      {/* Islamic floating dots pattern */}
      <BackgroundPattern />

      {/* Header */}
      <Header />

      {/* Page content */}
      <div className="max-w-2xl mx-auto px-8 relative z-10 flex-1">
        {children}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
