import { PrismaClient, Role } from "../generated/prisma-client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@example.com";
  const plainPassword = "Admin123!";

  const password_hash = await bcrypt.hash(plainPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password_hash,
      role: Role.ADMIN,
      first_name: "Admin",
      last_name: "User",
    },
    create: {
      email: adminEmail,
      password_hash,
      role: Role.ADMIN,
      first_name: "Admin",
      last_name: "User",
    },
  });

  console.log("Admin user:", admin);

  const recordsData = [
    {
      user_id: admin.id,
      title: "Test Record 1",
      content: "This is the first test record.",
    },
    {
      user_id: admin.id,
      title: "Test Record 2",
      content: "This is the second test record.",
    },
    {
      user_id: admin.id,
      title: "Important Note",
      content: "Don't forget to check the dashboard.",
    },
  ];

  await prisma.record.createMany({
    data: recordsData,
  });

  console.log("Test records created");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
