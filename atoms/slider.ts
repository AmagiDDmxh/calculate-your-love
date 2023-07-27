import { create } from 'zustand'

type Slider = {
  value: number
  setValue: (value: number) => void
}

export const useSlider = create<Slider>((set) => ({
  value: 0,
  setValue: (newVal: number) => set({ value: newVal }),
}))
