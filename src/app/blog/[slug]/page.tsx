import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPost } from "@/lib/data/blog";
import { Breadcrumb } from "@/components/elora/breadcrumb";
import { ProductImage } from "@/components/elora/product-card";
import { faDateLong, toFa } from "@/lib/fa";
import { Clock3, ChevronLeft, CalendarDays, Tags } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: post?.title || "مقاله" };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="container-elora py-6 lg:py-8">
      <Breadcrumb items={[{ label: "وبلاگ", href: "/blog" }, { label: post.category }]} />

      <article className="mx-auto max-w-3xl">
        <header className="text-center">
          <span className="inline-block rounded-full bg-rose-50 px-4 py-1.5 text-[0.72rem] font-bold text-primary">
            {post.category}
          </span>
          <h1 className="mt-4 text-xl font-black leading-10 text-foreground sm:text-2xl sm:leading-11">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[0.72rem] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} className="text-primary" />
              {faDateLong(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={14} className="text-primary" />
              {toFa(post.readingTime)} دقیقه مطالعه
            </span>
          </div>
        </header>

        <div className="mt-8 aspect-[16/9] overflow-hidden rounded-3xl bg-blush shadow-md">
          <ProductImage src={post.image} alt={post.title} className="size-full" />
        </div>

        <div className="mt-10 space-y-9">
          {post.content.map((sec, i) => (
            <section key={i}>
              <h2 className="flex items-center gap-2.5 text-[1rem] font-black text-foreground">
                <span className="h-5 w-1.5 rounded-full bg-gradient-to-b from-primary to-lilac" />
                {sec.heading}
              </h2>
              {sec.paragraphs.map((p, j) => (
                <p key={j} className="mt-3.5 text-[0.88rem] leading-9 text-secondary-foreground">
                  {p}
                </p>
              ))}
              {sec.list && (
                <ul className="mt-4 space-y-2.5 rounded-2xl bg-rose-50/60 p-5 ring-1 ring-rose-100">
                  {sec.list.map((li, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[0.82rem] leading-7 text-secondary-foreground">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-2 border-t border-dashed border-rose-200 pt-6 text-[0.72rem] text-muted-foreground">
          <Tags size={14} className="text-primary" />
          {post.tags.map((t) => (
            <span key={t} className="rounded-full bg-lilac-soft px-3 py-1 font-bold text-lilac">
              {t}
            </span>
          ))}
        </div>
      </article>

      {/* related posts */}
      <section className="mx-auto mt-14 max-w-5xl">
        <h2 className="mb-6 text-lg font-black text-foreground">مقالات مرتبط</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[16/10] overflow-hidden bg-blush">
                <ProductImage src={p.image} alt={p.title} className="size-full transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 text-[0.85rem] font-black leading-7 text-foreground group-hover:text-primary">
                  {p.title}
                </h3>
                <span className="mt-2 inline-flex items-center gap-1 text-[0.68rem] font-bold text-primary">
                  خواندن مقاله
                  <ChevronLeft size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
