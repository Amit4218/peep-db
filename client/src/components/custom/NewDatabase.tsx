import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

type ConnectionType = "FULL" | "QUICK";

function NewDatabase() {
  const [connectionType, setConnectionType] = useState<ConnectionType>("FULL");

  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [host, setHost] = useState("localhost");
  const [port, setPort] = useState("5432");

  const [databaseUrl, setDatabaseUrl] = useState("");

  const [error, setError] = useState("");

  const handelFullConnect = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!name || !user || !password || !host || !port) {
      setError("Please fill all required fields");
      return;
    }
  };

  const handelQuickConnect = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!databaseUrl) {
      setError("Database URL is required");
      return;
    }
  };

  return (
    <Card className="w-full max-w-3xl border-border/60 shadow-sm">
      {/* Header */}
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">Connect Database</CardTitle>

            <CardDescription className="mt-1 text-xs">
              Configure a PostgreSQL connection
            </CardDescription>
          </div>

          {/* Compact Tabs */}
          <div className="flex rounded-md border bg-muted p-1">
            <button
              onClick={() => setConnectionType("FULL")}
              className={`rounded px-3 py-1 text-xs transition ${
                connectionType === "FULL"
                  ? "bg-background shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              Full
            </button>

            <button
              onClick={() => setConnectionType("QUICK")}
              className={`rounded px-3 py-1 text-xs transition ${
                connectionType === "QUICK"
                  ? "bg-background shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              Quick
            </button>
          </div>
        </div>
      </CardHeader>

      {/* Error */}
      {error && (
        <div className="px-6 pb-2">
          <div className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-500">
            {error}
          </div>
        </div>
      )}

      {/* FULL */}
      {connectionType === "FULL" && (
        <form onSubmit={handelFullConnect}>
          <CardContent className="space-y-6">
            {/* Connection */}
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="database_name" className="text-xs">
                    Database Name
                  </Label>

                  <Input
                    id="database_name"
                    placeholder="production_db"
                    className="h-9"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="database_user" className="text-xs">
                    User
                  </Label>

                  <Input
                    id="database_user"
                    placeholder="postgres"
                    className="h-9"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Credentials */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="database_password" className="text-xs">
                  Password
                </Label>

                <Input
                  id="database_password"
                  type="password"
                  placeholder="••••••••"
                  className="h-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Server */}
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="database_host" className="text-xs">
                    Host
                  </Label>

                  <Input
                    id="database_host"
                    placeholder="localhost"
                    className="h-9"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="database_port" className="text-xs">
                    Port
                  </Label>

                  <Input
                    id="database_port"
                    placeholder="5432"
                    className="h-9"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="justify-end gap-2 border-t pt-4">
            <Button size="sm">Save & Connect</Button>
          </CardFooter>
        </form>
      )}

      {/* QUICK */}
      {connectionType === "QUICK" && (
        <form onSubmit={handelQuickConnect}>
          <CardContent>
            <div className="space-y-1.5">
              <Label htmlFor="database_url" className="text-xs">
                Database URL
              </Label>

              <Input
                id="database_url"
                placeholder="postgresql://<user>:<password>@localhost:5432/<db>"
                className="h-9"
                value={databaseUrl}
                onChange={(e) => setDatabaseUrl(e.target.value)}
              />

              <p className="text-xs text-muted-foreground my-4">
                Temporary connection, not saved locally.
              </p>
            </div>
          </CardContent>

          <CardFooter className="justify-end border-t pt-4">
            <Button size="sm">Quick Connect</Button>
          </CardFooter>
        </form>
      )}
    </Card>
  );
}

export default NewDatabase;
