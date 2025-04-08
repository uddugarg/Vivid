import { Prisma } from "@prisma/client";

export type PrismaUser = Prisma.UserGetPayload<{
    include: { PurchasedProjects: true }
}>;
export interface OutlineCard {
    title: string;
    id: string;
    order: number;
}

export interface OutlineState {
    cards: OutlineCard[];
}

export interface LayoutSlides {
    slideName: string;
    content: ContentItem;
    className?: string;
    type: string;
}



export interface Slide {
    id: string;
    slideName: string;
    type: string;
    content: ContentItem;
    slideOrder: number;
    className?: string;
}
export interface ContentItem {
    id: string;
    type: ContentType;
    name: string;
    content: ContentItem[] | string | string[] | string[][];
    initialRows?: number;
    initialColumns?: number;
    restrictToDrop?: boolean;
    columns?: number;
    placeholder?: string;
    className?: string;
    alt?: string;
    callOutType?: "success" | "warning" | "info" | "question" | "caution";
    link?: string;
    code?: string;
    language?: string;
    bgColor?: string;
    isTransparent?: boolean;
}

export interface DragItem {
    id: string;
    type: string;
    elementOrder: number;
}

export type ContentType =
    | "column"
    | "resizable-column"
    | "text"
    | "paragraph"
    | "image"
    | "table"
    | "multiColumn"
    | "blank"
    | "imageAndText"
    | "heading1"
    | "heading2"
    | "heading3"
    | "title"
    | "heading4"
    | "blockquote"
    | "numberedList"
    | "bulletedList"
    | "code"
    | "link"
    | "quote"
    | "divider"
    | "calloutBox"
    | "todoList"
    | "bulletList"
    | "codeBlock"
    | "customButton"
    | "tableOfContents";


export interface Theme {
    name: string;
    fontFamily: string;
    fontColor: string;
    backgroundColor: string;
    slideBackgroundColor: string;
    accentColor: string;
    gradientBackground?: string;
    sidebarColor?: string;
    navbarColor?: string;
    type: 'light' | 'dark';
}




export interface LayoutGroup {
    name: string;
    layouts: Layout[];
}

export interface Layout {
    name: string;
    icon: React.FC;
    type: string;
    component: LayoutSlides;
    layoutType: string;
}







export interface ComponentGroup {
    name: string;
    components: Component[];
}


interface Component {
    name: string;
    icon: string;
    type: string;
    component: ContentItem;
    componentType: string;
}



