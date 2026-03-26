import { prisma } from "@/lib/db/prisma";
import { signToken, setAuthCookie } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return Response.json(
      { error: "请填写邮箱和密码" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return Response.json(
      { error: "邮箱或密码错误" },
      { status: 401 }
    );
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return Response.json(
      { error: "邮箱或密码错误" },
      { status: 401 }
    );
  }

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
