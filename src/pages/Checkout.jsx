import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const API = 'http://localhost:1000'

export default function Checkout(){
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: "", address: "", phone: ""})

  useEffect(()=>{
    async function load(){
      if(!user){ navigate('/login'); return; }
      const r = await fetch(`${API}/users/${user.id}`)
      const u = await r.json()
      setItems(u.cart || [])
    }
    load()
  },[])

  const total = items.reduce((s,i)=> s + i.price * i.qty, 0)

  async function placeOrder(e){
    e.preventDefault()
    await fetch(`${API}/users/${user.id}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ cart: [] }) })
    window.dispatchEvent(new Event('cart-updated'))
    toast.success('Order placed!')
    navigate('/')
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
  <div className="text-center mb-10">
    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Confirm Your Order</h1>
    <p className="text-slate-500">You're just one step away from delicious happiness 🍕</p>
  </div>

  <div className="grid md:grid-cols-[2fr,1fr] gap-10">
    {/* Checkout Form */}
    <form
      onSubmit={placeOrder}
      className="bg-white border border-slate-200 rounded-3xl shadow-xl p-8 space-y-6"
    >
      <h2 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">
        Delivery Details
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
          <input
            className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition"
            placeholder="Enter your full name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Address</label>
          <textarea
            className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition resize-none"
            placeholder="Enter your address"
            required
            rows="3"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Phone Number</label>
          <input
            className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition"
            placeholder="Enter your phone number"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
      </div>

      <button className="mt-6 w-full py-3 rounded-2xl bg-brand text-white font-semibold text-lg hover:bg-brand-dark transition-all duration-200 shadow-md">
        Place Order
      </button>
    </form>

    {/* Summary Section */}
    <aside className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-3xl shadow-md p-6 h-fit sticky top-20">
      <h2 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">
        Order Summary
      </h2>

      <ul className="space-y-3">
        {items.map((i) => (
          <li
            key={i.id}
            className="flex justify-between items-center bg-white border rounded-xl px-3 py-2 text-sm text-slate-700 shadow-sm"
          >
            <span>
              {i.title} × <b>{i.qty}</b>
            </span>
            <span className="font-semibold">₹ {i.price * i.qty}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t pt-3 flex justify-between text-lg font-bold text-slate-800">
        <span>Total</span>
        <b>₹ {total}</b>
      </div>

      <div className="mt-4 text-xs text-slate-500 italic">
        Delivery in approximately <b>30-40 minutes</b>
      </div>
    </aside>
  </div>
</main>

  )
}
