import { NextRequest, NextResponse } from "next/server";
import { api, apiError } from "../../api/api";


export async function GET(request: NextRequest) {
    try {
        const searchParam = request.nextUrl.searchParams.get("search")
        const pageParam = request.nextUrl.searchParams.get("page")
        const result = await api.get("/notes", {
            params: {
                searchParam,
                pageParam,
            }
        })
        return NextResponse.json(result.data)
    } catch (error) {
        const err = error as  apiError
        return NextResponse.json(
            {
                err: err.response?.data.error ?? err.message,
            },
            {status: err.status}
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const req = await request.json()
        const result = await api.post("/notes", req)
        return NextResponse.json(result.data)
    } catch (error) {
        const err = error as  apiError
        return NextResponse.json(
            {
                err: err.response?.data.error ?? err.message,
            },
            {status: err.status}
        )
    }
}