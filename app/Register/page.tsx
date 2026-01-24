"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { register } from "@/lib/redux/features/authSlice";
import { RegisterRequest } from "@/lib/type";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const router = useRouter();
const dispatch = useAppDispatch();
  const {isLoading,error} = useAppSelector((state) => state.auth)
  const [formData, setFormData] = useState<RegisterRequest>({
  firstName: "",
  lastName: "",
  email: "",
  userName: "",
  password: "",
  confirmPassword: ""
});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        await dispatch(register(formData)).unwrap();
        router.push("/Login");
        toast("Kayıt işlemi başarılı. Lütfen giriş yapın!");
    } catch (err: any) {
        console.error("Register error:", err);
        
  }
  };

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Yeni Hesap Oluşturun
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                Veya{' '}
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                mevcut hesabınızla giriş yapın
                </Link>
            </p>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="sr-only">
                    Ad
                    </label>
                    <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Ad"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="sr-only">
                    Soyad
                    </label>
                    <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Soyad"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="userName" className="sr-only">
                    Kullanıcı Adı
                    </label>
                    <input
                    id="userName"
                    name="userName"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Kullanıcı adı"
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                    />
                </div>

                </div>
                
                <div>
                <label htmlFor="email" className="sr-only">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Email adresi"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                </div>
                
                <div>
                <label htmlFor="password" className="sr-only">
                    Şifre
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Şifre (min 6 karakter)"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                </div>
                  <div>
                <label htmlFor="password" className="sr-only">
                    Şifre
                </label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Şifre Doğrula (min 6 karakter)"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                </div>
            </div>

            {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <div>
                <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                {isLoading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
                </button>
            </div>
            </form>
        </div>
        </div>
    )
}