CREATE TABLE IF NOT EXISTS category_budgets (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    category VARCHAR(255) NOT NULL,
    budget NUMERIC(10,2) NOT NULL,
    CONSTRAINT uq_user_category UNIQUE (user_id, category),
    CONSTRAINT fk_category_budget_user FOREIGN KEY (user_id) REFERENCES users(id)
);
