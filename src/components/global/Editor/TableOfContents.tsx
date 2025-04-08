import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React from "react";

type Props = {
  items: string[];
  onItemClick: (id: string) => void;
  className?: string;
};

const TableOfContents = ({ items, onItemClick, className }: Props) => {
  const { currentTheme } = useSlideStore();

  return (
    <nav
      className={cn("space-y-2", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          // onClick={() => onItemClick(item)}
          className={cn("cursor-pointer hover:underline")}
        >
          {item}
        </div>
      ))}
    </nav>
  );
};

export default TableOfContents;
