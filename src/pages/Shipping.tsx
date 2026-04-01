import React from 'react';

export default function Shipping() {
  return (
    <div className="min-h-screen bg-darker pt-24 pb-20">
      <div className="bg-dark py-16 mb-12 border-b border-white/5">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-ivory mb-4">Chính Sách Giao Hàng</h1>
          <p className="text-ivory/60 max-w-2xl mx-auto">
            Thông tin chi tiết về thời gian và chi phí vận chuyển của Nét Khảm.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="bg-dark p-8 md:p-12 rounded-lg border border-white/5 space-y-8 text-ivory/80 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-serif text-gold mb-4">1. Thời Gian Giao Hàng</h2>
            <p className="mb-4">
              Thời gian giao hàng dự kiến phụ thuộc vào địa điểm nhận hàng của quý khách:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Khu vực nội thành Hà Nội:</strong> 1-2 ngày làm việc.</li>
              <li><strong>Khu vực ngoại thành và các tỉnh lân cận:</strong> 2-3 ngày làm việc.</li>
              <li><strong>Các tỉnh miền Trung và miền Nam:</strong> 3-5 ngày làm việc.</li>
            </ul>
            <p className="mt-4 text-sm text-ivory/60 italic">
              *Lưu ý: Thời gian trên không bao gồm Chủ nhật và các ngày Lễ, Tết. Đối với các sản phẩm đặt làm theo yêu cầu, thời gian giao hàng sẽ được cộng thêm thời gian chế tác (thường từ 10-15 ngày).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gold mb-4">2. Chi Phí Vận Chuyển</h2>
            <p className="mb-4">
              Nét Khảm áp dụng mức phí vận chuyển như sau:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Đồng giá 30.000 VNĐ</strong> cho tất cả các đơn hàng trên toàn quốc.</li>
              <li><strong>Miễn phí vận chuyển (Freeship)</strong> cho các đơn hàng có tổng giá trị từ <strong>2.000.000 VNĐ</strong> trở lên.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gold mb-4">3. Quy Trình Giao Nhận</h2>
            <p className="mb-4">
              Để đảm bảo quyền lợi của quý khách, vui lòng thực hiện các bước sau khi nhận hàng:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Kiểm tra kỹ tình trạng bên ngoài của gói hàng (không bị rách, móp méo, có dấu hiệu cạy mở).</li>
              <li>Mở gói hàng và kiểm tra số lượng, tình trạng sản phẩm bên trong trước mặt nhân viên giao hàng.</li>
              <li>Nếu phát hiện sản phẩm bị lỗi, hư hỏng hoặc không đúng với đơn đặt hàng, vui lòng từ chối nhận hàng và liên hệ ngay với hotline của Nét Khảm để được hỗ trợ.</li>
              <li>Sau khi ký nhận, Nét Khảm sẽ không chịu trách nhiệm đối với các khiếu nại về ngoại quan của sản phẩm (trầy xước, móp méo, nứt vỡ).</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gold mb-4">4. Theo Dõi Đơn Hàng</h2>
            <p>
              Sau khi đơn hàng được xác nhận và giao cho đơn vị vận chuyển, quý khách sẽ nhận được email thông báo kèm theo mã vận đơn. Quý khách có thể sử dụng mã này để theo dõi tình trạng đơn hàng trên website của đơn vị vận chuyển hoặc trong phần "Đơn hàng của tôi" trên website Nét Khảm.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
