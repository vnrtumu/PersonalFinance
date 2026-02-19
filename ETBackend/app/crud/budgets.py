from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.models import Budget
from app.schemas.schemas import BudgetCreate

async def get_budgets(db: AsyncSession, user_id: int):
    result = await db.execute(select(Budget).filter(Budget.user_id == user_id))
    return result.scalars().all()

async def create_budget(db: AsyncSession, budget: BudgetCreate, user_id: int):
    db_budget = Budget(
        **budget.dict(),
        user_id=user_id
    )
    db.add(db_budget)
    await db.commit()
    await db.refresh(db_budget)
    return db_budget

async def get_budget(db: AsyncSession, budget_id: int, user_id: int):
    result = await db.execute(select(Budget).filter(Budget.id == budget_id, Budget.user_id == user_id))
    return result.scalars().first()
