"use client"

import * as React from "react"
import { useSize } from "#/hooks/useSize"
import { cn } from "#/lib/utils"
import * as SliderPrimitive from "@radix-ui/react-slider"

import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from "./tooltip"

export type Mark = {
  style?: React.CSSProperties
  label?: React.ReactNode
}

type InternalMark = Mark & {
  value: number
}

type ISliderContext = {
  value?: number[]
}

const SliderContext = React.createContext<ISliderContext>({})
const useSlider = () => React.useContext(SliderContext)

export type SliderProps = React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Root
> & {
  marks?: Record<string | number, string | Mark>
}

const TOOLTIP_CLOSE_DELAY = 520
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      marks,
      onValueChange,
      onValueCommit,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const markList = React.useMemo<InternalMark[]>(() => {
      if (!marks) {
        return []
      }

      const keys = Object.keys(marks)

      return keys
        .map((key) => {
          const mark = marks[key]
          const markObj: InternalMark = {
            value: Number(key),
          }

          if (
            typeof mark === "object" &&
            !React.isValidElement(mark) &&
            ("label" in mark || "style" in mark)
          ) {
            markObj.style = mark.style
            markObj.label = mark.label
          } else {
            markObj.label = mark as string
          }

          return markObj
        })
        .filter(({ label }) => label || typeof label === "number")
        .sort((a, b) => a.value - b.value)
    }, [marks])

    const thumb = React.useRef<HTMLSpanElement | null>(null)
    const thumbSize = useSize(thumb.current)

    const [value, setValue] = React.useState<number[]>(
      props.defaultValue ?? props.value ?? [0]
    )
    const [tooltipOpening, setTooltipOpen] = React.useState(false)
    const isOpening = React.useDeferredValue(tooltipOpening)
    const handleChange = (value: number | number[]) => {
      setTooltipOpen(true)
      clearTimeout(openTimeoutRef.current)
      openTimeoutRef.current = setTimeout(() => {
        setTooltipOpen(false)
      }, TOOLTIP_CLOSE_DELAY)
      if (Array.isArray(value)) {
        onValueChange?.(value)
        return setValue(value)
      }
      onValueChange?.([value])
      return setValue([value])
    }
    let openTimeoutRef = React.useRef<NodeJS.Timeout>()
    const handleOnCommit = (value: number[]) => {
      onValueCommit?.(value)
    }
    const currentValue = value?.[0]

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation()
      setTooltipOpen(true)
      onMouseMove?.(e as React.MouseEvent<HTMLDivElement>)
    }

    const handleMouseUp = (e: React.MouseEvent) => {
      e.stopPropagation()
      setTooltipOpen(false)
      onMouseLeave?.(e as React.MouseEvent<HTMLDivElement>)
    }

    return (
      <SliderContext.Provider value={{ value }}>
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex w-full touch-none select-none items-center transition-all",
            className
          )}
          {...props}
          onValueChange={handleChange}
          onValueCommit={handleOnCommit}
          value={value}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
        >
          <SliderPrimitive.Track className="bg-primary/20 hover:bg-primary/30 relative h-1 w-full grow cursor-pointer overflow-hidden rounded-full transition-colors duration-200">
            <SliderPrimitive.Range className="bg-primary absolute h-full cursor-pointer" />
          </SliderPrimitive.Track>

          <Marks
            marks={markList}
            onClick={handleChange}
            thumbSize={thumbSize}
          />
          <Tooltip open={isOpening}>
            <TooltipTrigger asChild>
              <SliderPrimitive.Thumb
                ref={thumb}
                className="border-primary/80 hover:border-primary ring-primary bg-background focus-visible:ring-primary z-10 block h-4 w-4 cursor-pointer rounded-full border text-center shadow transition-all duration-150 hover:ring-1 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                onMouseDown={handleMouseMove}
                onMouseEnter={handleMouseMove}
                onMouseLeave={handleMouseUp}
                // TODO: Touch events
              />
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent>
                <p>{currentValue}</p>
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>
        </SliderPrimitive.Root>
      </SliderContext.Provider>
    )
  }
)
Slider.displayName = SliderPrimitive.Root.displayName

type MarkProps = {
  marks?: InternalMark[]
  onClick?: (value: number) => void
  thumbSize: ReturnType<typeof useSize>
}

const Marks = (props: MarkProps) => {
  const { marks, onClick, thumbSize } = props
  const { value: sharedValues } = useSlider()

  if (!marks?.length) {
    return null
  }

  return (
    <>
      {marks.map(({ value }) => {
        const offset = thumbSize
          ? getThumbInBoundsOffset(thumbSize.width, value)
          : getThumbInBoundsOffset(16, value)
        return (
          <span
            key={`mark dot ${value}`}
            style={{
              left: `calc(${value}% + ${offset * 0.4}px)`,
              transform: "translateX(-50%)",
            }}
            className={cn(
              "bg-background focus-visible:ring-ring absolute z-0 block h-1.5 w-1.5 cursor-pointer rounded-full border border-slate-300 text-center focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
              (sharedValues?.[0] ?? 0) >= value && "border-primary"
            )}
          />
        )
      })}

      <div className="absolute top-5 w-full">
        {marks.map(({ value, style, label }) => {
          const offset = thumbSize
            ? getThumbInBoundsOffset(thumbSize.width, 50)
            : getThumbInBoundsOffset(16, value)
          return (
            <span
              key={`mark label ${value}`}
              className={cn(
                "hover:text-primary absolute flex -translate-x-1/2 cursor-pointer justify-center text-xs transition-colors duration-200",
                (sharedValues?.[0] ?? 0) >= value
                  ? "text-primary"
                  : "text-primary/40"
              )}
              style={{
                ...style,
                left: `calc(${value}% + ${offset * 0.4}px)`,
                transform: "translateX(-50%)",
              }}
              onMouseDown={(e) => {
                e.stopPropagation()
              }}
              onClick={(e) => {
                e.stopPropagation()
                onClick?.(value)
              }}
              defaultValue={value}
            >
              {label}
            </span>
          )
        })}
      </div>
    </>
  )
}

/**
 * Offsets the thumb centre point while sliding to ensure it remains
 * within the bounds of the slider when reaching the edges
 */
function getThumbInBoundsOffset(width: number, left: number, direction = 1) {
  const halfWidth = width / 2
  const halfPercent = 50
  const offset = linearScale([0, halfPercent], [0, halfWidth])
  return (halfWidth - offset(left) * direction) * direction
}

function linearScale(
  input: readonly [number, number],
  output: readonly [number, number]
) {
  return (value: number) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0]
    const ratio = (output[1] - output[0]) / (input[1] - input[0])
    return output[0] + ratio * (value - input[0])
  }
}

export { Slider }
