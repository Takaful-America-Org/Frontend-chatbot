import React from 'react';

const Header = () => {
  return (
    <div className="text-center py-8 relative z-10">
      <a href="#" className="inline-flex items-center gap-2 text-4xl font-bold text-yellow-400 font-serif mb-2 hover:text-yellow-300 transition-colors">
        ☪ Takaful
      </a>
      <p className="text-white/80 text-xl font-light">
        Assalamu Alaikum! Let's get you protected with Shariah-compliant insurance
      </p>
    </div>
  );
};

export default Header;