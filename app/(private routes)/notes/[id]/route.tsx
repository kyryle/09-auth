import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../../api/api";

interface Params {
    params: Promise<{id: string}>
}

export async function GET(request: NextRequest, {params}: Params) {
    try {
        const {id} = await params
        const result = await api.get(`/notes/${id}`)
        return NextResponse.json(result.data)
    } catch (error) {
        const err = error as  ApiError
        return NextResponse.json(
            {
                err: err.response?.data.error ?? err.message,
            },
            {status: err.status}
        )
    }
}