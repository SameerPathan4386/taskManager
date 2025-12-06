// resizable.jsx
import * as React from "react";
import * as ResizablePrimitive from "@radix-ui/react-resizable";
import { GripVertical } from "lucide-react";

import { cn } from "@/lib/utils";

const Resizable = ResizablePrimitive.Root;
const ResizablePanelGroup = React.forwardRef(({ className, direction = "horizontal", ...props }, ref) => (
  <ResizablePrimitive.PanelGroup
    ref={ref}
    direction={direction}
    className={cn("flex", className)}
    {...props}
  />
));
ResizablePanelGroup.displayName = "ResizablePanelGroup";

const ResizablePanel = React.forwardRef(({ className, minSize = 0, maxSize = 100, defaultSize, ...props }, ref) => (
  <ResizablePrimitive.Panel
    ref={ref}
    minSize={minSize}
    maxSize={maxSize}
    defaultSize={defaultSize}
    className={cn("min-w-0", className)}
    {...props}
  />
));
ResizablePanel.displayName = "ResizablePanel";

const ResizableHandle = React.forwardRef(({ className, withHandle, ...props }, ref) => (
  <ResizablePrimitive.Handle
    ref={ref}
    className={cn(
      "relative flex w-px items-center justify-center bg-border",
      withHandle ? "w-3 bg-transparent" : "",
      className
    )}
    {...props}
  >
    {withHandle && <GripVertical className="h-4 w-4 text-muted-foreground" />}
  </ResizablePrimitive.Handle>
));
ResizableHandle.displayName = "ResizableHandle";

export { Resizable, ResizablePanelGroup, ResizablePanel, ResizableHandle };

