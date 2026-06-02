ALTER TABLE category_budgets
    ADD COLUMN IF NOT EXISTS period VARCHAR(255) NOT NULL DEFAULT 'MONTHLY';

UPDATE category_budgets
    SET period = 'MONTHLY'
    WHERE period IS NULL;
