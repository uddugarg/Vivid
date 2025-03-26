"use server";

import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";
import { OutlineCard } from "@/lib/types";

export const getAllProjects = async () => {
    try {
        const checkUser = await onAuthenticateUser();

        if (checkUser.status !== 200 || !checkUser.user) {
            return {
                status: 403,
                error: 'Unauthorized'
            }
        }

        const projects = await client.project.findMany({
            where: {
                userId: checkUser.user.id,
                isDeleted: false
            },
            orderBy: {
                updatedAt: 'desc'
            }
        });

        if (projects.length === 0) {
            return {
                status: 404,
                error: 'No projects found'
            }
        }

        return {
            status: 200,
            data: projects
        }

    } catch (error) {
        console.log("Error getting all projects", error);
        return {
            status: 500,
            error: 'Internal server error'
        }
    }
}

export const getRecentProjects = async () => {
    try {
        const checkUser = await onAuthenticateUser()

        if (checkUser.status !== 200 || !checkUser.user) {
            return {
                status: 403,
                error: 'Unauthorized'
            }
        }

        const projects = await client.project.findMany({
            where: {
                userId: checkUser.user.id,
                isDeleted: false
            },

            orderBy: {
                updatedAt: 'desc'
            },

            take: 5
        })

        if (projects.length === 0) {
            return {
                status: 404, error: "No recent projects available"
            }
        }

        return {
            status: 200,
            data: projects
        }


    } catch (error) {
        console.log("Error getting recent projects", error);
        return {
            status: 500,
            error: 'Internal server error'
        }
    }
}

export const recoverProject = async (projectId: string) => {
    try {
        const checkUser = await onAuthenticateUser()

        if (checkUser.status !== 200 || !checkUser.user) {
            return {
                status: 403,
                error: 'Unauthorized'
            }
        }

        const updatedProject = await client.project.update({
            where: {
                id: projectId
            },
            data: {
                isDeleted: false
            }
        })

        if (!updatedProject) {
            return {
                status: 500,
                error: "Failed to recover the project"
            }
        }

        return {
            status: 200,
            data: updatedProject
        }

    } catch (error) {
        console.log("Error recovering the project", error);
        return {
            status: 500,
            error: 'Internal server error'
        }
    }

}

export const deleteProject = async (projectId: string) => {
    try {
        const checkUser = await onAuthenticateUser()

        if (checkUser.status !== 200 || !checkUser.user) {
            return {
                status: 403,
                error: 'Unauthorized'
            }
        }

        const updatedProject = await client.project.update({
            where: {
                id: projectId
            },
            data: {
                isDeleted: true
            }
        })

        if (!updatedProject) {
            return {
                status: 500,
                error: "Failed to delete the project"
            }
        }

        return {
            status: 200,
            data: updatedProject
        }
    } catch (error) {
        console.log("Error deleting the project", error);
        return {
            status: 500,
            error: 'Internal server error'
        }
    }
}

export const createProject = async (title: string, outlines: OutlineCard[]) => {
    try {
        if (!title || !outlines || outlines.length === 0) {
            return { status: 400, error: "Title and outlines are required." }
        }

        const allOutlines = outlines.map((outline) => outline.title);

        const checkUser = await onAuthenticateUser()

        if (checkUser.status !== 200 || !checkUser.user) {
            return {
                status: 403,
                error: 'Unauthorized'
            }
        }

        const project = await client.project.create({
            data: {
                name: title,
                outlines: allOutlines,
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: checkUser.user.id
            }
        })

        if (!project) {
            return { status: 500, error: "Failed to create the project" }
        }

        return { status: 200, data: project };

    } catch (error) {
        console.log("Error creating the project", error);
        return {
            status: 500,
            error: 'Internal server error'
        }
    }
}

export const getProjectById = async (projectId: string) => {
    try {
        const checkUser = await onAuthenticateUser()

        if (checkUser.status !== 200 || !checkUser.user) {
            return {
                status: 403,
                error: 'Unauthorized'
            }
        }

        const project = await client.project.findFirst({
            where: {
                id: projectId
            }
        })

        if (!project) {
            return { status: 404, error: "Project not found" }
        }

        return {
            status: 200,
            data: project
        }

    } catch (error) {
        console.log("Error fetching the project", error);
        return {
            status: 500,
            error: 'Internal server error'
        }
    }
}