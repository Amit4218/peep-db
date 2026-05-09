from sqlmodel import select , Session

from config.database import Databases
from schemas.res_schema import SavedDatabases

async def get_databases(db: Session) -> list[SavedDatabases]:
    statement = select(Databases)
    data =  db.exec(statement).all()
    return [SavedDatabases.model_dump(db) for db in data]
