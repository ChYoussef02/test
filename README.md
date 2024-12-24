# A CRUD web application to manage tasks  .
Features :
- CRUD operations for tasks
- Swagger documentation for the backend
- Unit tests for core functionalities
- Pagination For efficient task retrieval.
- Docker setup for easy database configuration.

nextjs : shadcn / tailwindcss

Create an `.env` file in the `server` directory with the following content:

DB_HOST=localhost <br>
DB_PORT=5050 <br>
DB_USERNAME=postgres <br>
DB_PASSWORD=user <br>
DB_NAME=tasks <br>
BACKEND_PORT=4000


# how to run the project :
Open your terminal and clone the repository: <br>
git clone https://github.com/ChYoussef02/test.git

# Navigate to the project directory:
-- Run the backend : <br>
cd server <br>
docker-compose up <br>
npm i <br>
npm start  (make sure the docker container of the server is running ) <br>

-- Run the frontend : <br>
cd client <br>
npm i <br>
npm run dev <br>


# for unit tests :
cd server <br>
npm test
