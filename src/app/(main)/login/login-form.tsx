"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import login from "@/actions/login";
import { useQueryClient } from "@tanstack/react-query";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function LoginForm() {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const _login = async (data: z.infer<typeof loginSchema>) => {
    const { error } = await login(data);
    if (error) throw new Error(error.message);
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => _login(data))}
        className="flex gap-4 flex-col max-w-[288px]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="flex-1">Log In</Button>
      </form>
    </Form>
  );
}
