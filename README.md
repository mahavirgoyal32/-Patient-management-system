# **Patient Management System**  

The **Patient Management System** is designed for orthodontists to efficiently manage patient records, appointments, and consultations. This system facilitates seamless interactions between **patients, doctors, and administrative staff**, ensuring secure and organized handling of sensitive medical information.  

---

## **🚀 Setup Instructions**  

### **1️⃣ Environment Configuration**  
Create a `.env` file in the project root and add the following configuration:  

```env
ENV="local"
DB_MYSQL_USER="root"
DB_MYSQL_PASS=""
DB_MYSQL_HOST="127.0.0.1"
DB_MYSQL_PORT="3306"
DB_NAME="patient_management"
JWT_SECRET="myJWTSecretKey"
TOKEN_EXPIRES_IN="2h"
```

### **2️⃣ Database Setup**  
- Create a **database schema** with the name specified in `DB_NAME`.  
- Run the migration command:  
  ```sh
  npm run migrate-up
  ```
- Seed the database with initial data:  
  ```sh
  npm run seed-up
  ```
- Start the application:  
  ```sh
  npm run start
  ```

Once the app is running, you can use the following API routes to interact with the system.

---

## **📌 API Endpoints & Role-Based Access**  

### **🔹 Authentication & User Management**  
| **Endpoint** | **Method** | **Description** | **Access** |
|-------------|-----------|-----------------|------------|
| `/register` | `POST` | Patient registration (sign-up) | Patients |
| `/login` | `POST` | Login for all users (returns JWT token) | All users |
| `/create/user/:type` | `POST` | Create a user (doctor or patient) | Doctors, Admins |
| `/update/details` | `PUT` | Update personal details | All users |
| `/update/patient/details` | `PUT` | Update patient details (medical history, etc.) | Doctors, Admins |

### **🔹 Appointment Management**  
| **Endpoint** | **Method** | **Description** | **Access** |
|-------------|-----------|-----------------|------------|
| `/create/appointment` | `POST` | Book an appointment | Patients |
| `/update/appointment` | `PUT` | Update an appointment | Doctors |
| `/get/appointments` | `GET` | Retrieve appointments (filtered by role) | Patients, Doctors, Admins |

### **🔹 User Management**  
| **Endpoint** | **Method** | **Description** | **Access** |
|-------------|-----------|-----------------|------------|
| `/get/users` | `GET` | Retrieve all doctors and patients | Doctors, Admins |

---

## **📌 Usage Notes**  
- **🔑 JWT Authentication**: After logging in, you must include the generated JWT token in the request headers for authentication.  
- **🛡️ Role-Based Access Control**: Certain endpoints are restricted based on user roles (Patients, Doctors, Admins).  

With these steps, your **Patient Management System** is ready to use! 🚀  
```