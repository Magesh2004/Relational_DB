# **📌 Relational_DB API**

## **📖 What it does**

This project is a basic **CRUD API** server that demonstrates

- **one-to-many**
- **many-to-one**
- **one-to-one**
- **many-to-many**

data modeling works using **PostgreSQL**, **Prisma ORM**, and **Express.js**. It showcases multiple relationship types and authentication using the json web token

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Prisma ORM**
- **RESTful API**
- **JWT**

---

---

## **🛠️ How to use the API**

| Method | Route                          | Description                                               |
|--------|--------------------------------|-----------------------------------------------------------|
| GET    | `/category`                    | Fetch all Categories, User, and Cart                      |
| POST   | `/category`                    | Create a new Category                                     |
| POST   | `/auth/register`               | Create a new user                                         |
| POST   | `/auth/login`                  | To login for a user                                       |
| POST   | `/auth/logout`                 | To logout a user                                          |
| POST   | `/auth/ref`                    | To generate a new access code                             |
| GET    | `/cart`                        | Fetch the cart                                            |
| POST   | `/cart/:bookid`                | Add the book to cart                                      |
| DELETE | `/cart/:bookid`                | Delete the book from the cart                             |
| GET    | `/order`                       | Fetch all the current orders and their status             |
| POST   | `/order`                       | Add the cart items to the orders                          |
| PUT    | `/order/:orderid/pay`          | Mark the payment as completed for the order               |
| PUT    | `/order/:orderid/status`       | Update the order status                                   |
| GET    | `/category/:catid`             | Fetch all books in a specific category                    |
| PUT    | `/category/:catid`             | Update a category                                         |
| POST   | `/category/:catid/book`        | Create a new Book in a Category (attach via join)         |
| GET    | `/category/:catid/book/:bookid`| Add an existing book to the Category                      |
| GET    | `/book/:bookid`                | Fetch the specific book and its categories                |
| PUT    | `/book/:bookid`                | Update a book                                             |


---

## **✅ Example Requests & Responses**

### 📥 Create a new Category

**POST** `/`

**Request Body:**

```json
{
  "name": "Self-Help"
}
```

**Response:**

```json
{
  "status": 201,
  "message": "Succesfully created"
}
```

### 📥 Create a new Book in a Category

**POST** `/:catid/book`

**Request Body:**

```json
{
  "title": "Atomic Habits"
}
```

**Response:**

```json
{
  "status": 201,
  "message": "Successfully created a book",
  "data": {
    "book": {
      "id": 2,
      "title": "Atomic Habits",
      "cartId": null
    }
  }
}
```

---

### 📤 Get all books in a category

**GET** `/:catid`

**Response:**

```json
{
  "status": 200,
  "message": "Successfully fetched",
  "data": {
    "category": {
      "id": 3,
      "name": "Self-Help",
      "books": [
        {
          "bookId": 2,
          "categoryId": 3,
          "book": {
            "id": 2,
            "title": "Atomic Habits",
            "cartId": null
          }
        }
      ]
    }
  }
}
```

---

### 🛒 Add a Book to Cart

**GET** `/:catid/book/:bookid/true`

**(This will attach the book to a predefined cart for demo)**

**Response:**

```json
{
  "status": 200,
  "message": "Added to cart"
}
```

---

### 🧑‍💼 Get User with Cart and Books

**GET** `/user`

**Response:**

```json
{
  "status": 200,
  "message": "Successfully fetched User data",
  "data": {
    "user": [
      {
        "id": 2,
        "name": "Zoro",
        "cartId": 2
      }
    ],
    "cart": [
      {
        "id": 2,
        "userId": 2,
        "books": [
          {
            "id": 1,
            "title": "Log horizon",
            "cartId": 2
          },
          {
            "id": 2,
            "title": "Atomic Habits",
            "cartId": 2
          }
        ]
      }
    ]
  }
}
```

---

## 🙋 **Author & Contact**

**Author:** Magesh Balram

📧 **Email:** [mageshbalram4@gmail.com](mailto:mageshbalram4@gmail.com)
