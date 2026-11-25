import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'swiper/css/navigation';
import '../index.css';
import '../css/global.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function App({ Component, pageProps }) {
  return <><Header /><Component {...pageProps} /><Footer /></>;
}
