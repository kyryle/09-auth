import axios, { AxiosError } from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const nextApi = axios.create({
    baseURL: `${URL}/api`,
    withCredentials: true,
    headers: {
                Authorization: `Bearer ${myKey}`
            }
})

export type ApiError = AxiosError<{ error: string }>