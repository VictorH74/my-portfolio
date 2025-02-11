import Image from 'next/image';

export const Navbar = () => {
    return (
        <div className="w-full fixed top-7 text-center">
            <div className="max-w-default w-full py-4 px-10 mx-auto rounded-full justify-between flex items-center bg-custom-black shadow-md">
                <Image
                    src="/me-logo-v2.svg"
                    alt="logo"
                    width={50}
                    height={50}
                />
                <nav>
                    <ul className="text-[#a7b3c5] font-extrabold flex gap-6">
                        <li>Welcome</li>
                        <li>About Me</li>
                        <li>Technologies</li>
                        <li>Projects</li>
                        <li>Contact Me</li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
