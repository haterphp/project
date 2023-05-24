import { RouterPath } from "@app/router/path"
import { Link } from "react-router-dom"

const LINKS = [
    { to: RouterPath.UF_GREETING, title: 'На главную' },
    { to: RouterPath.ABOUT_APP, title: 'Справка' },
    { to: RouterPath.ABOUT_DEV, title: 'О разработчике' },
]

interface INavbarProps {
    isOpen: boolean,
}

const Navbar = (props: INavbarProps) => {
    return (
        <div className="w-[400px] bg-slate-50 px-5 py-[50px] fixed h-[calc(100%_-_40px)] transition-transform" style={{ transform: props.isOpen ? '' : 'translateX(-400px)' }}>
            <div className="flex flex-col gap-[25px]">
                <h2 className="text-2xl uppercase font-mono text-center">Анализатор текста</h2>
                <div className="flex flex-col">
                    {LINKS.map(item => (
                        <Link
                            to={item.to}
                            className="px-5 py-3 rounded-lg text-base hover:bg-slate-200">
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export { Navbar }