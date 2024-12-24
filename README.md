# A CRUD web application to manage tasks  .
Features :
- CRUD operations for tasks
- Swagger documentation for the backend
- Unit tests for core functionalities
- Pagination For efficient task retrieval.
- Docker setup for easy database configuration.

nextjs : shadcn / tailwindcss

Create an `.env` file in the `server` directory with the following content:

DB_HOST=localhost
DB_PORT=5050
DB_USERNAME=postgres
DB_PASSWORD=user
DB_NAME=tasks
BACKEND_PORT=4000


# how to run the project :
Open your terminal and clone the repository:
git clone https://github.com/ChYoussef02/test.git

-- Navigate to the project directory:
# Run the backend :
cd server
docker-compose up
npm i
npm start  (make sure the docker container of the server is running )

# Run the frontend :
cd client
npm i
npm run dev


# for unit tests :
cd server
npm test
