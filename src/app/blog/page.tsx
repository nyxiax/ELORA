import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data/blog";
import { Breadcrumb } from "@/components/elora/breadcrumb";
import { ProductImage } from "@/components/elora/product-card";
import { faDateLong, toFa } from "@/lib/fa";
import { Clock3, ChevronLeft } from "lucide-react";

export const metadata: Metadata = { title: "Elora Beauty Journal — وبلاگ زیبایی" };

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div className="container-elora py-6 lg:py-8">
      <Breadcrumb items={[{ label: "وبلاگ" }]} />

      <div className="mb-8 rounded-3xl bg-gradient-to-l from-lilac-soft/80 via-white to-blush p-6 ring-1 ring-rose-100 sm:p-10">
        <h1 className="text-2xl font-black text-foreground">Elora Beauty Journal</h1>
        <p className="mt-2 max-w-2xl text-[0.84rem] leading-7 text-secondary-foreground">
          مجله‌ی زیبایی اِلورا؛ راهنماهای میکاپ، روتین‌های پوستی، ترندهای روز دنیا و
          نکته‌های تخصصی مراقبت از مو — همه نوشته‌شده به زبان ساده برای شما.
        </p>
      </div>

      {/* featured */}
      <Link
        href={`/blog/${featured.slug}`}
        className="group mb-8 grid grid-cols-1 overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm transition-all hover:shadow-lg md:grid-cols-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-blush md:aspect-auto md:min-h-[300px]">
          <ProductImage
            src={featured.image}
            alt={featured.title}
            className="size-full transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.68rem] font-bold text-primary backdrop-blur">
            مقاله ویژه
          </span>
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-9">
          <span className="w-fit rounded-full bg-rose-50 px-3 py-1 text-[0.68rem] font-bold text-primary">
            {featured.category}
          </span>
          <h2 className="mt-3 text-lg font-black leading-8 text-foreground transition-colors group-hover:text-primary sm:text-xl">
            {featured.title}
          </h2>
          <p className="mt-3 text-[0.82rem] leading-7 text-secondary-foreground">{featured.excerpt}</p>
          <div className="mt-5 flex items-center gap-4 text-[0.7rem] text-muted-foreground">
            <span>{faDateLong(featured.date)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock3 size={13} />
              {toFa(featured.readingTime)} دقیقه مطالعه
            </span>
            <span className="mr-auto inline-flex items-center gap-1 font-bold text-primary">
              ادامه مطلب
              <ChevronLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            </span>
          </div>
        </div>
      </Link>

      {/* grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="aspect-[16/10] overflow-hidden bg-blush">
              <ProductImage
                src={post.image}
                alt={post.title}
                className="size-full transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="w-fit rounded-full bg-lilac-soft px-3 py-1 text-[0.66rem] font-bold text-lilac">
                {post.category}
              </span>
              <h3 className="mt-3 line-clamp-2 text-[0.95rem] font-black leading-7 text-foreground transition-colors group-hover:text-primary">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-2 flex-1 text-[0.76rem] leading-6 text-secondary-foreground">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3 text-[0.66rem] text-muted-foreground">
                <span>{faDateLong(post.date)}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock3 size={12} />
                  {toFa(post.readingTime)} دقیقه
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
