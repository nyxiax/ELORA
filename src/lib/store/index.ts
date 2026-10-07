"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Address, MockOrder, MockUser, Review, Ticket } from "@/lib/types";
import { MOCK_ORDERS } from "@/lib/data/misc";

/* ─────────── Auth ─────────── */
interface AuthState {
  user: MockUser | null;
  registered: MockUser[]; // mock "database" of users
  login: (phone: string, password: string) => { ok: boolean; error?: string };
  register: (u: Omit<MockUser, "id">) => { ok: boolean; error?: string };
  logout: () => void;
  updateProfile: (patch: Partial<MockUser>) => void;
  isPhoneTaken: (phone: string) => boolean;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      registered: [],
      isPhoneTaken: (phone) =>
        get().registered.some((u) => u.phone === phone) || phone === "09123456789",
      login: (phone, password) => {
        const found = get().registered.find(
          (u) => u.phone === phone && u.password === password
        );
        if (!found) {
          // demo account for quick browsing
          if (phone === "09123456789" && password === "123456") {
            const demo: MockUser = {
              id: "demo",
              name: "کاربر مهمان اِلورا",
              phone,
              password,
              birthday: "1375/05/12",
              nationalCode: "0079123456",
            };
            set({ user: demo });
            return { ok: true };
          }
          return { ok: false, error: "شماره تماس یا رمز عبور اشتباه است." };
        }
        set({ user: found });
        return { ok: true };
      },
      register: (u) => {
        if (get().registered.some((x) => x.phone === u.phone)) {
          return { ok: false, error: "این شماره تماس قبلاً ثبت شده است." };
        }
        const user: MockUser = { ...u, id: `u-${Date.now()}` };
        set((s) => ({ user, registered: [...s.registered, user] }));
        return { ok: true };
      },
      logout: () => {
    try {
      sessionStorage.setItem("elora-just-logged-out", "1");
    } catch {}
    set({ user: null });
  },
      updateProfile: (patch) =>
        set((s) => {
          if (!s.user) return s;
          const user = { ...s.user, ...patch };
          return {
            user,
            registered: s.registered.map((r) => (r.id === user.id ? user : r)),
          };
        }),
    }),
    { name: "elora-auth", storage: createJSONStorage(() => localStorage) }
  )
);

/* ─────────── Cart ─────────── */
export interface CartItem {
  productId: string;
  qty: number;
}
interface CartState {
  items: CartItem[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: () => number;
}
export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (id, qty = 1) =>
        set((s) => {
          const found = s.items.find((i) => i.productId === id);
          if (found)
            return {
              items: s.items.map((i) =>
                i.productId === id ? { ...i, qty: i.qty + qty } : i
              ),
            };
          return { items: [...s.items, { productId: id, qty }] };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.productId !== id) })),
      inc: (id) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.productId === id ? { ...i, qty: Math.min(i.qty + 1, 20) } : i
          ),
        })),
      dec: (id) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.productId === id ? { ...i, qty: i.qty - 1 } : i))
            .filter((i) => i.qty > 0),
        })),
      setQty: (id, qty) =>
        set((s) => ({
          items: s.items.map((i) => (i.productId === id ? { ...i, qty } : i)),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((a, b) => a + b.qty, 0),
    }),
    { name: "elora-cart", storage: createJSONStorage(() => localStorage) }
  )
);

/* ─────────── Wishlist (requires login) ─────────── */
interface WishlistState {
  items: string[];
  toggle: (id: string, isLoggedIn: boolean) => "added" | "removed" | "auth";
  add: (id: string) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
}
export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (id, isLoggedIn) => {
        if (!isLoggedIn) return "auth";
        if (get().items.includes(id)) {
          set((s) => ({ items: s.items.filter((x) => x !== id) }));
          return "removed";
        }
        set((s) => ({ items: [id, ...s.items] }));
        return "added";
      },
      add: (id) =>
        set((s) => (s.items.includes(id) ? s : { items: [id, ...s.items] })),
      remove: (id) => set((s) => ({ items: s.items.filter((x) => x !== id) })),
      has: (id) => get().items.includes(id),
    }),
    { name: "elora-wishlist", storage: createJSONStorage(() => localStorage) }
  )
);

/* ─────────── UI (modals) ─────────── */
interface UIState {
  loginModalOpen: boolean;
  mobileMenuOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  setMobileMenu: (v: boolean) => void;
}
export const useUI = create<UIState>()((set) => ({
  loginModalOpen: false,
  mobileMenuOpen: false,
  openLoginModal: () => set({ loginModalOpen: true }),
  closeLoginModal: () => set({ loginModalOpen: false }),
  setMobileMenu: (v) => set({ mobileMenuOpen: v }),
}));

/* ─────────── Addresses ─────────── */
interface AddressState {
  addresses: Address[];
  add: (a: Omit<Address, "id">) => void;
  update: (id: string, patch: Partial<Address>) => void;
  remove: (id: string) => void;
}
export const useAddresses = create<AddressState>()(
  persist(
    (set) => ({
      addresses: [],
      add: (a) =>
        set((s) => ({
          addresses: [...s.addresses, { ...a, id: `addr-${Date.now()}` }],
        })),
      update: (id, patch) =>
        set((s) => ({
          addresses: s.addresses.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        })),
      remove: (id) =>
        set((s) => ({ addresses: s.addresses.filter((x) => x.id !== id) })),
    }),
    { name: "elora-addresses", storage: createJSONStorage(() => localStorage) }
  )
);

/* ─────────── Tickets ─────────── */
interface TicketState {
  tickets: Ticket[];
  add: (t: Omit<Ticket, "id" | "date" | "status" | "local">) => void;
}
export const useTickets = create<TicketState>()(
  persist(
    (set) => ({
      tickets: [],
      add: (t) =>
        set((s) => ({
          tickets: [
            {
              ...t,
              id: `TK-${Math.floor(100000 + Math.random() * 900000)}`,
              date: new Date().toISOString(),
              status: "در حال بررسی",
              local: true,
            },
            ...s.tickets,
          ],
        })),
    }),
    { name: "elora-tickets", storage: createJSONStorage(() => localStorage) }
  )
);

/* ─────────── Product comments (user submitted) ─────────── */
interface CommentState {
  comments: Review[]; // local:true reviews
  add: (r: Omit<Review, "id" | "date" | "local">) => void;
  forProduct: (productId: string) => Review[];
}
export const useComments = create<CommentState>()(
  persist(
    (set, get) => ({
      comments: [],
      add: (r) =>
        set((s) => ({
          comments: [
            {
              ...r,
              id: `lc-${Date.now()}`,
              date: new Date().toISOString().slice(0, 10),
              local: true,
            },
            ...s.comments,
          ],
        })),
      forProduct: (productId) => get().comments.filter((c) => c.productId === productId),
    }),
    { name: "elora-comments", storage: createJSONStorage(() => localStorage) }
  )
);

/* ─────────── Orders (user placed via mock checkout) ─────────── */
interface OrderState {
  orders: MockOrder[];
  place: (items: { productId: string; qty: number }[], total: number) => MockOrder;
}
export const useOrders = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      place: (items, total) => {
        const order: MockOrder = {
          id: `EL-${Math.floor(100000 + Math.random() * 900000)}`,
          date: new Date().toISOString(),
          items,
          total,
          status: "ثبت شده",
        };
        set((s) => ({ orders: [order, ...s.orders] }));
        return order;
      },
    }),
    { name: "elora-orders", storage: createJSONStorage(() => localStorage) }
  )
);

/** Orders visible in account = demo orders + user-placed ones */
export function allOrders(placed: MockOrder[]): MockOrder[] {
  return [...placed, ...MOCK_ORDERS];
}
