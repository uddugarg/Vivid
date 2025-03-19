"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-10 w-[60px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-10 w-10 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 flex items-center justify-center"
      )}
    >
      {props.checked ? (
        <Sun className="h-5 w-5 text-yellow-500 transition-opacity duration-300 ease-in-out opacity-100" />
      ) : (
        <Moon className="h-5 w-5 text-gray-500 transition-opacity duration-300 ease-in-out opacity-100" />
      )}
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
))

Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
