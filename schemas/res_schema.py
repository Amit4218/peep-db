from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from schemas.databases import DatabasesSchema

class DbConnectionRes(BaseModel):
    status:int = 200
    message:str = ""
    tables: Optional[list] = None
    row_data: Optional[dict] = None
    
    
class SavedDatabases(BaseModel):
    name:str
    url:str
    
class GetSavedDbRes(BaseModel):
    status:int = 200
    message:str = "Saved Databases Fetched Successfully"
    data: List[DatabasesSchema]


class RecordsBaseModel(BaseModel):
    data: List[List[Any]]
    columns: List[str]

class QuickConnectRes(BaseModel):
    status:int = 200
    message:str = "Records Fetched Successfully"
    data: Dict[str, RecordsBaseModel]