"use client"

import api from "@/lib/api"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signup = async (username: string, password: string, email: string, phone: string, address: string, role: string) => {
    try {
      setLoading(true)
      setError(null)
      await api.post("/auth/register", { username, password, email, phone, address, role })
      router.push("/sign-in")
    } catch (err: any) {
      setError(err.response?.data?.message || "Sign up failed")
    } finally {
      setLoading(false)
    }
  }

  const signin = async (username: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.post("/auth/login", { username, password })
      const { accessToken, userName, role } = res.data

      // Lưu JWT vào localStorage
      localStorage.setItem("token", accessToken)
      localStorage.setItem("userName", userName)
      localStorage.setItem("role", "ROLE_" + role)

      router.push("/")
    } catch (err: any) {
      setError(err.response?.data?.message || "Sign in failed")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userName")
    localStorage.removeItem("role")
    router.push("/sign-in")
  }

  return { signup, signin, logout, loading, error }
}