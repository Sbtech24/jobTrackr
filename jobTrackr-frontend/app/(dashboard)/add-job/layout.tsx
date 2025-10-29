import type { Metadata } from "next"





export const metadata: Metadata = {
  title: {
    default: "Add-job",
    template: "Add-job",
  },
  description: "Add-job page",

}

export default function AddJobLayout({
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
