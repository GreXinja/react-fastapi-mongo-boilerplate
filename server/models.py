# server/models.py
from pydantic import BaseModel, EmailStr, Field

# This model validates the data sent during SIGNUP
class UserSchema(BaseModel):
    fullname: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "fullname": "John Doe",
                "email": "john@example.com",
                "password": "securepassword123"
            }
        }

# This model validates the data sent during LOGIN
class UserLoginSchema(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)