import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  try {
    for (let i = 0; i < 100; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await db.category.create({
        data: {
          name: faker.commerce.department(),
        },
      });
    }

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await db.$disconnect();
  }
}

main().catch((error) => {
  console.error("Unexpected error:", error);
});
