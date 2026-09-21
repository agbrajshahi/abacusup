const testimonials = [
  { name: "Mrs. Rahima", role: "Parent", text: "আমার ছেলের মানসিক গণনা অনেক বেড়েছে। শিক্ষকরা অসাধারণ!" },
  { name: "Tanvir Ahmed", role: "Student", text: "The interactive abacus tool is amazing. Practice করা এখন মজার!" },
  { name: "Nusrat Jahan", role: "Parent", text: "ঘরে বসেই ক্লাস করা যায়, খুব সুবিধাজনক।" },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our <span className="text-emerald-600">Students Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <p className="text-yellow-500 mb-3">★★★★★</p>
              <p className="text-gray-700 italic leading-relaxed">"{t.text}"</p>
              <div className="mt-5">
                <p className="font-bold text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}