import { LayoutHeader } from "@app/tools/layout"
import ProfileImage from '@app/assets/photo_2023-02-14_20-47-18.jpg'

const SKILL_LIST: string[] = [
    'JavaScript', 'TypeScript', 'React', "Angular.js", "Redux", "Electron.js", "Vue.js",
    'Axios', 'Redux-Toolkit', 'PHP', 'Laravel'
]

const LINKS_LIST: { link: string, title: string }[] = [
    { link: 'https://github.com/haterphp', title: 'GitHub' },
    { link: 'https://gitlab.com/haterphp', title: 'GitLab' },
    { link: 'https://www.npmjs.com/~haterphp', title: 'NPM' },
]

const AboutSection = () => {

    const handleOpenLink = (link: string) => () => {
        const w = window as any
        w.electron.openExternalLink(link)
    }

    return (
        <div className="flex flex-col gap-5">
            <p>Веб-разработчик из Томска, студент группы з-422П8-5, Вариант №13</p>
            <div className="flex flex-wrap gap-3 max-w-[400px]">
                {SKILL_LIST.map(val => (
                    <div className="px-2 py-1 text-xs cursor-default bg-slate-300 hover:bg-slate-400 transition-colors rounded">{val}</div>
                ))}
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-xl">Мои ссылки:</p>
                <div className="flex flex-col gap-2 items-start">
                    {LINKS_LIST.map(item => (
                        <button onClick={handleOpenLink(item.link)} className="text-green-500 hover:text-green-600 text-sm">{item.title}</button>
                    ))}
                </div>
            </div>

        </div>
    )
}

const AboutDevPage = () => {
    return (
        <div className="flex gap-10">
            <img src={ProfileImage} className="w-[300px] h-[300px] object-cover rounded-full" alt="logo" />
            <LayoutHeader
                subtitle="О разработчике"
                title="Норов Владислав"
                description={<AboutSection />}
            />
        </div>
    )
}

export { AboutDevPage }