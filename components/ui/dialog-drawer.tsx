"use client"

import * as React from "react"
import { cn } from "#/lib/utils"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Drawer } from "vaul"

const DialogDrawer = Drawer.Root

const DialogDrawerTrigger = Drawer.Trigger
const DialogDrawerClose = Drawer.Close

const DialogDrawerPortal = ({
  className,
  ...props
}: React.ComponentProps<typeof Drawer.Portal>) => (
  <Drawer.Portal className={cn(className)} {...props} />
)
DialogDrawerPortal.displayName = Drawer.Portal.displayName

const DialogDrawerOverlay = React.forwardRef<
  React.ElementRef<typeof Drawer.Overlay>,
  React.ComponentPropsWithoutRef<typeof Drawer.Overlay>
>(({ className, ...props }, ref) => (
  <Drawer.Overlay
    ref={ref}
    className={cn(
      "bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 backdrop-blur-sm",
      className
    )}
    {...props}
  />
))
DialogDrawerOverlay.displayName = Drawer.Overlay.displayName

const DialogDrawerContent = React.forwardRef<
  React.ElementRef<typeof Drawer.Content>,
  React.ComponentPropsWithoutRef<typeof Drawer.Content>
>(({ className, children, ...props }, ref) => (
  <>
    <DialogDrawerOverlay />
    <DialogDrawerPortal>
      <Drawer.Content
        ref={ref}
        className={cn("border-t", className)}
        {...props}
      >
        {children}
      </Drawer.Content>
    </DialogDrawerPortal>
  </>
))
DialogDrawerContent.displayName = Drawer.Content.displayName

const DialogDrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogDrawerHeader.displayName = "DialogDrawerHeader"

const DialogDrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogDrawerFooter.displayName = "DialogDrawerFooter"

const DialogDrawerTitle = React.forwardRef<
  React.ElementRef<typeof Drawer.Title>,
  React.ComponentPropsWithoutRef<typeof Drawer.Title>
>(({ className, ...props }, ref) => (
  <Drawer.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogDrawerTitle.displayName = Drawer.Title.displayName

const DialogDrawerDescription = React.forwardRef<
  React.ElementRef<typeof Drawer.Description>,
  React.ComponentPropsWithoutRef<typeof Drawer.Description>
>(({ className, ...props }, ref) => (
  <Drawer.Description
    ref={ref}
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
))
DialogDrawerDescription.displayName = Drawer.Description.displayName

export {
  DialogDrawer,
  DialogDrawerClose,
  DialogDrawerTrigger,
  DialogDrawerContent,
  DialogDrawerHeader,
  DialogDrawerFooter,
  DialogDrawerTitle,
  DialogDrawerDescription,
}
