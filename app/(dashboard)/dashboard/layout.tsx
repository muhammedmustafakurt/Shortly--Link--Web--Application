
import Header from "@/app/components/dashboard/header";
import Footer from "@/app/components/dashboard/footer";
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
    title: 'Kisaltl.ink Gösterge Paneli',
    description: 'Powered by Muhammed Mustafa Kurt',
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="tr">
        <body>

        <Header />
        {children}
        <Footer />
        </body>
        </html>
    )
}
