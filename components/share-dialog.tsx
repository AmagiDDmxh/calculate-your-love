import React from "react"
import { useMediaQuery } from "#/hooks/useMediaQuery"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Label } from "@radix-ui/react-label"
import { Share2Icon, TwitterIcon } from "lucide-react"

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
import {
  DialogDrawer,
  DialogDrawerClose,
  DialogDrawerContent,
  DialogDrawerTitle,
  DialogDrawerTrigger,
} from "./ui/dialog-drawer"
import { Input } from "./ui/input"

export const ShareDialog = () => {
  const { medium } = useMediaQuery()

  const [open, setOpen] = React.useState(false)

  if (medium) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" size="sm" className="group">
            <Share2Icon className="mr-2 h-3 w-3 fill-slate-700 stroke-slate-200 transition-colors duration-200 group-hover:fill-white group-hover:stroke-white" />
            Share
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Your Project Name</DialogTitle>
            <DialogDescription>
              Type your project name to start sharing your score with friends
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="name" className="">
                Name
              </Label>
              <Input id="name" value="Code" className="col-span-4" />
            </div>
          </div>
          <DialogFooter className="md:space-x-4">
            <Button size="sm" variant="outline" className="group">
              <TwitterIcon className="stroke-primary mr-2 h-3 w-3 fill-slate-100 transition-colors duration-200 group-hover:fill-slate-800" />{" "}
              Tweet
            </Button>
            <Button size="sm" type="submit">
              Copy Share Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <DialogDrawer dismissible={false} open={open}>
      <DialogDrawerTrigger asChild onClick={() => setOpen(true)}>
        <Button variant="default" size="sm" className="group">
          <Share2Icon className="mr-2 h-3 w-3 fill-slate-700 stroke-slate-200 transition-colors duration-200 group-hover:fill-white group-hover:stroke-white" />
          Share
        </Button>
      </DialogDrawerTrigger>
      <DialogDrawerContent className="fixed inset-x-0 bottom-0 mt-24 flex flex-col rounded-t-[10px] bg-zinc-100">
        <DialogDrawerClose
          onClick={() => setOpen(false)}
          className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
        >
          <Cross2Icon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogDrawerClose>

        <div className="flex-1 rounded-t-[10px] bg-white p-4">
          <div className="mx-auto mb-8 h-1.5 w-12 shrink-0 rounded-full bg-zinc-300" />
          <div className="mx-auto max-w-md">
            <DialogDrawerTitle className="mb-4 font-medium">
              Unstyled Dialogdrawer for React.
            </DialogDrawerTitle>
            <p className="mb-2 text-zinc-600">
              This component can be used as a replacement for a Dialog on mobile
              and tablet devices.
            </p>
            <p className="mb-6 text-zinc-600">
              It uses{" "}
              <a
                href="https://www.radix-ui.com/docs/primitives/components/dialog"
                className="underline"
                target="_blank"
              >
                Radix Dialog primitive
              </a>{" "}
              under the hood and is inspired by{" "}
              <a
                href="https://twitter.com/devongovett/status/1674470185783402496"
                className="underline"
                target="_blank"
              >
                this tweet.
              </a>
            </p>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mb-6 w-full rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Click to close
            </button>
          </div>
        </div>
        <div className="mt-auto border-t border-zinc-200 bg-zinc-100 p-4">
          <div className="mx-auto flex max-w-md justify-end gap-6">
            <a
              className="gap-0.25 flex items-center text-xs text-zinc-600"
              href="https://github.com/emilkowalski/vaul"
              target="_blank"
            >
              GitHub
              <svg
                fill="none"
                height="16"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="16"
                aria-hidden="true"
                className="ml-1 h-3 w-3"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                <path d="M15 3h6v6"></path>
                <path d="M10 14L21 3"></path>
              </svg>
            </a>
            <a
              className="gap-0.25 flex items-center text-xs text-zinc-600"
              href="https://twitter.com/emilkowalski_"
              target="_blank"
            >
              Twitter
              <svg
                fill="none"
                height="16"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="16"
                aria-hidden="true"
                className="ml-1 h-3 w-3"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                <path d="M15 3h6v6"></path>
                <path d="M10 14L21 3"></path>
              </svg>
            </a>
          </div>
        </div>
      </DialogDrawerContent>
    </DialogDrawer>
  )
}
