export const calculateQuote = (userData) => {
    // Base premium calculation
    let basePremium = 800; // Annual base premium
    
    // Property type adjustments
    const propertyMultipliers = {
      'single_family': 1.0,
      'apartment': 0.6,
      'townhouse': 0.8,
      'duplex': 1.2
    };
    
    // Construction year adjustments (older = higher risk)
    const currentYear = new Date().getFullYear();
    const houseAge = currentYear - parseInt(userData.construction_year || currentYear);
    let ageMultiplier = 1.0;
    if (houseAge > 50) ageMultiplier = 1.4;
    else if (houseAge > 30) ageMultiplier = 1.2;
    else if (houseAge > 15) ageMultiplier = 1.1;
    else if (houseAge > 5) ageMultiplier = 1.0;
    else ageMultiplier = 0.95; // New construction discount
    
    // Home value adjustments - coverage limit
    const homeValue = parseInt(userData.home_value || 300000);
    const dwellingLimit = Math.min(homeValue * 1.2, homeValue + 100000);
    
    // Calculate premium based on coverage amount
    const coverageMultiplier = dwellingLimit / 300000; // Base coverage is 300k
    
    // Construction material adjustments
    const materialMultipliers = {
      'frame': 1.0,
      'masonry': 0.85, // Fire resistant
      'steel': 0.9,
      'mixed': 1.05
    };
    
    // Safety features discounts
    const discounts = [];
    let safetyMultiplier = 1.0;
    
    if (userData.smoke_detectors && userData.smoke_detectors !== 'none') {
      safetyMultiplier *= 0.95;
      discounts.push('Smoke Detector Discount (5%)');
    }
    
    // Coverage preference adjustments
    const coverageMultipliers = {
      'basic': 0.8,
      'standard': 1.0,
      'premium': 1.4
    };
    
    // Deductible adjustment (higher deductible = lower premium)
    const deductibleMultipliers = {
      '500': 1.15,
      '1000': 1.0,
      '2500': 0.85,
      '5000': 0.7
    };
    
    // Calculate final premium
    const annualPremium = Math.round(
      basePremium * 
      (propertyMultipliers[userData.property_type] || 1.0) *
      ageMultiplier *
      coverageMultiplier *
      (materialMultipliers[userData.construction_material] || 1.0) *
      safetyMultiplier *
      (coverageMultipliers[userData.coverage_preference] || 1.0) *
      (deductibleMultipliers[userData.deductible] || 1.0)
    );
    
    const monthlyPremium = Math.round(annualPremium / 12);
    
    return {
      monthly: `$${monthlyPremium}`,
      annual: `$${annualPremium}`,
      dwelling_limit: dwellingLimit,
      discounts: discounts
    };
  };