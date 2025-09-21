import React from 'react';

const Footer = () => {
  return (
    <div className="text-center py-6 bg-[var(--cream)] border-t border-[rgba(0,0,0,0.05)]">
      <p className="text-sm text-[var(--text-light)]">
        Powered by{' '}
        <a
          href="https://dataorbitllc.com"
          target="_blank"
          rel="noopener noreferrer"
          className="
            font-medium transition
            bg-[linear-gradient(135deg,var(--gold),var(--emerald))]
            bg-clip-text text-transparent
            hover:opacity-80
          "
        >
          DataOrbit
        </a>
      </p>
    </div>
  );
};

export default Footer;
