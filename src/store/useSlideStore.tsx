import { Slide, Theme } from '@/lib/types';
import { Project } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SlideState {
    slides: Slide[]
    currentSlide: number
    setSlides: (slides: Slide[]) => void
    removeSlide: (id: string) => void
    addSlideAtIndex: (slide: Slide, index: number) => void
    getOrderedSlides: () => Slide[]
    reorderSlides: (fromIndex: number, toIndex: number) => void
    project: Project | null
    setProject: (id: Project) => void
    currentTheme: Theme
    setCurrentTheme: (theme: Theme) => void
}

const defaultTheme: Theme = {
    name: "Default",
    fontFamily: "'Inter', sans-serif",
    fontColor: "#333333",
    backgroundColor: "#f0f0f0",
    slideBackgroundColor: "#ffffff",
    accentColor: '#3b82f6',
    type: "light"
}


export const useSlideStore = create(persist<SlideState>((set, get) =>
({
    slides: [],
    currentSlide: 0,
    setSlides: (slides) => set({ slides }),
    removeSlide: (id) => set((state) => ({
        slides: state.slides.filter((slide) => slide.id !== id)
    })),
    addSlideAtIndex: (slide: Slide, index: number) => {
        set((state) => {
            const newSlides = [...state.slides];
            newSlides.splice(index, 0, { ...slide, id: uuidv4() });
            newSlides.forEach((slide, i) => {
                slide.slideOrder = i;
            });

            return {
                slides: newSlides,
                currentSlide: index
            };
        })
    },
    getOrderedSlides: () => {
        const state = get();
        return [...state.slides].sort((a, b) => a.slideOrder - b.slideOrder)
    },
    reorderSlides: (fromIndex: number, toIndex: number) => {
        set((state) => {
            const newSlides = [...state.slides];
            const [removed] = newSlides.splice(fromIndex, 1);
            newSlides.splice(toIndex, 0, removed);
            return {
                slides: newSlides.map((slide, index) => ({
                    ...slide,
                    slideOrder: index
                }))
            };
        })
    },
    project: null,
    setProject: (project) => set({ project }),
    currentTheme: defaultTheme,
    setCurrentTheme: (theme: Theme) => set({ currentTheme: theme }),
}),
    {
        name: 'slide-store',
    }
));