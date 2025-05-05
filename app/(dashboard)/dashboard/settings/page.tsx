"use client"
import React from "react"

export default function SettingsPage() {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const currentPassword = formData.get("currentPassword") as string;
        const newPassword = formData.get("newPassword") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (newPassword !== confirmPassword) {
            alert("Yeni şifreler eşleşmiyor!");
            return;
        }

        try {
            const response = await fetch('/api/dashboard/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Şifre değiştirilirken bir hata oluştu');
            }

            alert('Şifre başarıyla değiştirildi!');
        } catch (error: any) {
            console.error('Şifre değiştirme hatası:', error);
            alert(error.message || 'Şifre değiştirilirken bir hata oluştu');
        }
    };

    return (
        <div className="h-screen max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="mt-15 text-2xl font-bold mb-6">Şifre Değiştir</h1>

            <form className="space-y-6" onSubmit={handleSubmit}>

                <div className="space-y-2">
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        Mevcut Şifre
                    </label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        required
                        minLength={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        Yeni Şifre
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        required
                        minLength={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Yeni Şifreyi Onayla
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        minLength={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Şifreyi Değiştir
                </button>
            </form>
        </div>
    );
}