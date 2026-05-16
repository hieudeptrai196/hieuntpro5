import { cn } from "@/lib/cn";

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionLabel({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "mb-16",
        align === "center" ? "text-center mx-auto max-w-2xl" : "text-left max-w-2xl",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 mb-4",
          align === "center" && "justify-center",
        )}
      >
        <span className="h-px w-8 bg-hex-600" />
        <span className="label-eyebrow text-hex-300">{eyebrow}</span>
        <span className="h-px w-8 bg-hex-600" />
      </div>
      <h2 className="display-h text-3xl sm:text-4xl lg:text-5xl text-hex-gradient">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-hex-100/60 leading-relaxed text-sm sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
