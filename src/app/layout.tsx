import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import "./styles/globals.css";

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="pt-BR" suppressHydrationWarning={true}>
            <body suppressHydrationWarning={true}>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
};

export default RootLayout;
