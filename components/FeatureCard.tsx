// components/FeatureCard.tsx
import { ReactNode } from "react";

export function FeatureCard({
  title,
  href,
  icon,
  children
}: {
  title: string;
  href: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      style={{
        display: "block",
        padding: "1.5rem",
        borderRadius: "1.1rem",
        border: "1px solid #f0f2f7",
        margin: "0.75rem 0",
        textDecoration: "none",
        background: "#fff",
        boxShadow: "0 2px 8px #0001",
        transition: "box-shadow 0.16s",
        color: "#222"
      }}
      tabIndex={0}
    >
      <div style={{ fontSize: 38, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontWeight: 600, fontSize: "1.18rem", marginBottom: 6 }}>{title}</div>
      <div style={{ color: "#575e6b" }}>{children}</div>
    </a>
  );
}
