import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
// We use the global .works-container from globals.css which is mapped to standard flex layout
// But normally we should import styles or use global class. globals.css classes are available globally.

export default function SubLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="works-container">
            <Header />
            {children}
            <Footer />
        </div>
    );
}
