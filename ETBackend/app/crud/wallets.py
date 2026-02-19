from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.models import Wallet, User
from app.schemas.schemas import WalletCreate

async def get_wallets(db: AsyncSession, user_id: int):
    result = await db.execute(select(Wallet).filter(Wallet.user_id == user_id))
    return result.scalars().all()

async def create_wallet(db: AsyncSession, wallet: WalletCreate, user_id: int):
    db_wallet = Wallet(
        **wallet.dict(),
        user_id=user_id
    )
    db.add(db_wallet)
    await db.commit()
    await db.refresh(db_wallet)
    return db_wallet

async def get_wallet(db: AsyncSession, wallet_id: int, user_id: int):
    result = await db.execute(select(Wallet).filter(Wallet.id == wallet_id, Wallet.user_id == user_id))
    return result.scalars().first()

async def delete_wallet(db: AsyncSession, wallet_id: int, user_id: int):
    db_wallet = await get_wallet(db, wallet_id, user_id)
    if db_wallet:
        await db.delete(db_wallet)
        await db.commit()
        return True
    return False
