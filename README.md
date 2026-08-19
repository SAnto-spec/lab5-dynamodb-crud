# Cloud Computing Lab 5 – Assignment 2
## AWS DynamoDB Integration with Node.js Application on Amazon EC2

**Student:** Santo Xavier  
**Roll No.:** 10699  
**Class:** T.E. Computer Engineering – COMPS B  
**Subject:** Cloud Computing  
**Academic Year:** 2026–2027

---

## 1. Assignment Objective

The objective of this assignment is to deploy and integrate an Amazon DynamoDB NoSQL database with a Node.js application running on an Amazon EC2 instance.

The application demonstrates the four basic CRUD operations:

- Create
- Read
- Update
- Delete

The assignment also demonstrates AWS IAM-based access control and the use of multiple DynamoDB attribute types.

---

## 2. Architecture

```text
                    Internet / Client
                           |
                           | HTTP : 3001
                           v
                +------------------------+
                |      Amazon EC2        |
                |      redmine-lab4      |
                |                        |
                |   Node.js + Express    |
                |       Port 3001        |
                +-----------+------------+
                            |
                            | AWS SDK
                            | IAM Role
                            v
                +------------------------+
                |    Amazon DynamoDB     |
                |                        |
                |   lab5-dynamodb-crud   |
                |                        |
                |      NoSQL Database    |
                +------------------------+
```

The Node.js application is hosted on the `redmine-lab4` EC2 instance.

The application communicates with DynamoDB through the AWS SDK. AWS credentials are not hard-coded in the application. DynamoDB access is provided through an IAM role attached to the EC2 instance.

---

## 3. AWS DynamoDB Configuration

The DynamoDB table used for this assignment is:

`lab5-dynamodb-crud`

### Database Configuration

| Property | Value |
|---|---|
| Database | Amazon DynamoDB |
| Table Name | `lab5-dynamodb-crud` |
| Database Type | NoSQL |
| Application Server | Amazon EC2 |
| EC2 Instance | `redmine-lab4` |
| Application Port | `3001` |

The DynamoDB table was successfully accessed by the Node.js application running on the EC2 instance.

---

## 4. Application

A Node.js and Express-based CRUD application was developed and deployed on the EC2 instance.

### Application URL

http://13.63.171.224:3001

### Application Features

The application provides functionality for:

- Creating a new DynamoDB item
- Reading existing DynamoDB items
- Updating an existing item
- Deleting an existing item

### Technology Stack

- Amazon EC2
- Amazon DynamoDB
- Node.js
- Express.js
- AWS SDK for JavaScript
- AWS IAM
- Ubuntu Linux

---

## 5. DynamoDB Data Types

The assignment requires at least five DynamoDB attribute types.

The following DynamoDB types are demonstrated:

| Attribute | DynamoDB Type | Description |
|---|---|---|
| `id` | String (S) | Unique identifier of the item |
| `priority` | Number (N) | Priority value |
| `completed` | Boolean (BOOL) | Completion status |
| `skills` | List (L) | List of skills or values |
| `details` | Map (M) | Structured key-value information |

### Five Required Types

1. String (S)
2. Number (N)
3. Boolean (BOOL)
4. List (L)
5. Map (M)

### Sample DynamoDB Item

```json
{
  "id": "1",
  "name": "Test Task",
  "priority": 5,
  "completed": false,
  "skills": [
    "AWS",
    "DynamoDB",
    "Node.js"
  ],
  "details": {
    "city": "Mumbai",
    "course": "Cloud Computing"
  }
}
```

This sample demonstrates:

- `id` → String
- `name` → String
- `priority` → Number
- `completed` → Boolean
- `skills` → List
- `details` → Map

The DynamoDB console was used to verify the stored item and its attribute types.

---

## 6. CRUD Operations

The application implements all four mandatory CRUD operations.

### 6.1 Create

A new item can be created using the **Create Item** form.

The application accepts information such as:

- ID
- Name
- Priority
- Completed status
- Skills
- City/details

The submitted item is stored in the `lab5-dynamodb-crud` DynamoDB table.

### 6.2 Read

The **View All Items** option retrieves the items stored in DynamoDB and displays them through the application.

### 6.3 Update

An existing item can be updated by providing its ID.

The application allows information such as the name and priority of the selected item to be modified.

### 6.4 Delete

An existing item can be deleted by providing its ID.

The application removes the corresponding item from the DynamoDB table.

---

## 7. Security Configuration

Security was implemented using AWS IAM.

### EC2 IAM Role

The EC2 instance uses an IAM role to access DynamoDB.

The application obtains AWS permissions through the IAM role instead of storing AWS access keys or secret access keys inside the application source code.

### DynamoDB Permissions

The IAM role provides the permissions required by the application to perform the required DynamoDB operations.

### Security Model

```text
EC2 Instance
     |
     | IAM Role
     |
     v
AWS DynamoDB
```

No permanent AWS access keys are stored in the Node.js application.

---

## 8. EC2 Configuration

The Node.js application was deployed on:

`redmine-lab4`

The application listens on:

`Port 3001`

The EC2 Security Group was configured to allow the required application traffic.

Ubuntu UFW was also configured to allow TCP port `3001`:

```bash
sudo ufw allow 3001/tcp
```

The application was tested locally on the EC2 instance and externally using the EC2 public IP address.

### Local Test

```bash
curl http://localhost:3001
```

### External Test

```text
http://13.63.171.224:3001
```

The application returned HTTP status `200 OK` when accessed externally.

---

## 9. Evidence

The following evidence was collected for the assignment.

### 9.1 EC2 Application Evidence

A screenshot was captured showing the DynamoDB CRUD application running successfully on the EC2 instance.

### 9.2 Create Evidence

A screenshot was captured showing the Create Item operation.

### 9.3 Read Evidence

A screenshot was captured showing the stored DynamoDB items using the Read operation.

### 9.4 Update Evidence

A screenshot was captured showing an item being successfully updated.

### 9.5 Delete Evidence

A screenshot was captured showing an item being successfully deleted.

### 9.6 DynamoDB Evidence

A screenshot of the DynamoDB console provides evidence that the `lab5-dynamodb-crud` table exists and contains stored items.

### 9.7 Data Type Evidence

A DynamoDB console screenshot provides evidence of the required attribute types:

- String (S)
- Number (N)
- Boolean (BOOL)
- List (L)
- Map (M)

### 9.8 IAM Evidence

The IAM configuration provides evidence that DynamoDB access is provided through the EC2 IAM role.

---

## 10. RDS Security

Assignment 1 uses Amazon RDS.

The RDS security configuration follows the required security rule:

> RDS inbound access should be allowed only from the EC2 Security Group.

The RDS database is therefore not intended to be directly exposed to the public internet.

The EC2 instance acts as the application server that communicates with the RDS database.

---

## 11. GitHub Repository

The complete source code for Assignment 2 is available on GitHub.

**Repository:**

https://github.com/SAnto-spec/lab5-dynamodb-crud

The repository contains:

- Node.js application source code
- `package.json`
- `package-lock.json`
- `.gitignore`
- `README.md`

---

## 12. Running the Application

### Clone the Repository

```bash
git clone https://github.com/SAnto-spec/lab5-dynamodb-crud.git
```

### Navigate to the Project

```bash
cd lab5-dynamodb-crud
```

### Install Dependencies

```bash
npm install
```

### Start the Application

```bash
node server.js
```

The application runs on port `3001`.

Open the following URL from a client machine:

http://13.63.171.224:3001

---

## 13. Project Structure

```text
lab5-dynamodb-crud/
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## 14. Assignment Requirements Checklist

| Requirement | Status |
|---|---|
| DynamoDB deployed | Completed |
| DynamoDB table created | Completed |
| EC2 application running | Completed |
| EC2 to DynamoDB connectivity | Completed |
| Create operation | Completed |
| Read operation | Completed |
| Update operation | Completed |
| Delete operation | Completed |
| String (S) | Completed |
| Number (N) | Completed |
| Boolean (BOOL) | Completed |
| List (L) | Completed |
| Map (M) | Completed |
| EC2 IAM Role | Completed |
| DynamoDB IAM access | Completed |
| GitHub repository | Completed |
| EC2/API URL | Completed |
| CRUD evidence screenshots | Completed |
| DynamoDB console evidence | Completed |
| Data type evidence | Completed |
| PDF report | To be submitted |

---

## 15. Conclusion

This assignment successfully demonstrates the deployment and integration of an Amazon DynamoDB NoSQL database with a Node.js application hosted on Amazon EC2.

The application implements all four CRUD operations: Create, Read, Update, and Delete.

The DynamoDB implementation demonstrates five required attribute types: String, Number, Boolean, List, and Map.

Security is implemented using an IAM role attached to the EC2 instance, allowing the application to access DynamoDB without storing permanent AWS credentials in the source code.

The application is publicly accessible through the EC2 API URL, and the complete source code is maintained in the GitHub repository.

Overall, the assignment demonstrates practical implementation of AWS EC2, DynamoDB, IAM, Node.js, Express.js, NoSQL data modeling, CRUD operations, and cloud security.
