from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.database import get_db
from app.schemas.schemas import WalletCreate, WalletResponse
from app.crud import wallets as crud_wallets
from app.routers.auth import get_current_user
from app.models.models import User

router = APIRouter()

@router.get("/", response_model=List[WalletResponse])
async def get_wallets(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    return await crud_wallets.get_wallets(db, user_id=current_user.id)

@router.post("/", response_model=WalletResponse)
async def create_wallet(wallet: WalletCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    return await crud_wallets.create_wallet(db, wallet=wallet, user_id=current_user.id)

@router.get("/{wallet_id}", response_model=WalletResponse)
async def get_wallet(wallet_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_wallet = await crud_wallets.get_wallet(db, wallet_id=wallet_id, user_id=current_user.id)
    if db_wallet is None:
        raise HTTPException(status_code=404, detail="Wallet not found")
    return db_wallet

@router.delete("/{wallet_id}")
async def delete_wallet(wallet_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    success = await crud_wallets.delete_wallet(db, wallet_id=wallet_id, user_id=current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Wallet not found")
    return {"detail": "Wallet deleted"}
