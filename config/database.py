from sqlmodel import Field, SQLModel, create_engine, Session
from utils.env_provider import env


url = env.DATABASE_URL
engine = create_engine(url=url)


class Databases(SQLModel, table=True):
    name: str | None = Field(default=None, primary_key=True)
    connection_url: str
    user: str
    password:str
    port:int
    host:str
    
    def build_conn_url(self) -> None:
        self.connection_url = f"postgresql://{self.user}:{self.password}@{self.host}/{self.name}"


async def get_db():
    """yeilds an instance of the db and closes it afterwards."""
    try:
        with Session(engine) as db:
            yield db
    finally:
        db.close()

