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
async def get_summary(
    start_date: str = None,
    end_date: str = None,
    period: str = None,
    db: AsyncSession = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    # Calculate date filtering
    start_of_period = None
    if start_date:
        start_of_period = datetime.fromisoformat(start_date.replace('Z', '+00:00'))
    elif period != 'all':
        now = datetime.utcnow()
        start_of_period = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    
    end_of_period = None
    if end_date:
        end_of_period = datetime.fromisoformat(end_date.replace('Z', '+00:00'))
    
    # Simple summary for period: total income, total expense
    query = select(Transaction.type, func.sum(Transaction.amount)).filter(
        Transaction.user_id == current_user.id, 
        Transaction.is_deleted == False
    )
    
    if start_of_period:
        query = query.filter(Transaction.date >= start_of_period)
    if end_of_period:
        query = query.filter(Transaction.date <= end_of_period)
        
    result = await db.execute(query.group_by(Transaction.type))
    
    summary = {}
    for row in result.all():
        summary[row[0].value] = row[1]
        
    total_income = summary.get("income", 0.0)
    total_expenses = summary.get("expense", 0.0)
    
    return {
        "total_income": total_income,
        "total_expenses": total_expenses,
        "total_balance": total_income - total_expenses
    }

@router.get("/category-breakdown")
async def get_category_breakdown(
    start_date: str = None,
    end_date: str = None,
    period: str = None,
    db: AsyncSession = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    from app.models.models import Category
    
    start_of_period = None
    if start_date:
        start_of_period = datetime.fromisoformat(start_date.replace('Z', '+00:00'))
    elif period != 'all':
        now = datetime.utcnow()
        start_of_period = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    
    end_of_period = None
    if end_date:
        end_of_period = datetime.fromisoformat(end_date.replace('Z', '+00:00'))
    
    # Get expenses grouped by category
    query = select(Category.name, Category.icon, func.sum(Transaction.amount)).join(
        Transaction, Transaction.category_id == Category.id
    ).filter(
        Transaction.user_id == current_user.id,
        Transaction.is_deleted == False,
        Transaction.type == TransactionType.EXPENSE
    )
    
    if start_of_period:
        query = query.filter(Transaction.date >= start_of_period)
    if end_of_period:
        query = query.filter(Transaction.date <= end_of_period)
        
    result = await db.execute(
        query.group_by(Category.name, Category.icon)
        .order_by(func.sum(Transaction.amount).desc())
    )
    
    breakdown = []
    rows = result.all()
    total_spent = sum(row[2] for row in rows)
    
    for row in rows:
        percentage = (row[2] / total_spent * 100) if total_spent > 0 else 0
        breakdown.append({
            "name": row[0],
            "icon": row[1],
            "amount": row[2],
            "percentage": round(percentage, 1)
        })
        
    return {
        "total_spent": total_spent,
        "breakdown": breakdown
    }
