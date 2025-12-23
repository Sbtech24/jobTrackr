import type { Metadata } from "next"





export const metadata: Metadata = {
  title: {
    default: "register",
    template: "register",
  },
  description: "register",

}

export default function RegisterLayout({
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
