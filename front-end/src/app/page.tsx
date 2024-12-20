"use client";

import { useEffect, useState } from "react";
import { fetchLogs } from "@/lib/fetch-logs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Log {
  id: number;
  time: string;
  name: string;
  location: string;
}

export default function Home() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const getLogs = async () => {
      const { data, error } = await fetchLogs();
      if (error) {
        console.error(error);
      } else {
        setLogs(data || []);
      }
    };

    getLogs();
  }, []);

  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">BantAI</h1>
      <h1 className="text-lg mb-2">Recent logs</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{new Date(log.time).toLocaleString()}</TableCell>
              <TableCell>{log.name}</TableCell>
              <TableCell>{log.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
