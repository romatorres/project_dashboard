import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import Sidebar from "@/components/dashboard/Sidebar"
import SessionWrapper from "@/components/providers/SessionWrapper"
import { ToastProvider } from "@/components/providers/ToastProvider"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <SessionWrapper>
      <div className="min-h-screen bg-gray-100">
        <Sidebar />
        <div className="lg:ml-64 min-h-screen">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
      <ToastProvider />
    </SessionWrapper>
  )
}