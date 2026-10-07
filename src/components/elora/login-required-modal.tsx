"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Heart, ShieldCheck } from "lucide-react";
import { useUI } from "@/lib/store";

export function LoginRequiredModal() {
  const ui = useUI();
  const router = useRouter();

  return (
    <Dialog open={ui.loginModalOpen} onOpenChange={(v) => (v ? ui.openLoginModal() : ui.closeLoginModal())}>
      <DialogContent className="max-w-sm rounded-3xl border-rose-100 p-7 text-center" dir="rtl">
        <DialogHeader className="items-center text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-rose-soft to-lilac-soft text-primary">
            <Heart className="fill-rose-300 text-rose-400" size={26} />
          </span>
          <DialogTitle className="mt-3 text-base font-black text-foreground">
            ورود به حساب کاربری
          </DialogTitle>
          <DialogDescription className="pt-2 text-[0.83rem] leading-7 text-secondary-foreground">
            برای افزودن محصول به علاقه‌مندی‌ها ابتدا وارد حساب کاربری خود شوید.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-2.5">
          <Button
            onClick={() => {
              ui.closeLoginModal();
              router.push("/login");
            }}
            className="h-11 rounded-2xl bg-gradient-to-l from-primary to-[#c2476f] text-[0.85rem] font-bold shadow-md shadow-rose-200 hover:shadow-lg"
          >
            ورود / ثبت‌نام
          </Button>
          <Button
            variant="outline"
            onClick={ui.closeLoginModal}
            className="h-11 rounded-2xl border-rose-200 text-[0.85rem] font-bold text-secondary-foreground hover:bg-rose-50"
          >
            انصراف
          </Button>
        </div>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-[0.68rem] text-muted-foreground">
          <ShieldCheck size={13} className="text-emerald-500" />
          اطلاعات شما فقط به‌صورت نمایشی در همین مرورگر ذخیره می‌شود.
        </p>
      </DialogContent>
    </Dialog>
  );
}
