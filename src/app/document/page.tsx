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
    items: ["Framer Motion", "CSS transitions", "IntersectionObserver"],
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
    items: ["Vercel (auto-deploy)", "Cloudflare CDN + DNS", "HTTPS / HTTP2"],
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
];

// Các kỹ thuật tối ưu — giải thích chi tiết
const seoOptimizations = [
  {
    title: "Static Generation (SSG)",
    badge: "Hiệu năng",
    impact: "TTFB < 50 ms",
    desc: "Toàn bộ trang được pre-render thành file HTML tĩnh lúc build (không có server-side logic khi người dùng request). Kết quả: server trả file ngay lập tức — không cần chạy code, không cần truy vấn DB. TTFB (Time To First Byte) thường < 50 ms so với 200–500 ms ở SSR.",
  },
  {
    title: "Cloudflare CDN",
    badge: "Hạ tầng",
    impact: "Latency ↓ 60–80%",
    desc: "Cloudflare đặt 300+ điểm hiện diện (PoP) trên toàn cầu. File HTML/JS/CSS/ảnh được cache ở edge node gần người dùng nhất — người dùng Hà Nội lấy file từ Singapore hoặc HCM thay vì từ server Mỹ. Giảm latency 60–80% so với truy cập thẳng về origin. Ngoài ra Cloudflare tự động bật HTTP/2 và TLS 1.3.",
  },
  {
    title: "OG Image động (next/og)",
    badge: "SEO / Social",
    impact: "CTR tăng khi share",
    desc: "Khi share link lên LinkedIn, Facebook, Zalo hay Discord, mạng xã hội đọc thẻ og:image và hiển thị ảnh preview. Thay vì để trống hoặc dùng ảnh tĩnh cố định, trang này sinh OG image 1200×630 px tự động bằng @vercel/og — nền Hextech, tên, job title và tech stack được render trực tiếp vào ảnh. Tăng CTR vì card trông chuyên nghiệp khi chia sẻ.",
  },
  {
    title: "JSON-LD Person Schema",
    badge: "SEO",
    impact: "Google Rich Results",
    desc: "Nhúng structured data theo chuẩn schema.org/Person vào thẻ <script type=\"application/ld+json\"> trong <head>. Google đọc được: tên, email, nghề nghiệp, nơi làm việc, trường học, mạng xã hội. Kết quả: khi search tên trên Google có thể xuất hiện Knowledge Panel hoặc rich snippet — nổi bật hơn các kết quả thông thường.",
  },
  {
    title: "sitemap.xml + robots.txt",
    badge: "SEO",
    impact: "Crawl budget tối ưu",
    desc: "sitemap.xml liệt kê URL và tần suất cập nhật — giúp Googlebot / Bingbot biết trang nào cần index ưu tiên. robots.txt khai báo allow cho tất cả crawler và trỏ về sitemap. Hai file này là điều kiện cơ bản để vào Google Search Console và theo dõi hiệu quả index.",
  },
  {
    title: "metadataBase + Canonical URL",
    badge: "SEO",
    impact: "Tránh duplicate content",
    desc: "metadataBase: new URL(\"https://hieunt.site\") đảm bảo mọi URL trong Open Graph, Twitter Card đều là URL tuyệt đối — không bị relative URL gây hỏng khi social crawler đọc. Canonical URL chỉ định URL gốc duy nhất của trang, ngăn Google phạt vì duplicate content nếu trang được access qua nhiều domain (vd: www. và non-www.).",
  },
  {
    title: "Font & Asset Optimization",
    badge: "Hiệu năng",
    impact: "LCP ↓, CLS = 0",
    desc: "next/font tự host font Cinzel + Rajdhani — không có request sang Google Fonts, không bị CORS, không bị block bởi ad-blocker. Font được preload và subsetted (chỉ load ký tự Latin). Kết hợp với size-adjust để tránh layout shift (CLS = 0) khi font fallback được swap sang font thật.",
  },
  {
    title: "Image Optimization",
    badge: "Hiệu năng",
    impact: "Payload ↓ 60–80%",
    desc: "Ảnh champion và hero được phục vụ qua Cloudflare với cache-control dài hạn. Ảnh tĩnh trong /public được Vercel nén và chuyển sang WebP/AVIF tự động khi browser hỗ trợ — giảm dung lượng 60–80% so với JPEG/PNG gốc. Thuộc tính loading=\"lazy\" trên ảnh ngoài viewport giúp giảm tải lần đầu.",
  },
];

const infraDetails = [
  {
    label: "Hosting",
    value: "Vercel",
    note: "Auto-deploy từ nhánh main trên GitHub. Mỗi commit tạo một preview URL riêng để review trước khi merge.",
  },
  {
    label: "CDN / Proxy",
    value: "Cloudflare",
    note: "Đặt trước Vercel. Xử lý DNS, SSL/TLS termination, cache tĩnh, bảo vệ DDoS layer 3/4/7 và ẩn IP origin.",
  },
  {
    label: "Domain",
    value: "hieunt.site",
    note: "Trỏ nameserver về Cloudflare. HTTPS bắt buộc (HSTS). SSL Full (strict) — Cloudflare ↔ Vercel đều dùng HTTPS.",
  },
  {
    label: "Render strategy",
    value: "Static (SSG)",
    note: "next build xuất toàn bộ trang thành HTML tĩnh. Không có Node.js runtime trên production — chỉ serve file.",
  },
  {
    label: "CI/CD",
    value: "GitHub → Vercel",
    note: "Push code → Vercel webhook tự build và deploy trong ~30 giây. Rollback 1 click nếu cần.",
  },
  {
    label: "Cache strategy",
    value: "Edge + Browser",
    note: "Cloudflare cache HTML/JS/CSS ở edge. Assets có Cache-Control: public, max-age=31536000, immutable (1 năm) nhờ content hash trong tên file.",
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
            Tài liệu hệ thống · v1.0
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-hex-100 leading-tight">
            {siteConfig.name}
            <span className="block text-hex-300/60 text-xl font-normal mt-1">
              Portfolio — hieunt.site
            </span>
          </h1>
          <p className="text-sm text-hex-100/60 leading-relaxed max-w-2xl">
            Trang này mô tả kiến trúc, các tối ưu kỹ thuật và tính năng của portfolio cá nhân.
            Xây dựng với Next.js App Router, thiết kế Hextech, deploy trên Vercel + Cloudflare CDN.
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
            <InfoCard
              label="Mục đích"
              value="Portfolio cá nhân dành cho nhà tuyển dụng và đối tác kỹ thuật."
            />
            <InfoCard
              label="Chủ đề"
              value="Hextech — lấy cảm hứng từ giao diện tướng Liên Minh Huyền Thoại."
            />
            <InfoCard
              label="Đối tượng"
              value="Hiring manager, Tech lead, Recruiter trong lĩnh vực Backend / Full-stack."
            />
          </dl>
        </Section>

        <Divider />

        {/* 02 · Tối ưu SEO & Hiệu năng — MOVED UP */}
        <Section number="02" title="Tối ưu SEO & Hiệu năng">
          <p className="text-sm text-hex-100/55 leading-relaxed mb-6">
            Các kỹ thuật dưới đây ảnh hưởng trực tiếp tới tốc độ tải trang, khả năng
            được Google index và click-through rate khi chia sẻ link. Mở từng mục để
            xem chi tiết cách hoạt động và tác động thực tế.
          </p>
          <div className="space-y-2">
            {seoOptimizations.map((opt) => (
              <OptimizationRow key={opt.title} {...opt} />
            ))}
          </div>

          {/* Score summary */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Performance", score: "90+" },
              { label: "SEO", score: "100" },
              { label: "Accessibility", score: "90+" },
              { label: "Best Practices", score: "96" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1 py-4 border border-hex-600/20 bg-void-900/40"
              >
                <span className="text-2xl font-bold text-hex-100">{s.score}</span>
                <span className="text-[10px] font-mono text-hex-300/50 uppercase tracking-widest">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[11px] font-mono text-hex-300/35 mt-2">
            * Lighthouse scores trên Chrome DevTools / PageSpeed Insights
          </p>
        </Section>

        <Divider />

        {/* 03 · Hạ tầng — MOVED UP */}
        <Section number="03" title="Hạ tầng & Triển khai">
          <p className="text-sm text-hex-100/55 leading-relaxed mb-5">
            Stack triển khai được thiết kế để hoàn toàn miễn phí (free tier) nhưng vẫn
            đảm bảo uptime cao, bảo mật và latency thấp nhờ kết hợp Vercel edge network
            và Cloudflare CDN.
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

          {/* Request flow diagram */}
          <div className="mt-5 p-4 bg-void-900/50 border border-hex-600/20">
            <p className="text-[10px] font-mono text-hex-300/40 mb-3 uppercase tracking-widest">
              Luồng request
            </p>
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono text-hex-200/80">
              <FlowStep label="Browser" />
              <Arrow />
              <FlowStep label="Cloudflare Edge" sub="DNS · SSL · Cache" highlight />
              <Arrow />
              <FlowStep label="Vercel CDN" sub="Static file" />
              <Arrow />
              <FlowStep label="HTML / JS / CSS" sub="~30 KB gzipped" />
            </div>
            <p className="mt-3 text-[11px] text-hex-100/40 leading-relaxed">
              Nếu Cloudflare đã cache → Vercel không bị hit. Request chỉ đi tới Vercel
              khi cache miss (lần đầu tiên sau build mới). Sau đó Cloudflare phục vụ
              từ edge node gần nhất — thường trong vòng 10–30 ms.
            </p>
          </div>
        </Section>

        <Divider />

        {/* 04 · Tech Stack */}
        <Section number="04" title="Tech Stack">
          <div className="space-y-4">
            {techStack.map((group) => (
              <div
                key={group.group}
                className="grid sm:grid-cols-[180px_1fr] gap-2 sm:gap-4"
              >
                <span className="text-xs font-mono text-hex-300/60 pt-0.5">
                  {group.group}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs font-mono bg-void-900 border border-hex-600/30 text-hex-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* 05 · Tính năng */}
        <Section number="05" title="Tính năng trang">
          <div className="space-y-2">
            {features.map((f) => (
              <FeatureRow key={f.id} {...f} />
            ))}
          </div>
        </Section>

        {/* Footer */}
        <footer className="pt-4 pb-2 border-t border-hex-600/20 text-[11px] font-mono text-hex-300/40 flex items-center justify-between flex-wrap gap-2">
          <span>hieunt.site · {siteConfig.name}</span>
          <span>Cập nhật: 2025</span>
        </footer>
      </div>
    </main>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
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
      <dt className="text-[10px] tracking-[0.25em] uppercase font-mono text-hex-300/60">
        {label}
      </dt>
      <dd className="text-sm text-hex-100/80 leading-relaxed">{value}</dd>
    </div>
  );
}

function OptimizationRow({
  title,
  badge,
  impact,
  desc,
}: {
  title: string;
  badge: string;
  impact: string;
  desc: string;
}) {
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
        {/* Badge */}
        <span
          className={`flex-shrink-0 hidden sm:inline-block px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest border ${badgeColor}`}
        >
          {badge}
        </span>
        <span className="flex-1 text-sm font-medium text-hex-100">{title}</span>
        {/* Impact */}
        <span className="flex-shrink-0 hidden sm:inline text-[10px] font-mono text-hex-300/50 mr-2">
          {impact}
        </span>
        <span className="flex-shrink-0 text-hex-400/60 text-xs">{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <p className="px-4 pb-4 pt-3 text-sm text-hex-100/60 leading-relaxed border-t border-hex-600/15">
          {desc}
        </p>
      )}
    </div>
  );
}

function FeatureRow({
  id,
  title,
  desc,
}: {
  id: string;
  title: string;
  desc: string;
}) {
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
        <p className="px-4 pb-4 pt-3 text-sm text-hex-100/60 leading-relaxed border-t border-hex-600/15">
          {desc}
        </p>
      )}
    </div>
  );
}

function FlowStep({
  label,
  sub,
  highlight,
}: {
  label: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <span
      className={`flex flex-col items-center px-3 py-1.5 border text-center ${
        highlight
          ? "border-cyan-glow/40 bg-cyan-glow/5 text-cyan-glow"
          : "border-hex-600/25 text-hex-200/70"
      }`}
    >
      <span className="text-[11px]">{label}</span>
      {sub && (
        <span className="text-[9px] opacity-60 mt-0.5">{sub}</span>
      )}
    </span>
  );
}

function Arrow() {
  return <span className="text-hex-400/40 text-xs">→</span>;
}

function Divider() {
  return <hr className="border-0 border-t border-hex-600/20" />;
}
