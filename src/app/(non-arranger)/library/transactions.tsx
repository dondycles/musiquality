"use client";
import getMyTransactions from "@/actions/get-my-transactions";
import { UserData } from "@/types/user-data";
import { useQuery } from "@tanstack/react-query";

type metadata = {
  price: number;
  id: string;
};
export default function Transactions({ userData }: { userData: UserData }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground">Transactions</p>
      {userData.transactions.map((trans) => {
        return (
          <div key={trans.id}>
            {(trans.metadata as metadata[]).map((sheet: metadata) => {
              return <span key={sheet.id}>{sheet.id}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
}
