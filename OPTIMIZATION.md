# Báo cáo tối ưu hóa hiệu suất (Performance Optimization Report)

Dưới đây là danh sách chi tiết các thay đổi đã thực hiện để cải thiện điểm số Google PageSpeed Insights cho dự án Portfolio.

## 1. Tối ưu hóa Hình ảnh & LCP
- **Chuyển đổi sang `next/image`**: Thay thế toàn bộ thẻ `<img>` bằng component `<Image />` của Next.js trong phần `Hero`.
- **Độ ưu tiên tải (LCP Priority)**: Thêm thuộc tính `priority` vào ảnh đại diện (`avatar.png`) để thông báo cho trình duyệt tải ảnh này ngay lập tức.
- **Kích thước phản hồi (Responsive Sizes)**: Thêm thuộc tính `sizes` để trình duyệt chọn đúng kích cỡ ảnh cần thiết (WebP) thay vì tải ảnh gốc nặng (832KB), giúp giảm đáng kể dung lượng tải trang.

## 2. Giảm kích thước Bundle JavaScript (Framer Motion)
- **Triển khai LazyMotion**: Sử dụng `LazyMotion` và `domMax` thông qua một `FramerProvider` bao bọc toàn bộ ứng dụng.
- **Tối ưu hóa 'm' Component**: Cập nhật toàn bộ các file (`Hero`, `Navbar`, `Abilities`, `Career`, `Reveal`, `HextechLoader`) để sử dụng `m` thay vì `motion`. Điều này giúp giảm dung lượng JS của Framer Motion xuống mức tối thiểu (chỉ tải phần lõi cần thiết).

## 3. Tối ưu hóa các thành phần nặng (Three.js / 3D)
- **Dynamic Import**: Sử dụng `next/dynamic` cho component `TechOrb`. Thư viện Three.js (rất nặng) hiện nay chỉ được tải ở phía Client và tải sau khi trang web đã hoàn tất phần khung cơ bản.
- **Tắt SSR cho 3D**: Thiết lập `ssr: false` để tối ưu hóa quá trình Hydration và tránh các lỗi render phía server cho các thành phần 3D.

## 4. Tối ưu hóa render 3D (Three.js Performance)
- **Giảm số lượng hạt (Particles)**: Giảm từ 60 xuống 40 hạt trong `TechOrb` để tiết kiệm tài nguyên CPU.
- **Giới hạn Device Pixel Ratio (DPR)**: Thiết lập `dpr={[1, 1.5]}` để ngăn việc render quá mức trên các màn hình độ phân giải cao mà không mang lại sự khác biệt lớn về thị giác, từ đó giảm nhiệt và tiết kiệm pin cho thiết bị người dùng.

## 5. Sửa lỗi TypeScript & Build
- **Shadowing Fix**: Sửa lỗi xung đột tên biến `m` trong `Abilities.tsx` để đảm bảo hệ thống build ổn định.
- **Three.js Types**: Cấu hình lại `bufferAttribute` trong `TechOrb.tsx` để vượt qua các kiểm tra nghiêm ngặt của TypeScript trong môi trường production.

---
**Kết quả**: 
- Trang web đạt bản build sản xuất thành công (`npm run build`).
- Chỉ số LCP và TBT được cải thiện rõ rệt.
- Trải nghiệm người dùng mượt mà hơn nhờ giảm tải cho Main-thread.
