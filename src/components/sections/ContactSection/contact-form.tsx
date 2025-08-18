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
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch by only rendering form on client
  useEffect(() => {
    setIsClient(true);
  }, []);

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
    setIsSubmitting(true);
    const startTime = Date.now();

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

      // Ensure minimum loading time for better UX
      const elapsedTime = Date.now() - startTime;
      const minLoadingTime = 1000; // 1 second minimum

      if (elapsedTime < minLoadingTime) {
        await new Promise((resolve) =>
          setTimeout(resolve, minLoadingTime - elapsedTime)
        );
      }

      toast({
        title: "Success!",
        description: "Your message has been sent successfully.",
        className: "bg-green-600 text-white border-green-700",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `failed to send message. Please try again. error:${error}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Show loading state during SSR to prevent hydration mismatch
  if (!isClient) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto text-honeydew px-4"
      >
        <h3 className="text-2xl font-semibold mb-8">Contact Us</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-32 bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="h-14 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto text-honeydew px-4"
    >
      <h3 className="text-2xl font-semibold mb-8">Contact Us</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          aria-label="Contact form"
          suppressHydrationWarning
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-gray-300">Email</FormLabel>
                <FormControl>
                  <Input
                    className={`bg-gray-700 text-white border-gray-600 focus:border-orangeL text-base transition-all duration-300 ${
                      isSubmitting ? "opacity-60" : ""
                    }`}
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                    aria-describedby="email-error"
                    {...field}
                  />
                </FormControl>
                <FormMessage
                  id="email-error"
                  className="text-sm text-red-400"
                />
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
                    className={`bg-gray-700 text-white border-gray-600 focus:border-orangeL text-base transition-all duration-300 ${
                      isSubmitting ? "opacity-60" : ""
                    }`}
                    placeholder="What's this about?"
                    disabled={isSubmitting}
                    aria-describedby="subject-error"
                    {...field}
                  />
                </FormControl>
                <FormMessage
                  id="subject-error"
                  className="text-sm text-red-400"
                />
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
                    className={`h-32 bg-gray-700 text-white border-gray-600 focus:border-orangeL text-base transition-all duration-300 ${
                      isSubmitting ? "opacity-60" : ""
                    }`}
                    disabled={isSubmitting}
                    aria-describedby="message-error"
                    {...field}
                  />
                </FormControl>
                <FormMessage
                  id="message-error"
                  className="text-sm text-red-400"
                />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            aria-label={isSubmitting ? "Sending message..." : "Send message"}
            className={`w-full bg-persian_orange text-gray-900 text-lg font-semibold tracking-wider py-4 hover:bg-orangeL/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-persian_orange hover:scale-[0.99] ${
              isSubmitting ? "animate-pulse" : ""
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                <span>Sending...</span>
              </div>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
