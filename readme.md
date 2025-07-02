# **📌 Relational_DB API**

## **📖 What it does**

This project is a basic **CRUD API** server that demonstrates 

- **one-to-many**
- **many-to-one**
- **one-to-one**
- **many-to-many**

data modeling works using **PostgreSQL**, **Prisma ORM**, and **Express.js**. It showcases multiple relationship types

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Prisma ORM**
- **RESTful API**

---

---

## **🛠️ How to use the API**

| Method | Route | Description |
| --- | --- | --- |
| GET | `/` | Fetch all Categories, User, and Cart |
| POST | `/` | Create a new Category |
| GET | `/:catid` | Fetch all books in a specific category |
| PUT | `/:catid` | Update a category |
| POST | `/:catid/book` | Create a new Book in a Category (attach via join) |
| GET | `/:catid/book/:bookid` | Fetch the specific book and its categorys |
| PUT | `/:catid/book/:bookid` | Will update a book |
| GET | `/:catid/book/:bookid/true` | Add the book to cart |
| GET | `/user` | Fetch the user and cart |

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
