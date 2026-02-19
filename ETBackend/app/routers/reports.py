from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from app.db.database import get_db
from app.models.models import Transaction, TransactionType, User
from app.routers.auth import get_current_user
from datetime import datetime

router = APIRouter()

@router.get("/summary")
async def get_summary(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Simple summary: total income, total expense
    result = await db.execute(
        select(Transaction.type, func.sum(Transaction.amount))
        .filter(Transaction.user_id == current_user.id, Transaction.is_deleted == False)
        .group_by(Transaction.type)
    )
    summary = {row[0].value: row[1] for row in result.all()}
    return {
        "income": summary.get("income", 0.0),
        "expense": summary.get("expense", 0.0),
        "balance": summary.get("income", 0.0) - summary.get("expense", 0.0)
    }
