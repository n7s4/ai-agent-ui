import { prisma } from "@/lib/db/prisma";
import { signToken, setAuthCookie } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return Response.json(
      { error: "请填写所有字段" },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return Response.json(
      { error: "密码至少 6 个字符" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return Response.json(
      { error: "该邮箱已注册" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  const token = await signToken({
    userId: user.id,
    email: user.email,
    name: user.name,
  });

  await setAuthCookie(token);

  return Response.json({
    user: { id: user.id, name: user.name, email: user.email },
  });
}
