# Book Store System - Efficiently Manage Your Finances


# Live
Running At- bookstorefronted.vercel.app

### Sellcount Logic
A sellcount field is provided in Book schema itself and as any book sell, it update its sellcount field with incremental value of 1 at the points of book sell.

### Sending email notifications.
 For sending email we have used gmail smpts. As any book sale we send email to related Author providing information like- who buy book, book price, purchase date.

 And, Author can request for Sale stats email from Dashboard. Email provide information Monthly, yearly and Total sale information





## Key Features


### User Authentication and Authorization
- **Sign Up:** Users can create new accounts.
- **Login:** Registered users can log in to access their accounts.
- **Logout:** Users can log out securely.
- **Authentication:** Secure authentication mechanism to protect user accounts.
- **Authorization:** Role-based access control for different user types (e.g., admin, retail user).


### Book Management
- **Create Book:** Admin users can add new books to the inventory.
- **Update Book:** Admin users can edit book details such as title, author, price, etc.
- **Delete Book:** Admin users can remove books from the inventory.

### Sales Tracking
- **Purchase History:** Users can view their purchase history.
- **Order Management:** Author users can manage orders and track sales.



1. Clone the repository:

   ```bash
   git clone https://github.com/kumarjaikishan/frontend.git
