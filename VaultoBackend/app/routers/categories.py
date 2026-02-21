from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.database import get_db
from app.schemas.schemas import CategoryCreate, CategoryResponse
from app.crud import categories as crud_categories
from app.routers.auth import get_current_user
from app.models.models import User

router = APIRouter()

@router.get("/", response_model=List[CategoryResponse])
async def get_categories(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    return await crud_categories.get_categories(db, user_id=current_user.id)

@router.post("/", response_model=CategoryResponse)
async def create_category(category: CategoryCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    return await crud_categories.create_category(db, category=category, user_id=current_user.id)

@router.put("/{category_id}", response_model=CategoryResponse)
async def update_category(category_id: int, category: CategoryCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_category = await crud_categories.update_category(db, category_id=category_id, category=category, user_id=current_user.id)
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found or not authorized to edit")
    return db_category

@router.delete("/{category_id}")
async def delete_category(category_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    success = await crud_categories.delete_category(db, category_id=category_id, user_id=current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Category not found or not authorized to delete")
    return {"message": "Category deleted successfully"}
