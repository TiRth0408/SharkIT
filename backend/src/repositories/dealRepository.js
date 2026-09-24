import { pool } from '../config/db.js';

export const DealRepository = {
  findAll: async (fundingType) => {
    if (fundingType && ['Equity', 'Loan', 'Grant'].includes(fundingType)) {
      const [rows] = await pool.query(
        'SELECT * FROM deals WHERE funding_type = ? ORDER BY created_at DESC',
        [fundingType]
      );
      return rows;
    }
    const [rows] = await pool.query('SELECT * FROM deals ORDER BY created_at DESC');
    return rows;
  },

  create: async (deal) => {
    const query = `
      INSERT INTO deals (id, company_name, founder_name, sector, pitch, funding_type, amount_sought, equity_offered)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      deal.id,
      deal.company_name,
      deal.founder_name,
      deal.sector,
      deal.pitch,
      deal.funding_type,
      deal.amount_sought,
      deal.equity_offered
    ];
    await pool.query(query, values);
    const [rows] = await pool.query('SELECT * FROM deals WHERE id = ?', [deal.id]);
    return rows[0];
  }
};