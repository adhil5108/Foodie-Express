import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export default function Home(){
  let fakedata=[
            {
              title:'Cheesy Pizza',
              img:'https://plus.unsplash.com/premium_photo-1722945691819-e58990e7fb27?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600'
            },
            {
              title:'Loaded Burger',
              img:'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop'
            },
            {
              title:'Spicy Biryani',
              img:'https://static.vecteezy.com/system/resources/thumbnails/040/703/949/small/ai-generated-royal-feast-master-the-art-of-chicken-biryani-at-home-generative-ai-photo.jpg'
            },
          ]
  return (
    <>
    <main>
     
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 items-center gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Hungry? <span className="text-brand">We deliver</span> happiness.
            </h1>
            <p className="mt-3 text-slate-600">
              Discover top restaurants and mouth-watering dishes delivered fast to your doorstep.
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/menu" className="px-5 py-3 rounded-2xl bg-brand text-white hover:bg-brand-dark">
                Browse Menu
              </Link>
              <a href="#featured" className="px-5 py-3 rounded-2xl border border-slate-300 hover:bg-slate-100">
                Featured
              </a>
            </div>
          </div>
        </div>
      </section>

     
      <section id="featured" className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">Top Picks</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {fakedata.map((c,idx)=>(
            <div key={idx} className="bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition">
              <img src={c.img} alt={c.title} className="h-44 w-full object-cover"/>
              <div className="p-4">
                <h3 className="font-semibold">{c.title}</h3>
                <Link to="/menu" className="text-brand text-sm">See in menu →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      <section id="about" className="bg-gray-50 border-t border-gray-200 mt-10">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 items-center gap-10">
          <div>
            <img
              src="https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop"
              alt="Our kitchen"
              className="rounded-2xl shadow-md object-cover w-full h-80"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-brand">About Us</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Welcome to <span className="font-semibold text-brand">TastyBite</span> — where every meal tells a story!  
              We’re passionate about bringing delicious food from your favorite restaurants right to your doorstep.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Our mission is simple: to make good food accessible, fast, and unforgettable. 
              Whether you’re craving cheesy pizzas, spicy biryanis, or a refreshing drink, 
              we’ve got you covered with hand-picked dishes and speedy delivery.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Founded in Kerala, we’re proud to serve food lovers all across the region — 
              because happiness, after all, starts with great food! 
            </p>
            <Link
              to="/menu"
              className="inline-block px-5 py-3 rounded-2xl bg-brand text-white hover:bg-brand-dark transition"
            >
              Explore Our Menu
            </Link>
          </div>
        </div>
      </section>
    </main>
      <Footer/>
  </>
  )
}
