-- 1. Create database (Optional, uncomment if setting up a fresh local instance)
-- CREATE DATABASE IF NOT EXISTS sharkit_deals;
-- USE sharkit_deals;

-- 2. Drop tables if they already exist (clean rebuild)
DROP TABLE IF EXISTS deals;
DROP TABLE IF EXISTS users;

-- 3. Users Table (Stores authentication & demo credentials)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(191) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Deals Table (Stores investment asks posted by founders)
CREATE TABLE deals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(150) NOT NULL,
  founder_name VARCHAR(120) NOT NULL,
  sector VARCHAR(100) NOT NULL,
  pitch TEXT NOT NULL,
  funding_type ENUM('Equity', 'Loan', 'Grant') NOT NULL DEFAULT 'Equity',
  amount_sought DECIMAL(15, 2) NOT NULL,
  equity_offered DECIMAL(5, 2) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_funding_type (funding_type),
  INDEX idx_created_at (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Seed Demo User (admin@sharkit.demo / sharkit2026)
INSERT INTO users (email, password, role)
VALUES ('admin@sharkit.demo', 'sharkit2026', 'admin');

-- 6. Seed Realistic Deal Data Across All Funding Types
INSERT INTO deals (company_name, founder_name, sector, pitch, funding_type, amount_sought, equity_offered, created_at)
VALUES 
  (
    'KisanPulse',
    'Aarav Patel',
    'AgriTech',
    'AI-powered satellite imagery predicting crop yield volatility for smallholder farmers.',
    'Equity',
    7500000.00,
    6.50,
    NOW() - INTERVAL 2 HOUR
  ),
  (
    'LogiGrid',
    'Neha Verma',
    'Supply Chain',
    'Automated micro-fulfillment routing reducing Tier-2 last-mile delivery costs by 28%.',
    'Loan',
    4000000.00,
    NULL,
    NOW() - INTERVAL 5 HOUR
  ),
  (
    'CleanHydro Tech',
    'Dr. Rajesh Nair',
    'CleanTech',
    'Low-cost modular solar desalination cells designed for rural drought resilience.',
    'Grant',
    2500000.00,
    NULL,
    NOW() - INTERVAL 1 DAY
  )