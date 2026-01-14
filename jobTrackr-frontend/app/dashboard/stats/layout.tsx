import type { Metadata } from "next"





export const metadata: Metadata = {
  title: {
    default: "Stats",
    template: "Stats",
  },
  description: "Stats page",

}

export default function StatsLayout({
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
