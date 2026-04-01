import React from 'react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-darker pt-24 pb-20">
      <div className="bg-dark py-16 mb-12 border-b border-white/5">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-ivory mb-4">Chính Sách Bảo Mật</h1>
          <p className="text-ivory/60 max-w-2xl mx-auto">
            Cam kết bảo vệ thông tin cá nhân của khách hàng tại Nét Khảm.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="bg-dark p-8 md:p-12 rounded-lg border border-white/5 space-y-8 text-ivory/80 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-serif text-gold mb-4">1. Mục Đích Thu Thập Thông Tin</h2>
            <p className="mb-4">
              Nét Khảm thu thập thông tin cá nhân của quý khách hàng nhằm mục đích:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Xử lý đơn đặt hàng, giao hàng và cung cấp dịch vụ chăm sóc khách hàng.</li>
              <li>Gửi thông báo về tình trạng đơn hàng, các chương trình khuyến mãi, sự kiện đặc biệt (nếu quý khách đăng ký nhận bản tin).</li>
              <li>Nâng cao chất lượng dịch vụ và trải nghiệm mua sắm trên website.</li>
              <li>Giải quyết các khiếu nại, tranh chấp phát sinh trong quá trình giao dịch.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gold mb-4">2. Phạm Vi Thu Thập Thông Tin</h2>
            <p className="mb-4">
              Thông tin cá nhân được thu thập bao gồm:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Họ và tên</li>
              <li>Địa chỉ email</li>
              <li>Số điện thoại liên hệ</li>
              <li>Địa chỉ giao hàng</li>
              <li>Lịch sử mua hàng và thông tin thanh toán (không lưu trữ thông tin thẻ tín dụng/ghi nợ).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gold mb-4">3. Thời Gian Lưu Trữ Thông Tin</h2>
            <p className="mb-4">
              Thông tin cá nhân của quý khách sẽ được lưu trữ trên hệ thống của Nét Khảm cho đến khi quý khách có yêu cầu hủy bỏ hoặc tự đăng nhập và thực hiện hủy bỏ.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gold mb-4">4. Cam Kết Bảo Mật</h2>
            <p className="mb-4">
              Nét Khảm cam kết bảo mật tuyệt đối thông tin cá nhân của quý khách hàng theo chính sách bảo vệ thông tin cá nhân của Nét Khảm. Việc thu thập và sử dụng thông tin của mỗi khách hàng chỉ được thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp luật có quy định khác.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân của khách hàng khi không có sự cho phép đồng ý từ khách hàng.</li>
              <li>Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân khách hàng, Nét Khảm sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho khách hàng được biết.</li>
              <li>Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của khách hàng bao gồm thông tin hóa đơn kế toán chứng từ số hóa tại khu vực dữ liệu trung tâm an toàn cấp 1 của Nét Khảm.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gold mb-4">5. Quyền Lợi Của Khách Hàng</h2>
            <p>
              Quý khách có quyền yêu cầu Nét Khảm cung cấp, chỉnh sửa hoặc xóa bỏ thông tin cá nhân của mình bất kỳ lúc nào bằng cách liên hệ với chúng tôi qua email hoặc hotline.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
