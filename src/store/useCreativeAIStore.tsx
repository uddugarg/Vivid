import { OutlineCard } from '@/lib/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CreativeAIStore = {
    outlines: OutlineCard[] | []
    addOutline: (outline: OutlineCard) => void
    addMultipleOutlines: (outlines: OutlineCard[]) => void
    currentAiPrompt: string
    setCurrentAiPrompt: (prompt: string) => void
    resetOutlines: () => void
}

const useCreativeAIStore = create<CreativeAIStore>()(
    persist((set) => ({
        outlines: [],
        addOutline: (outline: OutlineCard) => {
            set((state) => ({
                outlines: [outline, ...state.outlines]
            }))
        },
        addMultipleOutlines: (outlines: OutlineCard[]) => {
            set(() => ({
                outlines: [...outlines]
            }))
        },
        currentAiPrompt: "",
        setCurrentAiPrompt: (prompt: string) => {
            set({ currentAiPrompt: prompt })
        },
        resetOutlines: () => {
            set({outlines: []})
        }
    }), {
        name: 'creative-ai'
    })
)

export default useCreativeAIStore