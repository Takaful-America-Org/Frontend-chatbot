import React from 'react';

const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 animate-pattern-float">
   
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0B2545_0%,#1e3a5f_100%)]"></div>
  
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_25%_25%,#D4AF37_1px,transparent_1px),radial-gradient(circle_at_75%_75%,#2E8B57_1px,transparent_1px)] bg-[length:60px_60px] bg-[position:0_0,30px_30px]"></div>
    </div>
  );
};

export default BackgroundPattern;
