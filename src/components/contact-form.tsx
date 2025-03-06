"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      toast({
        description: "Your message has been sent successfully.",
        className: "bg-white text-black",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to send message. Please try again.",
      });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <h3 className="text-2xl font-semibold mb-8 text-orangeL">Contact Us</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-gray-300">Email</FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-700 text-white border-gray-600 focus:border-orangeL text-base"
                    placeholder="your@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-gray-300">
                  Subject
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-700 text-white border-gray-600 focus:border-orangeL text-base"
                    placeholder="What's this about?"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-gray-300">
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us more about your inquiry..."
                    className="h-32 bg-gray-700 text-white border-gray-600 focus:border-orangeL text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-400" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-orangeL text-gray-900 text-lg font-semibold tracking-wider py-4 hover:bg-orangeL/90 transition-colors duration-300"
          >
            Send Message
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
