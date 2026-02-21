"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/db";
import { userRegisterSchema } from "@/lib/validations/auth";

export async function registerUser(values: {
  name: string;
  email: string;
  password: string;
}) {
  const validated = userRegisterSchema.safeParse(values);

  if (!validated.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password } = validated.data;

  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (existingUser) {
    return { error: "Email already in use" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      emailVerified: new Date(),
    },
  });

  return { success: "Account created! You can now sign in." };
}
