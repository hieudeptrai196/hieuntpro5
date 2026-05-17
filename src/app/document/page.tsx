"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/data";

// ── Dữ liệu ────────────────────────────────────────────────────────────────

const techStack = [
  {
    group: "Framework & Runtime",
    items: ["Next.js 16 (App Router)", "React 19", "TypeScript 5"],
  },
  {
    group: "Styling",
    items: ["Tailwind CSS v4", "CSS custom properties", "clip-path bevel"],
  },
  {
    group: "Animation",
    items: ["Framer Motion (LazyMotion)", "CSS transitions", "IntersectionObserver"],
  },
  {
    group: "SEO & Metadata",
    items: [
      "next/og (OG Image động)",
      "JSON-LD Person schema",
      "sitemap.xml tự sinh",
      "robots.txt tự sinh",
    ],
  },
  {
    group: "Triển khai",
    items: ["Vercel (auto-deploy)", "Cloudflare CDN + R2", "HTTPS / HTTP2"],
  },
];

const features = [
  {
    id: "01",
    title: "Hero — Champion Select",
    desc: "Màn hình giới thiệu phong cách chọn tướng Liên Minh Huyền Thoại: avatar tướng, mô tả vai trò, slider ảnh có lightbox, hiệu ứng scan-line, floating HP bar và thanh tiến trình XP.",
  },
  {
    id: "02",
    title: "Abilities — Skills & Technologies",
    desc: "Bảng kỹ năng trình bày theo 4 nhóm (Q / W / E / R): Backend, Data, Full-stack, Soft skills. Click hoặc hover để xem chi tiết từng nhóm.",
  },
  {
    id: "03",
    title: "Career — Battle Record",
    desc: "Timeline dọc hiển thị lịch sử làm việc. Mỗi mốc có tên công ty, vị trí, giai đoạn và badge trạng thái (CURRENT / vv.).",
  },
  {
    id: "04",
    title: "Projects — Featured Arsenal",
    desc: "Lưới 2 cột trình bày dự án nổi bật lấy dữ liệu từ data.ts. Card có link ngoài hiển thị preview URL khi hover; card nội bộ ghi nhãn NDA.",
  },
  {
    id: "05",
    title: "Contact — Send the Signal",
    desc: "Bảng liên hệ gồm Email, SĐT, LinkedIn và địa điểm. Nút CTA gửi email trực tiếp tới địa chỉ trong siteConfig.",
  },
  {
    id: "06",
    title: "SEO & Social Share",
    desc: "metadataBase, canonical URL, Open Graph đầy đủ, Twitter Card, OG image động (1200×630) được sinh bởi @vercel/og với phong cách Hextech.",
  },
  {
    id: "07",
    title: "DocPing — Trang Tài Liệu",
    desc: "Nút ping \"?\" cố định góc dưới phải trang chủ, lấy cảm hứng từ ping cảnh báo trong LOL. Ấn vào dẫn sang trang /document này.",
  },
  {
    id: "08",
    title: "PWA Manifest",
    desc: "App có thể \"Add to Home Screen\" trên thiết bị di động. Background và theme color khớp với void-950 (#010a13).",
  },
  {
    id: "09",
    title: "Custom Hextech Cursor",
    desc: "Con trỏ chuột tuỳ chỉnh gồm dot nhỏ (cyan, bám sát) và ring ngoài (lag lerp). Hover vào link/button → ring mở rộng và đổi sang gold glow. Tự tắt trên touch device.",
  },
  {
    id: "10",
    title: "Section Navigation Dots",
    desc: "Cột 5 chấm điều hướng cố định bên phải màn hình (chỉ desktop). Section đang xem highlight cyan. Hover hiện tooltip tên section. Click scroll mượt đến section tương ứng.",
  },
  {
    id: "11",
    title: "Scroll-to-top Button",
    desc: "Nút hình thoi xuất hiện sau khi scroll > 400px. Click cuộn mượt về đầu trang. Tự ẩn khi đang ở trên cùng.",
  },
  {
    id: "12",
    title: "Copy Email / Phone",
    desc: "Nút Copy nhỏ trong card Email và Phone tại section Contact. Click copy vào clipboard → animation xác nhận \"✓ Đã copy\" ngay tại chỗ.",
  },
  {
    id: "13",
    title: "Konami Code Easter Egg",
    desc: "Gõ ↑↑↓↓←→←→BA để kích hoạt popup Champion Status với quote kiểu LoL và countdown bar 6 giây. Dành cho những ai tò mò.",
  },
  {
    id: "14",
    title: "Site Notice — Cache Hint",
    desc: "Thông báo nhỏ góc dưới trái, hiện 2.8 giây sau khi vào trang lần đầu (dùng sessionStorage). Giải thích cache giúp trang tải nhanh hơn từ lần sau. Tự đóng sau 9 giây.",
  },
  {
    id: "15",
    title: "PerfBadge — Chẩn đoán hiệu năng",
    desc: "Widget góc trên phải hiện sau khi trang load xong. Hiển thị tốc độ tải, số file, dung lượng và loại mạng. Click mở popup đầy đủ với 4 nhóm chỉ số, giải thích phương pháp đo bằng Browser Performance API.",
  },
  {
    id: "16",
    title: "Vercel Analytics",
    desc: "Tích hợp @vercel/analytics — thu thập page views và Web Vitals thực tế trong Vercel Dashboard. Không bên thứ ba, không cookie tracking, miễn phí.",
  },
];

// ── Tối ưu Performance ──────────────────────────────────────────────────────

type Optimization = {
  title: string;
  badge: string;
  impact: string;
  how: string;   // Làm như thế nào
  effect: string; // Ảnh hưởng gì
};

const perfOptimizations: Optimization[] = [
  {
    title: "Rút ngắn HextechLoader — bỏ scroll lock",
    badge: "Hiệu năng",
    impact: "LCP ↓ ~1.4s",
    how: "Giảm thời gian loader từ 1800ms xuống 600ms, fade từ 500ms xuống 300ms. Quan trọng hơn: bỏ hoàn toàn việc set overflow:hidden trên <html> và <body> — trang render bình thường ở phía sau loader thay vì bị block.",
    effect: "Lighthouse đo LCP (Largest Contentful Paint) từ lúc trang bắt đầu render, không phải từ lúc loader biến mất. Trước đây loader lock scroll trong 2.3s → LCP tự động ≥ 2.5s (vượt ngưỡng \"cần cải thiện\"). Sau khi fix: LCP giảm xuống ~1s, TBT (Total Blocking Time) giảm mạnh.",
  },
  {
    title: "Xóa Three.js — thay bằng CSS/SVG",
    badge: "Hiệu năng",
    impact: "JS bundle ↓ ~180KB gzip",
    how: "Xóa hoàn toàn 3 package: three, @react-three/fiber, @react-three/drei. TechOrb (hiệu ứng 3D quay) được thay bằng 3 vòng SVG polygon + CSS animation @keyframes spin-slow 30s — không cần WebGL, không cần JavaScript runtime.",
    effect: "Ba.js thêm ~600KB raw (~180KB gzip) vào JS bundle, dù đã dùng dynamic import. Browser vẫn phải download và parse toàn bộ khi hydrate → tăng TBT và TTI đáng kể. Sau khi xóa: First Load JS giảm ~180KB, trang interactive sớm hơn. Visual gần như giống hệt.",
  },
  {
    title: "Resize & compress ảnh nguồn",
    badge: "Hiệu năng",
    impact: "Payload ảnh ↓ 71%",
    how: "Dùng macOS sips CLI resize ảnh về kích thước hợp lý: ảnh 2560×2560 (1MB) → 1200px max (281KB). Avatar PNG 832KB → JPEG 82% quality (156KB). Logo favicon 591KB → 192×192px (12KB). Tổng /public: 2.9MB → 852KB.",
    effect: "next/image optimize ảnh sang WebP/AVIF trước khi serve, nhưng ảnh nguồn nhỏ hơn → decode nhanh hơn, ít RAM hơn, response từ Vercel về Cloudflare nhẹ hơn. LCP cải thiện vì ảnh hero (ảnh lớn nhất visible) load nhanh hơn.",
  },
  {
    title: "LazyMotion — tải Framer Motion theo nhu cầu",
    badge: "Hiệu năng",
    impact: "JS bundle ↓ ~100KB gzip",
    how: "Chuyển FramerProvider từ domMax sang domAnimation trong LazyMotion. domAnimation chỉ bao gồm animation + layout cơ bản, bỏ các tính năng nặng như complex drag gesture (không dùng đến trong portfolio). Import m từ framer-motion vẫn hoạt động bình thường.",
    effect: "domMax load toàn bộ Framer Motion feature set ~250KB. domAnimation chỉ ~150KB. Tiết kiệm ~100KB gzip trên initial bundle, trang interactive sớm hơn.",
  },
  {
    title: "Bỏ double smooth-scroll",
    badge: "Hiệu năng",
    impact: "Scroll jank ↓",
    how: "Xóa scroll-behavior: smooth khỏi html {} trong globals.css. Lenis đã xử lý smooth scroll với easing tùy chỉnh — giữ cả hai gây conflict.",
    effect: "Trên một số browser (đặc biệt Chrome mobile), hai scroll handler chạy song song gây jank nhẹ và CLS. Sau khi xóa, Lenis là nguồn duy nhất điều khiển scroll.",
  },
  {
    title: "Cloudflare Cache Rules cho /_next/image",
    badge: "Hạ tầng",
    impact: "Ảnh serve từ edge, không hit Vercel",
    how: "Tạo Cache Rule trong Cloudflare: URI starts with /_next/image → Cache Everything, Edge TTL 30 ngày. Mặc định Cloudflare không cache URL có query string (như /_next/image?url=...&w=...&q=...) → mỗi request đều đi về Vercel origin. Rule này override behavior đó.",
    effect: "Sau lần đầu request, Cloudflare cache ảnh đã optimize tại edge node gần người dùng. Từ request thứ 2 trở đi: ảnh được serve từ Singapore/HCM thay vì Mỹ, latency ~10–30ms thay vì ~150–300ms. Vercel không bị hit → giảm tải origin, tiết kiệm bandwidth free tier.",
  },
  {
    title: "Cloudflare R2 — CDN lưu ảnh gốc",
    badge: "Hạ tầng",
    impact: "Ảnh gốc zero-egress, không qua Vercel",
    how: "Upload toàn bộ ảnh portfolio lên Cloudflare R2 bucket (hieunt-assets). Gắn custom domain cdn.hieunt.site trỏ thẳng vào bucket. Cập nhật src của next/image từ /avatar.jpg sang https://cdn.hieunt.site/avatar.jpg. Thêm remotePatterns trong next.config.ts để cho phép next/image optimize ảnh từ domain ngoài.",
    effect: "R2 có zero egress fee — serve file ra không tốn tiền bandwidth, khác với hầu hết cloud storage. Ảnh gốc không đi qua Vercel origin nữa: Browser → Cloudflare Edge (R2) → trả ảnh. next/image vẫn nhận ảnh từ R2, optimize → WebP/AVIF, và kết quả được cache tại Cloudflare edge theo Cache Rule ở trên.",
  },
  {
    title: "Preload ảnh hero (LCP hint)",
    badge: "Hiệu năng",
    impact: "LCP ↓ ~200–400ms",
    how: "Thêm <link rel=\"preload\" as=\"image\" fetchpriority=\"high\"> cho avatar.jpg vào thẳng <head> trong layout.tsx. Đồng thời thêm <link rel=\"preconnect\" href=\"https://cdn.hieunt.site\"> để browser thiết lập kết nối TCP/TLS đến CDN trước khi cần.",
    effect: "Ảnh hero (portrait slider đầu tiên) là LCP element — phần tử lớn nhất visible khi trang load. Nếu không preload, browser chỉ biết đến ảnh này sau khi parse xong HTML và CSS → mất ~200–500ms bổ sung. Preload hint báo browser tải ngay từ đầu, song song với các tài nguyên khác → LCP giảm ~200–400ms.",
  },
];

// ── Tối ưu SEO ──────────────────────────────────────────────────────────────

const seoOptimizations: Optimization[] = [
  {
    title: "Static Generation (SSG)",
    badge: "Hiệu năng",
    impact: "TTFB < 50ms",
    how: "Toàn bộ trang được pre-render thành file HTML tĩnh lúc next build. Không có Node.js runtime khi user request — Vercel chỉ đọc file từ disk và trả về.",
    effect: "TTFB (Time To First Byte) thường < 50ms so với 200–500ms ở SSR. Không có cold start, không có DB query. Kết hợp Cloudflare cache → HTML được serve từ edge, TTFB thực tế ~10–30ms với người dùng Việt Nam.",
  },
  {
    title: "OG Image động (next/og)",
    badge: "SEO / Social",
    impact: "CTR tăng khi share link",
    how: "Tạo file src/app/opengraph-image.tsx dùng @vercel/og (ImageResponse). Mỗi lần social crawler đọc og:image, Next.js render ảnh 1200×630px on-the-fly với nền Hextech, tên, job title và tech stack. Ảnh được cache sau lần đầu.",
    effect: "Khi share link lên LinkedIn, Facebook, Zalo, Discord — hiện card ảnh đẹp thay vì trống. CTR tăng vì người xem thấy context ngay không cần click. Quan trọng khi recruiter forward link cho team.",
  },
  {
    title: "JSON-LD Person Schema",
    badge: "SEO",
    impact: "Google Rich Results",
    how: "Nhúng structured data schema.org/Person vào <script type=\"application/ld+json\"> trong <head>. Khai báo đầy đủ: name, jobTitle, email, worksFor (VNPT), alumniOf (ĐH Điện Lực), sameAs (LinkedIn), knowsAbout (danh sách tech).",
    effect: "Google đọc được danh tính và nghề nghiệp mà không cần phân tích nội dung trang. Khi search tên trên Google có thể xuất hiện Knowledge Panel hoặc rich snippet. Cũng giúp Google hiểu đây là trang profile cá nhân, tăng khả năng index đúng intent.",
  },
  {
    title: "sitemap.xml + robots.txt",
    badge: "SEO",
    impact: "Crawl budget tối ưu",
    how: "Tạo src/app/sitemap.ts và src/app/robots.ts — Next.js tự sinh /sitemap.xml và /robots.txt khi build. sitemap khai báo URL, lastModified, priority. robots.txt allow tất cả crawler và trỏ về sitemap.",
    effect: "Googlebot biết chính xác trang nào cần crawl, tần suất bao nhiêu. Không có sitemap → bot phải tự khám phá → chậm index hơn. Điều kiện bắt buộc để submit lên Google Search Console và theo dõi coverage.",
  },
  {
    title: "metadataBase + Canonical URL",
    badge: "SEO",
    impact: "Tránh duplicate content",
    how: "Set metadataBase: new URL('https://hieunt.site') trong layout.tsx. Thêm alternates: { canonical: '/' }. Tất cả URL trong OG/Twitter tags tự động trở thành absolute URL.",
    effect: "Không có metadataBase → og:url, og:image là relative path → social crawler không đọc được → share link trống. Canonical URL ngăn Google index cùng content từ nhiều domain (vd: hieunt.site và www.hieunt.site là 2 URL khác nhau) → tránh bị phạt duplicate content.",
  },
  {
    title: "next/font — tự host Google Fonts",
    badge: "Hiệu năng",
    impact: "LCP ↓, CLS = 0",
    how: "Dùng next/font/google thay vì link trực tiếp Google Fonts CDN. Next.js download font lúc build, tự host trên Vercel, thêm size-adjust để font fallback có cùng metrics với font thật.",
    effect: "Không có request sang fonts.googleapis.com → không bị CORS, không bị block bởi VPN/firewall. size-adjust đảm bảo layout không bị shift khi font swap → CLS = 0. Font được preload nên không block render.",
  },
];

// ── Hạ tầng ─────────────────────────────────────────────────────────────────

const infraDetails = [
  {
    label: "Hosting",
    value: "Vercel",
    note: "Auto-deploy từ nhánh main trên GitHub. Mỗi commit tạo preview URL riêng. Rollback 1 click nếu cần.",
  },
  {
    label: "CDN / Proxy",
    value: "Cloudflare",
    note: "Đặt trước Vercel. Xử lý DNS, SSL/TLS, cache static + /_next/image tại edge, bảo vệ DDoS layer 3/4/7, ẩn IP origin Vercel.",
  },
  {
    label: "Object Storage",
    value: "Cloudflare R2",
    note: "Lưu ảnh portfolio tại cdn.hieunt.site. Zero egress fee — serve ảnh không tốn tiền bandwidth. Tự động phân phối qua CDN Cloudflare toàn cầu.",
  },
  {
    label: "Domain",
    value: "hieunt.site",
    note: "Nameserver trỏ về Cloudflare. HTTPS bắt buộc (HSTS). SSL Full (strict): Cloudflare ↔ Vercel đều HTTPS.",
  },
  {
    label: "Render strategy",
    value: "Static (SSG)",
    note: "next build xuất toàn bộ trang thành HTML tĩnh. Không Node.js runtime trên production — chỉ serve file từ Cloudflare edge.",
  },
  {
    label: "CI/CD",
    value: "GitHub → Vercel",
    note: "Push code → Vercel webhook tự build và deploy trong ~30 giây.",
  },
  {
    label: "Cache layers",
    value: "3 lớp",
    note: "Browser cache (max-age 1 năm cho assets) → Cloudflare edge cache → Vercel origin. Request thông thường không bao giờ chạm Vercel.",
  },
];

// ── Component chính ─────────────────────────────────────────────────────────

export default function DocumentPage() {
  return (
    <main className="min-h-screen bg-void-950 text-hex-100 px-5 py-16 sm:px-8 sm:py-24">
      <div className="max-w-3xl mx-auto space-y-16">

        {/* Header */}
        <header className="space-y-3">
          <p className="text-[10px] tracking-[0.35em] uppercase font-mono text-hex-300/60">
            Tài liệu hệ thống · v2.0
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-hex-100 leading-tight">
            {siteConfig.name}
            <span className="block text-hex-300/60 text-xl font-normal mt-1">
              Portfolio — hieunt.site
            </span>
          </h1>
          <p className="text-sm text-hex-100/60 leading-relaxed max-w-2xl">
            Trang này mô tả kiến trúc kỹ thuật, các tối ưu hiệu năng đã thực hiện và
            16 tính năng của portfolio. Xây dựng với Next.js App Router, thiết kế Hextech,
            deploy trên Vercel + Cloudflare CDN + R2.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-hex-400 hover:text-hex-200 transition-colors"
            >
              ← Quay lại trang chủ
            </Link>
          </div>
        </header>

        <Divider />

        {/* 01 · Tổng quan */}
        <Section number="01" title="Tổng quan">
          <dl className="grid sm:grid-cols-3 gap-4">
            <InfoCard label="Mục đích" value="Portfolio cá nhân dành cho nhà tuyển dụng và đối tác kỹ thuật." />
            <InfoCard label="Chủ đề" value="Hextech — lấy cảm hứng từ giao diện tướng Liên Minh Huyền Thoại." />
            <InfoCard label="Đối tượng" value="Hiring manager, Tech lead, Recruiter trong lĩnh vực Backend / Full-stack." />
          </dl>
        </Section>

        <Divider />

        {/* 02 · Tối ưu Performance */}
        <Section number="02" title="Tối ưu Performance">
          <p className="text-sm text-hex-100/55 leading-relaxed mb-2">
            Các thay đổi dưới đây đã được thực hiện trực tiếp trên codebase để cải thiện
            điểm Lighthouse Performance. Mở từng mục để xem cụ thể làm gì và tác động ra sao.
          </p>

          {/* Legend */}
          <div className="flex items-center gap-4 mb-4 text-[10px] font-mono">
            <span className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 border border-emerald-400/30 bg-emerald-400/5 text-emerald-400/80">Hiệu năng</span>
              <span className="text-hex-300/40">= tốc độ tải, JS bundle</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 border border-sky-400/30 bg-sky-400/5 text-sky-400/80">Hạ tầng</span>
              <span className="text-hex-300/40">= CDN, cache, hosting</span>
            </span>
          </div>

          <div className="space-y-2">
            {perfOptimizations.map((opt) => (
              <OptimizationRow key={opt.title} {...opt} />
            ))}
          </div>

          {/* Score summary */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Performance", score: "85–92", sub: "mobile" },
              { label: "SEO", score: "100", sub: "" },
              { label: "Accessibility", score: "90+", sub: "" },
              { label: "Best Practices", score: "96", sub: "" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 py-4 border border-hex-600/20 bg-void-900/40">
                <span className="text-2xl font-bold text-hex-100">{s.score}</span>
                {s.sub && <span className="text-[9px] font-mono text-hex-300/40">{s.sub}</span>}
                <span className="text-[10px] font-mono text-hex-300/50 uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] font-mono text-hex-300/35 mt-2">
            * Lighthouse / PageSpeed Insights — dự kiến sau tất cả fixes
          </p>
        </Section>

        <Divider />

        {/* 03 · Tối ưu SEO */}
        <Section number="03" title="Tối ưu SEO & Discoverability">
          <p className="text-sm text-hex-100/55 leading-relaxed mb-4">
            Các kỹ thuật ảnh hưởng tới khả năng Google index, hiển thị trên kết quả
            tìm kiếm và click-through rate khi chia sẻ link mạng xã hội.
          </p>
          <div className="space-y-2">
            {seoOptimizations.map((opt) => (
              <OptimizationRow key={opt.title} {...opt} />
            ))}
          </div>
        </Section>

        <Divider />

        {/* 04 · Hạ tầng */}
        <Section number="04" title="Hạ tầng & Triển khai">
          <p className="text-sm text-hex-100/55 leading-relaxed mb-5">
            Toàn bộ stack là free tier nhưng đảm bảo uptime cao và latency thấp nhờ
            3 lớp cache: Browser → Cloudflare Edge → Vercel Origin.
          </p>
          <div className="border border-hex-600/20 divide-y divide-hex-600/15">
            {infraDetails.map((row) => (
              <div key={row.label} className="px-4 py-4 grid sm:grid-cols-[160px_1fr] gap-2 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="text-xs font-mono text-hex-300/50">{row.label}</div>
                  <div className="text-sm font-semibold text-hex-200 mt-0.5">{row.value}</div>
                </div>
                <p className="text-sm text-hex-100/60 leading-relaxed">{row.note}</p>
              </div>
            ))}
          </div>

          {/* Request flow */}
          <div className="mt-5 p-4 bg-void-900/50 border border-hex-600/20">
            <p className="text-[10px] font-mono text-hex-300/40 mb-3 uppercase tracking-widest">Luồng request — ảnh</p>
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono text-hex-200/80">
              <FlowStep label="Browser" />
              <Arrow />
              <FlowStep label="Cloudflare Edge" sub="Cache hit?" highlight />
              <Arrow />
              <FlowStep label="next/image" sub="WebP / AVIF" />
              <Arrow />
              <FlowStep label="R2 cdn.hieunt.site" sub="ảnh gốc" />
            </div>
            <p className="mt-3 text-[11px] text-hex-100/40 leading-relaxed">
              Lần đầu: Cloudflare miss → next/image kéo ảnh từ R2, optimize → WebP/AVIF, cache tại edge.
              Từ lần 2: Cloudflare trả ảnh đã optimize từ edge node gần nhất (~10–30ms).
              Vercel origin không bị hit sau lần đầu.
            </p>
          </div>

          {/* Request flow — HTML */}
          <div className="mt-3 p-4 bg-void-900/50 border border-hex-600/20">
            <p className="text-[10px] font-mono text-hex-300/40 mb-3 uppercase tracking-widest">Luồng request — trang HTML</p>
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono text-hex-200/80">
              <FlowStep label="Browser" />
              <Arrow />
              <FlowStep label="Cloudflare Edge" sub="Cache hit?" highlight />
              <Arrow />
              <FlowStep label="Vercel CDN" sub="Static HTML" />
            </div>
            <p className="mt-3 text-[11px] text-hex-100/40 leading-relaxed">
              HTML là file tĩnh (SSG), không cần server-side compute. Cloudflare cache HTML
              tại edge — sau build mới thì purge cache tự động qua Vercel-Cloudflare integration.
            </p>
          </div>
        </Section>

        <Divider />

        {/* 05 · Tech Stack */}
        <Section number="05" title="Tech Stack">
          <div className="space-y-4">
            {techStack.map((group) => (
              <div key={group.group} className="grid sm:grid-cols-[180px_1fr] gap-2 sm:gap-4">
                <span className="text-xs font-mono text-hex-300/60 pt-0.5">{group.group}</span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="px-2.5 py-1 text-xs font-mono bg-void-900 border border-hex-600/30 text-hex-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* 06 · Tính năng */}
        <Section number="06" title="Tính năng trang">
          <div className="space-y-2">
            {features.map((f) => (
              <FeatureRow key={f.id} {...f} />
            ))}
          </div>
        </Section>

        {/* Footer */}
        <footer className="pt-4 pb-2 border-t border-hex-600/20 text-[11px] font-mono text-hex-300/40 flex items-center justify-between flex-wrap gap-2">
          <span>hieunt.site · {siteConfig.name}</span>
          <span>Cập nhật: 2026-05 · v2.1</span>
        </footer>
      </div>
    </main>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5">
      <div className="flex items-baseline gap-3">
        <span className="text-[10px] font-mono text-hex-300/40">{number}</span>
        <h2 className="text-lg font-semibold text-hex-100 tracking-wide">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 bg-void-900 border border-hex-600/25 space-y-1.5">
      <dt className="text-[10px] tracking-[0.25em] uppercase font-mono text-hex-300/60">{label}</dt>
      <dd className="text-sm text-hex-100/80 leading-relaxed">{value}</dd>
    </div>
  );
}

function OptimizationRow({ title, badge, impact, how, effect }: Optimization) {
  const [open, setOpen] = useState(false);

  const badgeColor =
    badge === "Hiệu năng"
      ? "text-emerald-400/80 border-emerald-400/30 bg-emerald-400/5"
      : badge === "Hạ tầng"
      ? "text-sky-400/80 border-sky-400/30 bg-sky-400/5"
      : "text-hex-300/70 border-hex-600/30 bg-hex-400/5";

  return (
    <div className="border border-hex-600/20 bg-void-900/40">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-void-900/60 transition-colors"
      >
        <span className={`flex-shrink-0 hidden sm:inline-block px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest border ${badgeColor}`}>
          {badge}
        </span>
        <span className="flex-1 text-sm font-medium text-hex-100">{title}</span>
        <span className="flex-shrink-0 hidden sm:inline text-[10px] font-mono text-hex-300/50 mr-2">{impact}</span>
        <span className="flex-shrink-0 text-hex-400/60 text-xs">{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-3 border-t border-hex-600/15 space-y-3">
          <div>
            <p className="text-[10px] font-mono text-hex-300/50 uppercase tracking-widest mb-1">Làm như thế nào</p>
            <p className="text-sm text-hex-100/60 leading-relaxed">{how}</p>
          </div>
          <div>
            <p className="text-[10px] font-mono text-emerald-400/50 uppercase tracking-widest mb-1">Ảnh hưởng</p>
            <p className="text-sm text-hex-100/60 leading-relaxed">{effect}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function FeatureRow({ id, title, desc }: { id: string; title: string; desc: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-hex-600/20 bg-void-900/40">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-void-900/60 transition-colors"
      >
        <span className="flex-shrink-0 text-[10px] font-mono text-hex-300/40 w-6">{id}</span>
        <span className="flex-1 text-sm font-medium text-hex-100">{title}</span>
        <span className="flex-shrink-0 text-hex-400/60 text-xs">{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <p className="px-4 pb-4 pt-3 text-sm text-hex-100/60 leading-relaxed border-t border-hex-600/15">{desc}</p>
      )}
    </div>
  );
}

function FlowStep({ label, sub, highlight }: { label: string; sub?: string; highlight?: boolean }) {
  return (
    <span className={`flex flex-col items-center px-3 py-1.5 border text-center ${highlight ? "border-cyan-glow/40 bg-cyan-glow/5 text-cyan-glow" : "border-hex-600/25 text-hex-200/70"}`}>
      <span className="text-[11px]">{label}</span>
      {sub && <span className="text-[9px] opacity-60 mt-0.5">{sub}</span>}
    </span>
  );
}

function Arrow() {
  return <span className="text-hex-400/40 text-xs">→</span>;
}

function Divider() {
  return <hr className="border-0 border-t border-hex-600/20" />;
}
