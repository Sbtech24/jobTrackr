import type { Metadata } from "next"





export const metadata: Metadata = {
  title: {
    default: "Settings",
    template: "Settings",
  },
  description: "Settings page",

}

export default function SettingsLayout({
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
