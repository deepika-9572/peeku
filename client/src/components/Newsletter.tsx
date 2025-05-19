import { FormEvent, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Handle the subscription (mock)
    toast({
      title: "Subscription Successful!",
      description: "You've been subscribed to our newsletter.",
    });
    
    setEmail("");
  };

  return (
    <section className="py-12 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl mb-2">Subscribe to Our Newsletter</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Stay updated with our latest offerings, seasonal specialties, and exclusive discounts.
        </p>
        <form 
          className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          onSubmit={handleSubmit}
        >
          <input 
            type="email" 
            placeholder="Your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-lg flex-grow text-neutral-800 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button 
            type="submit" 
            className="bg-accent hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
