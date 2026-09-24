import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { DealController } from './controllers/dealController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for all origins (frontend connection)
app.use(cors());
app.use(express.json());

// Root landing route (resolves "Cannot GET /" when visiting base URL)
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'SharkIT FinPulse API is live and operational',
    endpoints: {
      health: '/health',
      deals: '/api/deals'
    },
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', engine: 'MySQL' });
});

// Deal routes
app.get('/api/deals', DealController.list);
app.post('/api/deals', DealController.create);

// 404 fallback for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});