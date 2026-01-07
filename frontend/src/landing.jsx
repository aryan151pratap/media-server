import { Link, useNavigate } from "react-router-dom";
import Working from "./working";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function MediaServerHero({ user, setUser }) {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const getUser = async () => {
		  const email = localStorage.getItem("media-email");
		  if (!email) return;
	
		  try {
			setLoading(true);
			const res = await fetch(`${API_URL}/user/login/${email}`);
			const result = await res.json();
	
			if (res.ok) {
			  setUser(result);
			}
		  } finally {
			setLoading(false);
		  }
		};
	
		getUser();
	  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-violet-50 to-white text-gray-900">
      {/* Sticky Navigation */}
      <div className="sticky top-0 backdrop-blur-md bg-white/80 border-b border-gray-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex sm:flex-row flex-col items-center justify-between h-fit p-3">
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                MediaServer
              </div>
              <nav className="flex ml-12 space-x-8">
                {[{name: "Docs", link: "/home"}, {name: "Apis", link: "/api"}].map((item) => (
                  <Link to={item.link} key={item} className="text-gray-600 hover:text-violet-600 font-medium transition-colors">
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
            {loading ? 
              <div className="bg-violet-700/20 p-2 px-4 rounded">
                <div className="p-3 border-2 border-violet-700 border-t-transparent animate-spin rounded-full"></div>
              </div>
            :
            user ? (
              <Link to={"/account"} className="flex items-center space-x-3 bg-violet-700/10 hover:bg-violet-700/15 hover:underline text-violet-700 p-1 rounded cursor-pointer border border-violet-300 hover:border-violet-400">
                {user.image ?
                <img src={user.image} alt="" className="h-8 w-8 rounded"/>
                :
                <div className="w-8 h-8 rounded bg-gradient-to-r from-violet-700 to-purple-600 text-white font-semibold flex items-center justify-center">{user.name.split("")[0]}</div>
                }
                <span className="font-medium mr-2">{user.name}</span>
              </Link>
              ) : (
                <Link
                  to="/login"
                  className="text-violet-600 hover:text-violet-700 font-medium"
                >
                  Sign In
                </Link>
              )}
              <Link to={"/home"} className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-6">
                🎬 Enterprise Media Platform
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                Stream, Secure & 
                <span className="block mt-2">
                  Deploy
                  <span className="relative ml-3">
                    <span className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg blur opacity-30"></span>
                    <span className="px-1 relative bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                      Anywhere
                    </span>
                  </span>
                </span>
              </h1>
              
              <p className="mt-6 text-xl text-gray-600 max-w-2xl">
                A private media server platform to host, stream, and protect your content with 
                <span className="font-semibold text-violet-600"> high-performance APIs</span> and 
                <span className="font-semibold text-violet-600"> real-time delivery</span>.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  Start Free Trial
                  <span className="ml-2 text-sm opacity-90">→</span>
                </button>
                <Link to={"/api"} className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-violet-400 hover:text-violet-700 transition-all">
                  Get Api
                  <span className="ml-2 text-sm">▶</span>
                </Link>
              </div>

              <div className="mt-12 flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>99.9% Uptime</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>Global CDN</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>Enterprise Security</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white">
                          ⚡
                        </div>
                        <div>
                          <div className="font-semibold">Live Stream</div>
                          <div className="text-sm text-gray-500">4K • 60fps • Ultra-Low Latency</div>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        Active
                      </div>
                    </div>
                    <div className="h-48 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl text-white">▶</span>
                        </div>
                        <div className="text-white/90">Secure Media Streaming</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Built for Scale & Security</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Everything you need to deliver media globally</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: "⚡", title: "Global Edge Network", desc: "Stream from 200+ edge locations worldwide", color: "from-violet-500 to-purple-500" },
            { icon: "🔒", title: "Enterprise Security", desc: "End-to-end encryption and DRM protection", color: "from-green-500 to-emerald-500" },
            { icon: "📈", title: "Real-time Analytics", desc: "Monitor performance with live metrics", color: "from-blue-500 to-cyan-500" },
            { icon: "🔄", title: "Auto Scaling", desc: "Automatically scale based on demand", color: "from-orange-500 to-red-500" },
            { icon: "🎯", title: "Smart Encoding", desc: "Adaptive bitrate streaming optimized", color: "from-pink-500 to-rose-500" },
            { icon: "🔌", title: "API First", desc: "RESTful APIs for all platform features", color: "from-indigo-500 to-blue-500" },
          ].map((feature, i) => (
            <div key={i} className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-violet-300 hover:shadow-xl transition-all duration-300">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl text-white mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-violet-600 font-medium inline-flex items-center">
                  Learn more 
                  <span className="ml-2">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Working Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <Working />
      </div>

      {/* CTA Section */}
      <div className="relative flex flex-row items-center justify-center mt-32 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl mx-4 lg:mx-auto max-w-7xl">
		<div className="absolute inset-0 flex items-center opacity-80">
			<img src="http://localhost:3000/load/6950d898c59d6a52da219415/daily-post/images/1766844957510-training%20-%20Copy.png" alt="" 
			className=""
			/>
		</div>
        <div className="z-10 px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to scale your media infrastructure?
          </h2>
          <p className="text-violet-100 text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of companies streaming with MediaServer
          </p>
          <button className="px-10 py-4 bg-white text-violet-700 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl">
            Start Free 14-Day Trial
          </button>
          <p className="mt-6 text-violet-200 text-sm">
            No credit card required • Cancel anytime
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-0">
                MediaServer
              </div>
              <div className="text-gray-600">
                © {new Date().getFullYear()} MediaServer Platform. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}