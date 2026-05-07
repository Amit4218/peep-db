import { Button } from "@/components/ui/button";
import { ChartNetworkIcon, LucideEye, Plus, Sun } from "lucide-react";
import { DATABASES, TABLES } from "@/data/fake";
import { useState } from "react";
import NewDatabase from "./components/custom/NewDatabase";

export default function App() {
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null);
  const [databaseTables, setDatabaseTables] = useState<null | string[]>(null);
  const [addNewDatabase, setAddNewDatabase] = useState(false);

  const handelSelectDatabase = async (name: string, url: string) => {
    // send data fetch request for selected db
    alert(`fetchin ${url}`);
    setDatabaseTables(TABLES);

    // set the selected Db
    setSelectedDatabase(name);
  };

  return (
    <div className="flex">
      {/* SideBar */}
      <div className="w-64 h-screen bg-secondary p-4">
        {/* sidebar Header */}
        <div className="flex items-center justify-center text-primary-foreground gap-3">
          <LucideEye size={25} />
          <h4 className="text-2xl font-bold">Peep-Db</h4>
        </div>
        <hr className="my-2" />

        {/* Actions */}
        <div className="mt-4 space-y-2">
          <div className="flex gap-1">
            <Button
              variant="default"
              onClick={() => setAddNewDatabase((p) => !p)}
            >
              <Plus size={18} />
              <span className="text-sm leading-0 w-35">New Database</span>
            </Button>
            <Button variant="default">
              <Sun size={18} className="" />
            </Button>
          </div>
          <Button variant="default" className="w-full">
            <ChartNetworkIcon size={18} />
            Change Database
          </Button>
        </div>

        {/* saved databases */}
        {!selectedDatabase && (
          <div className="mt-4">
            <hr className="my-2" />
            <h5 className="text-sm font-medium text-primary-foreground/70 mb-2">
              Saved Databases
            </h5>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-90 pr-1">
              {DATABASES.map((db) => (
                <Button
                  onClick={() => handelSelectDatabase(db.name, db.url)}
                  key={db.name}
                  variant="default"
                  size="sm"
                  className="justify-start rounded-sm font-semibold bg-primary/50 hover:bg-primary/70"
                >
                  {db.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Db tables */}
        {databaseTables && (
          <div className="mt-4">
            <hr className="my-2" />
            <h5 className="text-sm font-medium text-primary-foreground/70 mb-2">
              {selectedDatabase} Tables
            </h5>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-90 pr-1">
              {TABLES.map((db, idx) => (
                <Button
                  key={idx}
                  variant="default"
                  size="sm"
                  className="justify-start rounded-sm font-semibold bg-primary/50 hover:bg-primary/70"
                >
                  {db}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add new Database */}
      {addNewDatabase && (
        <div className="min-h-screen w-full bg-muted/30 flex items-center justify-center p-6">
          <NewDatabase />
        </div>
      )}

      {/* content */}
      {/* <div className="text-center">
        <h3>Please Select a Database</h3>
      </div> */}
    </div>
  );
}
