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
import signUp from "@/actions/signup";
import { useQueryClient } from "@tanstack/react-query";

export const signupSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    cpassword: z.string(),
    name: z.string(),
  })
  .refine((data) => data.cpassword === data.password, {
    message: "Password did not match!",
    path: ["cpassword"],
  });

export default function SignupForm() {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      cpassword: "",
      name: "",
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (e) => {
          const { error } = await signUp(e);
          queryClient.invalidateQueries({ queryKey: ["user"] });
          console.log(error);
        })}
        className="flex gap-4 flex-col max-w-[288px]"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />{" "}
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
        <FormField
          control={form.control}
          name="cpassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="flex-1">Sign Up</Button>
      </form>
    </Form>
  );
}
