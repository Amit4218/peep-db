from pydantic import BaseModel

class DatabasesSchema(BaseModel):
    name: str
    user: str
    password:str
    port:int
    host:str
    
class QuickConnect(BaseModel):
    connection_url: str