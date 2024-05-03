import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import React, { ReactNode } from "react"
 
export function Modal(props: {children: ReactNode, trigger: ReactNode}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {props.trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {props.children}
      </DialogContent>
    </Dialog>
  )
}