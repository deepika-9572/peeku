import { FormEvent, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Newsletter from "@/components/Newsletter";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !subject || !message) {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <section className="py-12 bg-primary bg-opacity-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl mb-4">Contact Us</h1>
          <p className="max-w-2xl mx-auto text-lg">We'd love to hear from you. Get in touch with us!</p>
        </div>
      </section>
      
      <section id="contact" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <form id="contact-form" className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primaryDark text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Sending...
                    </>
                  ) : "Send Message"}
                </button>
              </form>
            </div>
            <div className="lg:w-1/2 bg-neutral-100 rounded-lg p-6">
              <h3 className="font-heading text-xl mb-4">Visit Our Bakery</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-secondary rounded-full p-2 mr-3 mt-1">
                    <i className="fas fa-map-marker-alt text-accent"></i>
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-neutral-600">Dayananda Sagar academy of technology and management banglore pin-560062</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-secondary rounded-full p-2 mr-3 mt-1">
                    <i className="fas fa-phone-alt text-accent"></i>
                  </div>
                  <div>
                    <h4 className="font-medium">Phone Number</h4>
                    <p className="text-neutral-600">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-secondary rounded-full p-2 mr-3 mt-1">
                    <i className="fas fa-envelope text-accent"></i>
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-neutral-600">hello@Peekusbakery.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-secondary rounded-full p-2 mr-3 mt-1">
                    <i className="fas fa-clock text-accent"></i>
                  </div>
                  <div>
                    <h4 className="font-medium">Opening Hours</h4>
                    <p className="text-neutral-600">Mon-Sat: 7:00 AM - 8:00 PM</p>
                    <p className="text-neutral-600">Sunday: 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-medium mb-2">Follow Us</h4>
                <div className="flex space-x-3">
                  <a href="#" className="bg-secondary hover:bg-primary hover:text-white p-2 rounded-full transition-colors">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="bg-secondary hover:bg-primary hover:text-white p-2 rounded-full transition-colors">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="bg-secondary hover:bg-primary hover:text-white p-2 rounded-full transition-colors">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="bg-secondary hover:bg-primary hover:text-white p-2 rounded-full transition-colors">
                    <i className="fab fa-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="font-heading text-lg mb-2">Do you offer catering services?</h3>
              <p className="text-neutral-600">
                Yes, we offer catering services for events of all sizes. Please contact us at least 
                72 hours in advance to discuss your requirements and place an order.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="font-heading text-lg mb-2">Can I place a custom order?</h3>
              <p className="text-neutral-600">
                Absolutely! We love creating custom orders for special occasions. Please contact us 
                with your requirements, and we'll work with you to create something perfect.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="font-heading text-lg mb-2">Do you have gluten-free or vegan options?</h3>
              <p className="text-neutral-600">
                Yes, we offer a selection of gluten-free and vegan baked goods. Please check our menu 
                for the current selection or contact us for more information.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="font-heading text-lg mb-2">What is your delivery area?</h3>
              <p className="text-neutral-600">
                We currently deliver to all areas within a 10 km radius of our bakery. Delivery fees 
                may vary based on distance. For areas outside our delivery zone, we recommend using 
                third-party delivery services.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl text-center mb-8">Find Us</h2>
          <div className="h-96 bg-neutral-200 rounded-lg overflow-hidden">
            {/* Placeholder for map - in a real app, you would use a map component or iframe */}
            <div className="w-full h-full flex items-center justify-center bg-neutral-300">
              <div className="text-center">
                <i className="fas fa-map-marker-alt text-4xl text-primary mb-2"></i>
                <p className="font-medium">Dayananda Sagar academy of technology and management banglore pin-560062</p>
                <p className="text-sm text-neutral-600">(Map would be displayed here)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Newsletter />
    </>
  );
};

export default Contact;
