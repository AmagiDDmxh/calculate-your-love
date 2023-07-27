"use client"

import React from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card"
import { Slider, SliderProps } from "#/components/ui/slider"
import { Share2Icon, TwitterIcon } from "lucide-react"

import { ShareDialog } from "./share-dialog"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

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
const defaultScores: ScoreTuple = [0, 50, 0, 0]

const THINGS_PLACEHOLDERS = [
  "design",
  "code",
  "exercise",
  "make a TODO app",
  "make an ai chat",
]
export const ScoreCard = () => {
  const [scores, setScores] = React.useState<ScoreTuple>(defaultScores)
  const [love, use, usage, value] = scores
  const totalScore = (
    (love * 0.35 + use * 0.65) * 0.5 +
    (usage * 0.5 + value * 0.5) * 0.5
  ).toFixed(2)
  const [transitionNumber, setTransitionNumber] = React.useState(0)
  React.useLayoutEffect(() => {
    const transitionTimeout = setInterval(() => {
      setTransitionNumber((x) => (x + 1) % THINGS_PLACEHOLDERS.length)
    }, 2333)

    return () => {
      clearInterval(transitionTimeout)
    }
  }, [])

  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader className="mb-2 flex flex-row items-center space-x-1 space-y-0 border-b pb-6">
          <CardTitle className="text-md font-medium">
            Score your love to
          </CardTitle>
          <CardTitle className="text-md font-bold transition-all">
            {THINGS_PLACEHOLDERS[transitionNumber]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full space-y-8 pr-6">
            {SLIDER_DATA.map((x, index) => (
              <div className="flex flex-col space-y-4" key={x.title}>
                {x.section && (
                  <h3 className="mt-4 font-semibold leading-none">
                    {x.section}
                  </h3>
                )}
                <div className="grid grid-cols-3 space-x-4">
                  <p className="text-sm leading-7">{x.title}</p>
                  <Slider
                    onValueChange={(v) =>
                      setScores(
                        (xs) =>
                          [
                            ...xs.slice(0, index),
                            v?.[0],
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
        <CardFooter className="mt-2 flex w-full items-center justify-between">
          <ShareDialog />

          <div className="flex items-center space-x-1">
            <h3 className="font-medium leading-none tracking-tight">Total:</h3>
            <p className="text-lg font-medium">{totalScore}</p>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
