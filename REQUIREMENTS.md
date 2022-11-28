# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Users =>>> /users

- Index

  - `Method` - GET
  - `Authorization requir`ed - Bearer <token>
  - `Parameters` - none
  - `Body` - none
  - `Usage` - list all users
  - http://localhost:3000/users

- Show

  - `Method` - GET
  - `Authorization required` - Bearer <token>
  - `Parameters` - id
  - `Body` - none
  - `Usage` - list a specific User
  - http://localhost:3000/users/:id

- Create

  - `Method` - POST
  - `Authorization required` - none
  - `Body` - user_name, password, email, password, first_name , last_name
  - `Parameters` - none
  - `Usage` - create a new User
  - http://localhost:3000/users

- Update

  - `Method` - PATCH
  - `Authorization required` - Bearer <token>
  - `Body` - user_name, password, email, password, first_name , last_name , id
  - `Parameters` - none
  - `Usage` - edit an exciting User
  - http://localhost:3000/users

- Delete

  - `Method` - DELETE
  - `Authorization required` - Bearer <token>
  - `Parameters` - id
  - `Usage` - Delete an exciting User
  - http://localhost:3000/users/:id

- Authenticate
  - `Method` - POST
  - `Authorization required` - none
  - `Body` - Email - Password
  - `Parameters` - none
  - `Usage` - Authenticate user and send token
  - http://localhost:3000/users/authenticate

### Products

- Index

  - `Method` - GET
  - `Authorization requir`ed - Bearer <token>
  - `Parameters` - none
  - `Body` - none
  - `Usage` - list all products
  - http://localhost:3000/products

- Show

  - `Method` - GET
  - `Authorization required` - Bearer <token>
  - `Parameters` - id
  - `Body` - NO
  - `Usage` - list a specific product
  - http://localhost:3000/users/:id

- Create

  - `Method` - POST
  - `Authorization required` - No
  - `Body` - name - price - category
  - `Parameters` - NO
  - `Usage` - create a new product
  - http://localhost:3000/products

- Update

  - `Method` - PATCH
  - `Authorization required` - Bearer <token>
  - `Body` - name - price - category
  - `Parameters` - NO
  - `Usage` - edit an exciting Product
  - http://localhost:3000/products

- Delete

  - `Method` - DELETE
  - `Authorization required` - Bearer <token>
  - `Parameters` - id
  - `Usage` - Delete an exciting product
  - http://localhost:3000/products/:id

### Orders

- Index

  - `Method` - GET
  - `Authorization requir`ed - Bearer <token>
  - `Parameters` - none
  - `Body` - none
  - `Usage` - list all orders
  - http://localhost:3000/orders

- Show

  - `Method` - GET
  - `Authorization required` - Bearer <token>
  - `Parameters` - id
  - `Body` - NO
  - `Usage` - list a specific order
  - http://localhost:3000/orders/:id

- Create

  - `Method` - POST
  - `Authorization required` - No
  - `Body` - status - user_id
  - `Parameters` - NO
  - `Usage` - create a new order
  - http://localhost:3000/orders

- Update

  - `Method` - PATCH
  - `Authorization required` - Bearer <token>
  - `Body` - status - user_id
  - `Parameters` - NO
  - `Usage` - edit an exciting order
  - http://localhost:3000/orders

- Delete

  - `Method` - DELETE
  - `Authorization required` - Bearer <token>
  - `Parameters` - id
  - `Usage` - Delete an exciting order
  - http://localhost:3000/orders/:id

### ProductOrder

- Index

  - `Method` - GET
  - `Authorization requir`ed - Bearer <token>
  - `Parameters` - orderID
  - `Body` - none
  - `Usage` - get all products in one order
  - http://localhost:3000/ordercontent/:orderID

- Show

  - `Method` - GET
  - `Authorization required` - Bearer <token>
  - `Parameters` - orderID - productID
  - `Body` - NO
  - `Usage` - get one product or one record in one order
  - http://localhost:3000/ordercontent/product/:orderID/:productID

- Create

  - `Method` - POST
  - `Authorization required` - No
  - `Body` - order_id - product_id - qty
  - `Parameters` - NO
  - `Usage` - add product to one order
  - http://localhost:3000/ordercontent

- Update

  - `Method` - PATCH
  - `Authorization required` - Bearer <token>
  - `Body` - order_id - product_id - qty - id
  - `Parameters` - NO
  - `Usage` - edit an product or record in one order
  - http://localhost:3000/ordercontent

- Delete

  - `Method` - DELETE
  - `Authorization required` - Bearer <token>
  - `Parameters` - orderID - productID
  - `Usage` - Delete an product or record in exciting order
  - http://localhost:3000/ordercontent/:orderID/:productID

### Data Schema

#### Users Table

| Data       | Data Types   | Constraints |
| ---------- | ------------ | ----------- |
| id         | SERIAL       | PRIMARY KEY |
| email      | VARCHAR(50)  | UNIQUE      |
| user_name  | VARCHAR(50)  | NOT NULL    |
| first_name | VARCHAR(50)  | NOT NULL    |
| last_name  | VARCHAR(50)  | NOT NULL    |
| password   | VARCHAR(255) | NOT NULL    |

#### Products Table

| Data        | Data Types   | Constraints |
| ----------- | ------------ | ----------- |
| id          | SERIAL       | PRIMARY KEY |
| name        | VARCHAR(100) | NOT NULL    |
| description | VARCHAR(255) |             |
| price       | NUMERIC(7,2) | NOT NULL    |
| category    | VARCHAR(100) | NOT NULL    |

#### Orders Table

| Data   | Data Types  | Constraints                   |
| ------ | ----------- | ----------------------------- |
| id     | SERIAL      | PRIMARY KEY                   |
| status | VARCHAR(50) |                               |
| userId | BIGINT      | REFERENCES users(id) NOT NULL |

#### Ordesr_products Table

| Data       | Data Types | Constraints                      |
| ---------- | ---------- | -------------------------------- |
| id         | SERIAL     | PRIMARY KEY                      |
| order_id   | bigint     | REFERENCES orders(id) NOT NULL   |
| product_id | bigint     | REFERENCES products(id) NOT NULL |
| Qty        | INT        |                                  |
