import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/elora/header";
import { Footer } from "@/components/elora/footer";
import { LoginRequiredModal } from "@/components/elora/login-required-modal";

export const metadata: Metadata = {
  title: {
    default: "اِلورا | فروشگاه آنلاین لوازم آرایشی و مراقبتی",
    template: "%s | اِلورا",
  },
  description:
    "اِلورا؛ مقصد مدرن خرید لوازم آرایشی، مراقبت پوست و مو، عطر و لوازم برقی زیبایی با تنوعی بی‌نظیر از برندهای معتبر جهان.",
  keywords: ["آرایشی", "مراقبت پوست", "عطر", "لوازم برقی", "اِلورا", "الورا"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fdf2f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
        />
      </head>
      <body className="antialiased bg-background text-foreground min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <LoginRequiredModal />
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            className:
              "font-sans text-sm border border-rose-100 shadow-lg rounded-xl",
          }}
        />
      </body>
    </html>
  );
}
