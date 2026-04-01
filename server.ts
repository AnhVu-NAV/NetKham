import express from 'express';
import { createServer as createViteServer } from 'vite';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { pool, initDb } from './src/server/db';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(cors());
  app.use(express.json());

  // Initialize Database
  await initDb();

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Get all products
  app.get('/api/products', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM products ORDER BY id');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get single product
  app.get('/api/products/:id', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Create product
  app.post('/api/products', async (req, res) => {
    try {
      const { id, name, category, price, image, images, description, material, isNew, isBestSeller } = req.body;
      const result = await pool.query(
        `INSERT INTO products (id, name, category, price, image, images, description, material, "isNew", "isBestSeller")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [id, name, category, price, image, JSON.stringify(images || []), description, material, isNew || false, isBestSeller || false]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Update product
  app.put('/api/products/:id', async (req, res) => {
    try {
      const { name, category, price, image, images, description, material, isNew, isBestSeller } = req.body;
      const result = await pool.query(
        `UPDATE products 
         SET name = $1, category = $2, price = $3, image = $4, images = $5, description = $6, material = $7, "isNew" = $8, "isBestSeller" = $9
         WHERE id = $10 RETURNING *`,
        [name, category, price, image, JSON.stringify(images || []), description, material, isNew || false, isBestSeller || false, req.params.id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Delete product
  app.delete('/api/products/:id', async (req, res) => {
    try {
      const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [req.params.id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // --- USERS API ---
  
  // Get all users
  app.get('/api/users', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users ORDER BY "joinDate" DESC');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Create user
  app.post('/api/users', async (req, res) => {
    try {
      const { id, name, email, phone, role, status, joinDate, password } = req.body;
      const defaultPassword = password || '123456'; // Default password if not provided
      const result = await pool.query(
        `INSERT INTO users (id, name, email, password, phone, role, status, "joinDate")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [id, name, email, defaultPassword, phone, role || 'user', status || 'active', joinDate]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Update user
  app.put('/api/users/:id', async (req, res) => {
    try {
      const { name, email, phone, role, status } = req.body;
      const result = await pool.query(
        `UPDATE users 
         SET name = $1, email = $2, phone = $3, role = $4, status = $5
         WHERE id = $6 RETURNING *`,
        [name, email, phone, role, status, req.params.id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Delete user
  app.delete('/api/users/:id', async (req, res) => {
    try {
      const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [req.params.id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // --- ORDERS API ---

  // Get all orders
  app.get('/api/orders', async (req, res) => {
    try {
      const { email, phone } = req.query;
      let result;
      if (email && phone) {
        result = await pool.query('SELECT * FROM orders WHERE email = $1 OR phone = $2 ORDER BY date DESC', [email, phone]);
      } else if (email) {
        result = await pool.query('SELECT * FROM orders WHERE email = $1 ORDER BY date DESC', [email]);
      } else if (phone) {
        result = await pool.query('SELECT * FROM orders WHERE phone = $1 ORDER BY date DESC', [phone]);
      } else {
        result = await pool.query('SELECT * FROM orders ORDER BY date DESC');
      }
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Create order
  app.post('/api/orders', async (req, res) => {
    try {
      const { id, customer, email, phone, address, date, total, status, items } = req.body;
      const result = await pool.query(
        `INSERT INTO orders (id, customer, email, phone, address, date, total, status, items)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [id, customer, email, phone, address, date, total, status || 'Đang xử lý', JSON.stringify(items)]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Update order status
  app.put('/api/orders/:id', async (req, res) => {
    try {
      const { status } = req.body;
      const result = await pool.query(
        `UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`,
        [status, req.params.id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Delete order
  app.delete('/api/orders/:id', async (req, res) => {
    try {
      const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [req.params.id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // --- AUTH API ---
  
  // Login
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
      
      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Email hoặc mật khẩu không đúng' });
      }
      
      const user = result.rows[0];
      if (user.status !== 'active') {
        return res.status(403).json({ error: 'Tài khoản đã bị khóa' });
      }
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Register
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;
      
      // Check if email exists
      const checkResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (checkResult.rows.length > 0) {
        return res.status(400).json({ error: 'Email đã được sử dụng' });
      }
      
      const id = `USR-${Date.now()}`;
      const joinDate = new Date().toLocaleDateString('vi-VN');
      
      const result = await pool.query(
        `INSERT INTO users (id, name, email, password, phone, role, status, "joinDate")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [id, name, email, password, phone || '', 'user', 'active', joinDate]
      );
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = result.rows[0];
      res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      console.error('Error registering:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // --- REVIEWS API ---

  // Get all reviews (for admin)
  app.get('/api/reviews', async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT r.*, p.name as "productName" 
        FROM reviews r 
        JOIN products p ON r."productId" = p.id 
        ORDER BY r.id DESC
      `);
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching all reviews:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Update review status
  app.put('/api/reviews/:id/status', async (req, res) => {
    try {
      const { status } = req.body;
      const result = await pool.query(
        `UPDATE reviews SET status = $1 WHERE id = $2 RETURNING *`,
        [status, req.params.id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Review not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating review status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Delete review
  app.delete('/api/reviews/:id', async (req, res) => {
    try {
      const result = await pool.query('DELETE FROM reviews WHERE id = $1 RETURNING *', [req.params.id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Review not found' });
      }
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get reviews for a product
  app.get('/api/products/:id/reviews', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM reviews WHERE "productId" = $1 AND status = $2 ORDER BY id DESC', [id, 'approved']);
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Add a review
  app.post('/api/products/:id/reviews', async (req, res) => {
    try {
      const { id } = req.params;
      const { userName, rating, content } = req.body;
      const date = new Date().toLocaleDateString('vi-VN');
      
      const result = await pool.query(
        `INSERT INTO reviews ("productId", "userName", rating, content, date, status)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [id, userName, rating, content, date, 'pending']
      );
      
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // --- COUPONS API ---

  // Get all coupons
  app.get('/api/coupons', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM coupons ORDER BY id DESC');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching coupons:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get single coupon by code
  app.get('/api/coupons/code/:code', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM coupons WHERE code = $1', [req.params.code]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Coupon not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching coupon:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Create coupon
  app.post('/api/coupons', async (req, res) => {
    try {
      const { id, code, discount, expiry, status } = req.body;
      const result = await pool.query(
        `INSERT INTO coupons (id, code, discount, expiry, status)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [id, code, discount, expiry, status || 'Hoạt động']
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating coupon:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Update coupon
  app.put('/api/coupons/:id', async (req, res) => {
    try {
      const { code, discount, expiry, status } = req.body;
      const result = await pool.query(
        `UPDATE coupons 
         SET code = $1, discount = $2, expiry = $3, status = $4
         WHERE id = $5 RETURNING *`,
        [code, discount, expiry, status, req.params.id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Coupon not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating coupon:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Delete coupon
  app.delete('/api/coupons/:id', async (req, res) => {
    try {
      const result = await pool.query('DELETE FROM coupons WHERE id = $1 RETURNING *', [req.params.id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Coupon not found' });
      }
      res.json({ message: 'Coupon deleted successfully' });
    } catch (error) {
      console.error('Error deleting coupon:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
