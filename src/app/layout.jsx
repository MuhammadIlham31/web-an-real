import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  title: "Adaptive Network Laboratory",
  description: "Telkom University - Adaptive Network Laboratory",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased"><SmoothScroll />{children}</body>
    </html>
  );
}