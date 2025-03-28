import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { LayoutSlides } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useSlideStore } from '@/store/useSlideStore'
import React, { useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid'

interface DropZoneProps {
  index: number
  onDrop: (item: {
    type: string
    layoutType: string
    component: LayoutSlides
    index?: number
  },
    dropIndex: number) => void
  isEditable: boolean
}

export const DropZone: React.FC<DropZoneProps> = ({ index, onDrop, isEditable }) => {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ['SLIDE', 'layout'],
    drop: (item: {
      type: string
      layoutType: string
      component: LayoutSlides
      index?: number
    }) => {
      onDrop(item, index)
    },
    canDrop: () => isEditable,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  })

  if (!isEditable) return null

  return (
    <div className={cn("h-4 my-2 rounded-md transition-all duration-200",
      isOver && canDrop ? "border-green-500 bg-green-100" : "border-gray-300",
      canDrop ? "border-blue-300" : ""
    )}>
      {isOver && canDrop && (
        <div className='h-full flex items-center justify-center text-greeen-600'>
          Drop here
        </div>
      )}
    </div>
  )
}

type Props = {
  isEditable: boolean

}

const Editor = ({
  isEditable
}: Props) => {
  const [loading, setLoading] = React.useState(true)

  const slideRefs = React.useRef<(HTMLDivElement | null)[]>([])

  const { getOrderedSlides, reorderSlides, slides, project, currentSlide, removeSlide, addSlideAtIndex } = useSlideStore()


  const moveSlide = (dragIndex: number, hoverIndex: number) => {
    if (isEditable) {
      reorderSlides(dragIndex, hoverIndex)
    }
  }

  const handleDrop = (item: {
    type: string
    layoutType: string
    component: LayoutSlides
    index?: number
  },
    dropIndex: number
  ) => {
    if (!isEditable) return

    if (item.type === "layout") {
      addSlideAtIndex({
        ...item.component,
        id: uuidv4(),
        slideOrder: dropIndex,
      },
        dropIndex)
    } else if (item.type === "SLIDE" && item.index !== undefined) {
      moveSlide(item.index, dropIndex)


    }
  }

  useEffect(() => {
    if (slideRefs.current[currentSlide]) {
      slideRefs.current[currentSlide]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [currentSlide])


  return (
    <div className='flex-1 flex flex-col h-full max-w-3xl mx-auto px-4 mb-20'>
      {loading ? (
        <div className="w-full px-4 flex flex-col space-y-6">
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-52 w-full" />
        </div>
      ) : (
        <ScrollArea className='flex-1 mt-8'>
          <div className="px-4 pb-4 space-y-4 pt-2">
            {isEditable &&
              <DropZone
                index={0}
                onDrop={handleDrop}
                isEditable={isEditable}
              />
            }
          </div>
        </ScrollArea>
      )}
    </div>
  )
}

export default Editor