CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    search_query VARCHAR(255) NOT NULL, 
    category VARCHAR(50),
    image VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE price_snapshots(   
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID references products(id),
    price DECIMAL(10,2),
    merchant VARCHAR(50),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    snapshot_date DATE DEFAULT CURRENT_DATE,
    source VARCHAR(255),
    CONSTRAINT unique_product_snapshot UNIQUE (product_id, snapshot_date)
);