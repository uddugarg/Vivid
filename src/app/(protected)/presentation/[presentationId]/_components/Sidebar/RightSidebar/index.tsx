"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSlideStore } from "@/store/useSlideStore";
import { LayoutTemplate } from "lucide-react";
import React from "react";
import LayoutChooser from "./Tabs/LayoutChooser";

type Props = {};

const RightSidebar = (props: Props) => {
  const { currentTheme } = useSlideStore();

  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-10">
      <div className="rounded-xl border-r-0 border border-background-70 shadow-lg p-2 flex flex-col items-center space-y-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full"
            >
              <LayoutTemplate className="w-5 h-5" />
              <span className="sr-only">Choose Layout</span>
            </Button>
          </PopoverTrigger>

          <PopoverContent side="left" align="center" className="w-[400px] p-0">
            <LayoutChooser />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default RightSidebar;
