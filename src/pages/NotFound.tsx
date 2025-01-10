import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div
          className="text-center"
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

          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            404 - Página não encontrada
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            A página que você está procurando pode ter sido removida, renomeada ou está temporariamente indisponível.
          </motion.p>

          <motion.button
            onClick={() => navigate("/")}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Voltar para a Home
          </motion.button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}