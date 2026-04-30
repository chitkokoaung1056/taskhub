import { z } from "zod"

export const registerSchema = z
  .object({
    email: z.email().min(1, "Email is required"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(
        /[!@#$%^&*(),.?\":{}|<>]/,
        "Password must include at least one special character"
      ),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], 
    message: "Passwords do not match",
  })

export const loginSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
})
