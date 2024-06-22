## Car Wash Booking System

The Car Wash Booking System is a web application that allows users to book car wash services. The system manages user accounts, services, slots, and bookings. Administrators can create, update, and delete services and slots, while users can book available slots for the services they need.

### Technology Stack 

- **Backend Framework:** Node.js with Express
- **Database:** MongoDB (using Mongoose)
- **Authentication:** bcrypt, jsonwebtoken
- **Configuration Management:** dotenv
- **CORS Handling:** cors
- **Data Validation:** zod
- **HTTP Status Codes:** http-status

### Project Setup

1. **Clone the Repository**
   ```
   git clone https://github.com/monishatBaishnab/car-washing-system.git
   cd car-washing-system
   ```

2. **Install Dependencies**
   ```
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following environment variables:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   DEFAULT_PASS=<default_password_for_users>
   BCRYPT_SALT_ROUND=12
   ```

   Replace `<your_mongodb_connection_string>` with your MongoDB connection string, `<your_jwt_secret>` with your JWT secret key, and `<default_password_for_users>` with a default password for users during development/testing.

4. **Compile TypeScript**
   ```
   npm run start:tsc
   ```
   This command compiles TypeScript files (`*.ts`) into JavaScript files (`*.js`) in the `./dist` directory.

### Running the Application

#### Development Mode

In development mode, you typically use `nodemon` to automatically restart the server when files change, and `ts-node` to directly execute TypeScript files.

1. **Start TypeScript Compiler in Watch Mode**
   ```
   npm run start:tsc
   ```

2. **Start Server with Nodemon**
   ```
   npm run start:dev
   ```
   This command uses `nodemon` to watch for changes in the compiled JavaScript files (`./dist/server.js`) and restarts the server automatically.

3. **Linting and Formatting (Optional)**
   - Check for linting errors:
     ```
     npm run start:eslint
     ```
   - Automatically fix fixable linting errors:
     ```
     npm run start:eslint:fix
     ```
   - Format source code using Prettier:
     ```
     npm run start:prettier
     ```

#### Production Mode

For production deployment, you typically compile TypeScript files and run the server using `node`.

1. **Build TypeScript**
   ```
   npm run start:tsc
   ```

2. **Start Server**
   ```
   npm start
   ```
   This command executes the compiled JavaScript file (`./dist/server.js`) using `node`.

### Additional Notes

- Ensure your MongoDB instance is running and accessible with the provided connection string (`MONGODB_URI`).
- Adjust the port number (`PORT`) and other environment variables (`JWT_SECRET`, `DEFAULT_PASS`, etc.) based on your deployment requirements.
- Regularly check logs and monitor application behavior during development and deployment phases.

## Project Features

### Unique Features of the Car Wash Booking System

1. **User Role Management**:
   The system supports different user roles, including administrators and regular users, allowing for distinct permissions and functionalities.

2. **Service Management**:
   Administrators can create, update, and delete various car wash services, each with specific details like price and duration.

3. **Slot Booking System**:
   Users can book time slots for car wash services, with the system managing availability and preventing double bookings.

4. **Vehicle Information Tracking**:
   The system allows users to enter detailed vehicle information, including type, brand, model, manufacturing year, and registration plate.

5. **Secure Authentication**:
   The application includes secure user authentication and authorization mechanisms, ensuring that user data and booking information are protected.

## API Endpoints

### User Routes

1. **User Sign Up**:

   - **Route**: `https://car-washing-system-ten.vercel.app/api/auth/signup` (**POST**)

2. **User Login**:
   - **Route**: `https://car-washing-system-ten.vercel.app/api/auth/login` (**POST**)

### Service Routes

3. **Create Service** (Only Accessible by Admin):

   - **Route**: `https://car-washing-system-ten.vercel.app/api/services` (**POST**)

4. **Get a Service**:

   - **Route**: `https://car-washing-system-ten.vercel.app/api/services/:id` (**GET**)

5. **Get All Services**:
   - **Route**: `https://car-washing-system-ten.vercel.app/api/services` (**GET**)

5. **Update Service** (Only Accessible by Admin):
   - **Route**: `https://car-washing-system-ten.vercel.app/api/services/:id` (**PUT**)

5. **Delete Service** (Only Accessible by Admin):
   - **Route**: `https://car-washing-system-ten.vercel.app/api/services` (**DELETE**)

### Slot Routes

6. **Create Slot** (Only Accessible by Admin):

   - **Route**: `https://car-washing-system-ten.vercel.app/api/slots` (**POST**)

7. **Get All Slots**:
   - **Route**: `https://car-washing-system-ten.vercel.app/api/slots` (**GET**)

### Booking Routes

8. **Create Booking** (Only Accessible by User):

   - **Route**: `https://car-washing-system-ten.vercel.app/api/bookings` (**POST**)

9. **Get All Bookings** (Only Accessible by Admin):
   - **Route**: `https://car-washing-system-ten.vercel.app/api/bookings` (**GET**)

### User Booking Routes

8. **Get User Booking** (Only Accessible by User):

   - **Route**: `https://car-washing-system-ten.vercel.app/api/my-bookings` (**GET**)


As a developer crafting this Car Wash Booking System for my portfolio, I aim to showcase my skills in TypeScript and backend development. This project demonstrates my ability to build scalable and secure applications, managing services and user interactions effectively. Thanks for your time.
