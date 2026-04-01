import React from 'react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-darker pt-24 pb-20">
      <div className="bg-dark py-16 mb-12 border-b border-white/5">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-ivory mb-4">Điều Khoản Sử Dụng</h1>
          <p className="text-ivory/60 max-w-2xl mx-auto">
            Quy định chung khi sử dụng dịch vụ và mua sắm tại Nét Khảm.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="bg-dark p-8 md:p-12 rounded-lg border border-white/5 space-y-8 text-ivory/80 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-serif text-gold mb-4">1. Chấp Nhận Điều Khoản</h2>
            <p className="mb-4">
              Khi truy cập và sử dụng website Nét Khảm, quý khách đồng ý tuân thủ các điều khoản và điều kiện được quy định dưới đây. Nét Khảm có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Điều Khoản Sử Dụng này vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên website mà không cần thông báo trước.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gold mb-4">2. Quyền Sở Hữu Trí Tuệ</h2>
            <p className="mb-4">
              Tất cả nội dung trên website Nét Khảm, bao gồm nhưng không giới hạn ở văn bản, hình ảnh, logo, biểu tượng, video, âm thanh, phần mềm, thiết kế, đồ họa, và các tài liệu khác, đều thuộc quyền sở hữu trí tuệ của Nét Khảm hoặc các bên cấp phép hợp pháp. Quý khách không được sao chép, phân phối, sửa đổi, tái bản, tải xuống, hiển thị, đăng tải hoặc truyền tải bất kỳ nội dung nào dưới bất kỳ hình thức nào mà không có sự đồng ý bằng văn bản của Nét Khảm.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gold mb-4">3. Trách Nhiệm Của Người Dùng</h2>
            <p className="mb-4">
              Khi sử dụng website Nét Khảm, quý khách cam kết:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cung cấp thông tin cá nhân chính xác, đầy đủ và cập nhật.</li>
              <li>Bảo mật thông tin tài khoản và mật khẩu của mình.</li>
              <li>Không sử dụng website vào mục đích bất hợp pháp, lừa đảo, hoặc gây tổn hại đến Nét Khảm và các bên thứ ba.</li>
              <li>Không can thiệp, phá hoại, hoặc làm gián đoạn hoạt động của website.</li>
              <li>Không phát tán virus, mã độc, hoặc các phần mềm gây hại khác.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gold mb-4">4. Đặt Hàng Và Thanh Toán</h2>
            <p className="mb-4">
              Khi đặt hàng trên website Nét Khảm, quý khách đồng ý cung cấp thông tin giao hàng và thanh toán chính xác. Nét Khảm có quyền từ chối hoặc hủy đơn hàng trong trường hợp thông tin cung cấp không hợp lệ, hoặc sản phẩm hết hàng.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Giá sản phẩm trên website là giá đã bao gồm thuế VAT (nếu có).</li>
              <li>Các phương thức thanh toán được chấp nhận bao gồm: Thanh toán khi nhận hàng (COD), Chuyển khoản ngân hàng.</li>
              <li>Nét Khảm cam kết bảo mật thông tin thanh toán của quý khách.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gold mb-4">5. Giới Hạn Trách Nhiệm</h2>
            <p>
              Nét Khảm không chịu trách nhiệm đối với bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt, hoặc mang tính hậu quả nào phát sinh từ việc sử dụng hoặc không thể sử dụng website, hoặc từ việc mua sắm sản phẩm trên website.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
