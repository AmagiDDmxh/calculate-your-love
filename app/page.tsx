import { Header } from "#/components/header"
import { ScoreCard } from "#/components/score-card"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-375px space-y-4">
        <Header />
        <ScoreCard />
      </div>
    </main>
  )
}
