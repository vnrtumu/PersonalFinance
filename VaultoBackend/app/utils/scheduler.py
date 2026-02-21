from apscheduler.schedulers.asyncio import AsyncIOScheduler
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.models import RecurringTransaction, Transaction, Wallet, TransactionType
from app.db.database import AsyncSessionLocal
from datetime import datetime, timedelta

scheduler = AsyncIOScheduler()

async def process_recurring_transactions():
    async with AsyncSessionLocal() as db:
        now = datetime.utcnow()
        result = await db.execute(
            select(RecurringTransaction).filter(RecurringTransaction.next_run_date <= now)
        )
        recurring_tasks = result.scalars().all()
        
        for task in recurring_tasks:
            # Get template transaction
            result = await db.execute(select(Transaction).filter(Transaction.id == task.template_transaction_id))
            template = result.scalars().first()
            
            if template:
                # Create new transaction
                new_tx = Transaction(
                    user_id=template.user_id,
                    category_id=template.category_id,
                    type=template.type,
                    amount=template.amount,
                    note=f"Recurring: {template.note}",
                    date=now
                )
                db.add(new_tx)
                
                # Update next run date
                if task.frequency == "daily":
                    task.next_run_date = now + timedelta(days=1)
                elif task.frequency == "weekly":
                    task.next_run_date = now + timedelta(weeks=1)
                elif task.frequency == "monthly":
                    # Simple monthly increment
                    task.next_run_date = now + timedelta(days=30)
                elif task.frequency == "yearly":
                    task.next_run_date = now + timedelta(days=365)
                    
        await db.commit()

def start_scheduler():
    scheduler.add_job(process_recurring_transactions, 'interval', hours=24)
    scheduler.start()
