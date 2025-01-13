# File Sorter

File Sorter is an application that helps users efficiently organize and manage their files. With a user-friendly interface, you can upload, categorize, and search files with ease.

## Features

- **File Upload**: Allows uploading files in various formats.
- **Categorization**: Automatically assigns files to predefined categories.
- **Search Functionality**: Quickly find files by name or category.
- **User Management**: Supports user registration and authentication.

## Technology Stack

- **Frontend**: Built with [Next.js](https://nextjs.org/), a React framework for server-side rendering.
- **Styling**: Utilizes [Tailwind CSS](https://tailwindcss.com/) for responsive and modern design.
- **Backend**: Powered by [Prisma](https://www.prisma.io/), a TypeScript-based ORM for database access.
- **Database**: Supports relational databases like PostgreSQL or MySQL.

## Installation and Usage

1. **Clone the repository**:

   ```bash
   git clone https://github.com/lordLegal/file-sorter.git
   cd file-sorter
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure the database**:

   - Create a `.env` file based on `.env.example`.
   - Set the `DATABASE_URL` to your database connection string.

4. **Set up Prisma**:

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the development server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## License

This project is licensed under the [MIT License](LICENSE).
