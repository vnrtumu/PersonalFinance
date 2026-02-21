from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.models import User
from app.schemas.schemas import UserCreate
from app.core.security import get_password_hash

async def get_user_by_email(db: AsyncSession, email: str):
    result = await db.execute(select(User).filter(User.email == email))
    return result.scalars().first()

async def create_user(db: AsyncSession, user: UserCreate):
    db_user = User(
        email=user.email,
        name=user.name,
        password_hash=get_password_hash(user.password),
        currency=user.currency,
        timezone=user.timezone
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def update_user(db: AsyncSession, db_user: User, user_update: dict):
    for key, value in user_update.items():
        if value is not None:
            setattr(db_user, key, value)
    
    await db.commit()
    await db.refresh(db_user)
    return db_user
