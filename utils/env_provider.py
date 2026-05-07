from dotenv import load_dotenv
from pydantic import BaseModel
import os

load_dotenv()


class Env(BaseModel):
    DATABASE_URL: str
    
env: Env = Env(
    DATABASE_URL=str(os.getenv("DATABASE_URL"))
)

