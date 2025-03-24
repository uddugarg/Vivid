import { Slide } from '@/lib/types';
import { Project } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SlideState {
    slides: Slide[]
    project: Project | null
    setSlides: (slides: Slide[]) => void
    setProject: (id: Project) => void
}


export const useSlideStore = create(persist<SlideState>((set) =>
({
    slides: [],
    setSlides: (slides) => set({ slides }),
    project: null,
    setProject: (project) => set({ project })
}),
    {
        name: 'slide-store',
    }
));