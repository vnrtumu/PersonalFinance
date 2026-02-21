from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional, List
from app.models.models import TransactionType, WalletType

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str
    currency: Optional[str] = "INR"
    timezone: Optional[str] = "UTC"
    avatar_url: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    currency: Optional[str] = None
    timezone: Optional[str] = None
    avatar_url: Optional[str] = None

class UserResponse(UserBase):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

# Token Schemas
class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Wallet Schemas
class WalletBase(BaseModel):
    name: str
    type: WalletType
    balance: float = 0.0
    last_4: Optional[str] = None
    total_limit: Optional[float] = None
    bill_date: Optional[int] = None
    due_date: Optional[int] = None
    additional_charges: Optional[float] = 0.0

class WalletCreate(WalletBase):
    pass

class WalletResponse(WalletBase):
    id: int
    user_id: int
    created_at: datetime
    class Config:
        orm_mode = True

# Category Schemas
class CategoryBase(BaseModel):
    name: str
    type: TransactionType
    icon: Optional[str] = None
    color: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: int
    user_id: Optional[int] = None
    class Config:
        orm_mode = True

# Transaction Schemas
class TransactionBase(BaseModel):
    category_id: int
    type: TransactionType
    amount: float
    note: Optional[str] = None
    date: Optional[datetime] = None
    receipt_url: Optional[str] = None

class TransactionCreate(TransactionBase):
    pass

class TransactionResponse(TransactionBase):
    id: int
    user_id: int
    date: datetime
    is_deleted: bool
    class Config:
        orm_mode = True

# Budget Schemas
class BudgetBase(BaseModel):
    category_id: int
    monthly_limit: float
    month: int
    year: int

class BudgetCreate(BudgetBase):
    pass

class BudgetResponse(BudgetBase):
    id: int
    user_id: int
    class Config:
        orm_mode = True
