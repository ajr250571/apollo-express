import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const resolvers = {
  Query: {
    taskFindMany: async () => {
      const tasks = await prisma.task.findMany()
      return tasks
    },
    taskFindUnique: async (_, args) => {
      const { id } = args
      const task = await prisma.task.findUnique({
        where: {
          id: Number(id),
        }
      })
      return task
    }
  },
  Mutation: {
    // params, args, context, info

    taskCreate: async (_, args) => {
      try {
        const { title, description } = args.task
        const Task = await prisma.task.create({
          data: {
            title,
            description
          }
        })
        return Task
      } catch (error) {
        throw Error(error.code)
      }
    },
    taskDelete: async (_, args) => {
      try {
        const task = await prisma.task.delete({
          where: {
            id: Number(args.id)
          }
        })
        return { code: '200', message: 'Deleted' }
      } catch (error) {
        return { code: error.code, message: error.meta.cause }
      }
    },
    taskUpdate: async (_, { id, task }) => {
      const taskUpdated = await prisma.task.update({
        where: {
          id: Number(id),
        },
        data: task,
      })
      return taskUpdated
    }
  }
}