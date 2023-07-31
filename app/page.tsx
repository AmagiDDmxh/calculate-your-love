import { Header } from "#/components/Header"
import { ScoreCard } from "#/components/ScoreCard"

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-375px space-y-4">
        <Header />
        <ScoreCard />
      </div>
    </main>
  )
}
