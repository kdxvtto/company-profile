import { Quote } from "lucide-react";

const WelcomeMessage = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left - Image */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative max-w-sm">
                            {/* Decorative background */}
                            <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl"></div>
                            
                            {/* Image container */}
                            <div className="relative bg-white p-2 rounded-2xl shadow-2xl">
                                <img
                                    src="https://bankwonogiri.co.id/assets/wng/img/photos/mamok.png"
                                    alt="Suparmo, S.E. - Direktur Utama PT BPR BANK WONOGIRI"
                                    className="w-full h-auto rounded-xl object-cover"
                                />
                            </div>

                            {/* Floating badge */}
                            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-xl">🏦</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">40+ Tahun</p>
                                        <p className="text-xs text-gray-600">Melayani Wonogiri</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Content */}
                    <div className="space-y-6">
                        {/* Quote icon */}
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                            <Quote className="w-8 h-8 text-blue-600" />
                        </div>

                        {/* Welcome message */}
                        <div className="space-y-4">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed">
                                "Selamat datang di PT BPR BANK WONOGIRI (Perseroda)!"
                            </h3>
                            
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Kami dengan bangga menyambut Anda di platform digital kami. Di era ini, kemudahan akses dan pelayanan prima kepada Anda adalah prioritas utama kami.
                            </p>
                            
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Melalui website ini, kami berharap dapat memberikan informasi yang jelas dan transparan, terus berinovasi dan meningkatkan kualitas layanan merupakan komitmen kami.
                            </p>

                            <p className="text-gray-600 text-lg italic">
                                Salam hormat,
                            </p>
                        </div>

                        {/* Signature */}
                        <div className="pt-6 border-t border-gray-200">
                            <div className="flex items-center gap-4">
                                <div className="w-1 h-12 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900">Suparmo, S.E.</h4>
                                    <p className="text-blue-600 font-medium">Direktur Utama</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WelcomeMessage;
