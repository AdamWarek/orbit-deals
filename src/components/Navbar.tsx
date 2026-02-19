"use client"
import React, { ChangeEvent } from "react"
import Link from "next/link"
import { LogOut, Mail } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export default function Navbar() {
    const { user, signInWithEmail, signOut } = useAuth()

    // Theme handling
    const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const theme = e.target.value
        document.body.setAttribute("data-theme", theme)
    }

    const handleLogin = async () => {
        const email = prompt("Please enter your email address to login:")
        if (!email) return

        try {
            await signInWithEmail(email)
            alert("Check your email for the login link!")
        } catch (error: any) {
            alert("Error logging in: " + error.message)
        }
    }

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[var(--border)] bg-[var(--card-bg)] px-6 py-4 backdrop-blur-md">
            <Link href="/" className="font-['Space_Grotesk'] text-2xl font-bold text-[var(--accent)]">
                OrbitDeals
            </Link>

            <div className="flex items-center gap-4">
                {/* Theme Select */}
                <select
                    onChange={handleThemeChange}
                    className="rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-[var(--text)]"
                >
                    <option value="light">☀️ Light</option>
                    <option value="dark">🌙 Dark</option>
                    <option value="cosmic">🚀 Cosmic</option>
                </select>

                {/* Auth Buttons */}
                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="text-sm">
                            Hi, <b>{user.email?.split('@')[0]}</b> 👋
                        </span>
                        <button
                            onClick={signOut}
                            className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2 text-[var(--text)] hover:bg-[var(--bg)]"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 font-semibold text-white transition hover:opacity-90"
                    >
                        <Mail size={18} /> Login with Email
                    </button>
                )}
            </div>
        </nav>
    )
}
