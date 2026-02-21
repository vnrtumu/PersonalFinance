from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.models import Transaction, Wallet, TransactionType
from app.schemas.schemas import TransactionCreate
from fastapi import HTTPException

async def get_transactions(db: AsyncSession, user_id: int):
    result = await db.execute(select(Transaction).filter(Transaction.user_id == user_id, Transaction.is_deleted == False))
    return result.scalars().all()

async def create_transaction(db: AsyncSession, transaction: TransactionCreate, user_id: int):
    db_transaction = Transaction(
        **transaction.dict(),
        user_id=user_id
    )
    db.add(db_transaction)
    await db.commit()
    await db.refresh(db_transaction)
    return db_transaction

async def update_transaction(db: AsyncSession, transaction_id: int, transaction: TransactionCreate, user_id: int):
    result = await db.execute(select(Transaction).filter(Transaction.id == transaction_id, Transaction.user_id == user_id))
    db_transaction = result.scalars().first()
    if not db_transaction:
        return None
    
    for key, value in transaction.dict().items():
        setattr(db_transaction, key, value)
    
    await db.commit()
    await db.refresh(db_transaction)
    return db_transaction

async def delete_transaction(db: AsyncSession, transaction_id: int, user_id: int):
    result = await db.execute(select(Transaction).filter(Transaction.id == transaction_id, Transaction.user_id == user_id))
    db_transaction = result.scalars().first()
    if db_transaction:
        db_transaction.is_deleted = True
        await db.commit()
        return True
    return False
