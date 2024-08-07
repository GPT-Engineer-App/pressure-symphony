import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Cat, Heart, Info, Paw, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

const catImages = [
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg", caption: "Curious Tabby" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg", caption: "Elegant Siamese" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg", caption: "Playful Kitten" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1200px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg", caption: "Autumn Cat" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sleeping_cat_on_her_back.jpg/1200px-Sleeping_cat_on_her_back.jpg", caption: "Sleepy Kitty" },
];

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const [funFact, setFunFact] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catImages.length);
      setProgress(0);
    }, 5000);

    const progressTimer = setInterval(() => {
      setProgress((prevProgress) => Math.min(prevProgress + 1, 100));
    }, 50);

    const funFactTimer = setInterval(() => {
      const facts = [
        "Cats can rotate their ears 180 degrees.",
        "A cat's nose print is unique, like a human's fingerprint.",
        "Cats can't taste sweetness.",
        "The first cat in space was French. She was named Felicette.",
        "Cats can jump up to six times their length.",
      ];
      setFunFact(facts[Math.floor(Math.random() * facts.length)]);
    }, 10000);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
      clearInterval(funFactTimer);
    };
  }, []);

  const handleLike = () => {
    setLikes(likes + 1);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    toast({
      title: "Thanks for the love!",
      description: "Your appreciation means a lot to our feline friends.",
    });
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + catImages.length) % catImages.length);
    setProgress(0);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catImages.length);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="bg-purple-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover the World of Cats
          </motion.h1>
          <motion.p 
            className="text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Explore fascinating facts and popular breeds of our feline friends
          </motion.p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto p-8">
        <Carousel className="mb-8">
          <CarouselContent>
            {catImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative">
                  <motion.img 
                    src={image.url} 
                    alt={image.caption}
                    className="mx-auto object-cover w-full h-[400px] rounded-lg shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div 
                    className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {image.caption}
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <motion.div 
          className="bg-white p-4 rounded-lg shadow-md mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-2 flex items-center">
            <Sparkles className="mr-2 text-yellow-500" />
            Fun Cat Fact
          </h2>
          <p>{funFact || "Loading a fun fact..."}</p>
        </motion.div>
        
        <Tabs defaultValue="facts" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="facts">Feline Facts</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="facts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl"><Info className="mr-2" /> Feline Facts</CardTitle>
                <CardDescription>Interesting tidbits about our furry friends</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    "Cats have been domesticated for over 4,000 years.",
                    "An adult cat has 30 teeth.",
                    "Cats can jump up to six times their length.",
                    "A group of cats is called a 'clowder'.",
                    "Cats spend 70% of their lives sleeping."
                  ].map((fact, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center bg-purple-50 p-3 rounded-lg shadow-sm"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Paw className="mr-2 text-purple-500" />
                      {fact}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl"><Cat className="mr-2" /> Popular Cat Breeds</CardTitle>
                <CardDescription>Some well-known feline friends</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    { breed: "Siamese", description: "Known for their distinctive coloring and vocal nature." },
                    { breed: "Maine Coon", description: "One of the largest domestic cat breeds with a friendly personality." },
                    { breed: "Persian", description: "Recognized for their long fur and flat faces." },
                    { breed: "Bengal", description: "Wild-looking cats with leopard-like spots." },
                    { breed: "Scottish Fold", description: "Famous for their folded ears and round faces." }
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start bg-pink-50 p-3 rounded-lg shadow-sm"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <ArrowRight className="mr-2 mt-1 text-pink-500" />
                      <div>
                        <span className="font-bold">{item.breed}</span>
                        <Badge variant="secondary" className="ml-2">{item.breed.toLowerCase()}</Badge>
                        <p>{item.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleLike}
              className="group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <Heart className="mr-2 h-4 w-4 group-hover:text-red-500 transition-colors" />
                Like this page ({likes})
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </motion.div>
        </div>

        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="mt-4"
            >
              <Alert>
                <Cat className="h-4 w-4" />
                <AlertTitle>Thanks for the love!</AlertTitle>
                <AlertDescription>
                  Your appreciation means a lot to our feline friends.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
