'use client'
import {useState} from "react";
import {useRouter} from "next/navigation"

export default function SignupPage() {
    const [form,setForm] = useState({email:'',password:'',name:''})
    const router = useRouter()
    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault()
        const res = await fetch('/api/auth/register',
        {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        }
        )
        if (res.ok) router.push('/dashboard')
    }
    return (
        <div className="min-h-screen bg-blue-400 flex items-center justify-center px-4 py-12">
            <div className="bg-blue-400 rounded-2xl shadow-2xl p-10 w-full max-w-md animate-fade-in">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">Kayıt Ol</h1>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-blue-100 mb-1">Ad Soyad</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e)=>setForm({...form, name: e.target.value})}
                            className="w-full p-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-400 text-gray-800"
                            placeholder="Adınız"
                        />
                    </div>

                    <div>
                        <label className="block text-blue-100 mb-1">E-posta</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e)=>setForm({...form, email: e.target.value})}
                            className="w-full p-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-400 text-gray-800"
                            placeholder="mail@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-blue-100 mb-1">Şifre</label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e)=>setForm({...form, password: e.target.value})}
                            className="w-full p-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-400 text-gray-800"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer w-full bg-white hover:bg-amber-300 text-gray-800 font-semibold py-3 rounded-lg transition-colors duration-300"
                    >
                        Kayıt Ol
                    </button>
                </form>

                <p className="text-blue-100 text-sm text-center mt-6">
                    Zaten bir hesabınız var mı?{' '}
                    <a href="/pages/login" className="text-white underline hover:text-amber-400">
                        Giriş Yap
                    </a>
                </p>
            </div>
        </div>
    )
}