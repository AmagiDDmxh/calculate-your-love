import Link from "next/link"
import { siteConfig } from "#/config/site"
import { cn } from "#/lib/utils"
import { GithubIcon } from "lucide-react"

import { Icons } from "./icons"
import { buttonVariants } from "./ui/button"

export const Header = () => {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="inline-flex space-x-1">
        <h3 className="font-semibold">Your</h3>
        <Icons.LoveIcon />
        <h3 className="font-semibold">Love Calculator</h3>
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
