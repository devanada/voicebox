"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { CustomFormField } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

import { LoginSchema, loginSchema } from "@/lib/types/auth";

export default function LoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const response = await signIn("credentials", data);

      if (!response?.ok) {
        throw new Error("Network response was not ok");
      }

      toast("Login berhasil");
    } catch (error) {
      toast("Login gagal");
    }
  };

  return (
    <Form {...form}>
      <form
        data-testid="form-login"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full md:w-3/4 lg:w-1/2"
      >
        <CustomFormField control={form.control} name="email" label="Email">
          {(field) => (
            <Input
              {...field}
              data-testid="input-email"
              placeholder="name@domain.com"
              type="email"
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
              value={field.value as string}
            />
          )}
        </CustomFormField>
        <CustomFormField
          control={form.control}
          name="password"
          label="Password"
        >
          {(field) => (
            <Input
              {...field}
              data-testid="input-password"
              placeholder="Password"
              type="password"
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
              value={field.value as string}
            />
          )}
        </CustomFormField>
        <div className="flex flex-col mt-20 gap-y-5 relative">
          <Button
            data-testid="btn-submit"
            type="submit"
            disabled={form.formState.isSubmitting}
            aria-disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="h-4 mr-2 animate-spin w-4" />
                Please wait
              </>
            ) : (
              "Login"
            )}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <Button
            data-testid="btn-navigate"
            type="button"
            disabled={form.formState.isSubmitting}
            aria-disabled={form.formState.isSubmitting}
            variant="outline"
            asChild
          >
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
