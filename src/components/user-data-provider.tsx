"use client";
import getUser from "@/actions/get-user";
import { UserData } from "@/types/user-data";
import { createContext, useContext } from "react";
import { AuthContext } from "./auth-provider";
import { useQuery } from "@tanstack/react-query";
type InitialState = { userData: UserData | null; isLoading: boolean };

const initialState: InitialState = { userData: null, isLoading: true };
export const UserDataContext = createContext<InitialState>(initialState);

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading: authLoading } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    enabled: !!user && !authLoading,
    queryKey: ["user", user?.id],
    queryFn: async () => {
      const { success, error } = await getUser(user!);
      if (error) throw new Error(error);
      return success ?? null;
    },
  });

  if (!isLoading && !authLoading && data && user?.id !== data?.id)
    throw new Error("Auth error, IDs are not same!");

  if (!isLoading && !authLoading && data === null)
    throw new Error("No data found!");
  return (
    <UserDataContext.Provider
      value={{ isLoading, userData: data === undefined ? null : data }}
    >
      {children}
    </UserDataContext.Provider>
  );
}
