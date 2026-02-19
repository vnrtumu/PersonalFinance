from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
import os
import uuid
import shutil
from app.db.database import get_db
from app.schemas.schemas import TransactionCreate, TransactionResponse
from app.crud import transactions as crud_transactions
from app.routers.auth import get_current_user
from app.models.models import User

router = APIRouter()

@router.get("/", response_model=List[TransactionResponse])
async def get_transactions(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    return await crud_transactions.get_transactions(db, user_id=current_user.id)

@router.post("/", response_model=TransactionResponse)
async def create_transaction(transaction: TransactionCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    return await crud_transactions.create_transaction(db, transaction=transaction, user_id=current_user.id)

@router.put("/{transaction_id}", response_model=TransactionResponse)
async def update_transaction(transaction_id: int, transaction: TransactionCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_transaction = await crud_transactions.update_transaction(db, transaction_id=transaction_id, transaction=transaction, user_id=current_user.id)
    if not db_transaction:
        raise HTTPException(status_code=404, detail="Transaction not found or not authorized to edit")
    return db_transaction

@router.post("/upload")
async def upload_receipt(file: UploadFile = File(...), current_user: User = Depends(get_current_user)):
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join("uploads", unique_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    return {"receipt_url": f"/uploads/{unique_filename}"}

@router.delete("/{transaction_id}")
async def delete_transaction(transaction_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    success = await crud_transactions.delete_transaction(db, transaction_id=transaction_id, user_id=current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return {"detail": "Transaction deleted"}
