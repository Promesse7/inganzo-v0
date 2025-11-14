import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LessonCard from "@/components/lesson/LessonCard";
import { lessons } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <section className="bg-gradient-to-b from-emerald-800 to-emerald-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold">Learn Rwanda’s History</h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Bite-sized lessons, engaging quizzes, and contributions from our community.
          </p>
          <Button className="mt-6" onClick={() => navigate("/stories")}>
            Start Learning
          </Button>
        </div>
      </section>
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-emerald-900">Featured Lessons</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((l) => (
            <LessonCard key={l.id} lesson={l} onOpen={(id) => navigate(`/quiz/${id}`)} />
          ))}
        </div>
      </section>
      <section className="container mx-auto px-4 pb-12">
        <Card>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-lg font-semibold text-emerald-900">Contribute a testimony</div>
              <div className="text-sm text-gray-600">Share audio, video, or text for others to learn from.</div>
            </div>
            <Button variant="secondary" onClick={() => navigate("/upload")}>
              Upload/Testimony
            </Button>
          </div>
        </Card>
      </section>
      <Footer />
    </div>
  );
};

export default Index;
