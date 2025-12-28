import { useState } from "react";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    // Menu items dengan dropdown
    const menuItems = [
        { label: "Home", href: "/" },
        { label: "Profil", href: "/profil" },
        {
            label: "Halaman",
            dropdown: [
                { label: "Tentang Kami", href: "/tentang" },
                { label: "Visi & Misi", href: "/visi-misi" },
                { label: "Sejarah", href: "/sejarah" },
            ],
        },
        {
            label: "Layanan",
            dropdown: [
                { label: "Kredit Umum", href: "/layanan/kredit-umum" },
                { label: "Kredit Sumeh", href: "/layanan/kredit-sumeh" },
                { label: "Kredit Elektronik", href: "/layanan/kredit-elektronik" },
                { label: "Kredit Wonogiren", href: "/layanan/kredit-wonogiren" },
            ],
        },
        {
            label: "Informasi",
            dropdown: [
                { label: "Syarat & Ketentuan", href: "/informasi/syarat" },
                { label: "FAQ", href: "/informasi/faq" },
                { label: "Prosedur", href: "/informasi/prosedur" },
            ],
        },
        { label: "Publikasi", href: "/publikasi" },
        { label: "Hubungi Kami", href: "/hubungi" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    
                    {/* Logo - Kiri */}
                    <div className="flex-shrink-0">
                        <a href="/" className="flex items-center">
                            <img 
                                src="https://bankwonogiri.co.id/public/uploads/logo.png" 
                                alt="Bank Wonogiri"
                                className="h-10 w-auto"
                            />
                        </a>
                    </div>

                    {/* Menu - Tengah (Desktop) */}
                    <div className="hidden lg:flex items-center gap-1">
                        {menuItems.map((item, index) => (
                            item.dropdown ? (
                                <DropdownMenu key={index}>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors">
                                            {item.label}
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="center" className="w-48">
                                        {item.dropdown.map((subItem, subIndex) => (
                                            <DropdownMenuItem key={subIndex} asChild>
                                                <a 
                                                    href={subItem.href}
                                                    className="w-full cursor-pointer"
                                                >
                                                    {subItem.label}
                                                </a>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    {item.label}
                                </a>
                            )
                        ))}
                    </div>

                    {/* Search & Mobile Menu - Kanan */}
                    <div className="flex items-center gap-2">
                        {/* Search Button */}
                        <div className="relative">
                            {searchOpen ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Cari..."
                                        className="w-48 px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        autoFocus
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setSearchOpen(false)}
                                        className="h-9 w-9"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSearchOpen(true)}
                                    className="h-9 w-9"
                                >
                                    <Search className="h-4 w-4" />
                                </Button>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden h-9 w-9"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden border-t border-gray-100 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
                    <div className="px-4 py-3 space-y-1">
                        {menuItems.map((item, index) => (
                            item.dropdown ? (
                                <div key={index} className="py-1">
                                    <div className="px-3 py-2 text-sm font-medium text-gray-900">
                                        {item.label}
                                    </div>
                                    <div className="pl-4 space-y-1">
                                        {item.dropdown.map((subItem, subIndex) => (
                                            <a
                                                key={subIndex}
                                                href={subItem.href}
                                                className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                                            >
                                                {subItem.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                                >
                                    {item.label}
                                </a>
                            )
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
