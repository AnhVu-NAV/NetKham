export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  material: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Lược Gỗ Gụ Khảm Xà Cừ “Dạ Vũ”",
    category: "Trâm gương lược",
    price: 190000,
    originalPrice: 250000,
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Chiếc lược được chế tác từ gỗ gụ tự nhiên với sắc nâu trầm ấm, điểm xuyết họa tiết khảm xà cừ ánh ngọc gợi hình lông công mềm mại. Thiết kế tinh giản nhưng tinh tế, từng răng lược được mài nhẵn mang lại cảm giác êm ái khi sử dụng.\nMột vật dụng nhỏ, nhưng đủ để tôn lên vẻ đẹp thanh lịch và gu thẩm mỹ riêng biệt.",
    material: "Gỗ gụ tự nhiên",
    isBestSeller: true,
  },
  {
    id: "p2",
    name: "Trâm Cài Tóc Khảm Xà Cừ “Khổng Tước Ngọc Vũ”",
    category: "Trâm gương lược",
    price: 190000,
    originalPrice: 260000,
    image: "https://images.unsplash.com/photo-1599643478524-fb5244098775?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1599643478524-fb5244098775?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Chiếc trâm cài tóc được chế tác từ gỗ gụ tự nhiên với đường nét thanh mảnh, uyển chuyển. Phần đầu trâm nổi bật với mảng khảm xà cừ ánh ngọc, tạo hình giọt lệ cách điệu, gợi liên tưởng đến đôi mắt và sắc vũ của chim công – biểu tượng của vẻ đẹp kiêu sa và quý phái.\nBề mặt xà cừ phản chiếu ánh sáng đa sắc, biến đổi tinh tế theo từng góc nhìn, mang lại cảm giác sống động và đầy chiều sâu. Thiết kế tối giản nhưng đầy nghệ thuật, phù hợp để tôn lên vẻ thanh lịch trong cả trang phục truyền thống lẫn hiện đại.\nMột món trang sức mang tinh thần Á Đông, vừa tinh xảo, vừa giàu tính biểu tượng.",
    material: "Gỗ gụ tự nhiên",
    isNew: true,
  },
  {
    id: "p3",
    name: "Gương Tay Khảm Xà Cừ “Khổng Tước Lưu Quang”",
    category: "Trâm gương lược",
    price: 220000,
    originalPrice: 320000,
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Chiếc gương tay được chế tác từ gỗ gụ tự nhiên với sắc nâu trầm ấm, kết hợp họa tiết chim công khảm xà cừ ở mặt sau. Những mảng xà cừ ánh ngọc phản chiếu đa sắc, tạo nên hiệu ứng “lưu quang” – ánh sáng chuyển động mềm mại theo từng góc nhìn.\nHình tượng khổng tước được thể hiện trong bố cục tròn cân đối, vừa thanh thoát vừa nổi bật, mang ý nghĩa về vẻ đẹp viên mãn và sự tinh tế. Thiết kế tối giản, tay cầm chắc chắn, mang lại cảm giác hài hòa giữa công năng và giá trị thẩm mỹ.\nKhông chỉ là vật dụng thường ngày, “Khổng Tước Lưu Quang” còn là một điểm nhấn nghệ thuật, góp phần tôn lên phong cách sống thanh lịch và gu thẩm mỹ riêng biệt.",
    material: "Gỗ gụ tự nhiên, xà cừ",
    isBestSeller: true,
  },
  {
    id: "p4",
    name: "Trâm Cài Tóc Khảm Xà Cừ “Điệp Ảnh”",
    category: "Trâm gương lược",
    price: 180000,
    originalPrice: 240000,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Chiếc trâm mang hình dáng cánh bướm cách điệu, được chế tác từ gỗ gụ tự nhiên với họa tiết khảm xà cừ tinh xảo. Các lớp cánh mềm mại xếp chồng, phản chiếu ánh ngọc nhẹ nhàng, tạo cảm giác chuyển động thanh thoát như cánh bướm trong ánh sáng.\nThiết kế thanh mảnh, tinh tế, phù hợp với phong cách nữ tính và trang nhã, dễ dàng kết hợp cùng trang phục truyền thống hoặc hiện đại.",
    material: "Gỗ gụ tự nhiên",
  },
  {
    id: "p5",
    name: "Trâm Cài Tóc Khảm Xà Cừ “Ngọc Diệp”",
    category: "Trâm gương lược",
    price: 180000,
    originalPrice: 240000,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Chiếc trâm được tạo hình chiếc lá dài, tối giản nhưng đầy cuốn hút. Bề mặt khảm xà cừ ánh ngọc nổi bật trên nền gỗ gụ trầm ấm, gợi cảm giác tự nhiên và thanh khiết.\nĐường nét mềm mại, thanh thoát giúp tôn lên vẻ đẹp nhẹ nhàng và tinh tế, phù hợp cho những ai yêu thích phong cách tối giản nhưng vẫn sang trọng.",
    material: "Gỗ gụ tự nhiên",
    isNew: true,
  }
];

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
