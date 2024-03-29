const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const port = process.env.port || 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

// DATABASE
// User: tourismAdmin
// Pass: duuPAHuOkvEmnsgm
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uyqrh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

async function run() {
	try {
		await client.connect();
		const database = client.db("tourism");
		const servicesCollection = database.collection("services");

		// Get API
		app.get("/services", async (req, res) => {
			const cursor = servicesCollection.find({});
			const services = await cursor.toArray();
			res.send(services);
		});
	} finally {
		// await client.close()
	}
}
run().catch(console.dir);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Tourism app listening at port:${port}`);
});
