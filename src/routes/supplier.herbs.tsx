import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { herbs as seed } from "@/data/mock";

export const Route = createFileRoute("/supplier/herbs")({ component: MyHerbs });

function MyHerbs() {
  const [rows, setRows] = useState(seed);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">My herbs</h1>
          <p className="text-sm text-muted-foreground">Manage your inventory and availability.</p>
        </div>
        <Button className="rounded-full" onClick={() => toast("Adding herbs is disabled in demo.")}><Plus className="h-4 w-4" /> Add new herb</Button>
      </div>
      <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((h, i) => (
              <TableRow key={h.slug}>
                <TableCell><img src={h.image} alt="" className="h-12 w-12 rounded-xl object-cover" /></TableCell>
                <TableCell className="font-medium">{h.name}</TableCell>
                <TableCell>₹{h.price}</TableCell>
                <TableCell><Badge variant="secondary" className="rounded-full">{h.availability}</Badge></TableCell>
                <TableCell>{20 + i * 3}</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" onClick={() => toast("Edit disabled in demo.")}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => { setRows((r) => r.filter((x) => x.slug !== h.slug)); toast.success("Herb removed."); }}><Trash2 className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}