"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-700/80 data-[disabled]:cursor-not-allowed">
      <SliderPrimitive.Range className="absolute h-full bg-neutral-900 dark:bg-aquamarine-200 data-[disabled]:dark:bg-aquamarine-400/50" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 dark:border-neutral-300 data-[disabled]:dark:border-neutral-400 bg-white ring-offset-white transition-colors focus-visible:outline-none data-[disabled]:pointer-events-none dark:bg-aquamarine-300 data-[disabled]:dark:bg-aquamarine-500 hover:cursor-pointer focus-visible:ring-4" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
