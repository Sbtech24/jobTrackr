import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "login",
    template: "login",
  },
  description: "login",

}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
        {children}
    </main>
  )
}
