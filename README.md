# 🌟 Nghệ Thuật Khảm Xà Cừ (Mother of Pearl Art)

Dự án website trưng bày và bán các sản phẩm thủ công mỹ nghệ khảm xà cừ cao cấp. Giao diện được thiết kế sang trọng, tối màu (dark theme) với điểm nhấn màu vàng (gold) và trắng ngà (ivory), mang lại cảm giác truyền thống pha lẫn hiện đại.

## ✨ Tính năng nổi bật

- 🛍️ **Danh mục sản phẩm phong phú:** Hiển thị sản phẩm theo dạng lưới (grid) đáp ứng mọi kích thước màn hình.
- 🔍 **Tìm kiếm & Lọc nâng cao:** Tìm kiếm theo tên, lọc theo danh mục, bộ sưu tập (Hoàng Cung, Nàng Thơ, Tứ Quý) và khoảng giá.
- ↕️ **Sắp xếp thông minh:** Sắp xếp theo hàng mới nhất, bán chạy, hoặc giá (thấp đến cao / cao đến thấp).
- 📄 **Phân trang (Pagination):** Tối ưu hóa hiển thị với 9 sản phẩm mỗi trang, tự động chuyển trang mượt mà lên đầu danh sách.
- 📱 **Responsive Design:** Tương thích hoàn hảo trên mọi thiết bị di động, tablet và màn hình desktop rộng.
- 🎨 **UI/UX Sang trọng:** Sử dụng các hiệu ứng hover, chuyển đổi mượt mà phù hợp với định vị sản phẩm thủ công mỹ nghệ cao cấp.

## 🛠️ Công nghệ sử dụng

- **Core:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Routing:** [React Router DOM](https://reactrouter.com/)

## 🚀 Hướng dẫn cài đặt và chạy dự án

### Yêu cầu môi trường
- Node.js (phiên bản 18.x trở lên)
- npm hoặc yarn

### Các bước cài đặt

1. **Cài đặt các thư viện phụ thuộc:**
   Mở terminal tại thư mục gốc của dự án và chạy:
   ```bash
   npm install
   ```

2. **Chạy server phát triển (Development Server):**
   ```bash
   npm run dev
   ```
   *Ứng dụng sẽ khởi chạy và bạn có thể xem trực tiếp trên trình duyệt.*

3. **Build dự án cho môi trường Production:**
   ```bash
   npm run build
   ```
   *Thư mục `dist` sẽ được tạo ra chứa các file tĩnh đã được tối ưu hóa để sẵn sàng deploy.*

## 📂 Cấu trúc thư mục chính

```text
src/
├── components/      # Các component UI dùng chung (Header, Footer, ProductCard,...)
├── pages/           # Các trang chính của ứng dụng (Home, Products, ProductDetail,...)
├── lib/             # Các hàm tiện ích (utils)
├── data/            # Dữ liệu mẫu (mock data) cho sản phẩm, danh mục
├── App.tsx          # Component gốc chứa cấu hình Routing
├── main.tsx         # Điểm khởi chạy (Entry point) của ứng dụng React
└── index.css        # File CSS toàn cục (chứa cấu hình Tailwind CSS)
```

## 🤝 Đóng góp

Mọi đóng góp để phát triển dự án đều được hoan nghênh. Nếu bạn muốn thêm tính năng mới hoặc sửa lỗi, vui lòng tạo Pull Request hoặc mở Issue để thảo luận.

## 📄 Giấy phép

Dự án này được phân phối dưới giấy phép MIT.
