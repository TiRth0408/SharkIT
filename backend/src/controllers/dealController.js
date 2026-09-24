import { DealService } from '../services/dealService.js';
import { validateDealInput } from '../validators/dealValidator.js';

export const DealController = {
  list: async (req, res) => {
    try {
      const type = req.query.type;
      const deals = await DealService.getDeals(type);
      return res.status(200).json({ success: true, count: deals.length, data: deals });
    } catch (err) {
      console.error('DATABASE ERROR DETAILS:', err);
      return res.status(500).json({ 
        success: false, 
        error: err.message,
        code: err.code 
      });
    }
  },

  create: async (req, res) => {
    try {
      const { isValid, errors } = validateDealInput(req.body);
      if (!isValid) {
        return res.status(400).json({ success: false, errors });
      }

      const created = await DealService.postDeal(req.body);
      return res.status(201).json({ success: true, data: created });
    } catch (err) {
      console.error('DATABASE INSERT ERROR:', err);
      return res.status(500).json({ 
        success: false, 
        error: err.message,
        code: err.code 
      });
    }
  }
};