"use client";

import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="مسیر صفحه" className={cn("mb-5", className)}>
      <ol className="flex flex-wrap items-center gap-1 text-[0.75rem] text-muted-foreground">
        <li>
          <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-primary">
            <Home size={13} />
            خانه
          </Link>
        </li>
        {items.map((item, i) => (
          <Fragment key={i}>
            <li aria-hidden="true" className="text-rose-200">
              <ChevronLeft size={13} />
            </li>
            <li>
              {item.href && i < items.length - 1 ? (
                <Link href={item.href} className="transition-colors hover:text-primary">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-foreground">{item.label}</span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
