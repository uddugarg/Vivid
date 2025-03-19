/* eslint-disable @typescript-eslint/no-unused-vars */
import { Slide, Theme } from '@/lib/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Props = {
    slide: Slide
    theme: Theme
}

const ThumbnailPreview = ({ slide, theme }: Props) => {
    return (
        <div className={cn('w-full relative aspect-[16/9] rounded-lg overflow-hidden transition-all duration-200 p-2')}
            style={{
                fontFamily: theme.fontFamily,
                color: theme.accentColor,
                backgroundColor: theme.slideBackgroundColor,
                backgroundImage: theme.gradientBackground
            }}
        >
            {slide ? (
                <div className='scale-[0.5] origin-top-left w-[200%] h-[200%] overlfow-hidden'>
                    This is the slide
                </div>
            ) : (
                <div className='w-full h-full flex items-center justify-center bg-gray-400'>
                    <Image className='w-6 h-6 text-gray-500' src={''} alt={''} />
                </div>
            )}
        </div>
    )
}

export default ThumbnailPreview