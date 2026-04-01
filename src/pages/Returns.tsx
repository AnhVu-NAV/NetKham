import React from 'react';

export default function Returns() {
  return (
    <div className="min-h-screen bg-darker pt-24 pb-20">
      <div className="bg-dark py-16 mb-12 border-b border-white/5">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-ivory mb-4">Chính Sách Đổi Trả</h1>
          <p className="text-ivory/60 max-w-2xl mx-auto">
            Quy định về việc đổi trả sản phẩm tại Nét Khảm.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="bg-dark p-8 md:p-12 rounded-lg border border-white/5 space-y-8 text-ivory/80 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-serif text-gold mb-4">1. Điều Kiện Đổi Trả</h2>
            <p className="mb-4">
              Quý khách có thể yêu cầu đổi trả sản phẩm trong vòng <strong>7 ngày</strong> kể từ ngày nhận hàng nếu sản phẩm đáp ứng các điều kiện sau:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Sản phẩm còn nguyên vẹn, chưa qua sử dụng, không bị trầy xước, móp méo, nứt vỡ.</li>
              <li>Sản phẩm còn đầy đủ tem mác, hộp đựng, phụ kiện đi kèm (nếu có).</li>
              <li>Sản phẩm bị lỗi kỹ thuật từ nhà sản xuất (như bong tróc xà cừ, nứt vỡ do lỗi chế tác).</li>
              <li>Sản phẩm giao không đúng với đơn đặt hàng (sai mẫu mã, kích thước, màu sắc).</li>
            </ul>
            <p className="mt-4 text-sm text-ivory/60 italic">
              *Lưu ý: Nét Khảm không nhận đổi trả đối với các sản phẩm đặt làm theo yêu cầu, sản phẩm đã qua sử dụng, hoặc sản phẩm bị hư hỏng do lỗi của người sử dụng (va đập mạnh, rơi vỡ, sử dụng hóa chất tẩy rửa mạnh).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gold mb-4">2. Quy Trình Đổi Trả</h2>
            <p className="mb-4">
              Để yêu cầu đổi trả, vui lòng thực hiện các bước sau:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Liên hệ với Nét Khảm qua hotline hoặc email trong vòng 7 ngày kể từ ngày nhận hàng, cung cấp mã đơn hàng và lý do đổi trả.</li>
              <li>Gửi hình ảnh hoặc video chứng minh tình trạng sản phẩm (nếu sản phẩm bị lỗi hoặc giao sai).</li>
              <li>Sau khi Nét Khảm xác nhận yêu cầu đổi trả hợp lệ, quý khách vui lòng đóng gói sản phẩm cẩn thận và gửi về địa chỉ của Nét Khảm.</li>
              <li>Nét Khảm sẽ tiến hành kiểm tra sản phẩm và thông báo kết quả đổi trả cho quý khách trong vòng 3-5 ngày làm việc.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gold mb-4">3. Chi Phí Đổi Trả</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Miễn phí đổi trả:</strong> Đối với các trường hợp sản phẩm bị lỗi từ nhà sản xuất hoặc giao sai đơn hàng. Nét Khảm sẽ chịu toàn bộ chi phí vận chuyển hai chiều.</li>
              <li><strong>Phí đổi trả do khách hàng chi trả:</strong> Đối với các trường hợp đổi trả theo nhu cầu của khách hàng (không thích, muốn đổi mẫu khác). Khách hàng sẽ chịu chi phí vận chuyển hai chiều.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gold mb-4">4. Hoàn Tiền</h2>
            <p>
              Trong trường hợp quý khách yêu cầu hoàn tiền, Nét Khảm sẽ hoàn lại số tiền tương ứng vào tài khoản ngân hàng của quý khách trong vòng 5-7 ngày làm việc sau khi nhận được sản phẩm đổi trả và xác nhận hợp lệ.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
