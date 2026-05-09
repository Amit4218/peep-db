import { Button } from "@/components/ui/button";
import { ChartNetworkIcon, LucideEye, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import NewDatabase from "./components/custom/NewDatabase";
import Loading from "./components/custom/Loading";

import getDatabases from "./api/getDatabases";
import getDatabasesTables from "./api/getDatabaseTables";
import Table from "./components/custom/Table";

interface Databases {
  name: string;
  connection_url: string;
}

export interface TableStructure {
  columns: string[];
  data: unknown[][];
}

export interface TableData {
  [tableName: string]: TableStructure;
}

export default function App() {
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null);

  // controls sidebar view
  const [show, setShow] = useState<"databases" | "tables">("databases");

  const [databaseTables, setDatabaseTables] = useState<string[]>([]);
  const [addNewDatabase, setAddNewDatabase] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [tableData, setTablesData] = useState<TableData | null>(null);

  // showing the table
  const [tableColumns, setTableColumns] = useState([]);
  const [tableRows, setTableRows] = useState([]);

  const [databases, setDatabases] = useState<Databases[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // select database + fetch tables
  const handelSelectDatabase = async (name: string, url: string) => {
    try {
      setIsLoading(true);

      const data = await getDatabasesTables(url);

      setDatabaseTables(data?.tables || []);
      setSelectedTable(data?.tables[0]);
      setTablesData(data?.data);
      setSelectedDatabase(name);

      // switch sidebar to tables view
      setShow("tables");

      console.log(data?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!tableData) return;

    const getColumnsAndRows = () => {
      for (const t in tableData) {
        if (t == selectedTable) {
          setTableColumns(tableData[t].columns);
          setTableRows(tableData[t].data);
        }
      }
    };

    getColumnsAndRows();
  }, [tableData, selectedTable]);

  // fetch saved databases
  useEffect(() => {
    const fetchDatabases = async () => {
      try {
        setIsLoading(true);

        const data = await getDatabases();

        setDatabases(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDatabases();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-secondary p-4 dark:bg-primary dark:text-white">
        {/* Header */}
        <div className="flex items-center justify-center text-primary-foreground gap-3">
          <LucideEye size={25} />
          <h4 className="text-2xl font-bold">Peep-Db</h4>
        </div>

        <hr className="my-2" />

        {/* Actions */}
        <div className="mt-4 space-y-2">
          <Button
            className="w-full"
            variant="default"
            onClick={() => setAddNewDatabase((prev) => !prev)}
          >
            <Plus size={18} />
            <span className="text-sm">New Database</span>
          </Button>

          {/* Toggle databases/tables */}
          <Button
            onClick={() =>
              setShow((prev) => (prev === "databases" ? "tables" : "databases"))
            }
            variant="default"
            className="w-full"
          >
            <ChartNetworkIcon size={18} />
            {show === "databases" ? "Show Tables" : "Show Databases"}
          </Button>
        </div>

        {/* DATABASES */}
        {show === "databases" && (
          <div className="mt-4">
            <hr className="my-2" />

            <h5 className="text-sm text-center font-medium text-primary-foreground/70 mb-2">
              Saved Databases
            </h5>

            {databases.length > 0 ? (
              <div className="flex flex-col mt-3 gap-2 overflow-y-auto max-h-90 pr-1">
                {databases.map((db) => (
                  <Button
                    key={db.name}
                    onClick={() =>
                      handelSelectDatabase(db.name, db.connection_url)
                    }
                    variant="default"
                    size="sm"
                    className="justify-start rounded-sm font-semibold bg-primary/50 hover:bg-primary/70"
                  >
                    {db.name}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-xs my-4 font-semibold text-center text-white">
                No Saved Databases Found!
              </div>
            )}
          </div>
        )}

        {/* TABLES */}
        {show === "tables" && (
          <div className="mt-4">
            <hr className="my-2" />

            <h5 className="text-sm font-medium text-primary-foreground/70 mb-2">
              {selectedDatabase
                ? `${selectedDatabase} Tables`
                : "Database Tables"}
            </h5>

            {databaseTables.length > 0 ? (
              <div className="flex flex-col gap-2 overflow-y-auto max-h-90 pr-1">
                {databaseTables.map((table, idx) => (
                  <Button
                    key={idx}
                    variant="default"
                    size="sm"
                    className={`justify-start rounded-sm font-semibold ${
                      table == selectedTable
                        ? "bg-primary/90"
                        : "hover:bg-primary/90 bg-primary/40"
                    }`}
                    onClick={() => setSelectedTable(table)}
                  >
                    {table}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-xs my-4 font-semibold text-center text-white">
                No Tables Found!
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add New Database Modal */}
      {addNewDatabase && (
        <div className="min-h-screen w-full bg-muted/60 flex items-center justify-center p-6 absolute z-60">
          <div
            onClick={() => setAddNewDatabase(false)}
            className="absolute top-10 right-40"
          >
            <Button className="sticky w-25">Close</Button>
          </div>

          <NewDatabase />
        </div>
      )}

      {/* Loader */}
      {isLoading && (
        <div className="flex-1">
          <div className="min-h-screen flex justify-center items-center">
            <Loading />
          </div>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && (
        <>
          {!selectedDatabase && (
            <div className="flex-1 flex justify-center items-center text-center">
              <h3 className="text-md font-semibold ">
                {!selectedDatabase && "Please Select a Database!"}
              </h3>
            </div>
          )}

          {selectedDatabase && (
            <div className="w-full">
              <Table columns={tableColumns} rows={tableRows} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
