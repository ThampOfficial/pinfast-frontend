import React, { useState, useEffect } from 'react';
import { ShoppingCart, Zap, CheckCircle2, Copy, AlertCircle, Clock } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: 'Razer Gold PIN', price: 95, originalPrice: 100, type: '50 - 500 THB', img: '💳' },
  { id: 2, name: 'Garena Shells', price: 142, originalPrice: 150, type: 'e-PIN Auto', img: '🎮' },
  { id: 3, name: 'Steam Wallet Code', price: 335, originalPrice: 350, type: 'THB Currency', img: '🎯' },
  { id: 4, name: 'ROBLOX Gift Card', price: 340, originalPrice: 360, type: '800 Robux', img: '🧱' },
];

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [contact, setContact] = useState('');
  const [step, setStep] = useState('SHOP'); // SHOP | PAYMENT | SUCCESS
  const [timeLeft, setTimeLeft] = useState(300);
  const [purchasedCode, setPurchasedCode] = useState(null);

  // Timer สำหรับหน้า PromptPay
  useEffect(() => {
    let timer;
    if (step === 'PAYMENT' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      alert('หมดเวลาการชำระเงิน กรุณาทำรายการใหม่');
      setStep('SHOP');
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!contact) return alert('กรุณากรอกเบอร์โทรหรืออีเมล');
    setTimeLeft(300);
    setStep('PAYMENT');
  };

  // จำลองระบบเมื่อชำระเงินสำเร็จ (ในการทำงานจริงจะรอ Webhook จาก Backend)
  const handleSimulatePaymentSuccess = () => {
    setPurchasedCode({
      serial: 'RZ-2026-89412X',
      pin: '9845-1120-7741-3652',
    });
    setStep('SUCCESS');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-2 rounded-lg text-slate-950 font-black">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <span className="text-2xl font-black tracking-wider text-emerald-400">PINFAST</span>
          </div>
          <span className="text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            ระบบส่งโค้ดออโต้ 24 ชม.
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {step === 'SHOP' && (
          <>
            {/* Hero Section */}
            <div className="text-center py-8 mb-8 bg-gradient-to-b from-slate-900 to-transparent rounded-2xl border border-slate-800/50">
              <h1 className="text-3xl md:text-5xl font-black mb-3">
                กดปุ๊บ ได้พินปั๊บ <span className="text-emerald-400">ออโต้ 24 ชั่วโมง</span>
              </h1>
              <p className="text-slate-400 text-sm md:text-base">
                ศูนย์รวมบัตรดิจิทัล e-PIN เติมเกม ราคาถูกกว่าหน้าบัตร รับโค้ดทันทีไม่ต้องรอ
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PRODUCTS.map((item) => (
                <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-emerald-500/50 transition-all">
                  <div className="text-4xl mb-3">{item.img}</div>
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-xs text-slate-500 mb-3">{item.type}</p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-bold text-emerald-400">฿{item.price}</span>
                    <span className="text-xs text-slate-500 line-through">฿{item.originalPrice}</span>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(item)}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" /> เลือกซื้อ
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Modal เลือกจำนวน & สั่งซื้อ */}
        {selectedProduct && step === 'SHOP' && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">สั่งซื้อ {selectedProduct.name}</h2>
              <form onSubmit={handleCreateOrder} className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">เบอร์โทรศัพท์ / อีเมล (สำหรับรับรหัส)</label>
                  <input
                    type="text"
                    required
                    placeholder="0812345678 หรือ email@example.com"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400">ราคาสินค้า</span>
                    <span className="font-bold text-emerald-400">฿{selectedProduct.price}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className="w-1/2 bg-slate-800 hover:bg-slate-700 py-2.5 rounded-lg text-sm font-semibold"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-2.5 rounded-lg text-sm font-bold"
                  >
                    ยืนยันสั่งซื้อ
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* หน้า PromptPay QR Code */}
        {step === 'PAYMENT' && (
          <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-amber-400 mb-4 bg-amber-950/40 border border-amber-900/50 p-2 rounded-lg text-sm">
              <Clock className="w-4 h-4" />
              <span>ชำระเงินภายใน: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')} นาที</span>
            </div>
            
            <h2 className="text-lg font-bold mb-2">สแกนจ่ายผ่าน PromptPay</h2>
            <p className="text-xs text-slate-400 mb-4">ยอดชำระ: <span className="text-emerald-400 font-bold text-base">฿{selectedProduct.price}</span></p>

            {/* Mockup PromptPay QR */}
            <div className="bg-white p-4 rounded-xl inline-block mb-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=PROMPTPAY_MOCK_PAYMENT`}
                alt="PromptPay QR"
                className="w-44 h-44"
              />
            </div>

            <p className="text-xs text-slate-500 mb-6">ระบบจะตรวจสลิปอัตโนมัติภายใน 3 วินาทีหลังโอนเงิน</p>

            {/* ปุ่มจำลองเมื่อจ่ายสำเร็จ (ใช้ทดสอบ) */}
            <button
              onClick={handleSimulatePaymentSuccess}
              className="w-full bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 font-bold py-2 rounded-lg text-xs"
            >
              [ทดสอบระบบ] จำลองชำระเงินสำเร็จ
            </button>
          </div>
        )}

        {/* หน้าแสดงรหัสเมื่อสำเร็จ (Success Page) */}
        {step === 'SUCCESS' && purchasedCode && (
          <div className="max-w-md mx-auto bg-slate-900 border border-emerald-500/50 rounded-2xl p-6 text-center shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h2 className="text-xl font-bold mb-1">ชำระเงินสำเร็จ!</h2>
            <p className="text-xs text-slate-400 mb-6">ระบบจัดส่ง e-PIN ให้คุณเรียบร้อยแล้ว</p>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-left space-y-3 mb-6">
              <div>
                <span className="text-xs text-slate-500 block">Serial Number:</span>
                <span className="font-mono font-bold text-slate-200">{purchasedCode.serial}</span>
              </div>
              <div className="border-t border-slate-800 pt-2">
                <span className="text-xs text-slate-500 block">PIN Code:</span>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-emerald-400 text-lg">{purchasedCode.pin}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(purchasedCode.pin)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-xs text-slate-300 flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" /> คัดลอก
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setStep('SHOP');
                setSelectedProduct(null);
                setContact('');
              }}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-lg text-sm"
            >
              กลับหน้าแรก
            </button>
          </div>
        )}
      </main>
    </div>
  );
}