
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {

    try {
        (await cookies()).delete('token')

        return NextResponse.json(
            { success: true, message: "Çıkış başarılı" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Çıkış sırasında hata oluştu" },
            { status: 500 }
        );
    }
}