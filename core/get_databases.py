from sqlmodel import select , Session

from config.database import Databases
from schemas.res_schema import DatabasesSchema

async def get_databases(db: Session) -> list[DatabasesSchema]:
    statement = select(Databases)
    data =  db.exec(statement).all()
    return [DatabasesSchema.model_dump(db) for db in data]
