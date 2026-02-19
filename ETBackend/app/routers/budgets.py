from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.database import get_db
from app.schemas.schemas import BudgetCreate, BudgetResponse
from app.crud import budgets as crud_budgets
from app.routers.auth import get_current_user
from app.models.models import User

router = APIRouter()

@router.get("/", response_model=List[BudgetResponse])
async def get_budgets(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    return await crud_budgets.get_budgets(db, user_id=current_user.id)

@router.post("/", response_model=BudgetResponse)
async def create_budget(budget: BudgetCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    return await crud_budgets.create_budget(db, budget=budget, user_id=current_user.id)
