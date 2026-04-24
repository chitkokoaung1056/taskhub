// lib/mock/tasks.ts
import { TaskType } from '@/types/task'

// Helper to get dates relative to today
const getDate = (daysFromNow: number): string => {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return date.toISOString().split('T')[0]
}

const getPastDate = (daysAgo: number): string => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().split('T')[0]
}

export const tasks: TaskType[] = [
  {
    id: 1,
    task_name: "Complete project proposal",
    task_description: "Write and review the Q4 project proposal for client presentation",
    priority: "high",
    due_date: getDate(3), // 3 days from now
    status: "pending",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    task_name: "Review pull requests",
    task_description: "Review and merge pending PRs from the team",
    priority: "high",
    due_date: getPastDate(1), // 1 day ago (overdue)
    status: "pending",
    created_at: new Date(Date.now() - 5 * 86400000).toISOString()
  },
  {
    id: 3,
    task_name: "Update documentation",
    task_description: "Update API documentation with new endpoints",
    priority: "medium",
    due_date: getDate(7),
    status: "pending",
    created_at: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 4,
    task_name: "Fix login bug",
    task_description: "Resolve the authentication timeout issue",
    priority: "high",
    due_date: getPastDate(2),
    status: "completed",
    created_at: new Date(Date.now() - 7 * 86400000).toISOString()
  },
  {
    id: 5,
    task_name: "Design database schema",
    task_description: "Create ERD for the new features",
    priority: "medium",
    due_date: getDate(5),
    status: "pending",
    created_at: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: 6,
    task_name: "Write unit tests",
    task_description: "Add test coverage for task components",
    priority: "low",
    due_date: getDate(10),
    status: "pending",
    created_at: new Date().toISOString()
  },
  {
    id: 7,
    task_name: "Deploy to production",
    task_description: "Deploy the latest build to production environment",
    priority: "high",
    due_date: getPastDate(3),
    status: "completed",
    created_at: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: 8,
    task_name: "Optimize images",
    task_description: "Compress and optimize all static images",
    priority: "low",
    due_date: getPastDate(5),
    status: "completed",
    created_at: new Date(Date.now() - 4 * 86400000).toISOString()
  },
  {
    id: 9,
    task_name: "Set up monitoring",
    task_description: "Configure logging and monitoring tools",
    priority: "medium",
    due_date: getDate(8),
    status: "pending",
    created_at: new Date().toISOString()
  },
  {
    id: 10,
    task_name: "Create landing page",
    task_description: "Design and implement new marketing landing page",
    priority: "high",
    due_date: getDate(12),
    status: "pending",
    created_at: new Date(Date.now() - 1 * 86400000).toISOString()
  }
]