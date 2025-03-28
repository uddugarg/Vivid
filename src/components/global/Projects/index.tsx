import { containerVariants } from '@/lib/constants'
import { Project } from '@prisma/client'
import React from 'react'
import ProjectCard from './ProjectCard'
import { motion } from 'framer-motion'

type Props = {
    projects: Project[]
}

const Projects = ({ projects }: Props) => {
    return (
        <motion.div
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
            variants={containerVariants}
            initial='hidden'
            animate='visible'
        >
            {projects.map((project, index) => (
                <ProjectCard key={index}
                    projectId={project?.id}
                    title={project?.name}
                    createdAt={project?.createdAt.toString()}
                    isDelete={project?.isDeleted}
                    slideData={project?.slides}
                    themeName={project.themeName}
                />
            ))}
        </motion.div>
    )
}

export default Projects