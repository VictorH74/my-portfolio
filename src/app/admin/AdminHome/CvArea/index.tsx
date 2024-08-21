import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

export default function CvArea() {
    return (
        <div>
            <h1 className="text-2xl mb-2">CV</h1>
            <label className="rounded-md bg-gray-200 dark:bg-[#3f3f3f] max-w-[500px] p-2 flex items-center gap-2 cursor-pointer relative" htmlFor='load-pdf'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none" className="h-10 w-10 flex-shrink-0" width="36" height="36"><rect width="36" height="36" rx="6" fill="#FF5588"></rect><path d="M19.6663 9.66663H12.9997C12.5576 9.66663 12.1337 9.84222 11.8212 10.1548C11.5086 10.4673 11.333 10.8913 11.333 11.3333V24.6666C11.333 25.1087 11.5086 25.5326 11.8212 25.8451C12.1337 26.1577 12.5576 26.3333 12.9997 26.3333H22.9997C23.4417 26.3333 23.8656 26.1577 24.1782 25.8451C24.4907 25.5326 24.6663 25.1087 24.6663 24.6666V14.6666L19.6663 9.66663Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.667 9.66663V14.6666H24.667" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21.3337 18.8334H14.667" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21.3337 22.1666H14.667" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.3337 15.5H15.5003H14.667" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                <div className="flex flex-col grow">
                    <p>Nome do arquivo.pdf</p>
                    <p className="text-sm text-gray-400 font-semibold">PDF</p>
                </div>
                <ChangeCircleIcon sx={{fontSize: 30}} />
            </label>
            <input type="file" id='load-pdf' accept='.pdf' className='absolute pointer-events-none opacity-0' />
        </div>
    )
}