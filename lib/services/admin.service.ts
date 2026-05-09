import { createClient } from "../supabase/server"
import { getCurrentUser } from "./auth.service"
/* -----------------------------
   INTERNAL: CHECK ADMIN
------------------------------ */
async function assertAdmin() {
  const supabase = await createClient()

  const user = await getCurrentUser()

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (error || !profile) {
    throw new Error("Failed to verify admin access")
  }

  if (profile.role !== "admin") {
    throw new Error("Unauthorized access")
  }

  return user
}

/* -----------------------------
   GET ALL USERS
------------------------------ */
export async function getAllUsers() {
  await assertAdmin()

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error("Failed to fetch users")
  }

  return data
}

/* -----------------------------
   GET SINGLE USER
------------------------------ */
export async function getUserById(userId: string) {
  await assertAdmin()

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single()

  if (error) {
    throw new Error("User not found")
  }

  return data
}

/* -----------------------------
   DELETE USER (ADMIN)
------------------------------ */
export async function deleteUser(userId: string) {
  await assertAdmin()

  const supabase = await createClient({ isAdmin: true })

  const { error } = await supabase.auth.admin.deleteUser(userId)

  if (error) {
    throw new Error("Failed to delete user")
  }

  return { success: true }
}

/* -----------------------------
   UPDATE USER ROLE
------------------------------ */
export async function updateUserRole(
  userId: string,
  role: "admin" | "user"
) {
  await assertAdmin()

  const supabase = await createClient()

  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", userId)

  if (error) {
    throw new Error("Failed to update user role")
  }

  return { success: true }
}

/* -----------------------------
   GET ALL TASKS (ADMIN VIEW)
------------------------------ */
export async function getAllTasks() {
  await assertAdmin()

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error("Failed to fetch tasks")
  }

  return data
}

/* -----------------------------
   DELETE ANY TASK (ADMIN)
------------------------------ */
export async function deleteAnyTask(taskId: string) {
  await assertAdmin()

  const supabase = await createClient()

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)

  if (error) {
    throw new Error("Failed to delete task")
  }

  return { success: true }
}

/* -----------------------------
   ADMIN DASHBOARD STATS
------------------------------ */
export async function getAdminStats() {
  await assertAdmin()

  const supabase = await createClient()

  const [{ count: users }, { count: tasks }] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("tasks").select("*", { count: "exact", head: true }),
  ])

  return {
    totalUsers: users ?? 0,
    totalTasks: tasks ?? 0,
  }
}