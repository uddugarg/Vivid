import { Slide } from '@/lib/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SlideState {
    slides: Slide[];
    setSlides: (slides: Slide[]) => void;
}


export const useSlideStore = create(persist<SlideState>((set) =>
({
    slides: [],
    setSlides: (slides) => set({ slides }),
}),
    {
        name: 'slide-store',
    }
));