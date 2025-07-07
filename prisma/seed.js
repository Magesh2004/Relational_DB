const prisma = require('../config/db')


async function main() {
  // 🏷️ Create categories
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Fiction' },
      { name: 'Non-Fiction' },
      { name: 'Science' },
      { name: 'Technology' },
      { name: 'History' }
    ],
    skipDuplicates: true, // Avoids duplicate seed runs
  });

  // 📚 Create books
  const booksData = [
    {
      title: 'The Time Machine',
      price: 299,
      inStock: 10,
      categories: ['Fiction', 'Science']
    },
    {
      title: 'Sapiens',
      price: 499,
      inStock: 15,
      categories: ['Non-Fiction', 'History']
    },
    {
      title: 'Clean Code',
      price: 599,
      inStock: 20,
      categories: ['Technology']
    },
    {
      title: 'Brief Answers to the Big Questions',
      price: 399,
      inStock: 8,
      categories: ['Science', 'Non-Fiction']
    }
  ];

  for (const book of booksData) {
    const createdBook = await prisma.book.create({
      data: {
        title: book.title,
        price: book.price,
        inStock: book.inStock,
      }
    });

    // Link categories
    for (const categoryName of book.categories) {
      const category = await prisma.category.findUnique({
        where: { name: categoryName },
      });

      if (category) {
        await prisma.bookCategory.create({
          data: {
            bookId: createdBook.id,
            categoryId: category.id,
          },
        });
      }
    }
  }

  console.log('📚 Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());