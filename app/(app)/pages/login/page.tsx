'use client'
import {useState} from "react";
import {useRouter} from "next/navigation";
import {json} from "node:stream/consumers";

export default function LoginPage() {
    const [form,setForm]= useState({email:'',password:''})
    const router = useRouter()
    const handleSubmit = async (e:React.FormEvent)=>
    {
        e.preventDefault()
        const res = await fetch('/api/auth/login'
        ,{
            method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(form)
            })
        if (res.ok) router.push('/')
    }
    return (
        <div className="min-h-screen bg-blue-400 flex items-center justify-center px-4 py-12">
            <div className="bg-blue-400 rounded-2xl shadow-2xl p-10 w-full max-w-md animate-fade-in">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">Giriş Yap</h1>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-blue-100 mb-1">E-posta</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({...form, email: e.target.value})}
                            className="w-full p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-lime-400"
                            placeholder="mail@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-blue-100 mb-1">Şifre</label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({...form, password: e.target.value})}
                            className="w-full p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-lime-400"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer w-full bg-white hover:bg-amber-300 text-black font-semibold py-3 rounded-lg transition-colors duration-300"
                    >
                        Giriş Yap
                    </button>
                </form>

                <p className="text-blue-200 text-sm text-center mt-6">
                    Hesabınız yok mu?{' '}
                    <a href="/pages/signup" className="text-white underline hover:text-amber-400">
                        Kayıt Ol
                    </a>
                </p>
            </div>
        </div>
    )
}
