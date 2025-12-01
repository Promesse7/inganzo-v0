import Link from 'next/link';
import Image from 'next/image';

export default function LessonsPage() {
  const lessons = [
    { 
      id: 'l1', 
      title: 'Precolonial Societies', 
      era: 'Precolonial', 
      duration: '8 min', 
      difficulty: 'Beginner', 
      points: 30,
      image: '/images/precolonial.jpg' // Make sure to add this image to public/images/
    },
    { 
      id: 'l2', 
      title: 'Colonial Administration', 
      era: 'Colonial', 
      duration: '12 min', 
      difficulty: 'Intermediate', 
      points: 45,
      image: '/images/colonial.jpg' // Make sure to add this image to public/images/
    }
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Lessons</h1>
      <p className="text-gray-600 mb-6">Select a lesson to start learning or test your knowledge with a quiz.</p>
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="rounded-xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative h-40 w-full bg-gray-100">
              <Image
                src={lesson.image}
                alt={lesson.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  // Fallback to a placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="p-5">
              <div className="text-sm text-gray-500">{lesson.era}</div>
              <h3 className="mt-1 text-lg font-semibold">{lesson.title}</h3>
              <div className="mt-2 text-sm text-gray-600 mb-4">
                {lesson.duration} • {lesson.difficulty} • +{lesson.points} pts
              </div>
              
              <div className="flex flex-col space-y-3">
                <Link 
                  href={`/lessons/${lesson.id}`}
                  className="w-full px-4 py-2 bg-primary text-white text-center rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Start Learning
                </Link>
                
                <Link 
                  href={`/quiz/${lesson.id}`}
                  className="w-full px-4 py-2 border border-primary text-primary text-center rounded-lg hover:bg-primary/10 transition-colors"
                >
                  Take Quiz
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
