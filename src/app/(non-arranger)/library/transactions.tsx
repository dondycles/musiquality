"use client";

import CurrencyText from "@/components/currency-text";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserData } from "@/types/user-data";

type metadata = {
  price: number;
  id: string;
};
export default function Transactions({ userData }: { userData: UserData }) {
  let _ = require("lodash");
  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground text-sm">
        Transactions ({userData.transactions.length})
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Payment ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.transactions.map((trans, i) => {
            return (
              <TableRow key={trans.id} className="w-full text-xs">
                {/* {(trans.metadata as metadata[]).map((sheet: metadata) => {
                return <span key={sheet.id}>{sheet.id}</span>;
              })} */}
                <TableCell>{trans.payment_intent_id}</TableCell>
                <TableCell>{trans.status}</TableCell>
                <TableCell>
                  <CurrencyText
                    branded={false}
                    amount={_.sum(
                      (trans.metadata as metadata[]).map(
                        (sheet: metadata) => sheet.price
                      )
                    )}
                  />
                </TableCell>
                <TableCell>
                  {new Date(trans.created_at).toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
