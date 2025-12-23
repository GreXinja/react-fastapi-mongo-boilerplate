from uuid import uuid4 # To generate random reset tokens
from fastapi import Depends
from auth import get_current_user # Import our Bouncer
from models import UserSchema, UserLoginSchema  # <--- Add UserLoginSchema here
from auth import get_password_hash, verify_password, create_access_token # <--- Add verify & create_token
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from database import user_collection  # Import our DB collection
from models import UserSchema         # Import our User model
from auth import get_password_hash    # Import our hashing tool

# Simulated "Database" for reset tokens
# Structure: { "reset_token_string": "user_email@example.com" }
reset_tokens = {}

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend is running"}

# --- SIGNUP ENDPOINT ---
@app.post("/signup")
async def create_user(user: UserSchema = Body(...)):
    # 1. Check if user already exists
    existing_user = await user_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # 2. Hash the password (Security)
    hashed_password = get_password_hash(user.password)

    # 3. Create user dictionary
    new_user = {
        "fullname": user.fullname,
        "email": user.email,
        "password": hashed_password
    }

    # 4. Save to MongoDB
    result = await user_collection.insert_one(new_user)
    
    return {"message": "User created successfully", "id": str(result.inserted_id)}

# --- LOGIN ENDPOINT ---
@app.post("/login")
async def login(user: UserLoginSchema = Body(...)):
    # 1. Find the user by email
    found_user = await user_collection.find_one({"email": user.email})
    if not found_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # 2. Check if password matches
    if not verify_password(user.password, found_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # 3. Generate the Token
    access_token = create_access_token(data={"email": user.email})

    return {
        "message": "Login successful",
        "access_token": access_token, 
        "token_type": "bearer"
    }
# --- PROTECTED ROUTE ---
# The 'Depends(get_current_user)' part is the lock. 
# It runs the Bouncer logic before letting the user in.
@app.get("/users/me")
async def read_users_me(current_user_email: str = Depends(get_current_user)):
    return {
        "message": "This is a protected endpoint!",
        "your_email": current_user_email,
        "secret_data": "Only logged in users can see this."
    }
# --- FORGOT PASSWORD ENDPOINT ---
@app.post("/forgot-password")
async def forgot_password(email: str = Body(..., embed=True)):
    # 1. Check if user exists
    user = await user_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # 2. Generate a random reset token
    token = str(uuid4())
    
    # 3. Save it in our temporary memory (valid for this session)
    reset_tokens[token] = email

    # 4. SIMULATE sending email (Look at your terminal!)
    print(f"\n========================================")
    print(f"📧 EMAIL SIMULATION for {email}")
    print(f"🔗 Click here to reset: http://localhost:5173/reset-password?token={token}")
    print(f"========================================\n")

    return {"message": "Password reset link sent to your email."}


# --- RESET PASSWORD ENDPOINT ---
@app.post("/reset-password")
async def reset_password(token: str = Body(...), new_password: str = Body(...)):
    # 1. Verify token exists
    email = reset_tokens.get(token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    # 2. Hash new password
    hashed_password = get_password_hash(new_password)

    # 3. Update in MongoDB
    await user_collection.update_one(
        {"email": email},
        {"$set": {"password": hashed_password}}
    )

    # 4. Remove token (so it can't be used twice)
    del reset_tokens[token]

    return {"message": "Password updated successfully"}