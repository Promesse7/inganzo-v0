import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import QuizRunner from "@/components/quiz/QuizRunner";
import { useParams } from "react-router-dom";

const Quiz = () => {
  const params = useParams();
  const lessonId = params.lessonId as string;
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <section className="container mx-auto px-4 py-8">
        <QuizRunner lessonId={lessonId} />
      </section>
      <Footer />
    </div>
  );
};

export default Quiz;


