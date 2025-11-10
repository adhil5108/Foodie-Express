import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import ReactPaginate from 'react-paginate'
import Footer from '../components/Footer'
const API = 'http://localhost:1000'

export default function Menu(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('relevance')
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 6 
  const navigate = useNavigate()

  useEffect(()=>{
    async function load(){
      try{
        const res = await fetch(`${API}/products`)
        const data = await res.json()
        setItems(data)
      }catch{
        toast.error('Failed to load products')
      }finally{
        setLoading(false)
      }
    }
    load()
  },[])

  const cats = useMemo(()=>{
    const set = new Set(items.map(i=>i.category).filter(Boolean))
    return ['all', ...Array.from(set)]
  }, [items])

  const visible = useMemo(()=>{
    let arr = [...items]
    if(category !== 'all') arr = arr.filter(i=>i.category === category)
    if(q.trim()) {
      const s = q.toLowerCase()
      arr = arr.filter(i => i.title.toLowerCase().includes(s))
    }
    if(sort === 'price-asc') arr.sort((a,b)=>a.price-b.price)
    if(sort === 'price-desc') arr.sort((a,b)=>b.price-a.price)
    if(sort === 'name-asc') arr.sort((a,b)=>a.title.localeCompare(b.title))
    return arr
  }, [items, q, category, sort])

  const pageCount = Math.ceil(visible.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage
  const currentItems = visible.slice(startIndex, startIndex + itemsPerPage)

  const handlePageClick = (event) => {
    setCurrentPage(event.selected)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function addToCart(item){
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if(!user){ toast.error('Please login to add items'); navigate('/login'); return; }
    try{
      const r = await fetch(`${API}/users/${user.id}`)
      const u = await r.json()
      const cart = u.cart || []
      const found = cart.find(i=>i.id===item.id)
      if(found){ found.qty += 1 } else { cart.push({ id:item.id, title:item.title, price:item.price, img:item.img, qty:1 }) }
      await fetch(`${API}/users/${user.id}`, { 
        method:'PATCH', 
        headers:{'Content-Type':'application/json'}, 
        body: JSON.stringify({ cart }) 
      })
      window.dispatchEvent(new Event('cart-updated'))
      toast.success('Added to cart')
    }catch{
      toast.error('Failed to add')
    }
  }

  if(loading) return <main className="max-w-6xl mx-auto px-4 py-10">Loading menu...</main>

  return (
    <>
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
        <h1 className="text-2xl font-bold">Menu</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            value={q} 
            onChange={e=>{ setQ(e.target.value); setCurrentPage(0) }} 
            placeholder="Search dishes..." 
            className="rounded-2xl border px-3 py-2 w-full sm:w-64"
          />
          <select 
            value={category} 
            onChange={e=>{ setCategory(e.target.value); setCurrentPage(0) }} 
            className="rounded-2xl border px-3 py-2"
          >
            {cats.map(c => <option key={c} value={c}>{c[0].toUpperCase()+c.slice(1)}</option>)}
          </select>
          <select 
            value={sort} 
            onChange={e=>{ setSort(e.target.value); setCurrentPage(0) }} 
            className="rounded-2xl border px-3 py-2"
          >
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name-asc">Name: A → Z</option>
          </select>
        </div>
      </div>

      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentItems.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <img src={p.img} alt={p.title} className="h-44 w-full object-cover"/>
            <div className="p-4 flex-1 flex flex-col gap-2">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <span className="text-sm text-slate-500 capitalize">{p.category}</span>
              <p className="text-slate-600 text-sm line-clamp-3">{p.description}</p>
              <p className="font-semibold mt-2 text-slate-700">₹ {p.price}</p>
              <button 
                onClick={()=>addToCart(p)} 
                className="mt-auto px-4 py-2 rounded-2xl bg-brand text-white hover:bg-brand-dark transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <ReactPaginate
          previousLabel={'← Prev'}
          nextLabel={'Next →'}
          breakLabel={'...'}
          onPageChange={handlePageClick}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          containerClassName={'flex gap-2 items-center'}
          pageClassName={'border rounded-lg px-3 py-1 cursor-pointer'}
          activeClassName={'bg-brand text-white border-brand'}
          previousClassName={'border rounded-lg px-3 py-1 cursor-pointer'}
          nextClassName={'border rounded-lg px-3 py-1 cursor-pointer'}
          disabledClassName={'opacity-50 cursor-not-allowed'}
          forcePage={currentPage}
        />
      </div>
    </main>
    <Footer/>
    </>
  )
}
