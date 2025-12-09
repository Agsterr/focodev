"use client"
import { useEffect } from 'react'
import { signOut } from 'next-auth/react'

export default function AdminLogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: '/admin/login' })
  }, [])
  return <div className="container py-12">Saindo...</div>
}
