export const validateDealInput = (data) => {
  const errors = [];

  // Guard: reject null/non-object bodies
  if (!data || typeof data !== 'object') {
    return { isValid: false, errors: ['Request body must be a valid JSON object.'] };
  }

  const { company_name, founder_name, sector, pitch, funding_type, amount_sought, equity_offered } = data;

  // Realism & quality constraints
  if (!company_name || String(company_name).trim().length < 2) {
    errors.push('Company name must be at least 2 characters.');
  }

  if (!founder_name || String(founder_name).trim().length < 3) {
    errors.push('Founder name must contain a first and last name.');
  }

  if (!sector || String(sector).trim().length < 3) {
    errors.push('Sector must be clearly specified.');
  }

  if (!pitch || String(pitch).trim().length < 1) {
    errors.push('Pitch is required.');
  }

  if (!['Equity', 'Loan', 'Grant'].includes(funding_type)) {
    errors.push('Funding type must be Equity, Loan, or Grant.');
  }

  const parsedAmount = Number(amount_sought);
  if (!amount_sought || isNaN(parsedAmount) || parsedAmount <= 0) {
    errors.push('Amount sought must be a positive number.');
  }

  if (funding_type === 'Equity') {
    const parsedEquity = Number(equity_offered);
    // Must be >= 0.5 to match the error message ("between 0.5% and 49%")
    if (equity_offered === undefined || equity_offered === null || equity_offered === '' || isNaN(parsedEquity) || parsedEquity < 0.5 || parsedEquity > 49) {
      errors.push('Equity offered for seed deals must be between 0.5% and 49%.');
    }
  }

  return { isValid: errors.length === 0, errors };
};