from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_
from app.models.models import Category
from app.schemas.schemas import CategoryCreate

async def get_categories(db: AsyncSession, user_id: int):
    # Get system categories (user_id is None) and user's custom categories
    result = await db.execute(select(Category).filter(or_(Category.user_id == user_id, Category.user_id == None)))
    return result.scalars().all()

async def create_category(db: AsyncSession, category: CategoryCreate, user_id: int):
    db_category = Category(
        **category.dict(),
        user_id=user_id
    )
    db.add(db_category)
    await db.commit()
    await db.refresh(db_category)
    return db_category

async def get_category(db: AsyncSession, category_id: int, user_id: int):
    result = await db.execute(select(Category).filter(Category.id == category_id, or_(Category.user_id == user_id, Category.user_id == None)))
    return result.scalars().first()

async def update_category(db: AsyncSession, category_id: int, category: CategoryCreate, user_id: int):
    result = await db.execute(select(Category).filter(Category.id == category_id, Category.user_id == user_id))
    db_category = result.scalars().first()
    if not db_category:
        return None
    
    for key, value in category.dict().items():
        setattr(db_category, key, value)
    
    await db.commit()
    await db.refresh(db_category)
    return db_category

async def delete_category(db: AsyncSession, category_id: int, user_id: int):
    result = await db.execute(select(Category).filter(Category.id == category_id, Category.user_id == user_id))
    db_category = result.scalars().first()
    if not db_category:
        return False
    
    await db.delete(db_category)
    await db.commit()
    return True
