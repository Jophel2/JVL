-- V1__Create_Users_Table.sql
-- Initial database schema for PisofMind MVP

-- Create ENUM type for UserRank if using PostgreSQL
CREATE TYPE user_rank AS ENUM (
    'ROOKIE_SAVER',
    'ELITE_SAVER',
    'MASTER_SAVER',
    'LEGENDARY_SAVER',
    'MYTHICAL_SAVER',
    'IMMORTAL_SAVER'
);

-- Create ENUM type for ExpenseCategory
CREATE TYPE expense_category AS ENUM (
    'SCHOOL_ALLOWANCE',
    'PROJECTS',
    'FACILITIES',
    'WANTS'
);

-- Create users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    age INTEGER NOT NULL,
    budget DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    rank user_rank NOT NULL DEFAULT 'ROOKIE_SAVER',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster login queries
CREATE INDEX idx_users_email ON users(email);

-- Create expenses table
CREATE TABLE expenses (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category expense_category NOT NULL,
    description VARCHAR(500) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_expenses_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indices for expenses for fast queries
CREATE INDEX idx_expenses_user_id ON expenses(user_id);
CREATE INDEX idx_expenses_created_at ON expenses(created_at);
CREATE INDEX idx_expenses_category ON expenses(category);

-- Multi-column index for category-based filtering
CREATE INDEX idx_expenses_user_category ON expenses(user_id, category);
