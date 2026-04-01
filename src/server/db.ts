import pg from 'pg';
import dotenv from 'dotenv';
import { products as initialProducts } from '../data/products';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : true,
});

export async function initDb() {
  const client = await pool.connect();
  try {
    // Create products table
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price INTEGER NOT NULL,
        "originalPrice" INTEGER,
        image TEXT NOT NULL,
        images JSONB NOT NULL,
        description TEXT NOT NULL,
        material VARCHAR(255) NOT NULL,
        "isNew" BOOLEAN DEFAULT false,
        "isBestSeller" BOOLEAN DEFAULT false
      );
    `);

    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        role VARCHAR(50) DEFAULT 'user',
        status VARCHAR(50) DEFAULT 'active',
        "joinDate" VARCHAR(50) NOT NULL
      );
    `);

    // Add password column if it doesn't exist (for existing databases)
    try {
      await client.query(`ALTER TABLE users ADD COLUMN password VARCHAR(255) DEFAULT '123456'`);
    } catch (e) {
      // Column might already exist, ignore error
    }

    // Seed default users
    const defaultUsers = [
      {
        id: 'USR-ADMIN',
        name: 'Quản trị viên',
        email: 'admin@netkham.com',
        password: 'admin',
        phone: '0901234567',
        role: 'admin',
        status: 'active',
        joinDate: new Date().toLocaleDateString('vi-VN')
      },
      {
        id: 'USR-USER',
        name: 'Khách hàng',
        email: 'user@netkham.com',
        password: 'user',
        phone: '0987654321',
        role: 'user',
        status: 'active',
        joinDate: new Date().toLocaleDateString('vi-VN')
      }
    ];

    for (const u of defaultUsers) {
      await client.query(
        `INSERT INTO users (id, name, email, password, phone, role, status, "joinDate")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (email) DO NOTHING`,
        [u.id, u.name, u.email, u.password, u.phone, u.role, u.status, u.joinDate]
      );
    }

    // Create orders table
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(50) PRIMARY KEY,
        customer VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        address TEXT NOT NULL,
        date VARCHAR(50) NOT NULL,
        total INTEGER NOT NULL,
        status VARCHAR(50) DEFAULT 'Đang xử lý',
        items JSONB NOT NULL
      );
    `);

    // Create reviews table
    await client.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        "productId" VARCHAR(50) NOT NULL,
        "userName" VARCHAR(255) NOT NULL,
        rating INTEGER NOT NULL,
        content TEXT NOT NULL,
        date VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending'
      );
    `);

    // Add status column if it doesn't exist (for existing databases)
    try {
      await client.query(`ALTER TABLE reviews ADD COLUMN status VARCHAR(50) DEFAULT 'pending'`);
    } catch (e) {
      // Column might already exist, ignore error
    }

    // Create coupons table
    await client.query(`
      CREATE TABLE IF NOT EXISTS coupons (
        id VARCHAR(50) PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        discount VARCHAR(50) NOT NULL,
        expiry VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'Hoạt động'
      );
    `);

    // Seed default coupons
    const defaultCoupons = [
      { id: '1', code: 'WELCOME10', discount: '10%', expiry: '2026-12-31', status: 'Hoạt động' },
      { id: '2', code: 'TET2026', discount: '20%', expiry: '2026-02-28', status: 'Hết hạn' },
      { id: '3', code: 'FREESHIP', discount: 'Miễn phí vận chuyển', expiry: '2026-06-30', status: 'Hoạt động' },
    ];

    for (const c of defaultCoupons) {
      await client.query(
        `INSERT INTO coupons (id, code, discount, expiry, status)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (code) DO NOTHING`,
        [c.id, c.code, c.discount, c.expiry, c.status]
      );
    }

    // Upsert products to ensure they are up to date with src/data/products.ts
    console.log('Upserting products...');
    for (const p of initialProducts) {
      await client.query(
        `INSERT INTO products (id, name, category, price, "originalPrice", image, images, description, material, "isNew", "isBestSeller")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name,
           category = EXCLUDED.category,
           price = EXCLUDED.price,
           "originalPrice" = EXCLUDED."originalPrice",
           image = EXCLUDED.image,
           images = EXCLUDED.images,
           description = EXCLUDED.description,
           material = EXCLUDED.material,
           "isNew" = EXCLUDED."isNew",
           "isBestSeller" = EXCLUDED."isBestSeller"`,
        [p.id, p.name, p.category, p.price, p.originalPrice, p.image, JSON.stringify(p.images), p.description, p.material, p.isNew, p.isBestSeller]
      );
    }
    console.log('Upserting complete.');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    client.release();
  }
}
