import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SmoothScroll from './three/SmoothScroll';
import CustomCursor from './components/CustomCursor';

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const CropFinder = lazy(() => import('./pages/CropFinder'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: 'var(--green-mid)', borderTopColor: 'transparent', borderWidth: '3px' }} />
        <p className="text-sm font-medium" style={{ color: 'var(--ink-soft)' }}>Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <SmoothScroll>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/crop-finder" element={<CropFinder />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={
              <div className="min-h-screen flex flex-col items-center justify-center pt-20" style={{ background: 'var(--cream)' }}>
                <h1 className="font-display text-4xl font-bold mb-4" style={{ color: 'var(--green-deep)' }}>
                  Page Not Found
                </h1>
                <p className="mb-6" style={{ color: 'var(--ink-soft)' }}>
                  The page you're looking for doesn't exist.
                </p>
                <a href="/" className="btn-gold px-6 py-3 rounded-xl text-sm">
                  Go Home
                </a>
              </div>
            } />
          </Routes>
        </Suspense>
      </Layout>
      </SmoothScroll>
    </BrowserRouter>
  );
}
