import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="min-h-screen bg-darker pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=2000" 
            alt="Nghệ nhân khảm xà cừ" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-darker/80 via-darker/60 to-darker"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-gold tracking-[0.3em] uppercase text-sm mb-6"
          >
            Câu Chuyện Của Chúng Tôi
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-serif text-ivory mb-8 leading-tight"
          >
            Hành Trình Giữ Lửa <br/><span className="italic text-gold">Nghề Truyền Thống</span>
          </motion.h1>
        </div>
      </section>

      {/* Story Content */}
      <section className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="prose prose-invert prose-gold max-w-none">
          <h2 className="text-3xl font-serif text-ivory text-center mb-12">Ý Nghĩa Tên Thương Hiệu "Nét Khảm"</h2>
          <p className="text-ivory/70 leading-relaxed text-lg mb-8 text-center">
            "Nét" là sự tinh tế, sắc sảo trong từng đường nét chạm khắc. "Khảm" là nghệ thuật cẩn vỏ trai, vỏ ốc lên nền gỗ. "Nét Khảm" ra đời với sứ mệnh tôn vinh vẻ đẹp tỉ mỉ, tài hoa của nghệ nhân Việt Nam, đồng thời mang nghệ thuật truyền thống đến gần hơn với cuộc sống hiện đại.
          </p>

          <div className="flex flex-col md:flex-row gap-12 my-20 items-center">
            <div className="w-full md:w-1/2 aspect-square rounded-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1599643478524-fb5244098775?auto=format&fit=crop&q=80&w=800" alt="Sản phẩm khảm xà cừ" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h3 className="text-2xl font-serif text-gold mb-6">Tinh Hoa Khảm Xà Cừ</h3>
              <p className="text-ivory/70 leading-relaxed mb-6">
                Nghề khảm xà cừ là một trong những nghề thủ công mỹ nghệ lâu đời và tinh xảo nhất của Việt Nam. Nguyên liệu chính là vỏ trai, vỏ ốc, xà cừ được tuyển chọn kỹ lưỡng từ biển cả. Qua bàn tay khéo léo của người thợ, những mảnh vỏ vô tri vô giác được cắt gọt, mài dũa và ghép lại thành những bức tranh sinh động, lấp lánh sắc màu.
              </p>
              <p className="text-ivory/70 leading-relaxed">
                Mỗi sản phẩm khảm xà cừ không chỉ là một vật dụng trang trí mà còn là một tác phẩm nghệ thuật độc bản, mang đậm dấu ấn cá nhân của người nghệ nhân và giá trị văn hóa sâu sắc.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row-reverse gap-12 my-20 items-center">
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h3 className="text-2xl font-serif text-gold mb-6">Trình Độ Nghệ Nhân</h3>
              <p className="text-ivory/70 leading-relaxed mb-6">
                Đội ngũ nghệ nhân của Nét Khảm đều là những người thợ lành nghề, có nhiều năm kinh nghiệm gắn bó với nghề truyền thống. Họ không chỉ có kỹ thuật điêu luyện mà còn có tâm hồn nghệ sĩ, luôn đặt trọn tâm huyết vào từng đường nét, từng mảnh ghép.
              </p>
              <p className="text-ivory/70 leading-relaxed">
                Sự tỉ mỉ, kiên nhẫn và lòng yêu nghề của họ chính là linh hồn của mỗi sản phẩm Nét Khảm, tạo nên những kiệt tác vượt thời gian.
              </p>
            </div>
            <div className="w-full md:w-1/2 aspect-square rounded-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800" alt="Quá trình chế tác" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
