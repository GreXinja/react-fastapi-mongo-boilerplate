# server/database.py
import motor.motor_asyncio

# 1. Connection String (Localhost)
MONGO_DETAILS = "mongodb://localhost:27017"

# 2. Create the Client
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

# 3. Point to your specific database
database = client.boilerplate_db

# 4. Point to the users collection
user_collection = database.get_collection("users")

# Helper function to parse MongoDB data (convert ObjectIDs to strings)
def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "password": user["password"],  # In real apps, never return the password!
    }