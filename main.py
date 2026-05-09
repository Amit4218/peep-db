from fastapi import FastAPI, Depends
from sqlmodel import Session
from fastapi.middleware.cors import CORSMiddleware

# Local imports
from core.connection import DbQuerys
from config.database import Databases, SQLModel, engine, get_db
from core.get_databases import get_databases
from schemas.res_schema import GetSavedDbRes, QuickConnectRes
from schemas.databases import DatabasesSchema, QuickConnect


app = FastAPI()
origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create tables if they don't exist
SQLModel.metadata.create_all(engine, checkfirst=True)  


@app.get("/root")
def root() -> dict[str, str]:
    return {"status": "App running"}


@app.get("/get-saved-dbs", response_model=GetSavedDbRes)
async def home(db: Session = Depends(get_db)):
    get_databases_list = await get_databases(db=db)
    return GetSavedDbRes(data=get_databases_list)


@app.post("/quick/connect", response_model=QuickConnectRes)
async def connect(url: QuickConnect, db: Session = Depends(get_db)):
    db = DbQuerys(db_url=url.connection_url)
    tables = await db.get_tables()
    row_data = await  db.get_table_records(tables=tables)
    return QuickConnectRes(data=row_data, tables=tables)



@app.post("/new/connect", response_model=QuickConnectRes)
async def new_connect(data:DatabasesSchema, db: Session = Depends(get_db)):
    
    # save the new database connection to the database
    new_db = Databases(**data.model_dump()).build_conn_url()
    
    db.add(new_db)
    db.commit()
    db.refresh(new_db)
    
    # fetch the records
    q_db = DbQuerys(db_url=new_db.connection_url)
    tables = await q_db.get_tables()
    row_data = await q_db.get_table_records(tables=tables)
    return QuickConnectRes(data=row_data, tables=tables)

