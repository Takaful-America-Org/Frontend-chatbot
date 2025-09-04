interface QuoteResultProps {
  quote: {
    monthly: number;
    annual: number;
    dwelling_limit: number;
    discounts: string[];
  };
}

const QuoteResult: React.FC<QuoteResultProps> = ({ quote }) => {

  return (
    <div className="text-center p-6 takaful-quote">
      {/* Title */}
      <h3 className="text-xl font-semibold text-[var(--deep)] mb-4 font-serif">
        Your Shariah-Compliant Quote is Ready! 🎉
      </h3>

      {/* Monthly Price */}
      <div className="text-4xl font-extrabold my-4 bg-[linear-gradient(135deg,var(--gold),var(--emerald))] bg-clip-text text-transparent">
        ${quote.monthly}/month
      </div>

      {/* Annual Premium */}
      <div className="text-[var(--text-light)] mb-8">
        Annual Premium: ${quote.annual}
      </div>

      {/* Coverage Details */}
      <div className="bg-[var(--pearl)] rounded-[20px] p-6 mb-6 text-left shadow-sm border-t-4 border-[var(--gold)]">
        <h4 className="text-[var(--deep)] mb-4 font-serif font-semibold">
          ☪️ Your Coverage Details:
        </h4>
        <ul className="space-y-2 text-sm text-[var(--text-dark)]">
          <li>Dwelling: ${quote.dwelling_limit.toLocaleString()}</li>
          <li>Personal Property: ${Math.round(quote.dwelling_limit * 0.75).toLocaleString()}</li>
          <li>Liability: ${Math.min(quote.dwelling_limit, 500000).toLocaleString()}</li>
          <li>24/7 Claims Support</li>
          <li>Emergency Repairs Coverage</li>
        </ul>
      </div>

      {/* Discounts */}
      <div className="bg-[var(--cream)] rounded-[16px] p-4 mb-6 text-left border border-[var(--gold)]">
        <h4 className="text-[var(--emerald)] mb-2 font-semibold">🎉 Applied Discounts:</h4>
        <ul className="text-sm text-[var(--text-dark)]">
          {quote.discounts.map((discount, i) => <li key={i}>• {discount}</li>)}
        </ul>
      </div>

      {/* Islamic Assurance */}
      <div className="bg-[var(--pearl)] rounded-[16px] p-4 text-left border-l-4 border-[var(--gold)]">
        <h4 className="text-[var(--deep)] mb-2 font-serif font-semibold">☪️ Islamic Assurance</h4>
        <p className="text-[var(--text-light)] text-sm leading-relaxed">
          This quote is 100% Shariah-compliant, reviewed by our Islamic Advisory Board. No riba, no gharar, no haram investments.
        </p>
      </div>
    </div>
  );
};

export default QuoteResult;
