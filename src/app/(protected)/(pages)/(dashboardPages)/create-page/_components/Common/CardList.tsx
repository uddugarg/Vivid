import { OutlineCard } from '@/lib/types'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import OutlineCardItem from './OutlineCardItem'
import { Button } from '@/components/ui/button'
import AddCardButton from './AddCardButton'

type Props = {
    outlines: OutlineCard[]
    editingCard: string | null
    selectedCard: string | null
    editText: string
    addOutline?: (card: OutlineCard) => void
    onEditChange: (value: string) => void
    onCardSelect: (id: string) => void
    onCardDoubleClick: (id: string, title: string) => void
    setEditText: (value: string) => void
    setEditingCard: (id: string | null) => void
    setSelectedCard: (id: string | null) => void
    addMultipleOutlines: (cards: OutlineCard[]) => void
}

const CardList = ({
    outlines,
    editingCard,
    selectedCard,
    editText,
    addOutline,
    onEditChange,
    onCardSelect,
    onCardDoubleClick,
    setEditText,
    setEditingCard,
    setSelectedCard,
    addMultipleOutlines,
}: Props) => {
    const [draggedItem, setDraggedItem] = useState<OutlineCard | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const dragOffsetY = useRef<number>(0)

    const onDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault()
        if (!draggedItem) return;

        const rect = e.currentTarget.getBoundingClientRect()
        const y = e.clientY - rect.top
        const threshold = rect.height / 2

        if (y < threshold) {
            setDragOverIndex(index)
        } else {
            setDragOverIndex(index + 1)
        }
    }

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault()
        if (!draggedItem || dragOverIndex === null) return;

        const updateCards = [...outlines];
        const draggedIndex = updateCards.findIndex((card) => card.id === draggedItem.id)

        if (draggedIndex === -1 || draggedIndex === dragOverIndex) return;

        const [removedCard] = updateCards.slice(draggedIndex, 1)
        updateCards.splice(dragOverIndex > draggedIndex ? dragOverIndex - 1 : dragOverIndex, 0, removedCard)

        addMultipleOutlines(updateCards.map((card, index) => ({ ...card, order: index + 1 })))
        setDraggedItem(null)
        setDragOverIndex(null)
    }

    const onCardUpdate = (id: string, newTitle: string) => {
        addMultipleOutlines(outlines.map((card) => (
            card.id === id ? { ...card, title: newTitle } : card
        )))

        setEditingCard(null)
        setSelectedCard(null)
        setEditText("")
    }

    const onCardDelete = (id: string) => {
        addMultipleOutlines(outlines
            .filter((card) => card.id !== id)
            .map((card, index) => ({ ...card, order: index + 1 }))
        )
    }

    const onDragStart = (e: React.DragEvent, card: OutlineCard) => {
        setDraggedItem(card)
        e.dataTransfer.effectAllowed = 'move'

        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        dragOffsetY.current = e.clientY - rect.top

        const draggedEl = e.currentTarget.cloneNode(true) as HTMLElement

        draggedEl.style.position = 'absolute'
        draggedEl.style.top = "-1000px"
        draggedEl.style.opacity = "0.8"
        draggedEl.style.width = `${(e.currentTarget as HTMLElement).offsetWidth}px`

        document.body.appendChild(draggedEl);

        e.dataTransfer.setDragImage(draggedEl, 0, dragOffsetY.current)

        setTimeout(() => {
            setDragOverIndex(outlines.findIndex((c) => c.id === card.id))
            document.body.removeChild(draggedEl)
        }, 0)
    }

    const onDragEnd = () => {
        setDraggedItem(null)
        setDragOverIndex(null)
    }

    const getDragOverStyles = (cardIndex: number) => {
        if (dragOverIndex === null || draggedItem === null) return {}

        if (cardIndex === dragOverIndex) {
            return {
                borderTop: '2px solid #000',
                marginTop: '0.5rem',
                transition: 'margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
            }
        } else if (cardIndex === dragOverIndex - 1) {
            return {
                borderTop: '2px solid #000',
                marginTop: '0.5rem',
                transition: 'margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
            }
        }

        return {}
    }

    return (
        <motion.div
            className='space-y-2 -my-2'
            layout
            onDragOver={(e) => {
                e.preventDefault();
                if (outlines.length === 0 || e.clientY > e.currentTarget.getBoundingClientRect().bottom - 20) {
                    onDragOver(e, outlines.length)
                }
            }}
            onDrop={(e) => {
                e.preventDefault()
                onDrop(e);
            }}
        >
            <AnimatePresence>
                {outlines.map((card, index) => (
                    <React.Fragment key={card.id}>
                        <OutlineCardItem
                            onDragOver={(e) => onDragOver(e, index)}
                            card={card}
                            isEditing={editingCard === card.id}
                            isSelected={selectedCard === card.id}
                            editText={editText}
                            onEditChange={onEditChange}
                            onEditBlur={() => onCardUpdate(card.id, editText)}
                            onEditKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    onCardUpdate(card.id, editText)
                                }
                            }}
                            onCardClick={() => onCardSelect(card.id)}
                            onCardDoubleClick={() => onCardDoubleClick(card.id, card.title)}
                            onDeleteClick={() => onCardDelete(card.id)}
                            dragHandlers={{
                                onDragStart: (e) => onDragStart(e, card),
                                onDragEnd: onDragEnd
                            }}
                            dragOverStyles={getDragOverStyles(index)}
                        />
                        <AddCardButton
                        // onAddCard={() => onAddCard(index)}
                        />
                    </React.Fragment>

                ))}
            </AnimatePresence>
        </motion.div>
    )
}

export default CardList