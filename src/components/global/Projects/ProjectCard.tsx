/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { JsonValue } from '@prisma/client/runtime/library'
import React from 'react'
import { motion } from 'framer-motion'
import { itemsVariants, themes } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { useSlideStore } from '@/store/useSlideStore'
import ThumbnailPreview from './ThumbnailPreview'
import { timeAgo } from '@/lib/utils';

type Props = {
    projectId: string
    title: string
    createdAt: string
    isDelete: boolean
    slideData: JsonValue
    src: string
    themeName: string
}

const ProjectCard = ({
    projectId,
    title,
    createdAt,
    isDelete,
    slideData,
    src,
    themeName
}: Props) => {
    const router = useRouter();
    const { setSlides } = useSlideStore();

    const handleNavigation = () => {
        setSlides(JSON.parse(JSON.stringify(slideData)));
        router.push(`/presentation/${projectId}`);
    }

    const theme = themes.find((theme) => theme.name === themeName) || themes[0];

    return (
        <motion.div
            variants={itemsVariants}
            className={`group w-full flex-flex-col gap-y-3 rounded-xl p-3 transition-colors ${!isDelete && 'hover:bg-muted/50'
                }`}
        >
            <div className='relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer'
                onClick={handleNavigation}>
                <ThumbnailPreview
                    theme={theme}
                // TODO: Bring back slide data
                // slide={JSON.parse(JSON.stringify(slideData))?.[0]}
                />
            </div>

            <div className="w-full">
                <div className="space-y-1">
                    <h3 className="font-semibold text-base text-primary line-clamp-1">
                        {title}
                    </h3>
                    <div className='flex w-full justify-between items-center gap-2'>
                        <p className='text-sm text-muted-foreground' suppressHydrationWarning>
                            {timeAgo(createdAt)}
                        </p>
                        {/* {isDelete ? (
                        <AlertDia
                        ): ()} */}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectCard