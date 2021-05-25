import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
 import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function Layout({children, title="Book best hotels for your holiday"}) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>

            <Header/>
                <ToastContainer position="bottom-right"/>
                {children}
            <Footer/>
        </div>
    )
}
