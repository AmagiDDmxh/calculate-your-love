import { notFound } from "next/navigation"
import { Header } from "#/components/header"
import { ScoreCard } from "#/components/score-card"

export default function SharePage() {
  const title = "Make a DeFi Project"
  const totalScore = 20

  if (!title) {
    return notFound()
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-375px space-y-4">
        <Header />
        <ScoreCard title={title} />
      </div>
    </main>
  )
}
