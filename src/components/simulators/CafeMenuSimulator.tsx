import React, { useState } from 'react';
import { UtensilsCrossed, Plus, Minus, Send, Check } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'coffee' | 'drink' | 'food';
  desc: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'اسپرسو دابل رومانو', price: 85, category: 'coffee', desc: '۱۰۰٪ عربیکا تخصصی اتیوپی، کرمای غلیظ' },
  { id: '2', name: 'لاته کارامل نمکی VIP', price: 125, category: 'coffee', desc: 'شیر بخارداده با سس کارامل دست‌ساز' },
  { id: '3', name: 'ماکتیل موهیتو پشن‌فروت', price: 135, category: 'drink', desc: 'نعناع تازه، لیمو، سیروپ پشن‌فروت و سودا' },
  { id: '4', name: 'چیزبرگر اسموک با سیب‌زمینی', price: 290, category: 'food', desc: '۱۸۰ گرم گوشت راسته، پنیر گودا، سس دودی' },
  { id: '5', name: 'پاستا چیکن آلفردو', price: 270, category: 'food', desc: 'پنه، فیله گریل، قارچ بلانچ، خامه و پارمسان' },
];

export const CafeMenuSimulator: React.FC = () => {
  const [cart, setCart] = useState<Record<string, number>>({ '2': 1, '4': 1 });
  const [tableNumber, setTableNumber] = useState<string>('۷');
  const [orderSent, setOrderSent] = useState<boolean>(false);

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const updated = Math.max(0, current + delta);
      const copy = { ...prev };
      if (updated === 0) {
        delete copy[id];
      } else {
        copy[id] = updated;
      }
      return copy;
    });
  };

  const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU_ITEMS.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const vat = Math.round(subtotal * 0.1);
  const total = subtotal + vat;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-neutral-100">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-600/10 text-amber-500 rounded-xl">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-base text-neutral-100">دموی تعاملی: منوی دیجیتال QR کد کافه و رستوران</h4>
            <span className="text-xs text-neutral-400">سفارش‌گیری آنلاین سر میز بدون کارمزد ۲۰ درصدی اسنپ‌فود</span>
          </div>
        </div>
        <span className="text-xs font-mono text-amber-500/90 bg-amber-500/10 px-2.5 py-1 rounded-md">
          میز شماره {tableNumber}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Menu Items */}
        <div className="space-y-3">
          <div className="text-xs font-medium text-neutral-400">گزیده‌ای از منوی دیجیتال کافه:</div>
          {MENU_ITEMS.map((item) => {
            const qty = cart[item.id] || 0;
            return (
              <div
                key={item.id}
                className="p-3 bg-neutral-950/60 border border-neutral-800 rounded-xl flex items-center justify-between gap-3 hover:border-neutral-700 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-200">{item.name}</span>
                    <span className="text-xs text-amber-400 font-mono tabular-nums">
                      {(item.price * 1000).toLocaleString('fa-IR')} ت
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">{item.desc}</p>
                </div>

                <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-700 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 hover:bg-neutral-800 text-neutral-300 rounded"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-mono tabular-nums px-1 text-amber-400 font-bold">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={qty === 0}
                    className="p-1 hover:bg-neutral-800 text-neutral-300 rounded disabled:opacity-30"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Cart & WhatsApp Dispatch */}
        <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-neutral-800">
              <span className="text-xs font-medium text-neutral-300">صورتحساب سفارش سر میز:</span>
              <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                <span>میز:</span>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-10 bg-neutral-900 border border-neutral-700 rounded text-center text-xs py-0.5 text-amber-400 font-bold"
                />
              </div>
            </div>

            <div className="space-y-2 py-3 text-xs">
              {Object.keys(cart).length === 0 ? (
                <div className="text-neutral-400 text-center py-6">سبد سفارش خالی است.</div>
              ) : (
                Object.entries(cart).map(([id, qty]) => {
                  const item = MENU_ITEMS.find((m) => m.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="flex justify-between text-neutral-300">
                      <span>{item.name} × {qty}</span>
                      <span className="font-mono tabular-nums">
                        {(item.price * qty * 1000).toLocaleString('fa-IR')} ت
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {Object.keys(cart).length > 0 && (
              <div className="pt-3 border-t border-neutral-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>جمع اقلام:</span>
                  <span className="tabular-nums">{(subtotal * 1000).toLocaleString('fa-IR')} ت</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>مالیات ارزش افزوده (۱۰٪):</span>
                  <span className="tabular-nums">{(vat * 1000).toLocaleString('fa-IR')} ت</span>
                </div>
                <div className="flex justify-between text-base font-bold text-amber-400 pt-2 border-t border-neutral-800/80">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="tabular-nums">{(total * 1000).toLocaleString('fa-IR')} تومان</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 pt-4 border-t border-neutral-800">
            {orderSent ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>سفارش با فرمت آماده به واتساپ باریستا و چاپگر صندوق ارسال شد!</span>
              </div>
            ) : (
              <button
                type="button"
                disabled={Object.keys(cart).length === 0}
                onClick={() => setOrderSent(true)}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
                ارسال فاکتور و ثبت سفارش در واتساپ
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
