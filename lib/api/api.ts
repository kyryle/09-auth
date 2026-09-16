import axios, { AxiosError } from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL

export const nextApi = axios.create({
    baseURL: `${URL}/api`,
    withCredentials: true,
})

export type ApiError = AxiosError<{ error: string }>