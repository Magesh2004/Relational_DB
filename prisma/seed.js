const prisma = require('../config/db')


async function main() {
  const categories = ['Fiction', 'Science', 'History', 'Technology', 'Fantasy'];

  // Upsert categories (avoid duplicate name errors)
  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Fetch all categories with IDs
  const allCategories = await prisma.category.findMany();
  const getCategoryId = (name) => allCategories.find(cat => cat.name === name)?.id;

  // Seed books
  const book1 = await prisma.book.create({
    data: {
      title: "The Martian",
      categories: {
        create: [
          { category: { connect: { id: getCategoryId("Science") } } },
          { category: { connect: { id: getCategoryId("Fiction") } } },
        ]
      }
    }
  });

  const book2 = await prisma.book.create({
    data: {
      title: "Harry Potter and the Sorcerer's Stone",
      categories: {
        create: [
          { category: { connect: { id: getCategoryId("Fantasy") } } },
        ]
      }
    }
  });

  const book3 = await prisma.book.create({
    data: {
      title: "Sapiens",
      categories: {
        create: [
          { category: { connect: { id: getCategoryId("History") } } },
          { category: { connect: { id: getCategoryId("Science") } } },
        ]
      }
    }
  });

  console.log("✅ Seeding complete!");
  console.log({ categories: allCategories, book1, book2, book3 });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
