"use client";
import React, { Dispatch, SetStateAction } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, SearchIcon } from "lucide-react";

const formSchema = z.object({
  query: z.string().min(0).max(200),
});

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
};

const SearchBar: React.FC<Props> = ({ query, setQuery }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setQuery(values.query);
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-2 items-center"
        >
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="your file names" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="flex gap-1"
          >
            {form.formState.isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            <SearchIcon /> Search
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SearchBar;
