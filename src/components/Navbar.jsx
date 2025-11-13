import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'))
  const [count, setCount] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      const current = JSON.parse(localStorage.getItem('user') || 'null')
      setUser((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(current)) return current
        return prev
      })
    }, 500)
    return () => clearInterval(interval)
  }, [])

  async function fetchCount(u) {
    if (!u) {
      setCount(0)
      return
    }
    try {
      const res = await fetch(`http://localhost:1000/users/${u.id}`)
      const data = await res.json()
      const n = (data.cart || []).reduce((s, i) => s + (i.qty || 0), 0)
      setCount(n)
    } catch {}
  }

  useEffect(() => {
    if (user) fetchCount(user)
  }, [user])

  useEffect(() => {
    function onCartUpdated() {
      const u = JSON.parse(localStorage.getItem('user') || 'null')
      fetchCount(u)
    }
    window.addEventListener('cart-updated', onCartUpdated)
    return () => window.removeEventListener('cart-updated', onCartUpdated)
  }, [])

  function logout() {
    localStorage.removeItem('user')
    setUser(null)
    setCount(0)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-extrabold text-xl text-brand flex-shrink-0">
          Foodie<span className="text-slate-900">Express</span>
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden p-2 rounded-md border border-slate-300"
        >
          ☰
        </button>

        <nav
          className={`flex-col sm:flex-row sm:flex items-center gap-4 absolute sm:static top-[64px] left-0 w-full sm:w-auto bg-white sm:bg-transparent p-4 sm:p-0 border-t sm:border-none transition-all duration-300 ${
            menuOpen ? 'flex' : 'hidden sm:flex'
          }`}
        >
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-brand' : 'text-slate-700')}>
            Home
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) => (isActive ? 'text-brand' : 'text-slate-700')}>
            Menu
          </NavLink>

          {user && (
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${isActive ? 'text-brand' : 'text-slate-700'} relative flex items-center`
              }
            >
              <span>Cart</span>
              <span
                className="absolute -top-2 -right-3 flex items-center justify-center text-[10px] font-semibold text-white bg-brand w-5 h-5 rounded-full"
              >
                {count}
              </span>
            </NavLink>
          )}

          {user ? (
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mt-3 sm:mt-0">
              <span className="text-slate-700 hidden sm:block">
                Hi, <b>{user.name}</b>
              </span>
              <button
                onClick={logout}
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-black w-full sm:w-auto"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-2 mt-3 sm:mt-0">
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 w-full sm:w-auto text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 rounded-2xl bg-brand text-white hover:bg-brand-dark w-full sm:w-auto text-center"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
