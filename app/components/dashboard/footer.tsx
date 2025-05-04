import React from  'react'

export default function Footer() {
    return (
        <div className="bg-gray-900 text-center text-gray-400 p-4">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} Kisaltl.ink. Tüm hakları saklıdır. Powered By MUHAMMED MUSTAFA KURT
            </p>
        </div>
    );
};