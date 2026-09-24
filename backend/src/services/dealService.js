import { randomUUID } from 'crypto';
import { DealRepository } from '../repositories/dealRepository.js';

export const DealService = {
  getDeals: async (type) => {
    return await DealRepository.findAll(type);
  },

  postDeal: async (data) => {
    const payload = {
      id: randomUUID(),
      company_name: data.company_name.trim(),
      founder_name: data.founder_name.trim(),
      sector: data.sector.trim(),
      pitch: data.pitch.trim(),
      funding_type: data.funding_type,
      amount_sought: Math.round(Number(data.amount_sought)),
      equity_offered: data.funding_type === 'Equity' ? Number(data.equity_offered) : null
    };

    return await DealRepository.create(payload);
  }
};