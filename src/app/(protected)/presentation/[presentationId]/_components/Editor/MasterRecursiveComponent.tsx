"use client";

import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Title,
} from "@/components/global/Editor/Headings";
import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { FC, useCallback } from "react";
import DropZone from "./DropZone";
import Paragraph from "@/components/global/Editor/Paragraph";
import TableComponent from "@/components/global/Editor/Table";
import ColumnComponent from "@/components/global/Editor/ColumnComponent";
import ImageComponent from "@/components/global/Editor/Image";
import BlockQuote from "@/components/global/Editor/BlockQuote";
import NumberedList, {
  BulletList,
  TodoList,
} from "@/components/global/Editor/List";
import CalloutBox from "@/components/global/Editor/CalloutBox";
import CodeBlock from "@/components/global/Editor/CodeBlock";
import TableOfContents from "@/components/global/Editor/TableOfContents";
import Divider from "@/components/global/Editor/Divider";

type MasterRecursiveComponentProps = {
  content: ContentItem;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  slideId: string;
  index?: number;
};

const ContentRenderer: FC<MasterRecursiveComponentProps> = React.memo(
  ({ content, onContentChange, slideId, index, isEditable, isPreview }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onContentChange(content.id, e.target.value);
      },
      [content.id, onContentChange]
    );

    const commonProps = {
      placeholder: content.placeholder,
      value: content.content as string,
      onChange: handleChange,
      isPreview: isPreview,
    };

    const animationProps = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    };

    // Check if content is defined
    if (!content) {
      console.error("Content is undefined in ContentRenderer");
      return null;
    }

    // Log content type for debugging
    console.log(`Rendering content type: ${content.type}`, content);

    switch (content.type) {
      case "heading1":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading1 {...commonProps} />
          </motion.div>
        );
      case "heading2":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading2 {...commonProps} />
          </motion.div>
        );
      case "heading3":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading3 {...commonProps} />
          </motion.div>
        );
      case "heading4":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading4 {...commonProps} />
          </motion.div>
        );
      case "title":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Title {...commonProps} />
          </motion.div>
        );
      case "paragraph":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Paragraph {...commonProps} />
          </motion.div>
        );
      case "table":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <TableComponent
              content={content.content as string[][]}
              onChange={(newContent) =>
                onContentChange(
                  content.id,
                  newContent !== null ? newContent : ""
                )
              }
              initialRowSize={content.initialColumns}
              initialColSize={content.initialRows}
              isEditable={isEditable}
              isPreview={isPreview}
            />
          </motion.div>
        );
      case "resizable-column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div className="w-full h-full" {...animationProps}>
              <ColumnComponent
                content={content.content as ContentItem[]}
                className={content.className}
                onContentChange={onContentChange}
                slideId={slideId}
                isPreview={isPreview}
                isEditable={isEditable}
              />
            </motion.div>
          );
        }
        return null;
      case "image":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <ImageComponent
              src={content.content as string}
              alt={content.alt || "image"}
              className={content.className}
              isPreview={isPreview}
              isEditable={isEditable}
              contentId={content.id}
              onContentChange={onContentChange}
            />
          </motion.div>
        );
      case "blockquote":
        return (
          <motion.div
            className={cn("w-full h-full flex flex-col", content.className)}
            {...animationProps}
          >
            <BlockQuote>
              <Paragraph {...commonProps} />
            </BlockQuote>
          </motion.div>
        );
      case "numberedList":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <NumberedList
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
            />
          </motion.div>
        );
      case "bulletList":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <BulletList
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
            />
          </motion.div>
        );
      case "todoList":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <TodoList
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
            />
          </motion.div>
        );
      case "calloutBox":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <CalloutBox
              type={content.callOutType || "info"}
              className={content.className}
            >
              <Paragraph {...commonProps} />
            </CalloutBox>
          </motion.div>
        );
      case "codeBlock":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <CodeBlock
              code={content.code}
              language={content.language}
              onChange={() => {}}
              className={content.className}
            />
          </motion.div>
        );
      case "tableOfContents":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <TableOfContents
              items={content.content as string[]}
              onItemClick={(id) => console.log(`Navigate to section: ${id}`)}
              className={content.className}
            />
          </motion.div>
        );
      case "divider":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Divider className={content.className as string} />
          </motion.div>
        );
      case "column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div
              {...animationProps}
              className={cn(
                "w-full h-full p-8 flex flex-col",
                content.className
              )}
            >
              {content.content.length > 0 ? (
                (content.content as ContentItem[]).map(
                  (subItem: ContentItem, subIndex: number) => (
                    <React.Fragment key={subItem.id || `item-${subIndex}`}>
                      {!isPreview &&
                        !subItem.restrictToDrop &&
                        subIndex === 0 &&
                        isEditable && (
                          <DropZone
                            index={0}
                            parentId={content.id}
                            slideId={slideId}
                          />
                        )}
                      <MasterRecursiveComponent
                        content={subItem}
                        onContentChange={onContentChange}
                        isPreview={isPreview}
                        slideId={slideId}
                        isEditable={isEditable}
                        index={subIndex}
                      />
                      {!isPreview && !subItem.restrictToDrop && isEditable && (
                        <DropZone
                          index={subIndex + 1}
                          parentId={content.id}
                          slideId={slideId}
                        />
                      )}
                    </React.Fragment>
                  )
                )
              ) : isEditable ? (
                <DropZone index={0} parentId={content.id} slideId={slideId} />
              ) : null}
            </motion.div>
          );
        }
        return null;
      default:
        console.warn(`Unhandled content type: ${content.type}`);
        return null;
    }
  }
);

ContentRenderer.displayName = "ContentRenderer";

export const MasterRecursiveComponent: React.FC<MasterRecursiveComponentProps> =
  React.memo(
    ({
      content,
      onContentChange,
      slideId,
      index,
      isEditable = true,
      isPreview = false,
    }) => {
      if (isPreview) {
        return (
          <ContentRenderer
            content={content}
            onContentChange={onContentChange}
            isPreview={isPreview}
            isEditable={isEditable}
            slideId={slideId}
            index={index}
          />
        );
      }

      return (
        <React.Fragment>
          <ContentRenderer
            content={content}
            onContentChange={onContentChange}
            isPreview={isPreview}
            isEditable={isEditable}
            slideId={slideId}
            index={index}
          />
        </React.Fragment>
      );
    }
  );

MasterRecursiveComponent.displayName = "MasterRecursiveComponent";
