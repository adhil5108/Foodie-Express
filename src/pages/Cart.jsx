import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const API = 'http://localhost:1000'

export default function Cart(){
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  async function load(){
    if(!user){ navigate('/login'); return; }
    try{
      const r = await fetch(`${API}/users/${user.id}`)
      const u = await r.json()
      setItems(u.cart || [])
    }catch{ /* ignore */ }
  }

  useEffect(()=>{ load() },[])

  async function sync(next){
    setItems(next)
    try{
      await fetch(`${API}/users/${user.id}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ cart: next }) })
      window.dispatchEvent(new Event('cart-updated'))
    }catch{
      toast.error('Save failed')
    }
  }

  function update(id, delta){
    const next = items.map(i => i.id===id ? { ...i, qty: Math.max(1, i.qty+delta) } : i)
    sync(next)
  }
  function removeItem(id){
    sync(items.filter(i => i.id!==id))
  }

  const total = items.reduce((s,i)=> s + i.price * i.qty, 0)

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-slate-600">Your cart is empty. <Link className="text-brand" to="/menu">Browse menu</Link></div>
      ) : (
        <div className="grid md:grid-cols-[2fr,1fr] gap-6">
          <div className="space-y-3">
            {items.map(i => (
              <div key={i.id} className="bg-white rounded-2xl border p-4 flex items-center gap-4">
                <img src={i.img} alt={i.title} className="w-16 h-16 rounded-xl object-cover"/>
                <div className="flex-1">
                  <div className="font-semibold">{i.title}</div>
                  <div className="text-sm text-slate-600">₹ {i.price}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>update(i.id,-1)} className="px-3 py-1 rounded-xl border">-</button>
                  <span>{i.qty}</span>
                  <button onClick={()=>update(i.id,1)} className="px-3 py-1 rounded-xl border">+</button>
                </div>
                <button onClick={()=>removeItem(i.id)} className="px-3 py-1 rounded-xl border hover:bg-slate-100">Remove</button>
              </div>
            ))}
          </div>
          <aside className="bg-white rounded-2xl border p-4 h-fit">
            <div className="flex justify-between mb-2"><span>Subtotal</span><b>₹ {total}</b></div>
            <Link to="/checkout" className="mt-3 block text-center px-4 py-2 rounded-2xl bg-brand text-white hover:bg-brand-dark">Go to Checkout</Link>
          </aside>
        </div>
      )}
    </main>
  )
}
