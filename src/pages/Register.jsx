import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const API = 'http://localhost:1000'

export default function Register() {
  const [form, setForm] = useState({ name:"", email: "", password: "" });
  const navigate = useNavigate();

  async function onSubmit(e){
    e.preventDefault();
    try{
      const res = await fetch(`${API}/users`);
      const users = await res.json();
      const exist = users.find(u => u.email === form.email);
      if(exist){ toast.error("Email already exists"); return; }
      const addRes = await fetch(`${API}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Date.now().toString(), ...form, cart: [] })
      });
      if(addRes.ok){
        toast.success("Account created!");
        navigate("/login");
      }else{
        toast.error("Failed to create account");
      }
    }catch{
      toast.error("Server error");
    }
  }

  return (
   <main className="max-w-6xl mx-auto px-4 py-16 flex justify-center items-center">
  <div className="w-full max-w-md bg-white border rounded-3xl shadow-lg p-8">
    <h1 className="text-3xl font-extrabold text-center mb-6 text-slate-800">Create Account </h1>

    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
        <input
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition"
          placeholder="Enter your full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
        <input
          type="email"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
        <input
          type="password"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition"
          placeholder="Create a password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      <button
        className="w-full py-2.5 rounded-2xl bg-brand text-white font-semibold hover:bg-brand-dark transition-all duration-200 shadow-sm"
      >
        Register
      </button>

      <p className="text-sm text-center text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="text-brand hover:underline">
          Login
        </Link>
      </p>
    </form>
  </div>
</main>

  )
}
