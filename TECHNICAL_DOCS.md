# Hextech Portfolio — Tài liệu Kỹ thuật & Kiến trúc

Dự án này là một ứng dụng web cao cấp được thiết kế dựa trên ngôn ngữ thiết kế **Hextech** (Arcane/League of Legends aesthetic), kết hợp giữa công nghệ hiện đại và nghệ thuật thị giác 3D.

## 1. Tổng quan dự án (Project Overview)
Trang web được xây dựng như một Portfolio cá nhân, tập trung vào hiệu ứng thị giác mạnh mẽ nhưng vẫn đảm bảo hiệu suất tải trang cực nhanh.

- **Chủ đề**: Hextech / Cyberpunk / Champion Select UI.
- **Phong cách**: Cinematic, tương tác cao.

## 2. Ngôn ngữ thiết kế (Design Philosophy)
- **Bảng màu**: 
    - `Void Blue` (#010a13): Nền chính.
    - `Hextech Gold` (#c8aa6e): Viền và điểm nhấn kim loại.
    - `Magic Cyan` (#0ac8b9): Ánh sáng năng lượng.
- **Hình khối**: Sử dụng Hexagon (lục giác) làm chủ đạo cho toàn bộ icon, khung ảnh và layout.

## 3. Danh mục công nghệ (Technology Stack)

### Core Framework
- **Next.js 15 (App Router)**: Framework chính, hỗ trợ Server Components và tối ưu hóa SEO.
- **TypeScript**: Đảm bảo type-safe cho toàn bộ ứng dụng.

### Styling & UI
- **Tailwind CSS v4**: Xử lý giao diện đáp ứng và quản lý design tokens.
- **Fonts**: Cormorant Garamond (Serif), Inter (Sans), JetBrains Mono (Mono).

### Animations & 3D Visuals
- **Framer Motion (LazyMotion)**: Xử lý toàn bộ các hiệu ứng chuyển động mượt mà.
- **Three.js & React Three Fiber (R3F)**: Render mô hình 3D trong không gian WebGL.
- **@react-three/drei**: Cung cấp các công cụ tối ưu cho 3D như Float, Canvas.

## 4. Các thành phần tiêu biểu

### 4.1 HextechLoader
Màn hình tải trang cinematic với hiệu ứng sigil xoay và progress counter, giúp che đi quá trình tải các tài nguyên nặng (3D).

### 4.2 TechOrb (3D Background)
Một khối đa diện Octahedron wireframe kết hợp với hệ thống hạt (Particles) tạo chiều sâu cho Hero section. Tối ưu bằng cách tắt SSR và giới hạn DPR.

### 4.3 Abilities Section
Giao diện chọn kỹ năng tương tác, sử dụng Framer Motion `layoutId` để chuyển đổi giữa các tab không bị giật lag.

### 4.4 Projects with 3D Tilt
Hiệu ứng nghiêng 3D chân thực khi di chuột qua các thẻ dự án, sử dụng `useMotionValue` để tính toán tọa độ chuột theo thời gian thực.

## 5. Kiến trúc tối ưu hiệu suất (Performance Optimization)

Đây là các kỹ thuật đã được áp dụng để tối ưu Google PageSpeed Insights:

1. **Lazy Loading Components**: Sử dụng `next/dynamic` để trì hoãn việc tải Three.js cho đến khi cần thiết.
2. **Bundle Optimization**: Sử dụng `m` component của Framer Motion để giảm kích thước file bundle JavaScript.
3. **Image Optimization**: Sử dụng `<Image />` của Next.js với thuộc tính `priority` cho các ảnh quan trọng (LCP).
4. **Main-thread Optimization**: Giảm số lượng phép tính 3D và giới hạn render pixel ratio để giải phóng CPU.

## 6. Cấu trúc thư mục
- `src/app`: Layout và Pages.
- `src/components/sections`: Các phần chính của Portfolio.
- `src/components/ui`: Component dùng chung và 3D Logic.
- `src/components/effects`: Hiệu ứng thị giác đặc biệt.
- `src/lib`: Dữ liệu và Utility functions.

---
*Tài liệu này phục vụ cho mục đích phân tích kỹ thuật và phát triển hệ thống.*
