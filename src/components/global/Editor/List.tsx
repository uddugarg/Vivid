import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import { set } from "date-fns";
import React from "react";

type ListProps = {
  items: string[];
  onChange: (newItems: string[]) => void;
  className?: string;
  isEditable?: boolean;
};

type ListItemProps = {
  item: string;
  index: number;
  onChange: (index: number, value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  isEditable: boolean;
  fontColor: string;
};

const ListItem: React.FC<ListItemProps> = ({
  item,
  index,
  onChange,
  onKeyDown,
  isEditable,
  fontColor,
}) => (
  <Input
    type="text"
    value={item}
    onChange={(e) => onChange(index, e.target.value)}
    onKeyDown={(e) => onKeyDown(e, index)}
    className="bg-transparent w-full outline-none py-1"
    style={{ color: fontColor }}
    readOnly={!isEditable}
  />
);

export const TodoList: React.FC<ListProps> = ({
  items,
  onChange,
  className,
  isEditable = true,
}) => {
  const { currentTheme } = useSlideStore();

  const toggleCheckbox = (index: number) => {
    if (isEditable) {
      const newItems = [...items];
      newItems[index] = newItems[index].startsWith("[x] ")
        ? newItems[index].replace("[x] ", "[ ] ")
        : newItems[index].replace("[ ] ", "[x] ");
      onChange(newItems);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (isEditable) {
      const newItems = [...items];
      newItems[index] =
        value.startsWith("[ ] ") || value.startsWith("[x] ")
          ? value
          : `[ ] ${value}`;
      onChange(newItems);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, "[ ]");
      onChange(newItems);

      setTimeout(() => {
        const nextInput = document.querySelector(
          `li:nth-child(${index + 2}) input`
        ) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }, 0);
    } else if (
      e.key === "Backspace" &&
      items[index] === "[ ] " &&
      items.length > 1
    ) {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index, 1);
      onChange(newItems);
    }
  };

  return (
    <ul
      className={cn("space-y-1", className)}
      style={{
        color: currentTheme.fontColor,
      }}
    >
      {items.map((item, index) => (
        <li key={index} className="flex items-center space-x-2">
          <Input
            type="checkbox"
            checked={item.startsWith("[x] ")}
            onChange={() => toggleCheckbox(index)}
            className="form-checkbox"
            disabled={!isEditable}
          />
          <ListItem
            item={item.replace(/^\[[ x]\] /, "")}
            index={index}
            onChange={(index, value) => {
              handleChange(
                index,
                `${item.startsWith("[x] ") ? "[x] " : "[ ] "}${value}`
              );
            }}
            onKeyDown={handleKeyDown}
            isEditable={isEditable}
            fontColor={currentTheme.fontColor}
          />
        </li>
      ))}
    </ul>
  );
};

export const BulletList: React.FC<ListProps> = ({
  items,
  onChange,
  className,
  isEditable = true,
}) => {
  const { currentTheme } = useSlideStore();

  const handleChange = (index: number, value: string) => {
    if (isEditable) {
      const newItems = [...items];
      newItems[index] = value;
      onChange(newItems);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, "");
      onChange(newItems);

      setTimeout(() => {
        const nextInput = document.querySelector(
          `li:nth-child(${index + 2}) input`
        ) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }, 0);
    } else if (
      e.key === "Backspace" &&
      items[index] === "" &&
      items.length > 1
    ) {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index, 1);
      onChange(newItems);
    }
  };

  return (
    <ul
      className={cn("list-disc pl-5 space-y-1", className)}
      style={{
        color: currentTheme.fontColor,
      }}
    >
      {items.map((item, index) => (
        <li key={index} className="pl-1 marker:text-current">
          <ListItem
            item={item}
            index={index}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            isEditable={isEditable}
            fontColor={currentTheme.fontColor}
          />
        </li>
      ))}
    </ul>
  );
};

const NumberedList: React.FC<ListProps> = ({
  items,
  onChange,
  className,
  isEditable = true,
}) => {
  const { currentTheme } = useSlideStore();

  const handleChange = (index: number, value: string) => {
    if (isEditable) {
      const newItems = [...items];
      newItems[index] = value;
      onChange(newItems);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, "");
      onChange(newItems);

      setTimeout(() => {
        const nextInput = document.querySelector(
          `li:nth-child(${index + 2}) input`
        ) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }, 0);
    } else if (
      e.key === "Backspace" &&
      items[index] === "" &&
      items.length > 1
    ) {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index, 1);
      onChange(newItems);
    }
  };

  return (
    <ol
      className={cn("list-decimal list-inside space-y-1", className)}
      style={{
        color: currentTheme.fontColor,
      }}
    >
      {items.map((item, index) => (
        <li key={index}>
          <ListItem
            item={item}
            index={index}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            isEditable={isEditable}
            fontColor={currentTheme.fontColor}
          />
        </li>
      ))}
    </ol>
  );
};

export default NumberedList;
