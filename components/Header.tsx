"use client"

import Link from "next/link"
import { siteConfig } from "#/config/site"
import { cn } from "#/lib/utils"
import { GithubIcon } from "lucide-react"
import { Icons } from "./Icons"
import { buttonVariants } from "./ui/button"

export const Header = () => {
  return (
    <div className="flex items-center justify-between px-1">
      <div className="flex flex-col space-y-1">
        <Link
          href="/"
          className="inline-flex space-x-1 font-semibold hover:opacity-80"
        >
          <Icons.Love />
          <h4>Sugoi</h4>
        </Link>
        <p className="text-xs text-slate-700">😉 Your Love Calculator</p>
      </div>
      <Link
        target="_blank"
        rel="noreferrer"
        href={siteConfig.links.github}
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "group"
        )}
      >
        <GithubIcon className="stroke-primary/90 mr-2 h-4 w-4 fill-slate-300 transition-colors duration-200 group-hover:fill-slate-600" />
        <h5>Source</h5>
      </Link>
    </div>
  )
}
