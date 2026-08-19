const express = require("express");
const {
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
  UpdateItemCommand,
  DeleteItemCommand
} = require("@aws-sdk/client-dynamodb");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new DynamoDBClient({
  region: "eu-north-1"
});

const TABLE_NAME = "lab5-dynamodb-crud";

// Home page
app.get("/", (req, res) => {
  res.send(`
    <h1>Lab 5 Assignment 2 - DynamoDB CRUD</h1>
    <p>Redmine EC2 Instance: redmine-lab4</p>
    <p>DynamoDB Table: ${TABLE_NAME}</p>
    <hr>

    <h2>Create Item</h2>
    <form method="POST" action="/items">
      <input name="id" placeholder="ID" required><br><br>
      <input name="name" placeholder="Name" required><br><br>
      <input name="priority" type="number" placeholder="Priority" required><br><br>
      <label>
        Completed:
        <select name="completed">
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      </label><br><br>
      <input name="skills" placeholder="Skills (comma separated)" required><br><br>
      <input name="city" placeholder="City" required><br><br>
      <button type="submit">Create Item</button>
    </form>

    <hr>

    <h2>Read Items</h2>
    <a href="/items">View All Items</a>

    <hr>

    <h2>Update Item</h2>
    <form method="POST" action="/update">
      <input name="id" placeholder="ID" required><br><br>
      <input name="name" placeholder="New Name" required><br><br>
      <input name="priority" type="number" placeholder="New Priority" required><br><br>
      <button type="submit">Update Item</button>
    </form>

    <hr>

    <h2>Delete Item</h2>
    <form method="POST" action="/delete">
      <input name="id" placeholder="ID" required><br><br>
      <button type="submit">Delete Item</button>
    </form>
  `);
});

// CREATE
app.post("/items", async (req, res) => {
  try {
    const { id, name, priority, completed, skills, city } = req.body;

    const command = new PutItemCommand({
      TableName: TABLE_NAME,
      Item: {
        id: { S: id },
        name: { S: name },
        priority: { N: String(priority) },
        completed: { BOOL: completed === "true" },
        skills: {
          L: skills.split(",").map(skill => ({
            S: skill.trim()
          }))
        },
        details: {
          M: {
            city: { S: city },
            course: { S: "Cloud Computing" },
            lab: { N: "5" }
          }
        }
      }
    });

    await client.send(command);

    res.send(`
      <h2>CREATE Successful</h2>
      <p>Item <b>${id}</b> was created successfully.</p>
      <a href="/">Back</a>
    `);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating item");
  }
});

// READ
app.get("/items", async (req, res) => {
  try {
    const command = new ScanCommand({
      TableName: TABLE_NAME
    });

    const result = await client.send(command);

    let html = `
      <h1>READ - DynamoDB Items</h1>
      <table border="1" cellpadding="10">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Priority</th>
          <th>Completed</th>
        </tr>
    `;

    for (const item of result.Items || []) {
      html += `
        <tr>
          <td>${item.id?.S || ""}</td>
          <td>${item.name?.S || ""}</td>
          <td>${item.priority?.N || ""}</td>
          <td>${item.completed?.BOOL}</td>
        </tr>
      `;
    }

    html += `
      </table>
      <br>
      <a href="/">Back</a>
    `;

    res.send(html);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error reading items");
  }
});

// UPDATE
app.post("/update", async (req, res) => {
  try {
    const { id, name, priority } = req.body;

    const command = new UpdateItemCommand({
      TableName: TABLE_NAME,
      Key: {
        id: { S: id }
      },
      UpdateExpression: "SET #n = :name, priority = :priority",
      ExpressionAttributeNames: {
        "#n": "name"
      },
      ExpressionAttributeValues: {
        ":name": { S: name },
        ":priority": { N: String(priority) }
      }
    });

    await client.send(command);

    res.send(`
      <h2>UPDATE Successful</h2>
      <p>Item <b>${id}</b> was updated successfully.</p>
      <a href="/">Back</a>
    `);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating item");
  }
});

// DELETE
app.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;

    const command = new DeleteItemCommand({
      TableName: TABLE_NAME,
      Key: {
        id: { S: id }
      }
    });

    await client.send(command);

    res.send(`
      <h2>DELETE Successful</h2>
      <p>Item <b>${id}</b> was deleted successfully.</p>
      <a href="/">Back</a>
    `);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting item");
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`DynamoDB CRUD application running on port ${PORT}`);
});
