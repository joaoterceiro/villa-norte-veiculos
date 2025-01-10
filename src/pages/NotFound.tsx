import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <motion.div 
          className="max-w-2xl w-full text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Animation */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 w-full max-w-md mx-auto"
          >
            <DotLottieReact
              src="https://lottie.host/fc233abe-7f8d-4e9d-90e6-0d3f2af8a021/4LqCT4sHXw.lottie"
              loop
              autoplay
            />
          </motion.div>

          {/* Error Message */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold text-secondary"
          >
            404 - Página não encontrada
          </motion.h1>

          {/* Friendly Message */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl md:text-2xl font-medium text-muted"
          >
            Ops! Parece que você se perdeu...
          </motion.h2>

          {/* Explanation */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-base md:text-lg text-muted"
          >
            A página que você está procurando pode ter sido removida, renomeada ou está temporariamente indisponível.
          </motion.p>

          {/* Return Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="pt-4"
          >
            <Button
              onClick={() => navigate("/")}
              className="px-8 py-6 text-lg transition-transform hover:scale-105"
            >
              Voltar para a Home
            </Button>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}