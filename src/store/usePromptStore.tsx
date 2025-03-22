import { OutlineCard } from '@/lib/types';
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

type page = 'create' | 'creative-ai' | 'create-scratch'
type Prompt = {
    id: string
    createdAt: string
    title: string
    outlines: OutlineCard[] | []
}

type PromptStore = {
    page: page
    setPage: (page: page) => void
    prompts: Prompt[] | []
    addPrompts: (prompt: Prompt) => void
    removePrompt: (id: string) => void
}

const usePromptStore = create<PromptStore>()(devtools(persist((set) => ({
    page: 'create',
    setPage: (page: page) => {
        set({ page })
    },
    prompts: [],
    addPrompts: (prompt: Prompt) => {
        set((state) => ({
            prompts: [prompt, ...state.prompts]
        }))
    },
    removePrompt: (id: string) => {
        set((state) => ({
            prompts: state.prompts.filter((prompt: Prompt) => prompt.id !== id)
        }))
    }
}),
    { name: 'propmts' }
)
))

export default usePromptStore