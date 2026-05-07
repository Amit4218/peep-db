from typing import Dict, List

from postgres import Postgres
from psycopg2 import sql
from fastapi.encoders import jsonable_encoder


DATABASE_URL = "postgres://postgres:password@localhost/ecommerce_db"


class DbQuerys:
    def __init__(self, db_url: str) -> None:
        self.db = Postgres(url=db_url)

    async def get_tables(self) -> List[str]:
        tables = self.db.all(
            "SELECT tablename FROM pg_tables WHERE schemaname = 'public'"
        )

        return tables

    async def get_table_records(
        self, tables: List[str], limit: int = 10, offset: int = 0
    )-> Dict[str, List]:
        """Returns the table rows with the data"""

        data = {}

        # loop the tables for the data
        for table in tables:
            query = sql.SQL("SELECT * FROM {} LIMIT %s OFFSET %s").format(
                sql.Identifier(table)
            )
            
            columns_query = """
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name = %s
            ORDER BY ordinal_position
            """

            columns = self.db.all(columns_query, (table,))

            table_rows =  self.db.all(query, (limit, offset))
            
            
            
            data[table] = {
                "data":jsonable_encoder(r for r in table_rows),
                "columns": [c for c in columns]
                }
            
        return data

