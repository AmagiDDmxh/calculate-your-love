"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card"
import { Slider, SliderProps } from "#/components/ui/slider"

const SLIDER_DATA = [
  {
    section: "Self",
    title: "Love",
    marks: { 0: "no", 25: "low", 50: "middle", 75: "high", 100: "love" },
  },
  {
    title: "Usefulness",
    marks: { 0: "no", 50: "unknown", 100: "solve" },
    step: 50,
  },
  {
    section: "Public",
    title: "Usage",
    marks: { 0: "no", 25: "few", 50: "medium", 75: "lot", 100: "very much" },
  },
  {
    title: "Valueness",
    marks: { 0: "no", 25: "low", 50: "middle", 75: "high", 100: "infinite" },
  },
]

type ScoreTuple = [love: number, useness: number, usage: number, value: number]

const ScoreCard = () => {
  const [[love, use, usage, value], setScores] = useState<ScoreTuple>([
    0, 30, 40, 0,
  ])
  const totalScore = (
    (love * 0.35 + use * 0.65) * 0.5 +
    (usage * 0.5 + value * 0.5) * 0.5
  ).toFixed(2)

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-lg">Your Love Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full space-y-8 pr-6">
          {SLIDER_DATA.map((x, index) => (
            <div className="flex flex-col space-y-4" key={x.title}>
              {x.section && (
                <h3 className="font-semibold leading-none">{x.section}</h3>
              )}
              <div className="grid grid-cols-3 space-x-4">
                <p className="col-span-1 leading-7 text-sm">{x.title}</p>
                <Slider
                  onValueChange={(v) =>
                    setScores(
                      (xs) =>
                        [
                          ...xs.slice(0, index),
                          v,
                          ...xs.slice(index + 1),
                        ] as ScoreTuple
                    )
                  }
                  className="col-span-2"
                  defaultValue={[x.step ?? 0]}
                  marks={x.marks as SliderProps["marks"]}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end space-x-1 w-full">
        <h3 className="leading-none tracking-tight">Total:</h3>
        <p className="text-lg font-semibold">{totalScore}</p>
      </CardFooter>
    </Card>
  )
}

export default ScoreCard
