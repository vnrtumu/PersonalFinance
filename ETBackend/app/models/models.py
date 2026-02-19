from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum, Boolean, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base
import enum

class TransactionType(enum.Enum):
    INCOME = "income"
    EXPENSE = "expense"
    TRANSFER = "transfer"

class WalletType(enum.Enum):
    CASH = "cash"
    BANK = "bank"
    CREDIT_CARD = "credit_card"
    UPI = "upi"
    LOAN = "loan"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    currency = Column(String(10), default="INR")
    timezone = Column(String(50), default="UTC")
    avatar_url = Column(String(500), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    wallets = relationship("Wallet", back_populates="owner")
    categories = relationship("Category", back_populates="owner")
    transactions = relationship("Transaction", back_populates="owner")
    budgets = relationship("Budget", back_populates="owner")

class Wallet(Base):
    __tablename__ = "wallets"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String(255), nullable=False)
    type = Column(Enum(WalletType), default=WalletType.CASH)
    balance = Column(Float, default=0.0)
    last_4 = Column(String(4), nullable=True)
    total_limit = Column(Float, nullable=True)
    bill_date = Column(Integer, nullable=True) # Day of month
    due_date = Column(Integer, nullable=True) # Day of month
    additional_charges = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    owner = relationship("User", back_populates="wallets")

class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True) # Null for system categories
    name = Column(String(255), nullable=False)
    type = Column(Enum(TransactionType), nullable=False)
    icon = Column(String(50))
    color = Column(String(20))
    
    owner = relationship("User", back_populates="categories")
    transactions = relationship("Transaction", back_populates="category")
    budgets = relationship("Budget", back_populates="category")

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    type = Column(Enum(TransactionType), nullable=False)
    amount = Column(Float, nullable=False)
    note = Column(Text)
    date = Column(DateTime(timezone=True), server_default=func.now())
    receipt_url = Column(String(500))
    is_deleted = Column(Boolean, default=False)

    owner = relationship("User", back_populates="transactions")
    category = relationship("Category", back_populates="transactions")

class Budget(Base):
    __tablename__ = "budgets"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    monthly_limit = Column(Float, nullable=False)
    month = Column(Integer, nullable=False)
    year = Column(Integer, nullable=False)

    owner = relationship("User", back_populates="budgets")
    category = relationship("Category", back_populates="budgets")

class RecurringTransaction(Base):
    __tablename__ = "recurring_transactions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    frequency = Column(String(50), nullable=False) # daily, weekly, monthly, yearly
    next_run_date = Column(DateTime)
    template_transaction_id = Column(Integer, ForeignKey("transactions.id"))
