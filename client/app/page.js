import Link from 'next/link'

export default function Home() {
    
    return <main>
        <div className='columns-3'>
            <div className='col-auto'>
                <Link href='/learn' >
                    Learn
                </Link>
            </div>
            <div className='col-auto'>
                <Link href='/learn' >
                    Learn
                </Link>
            </div>
            <div className='col-auto'>
                <Link href='/learn' >
                    Learn
                </Link>
            </div>
        </div>
    </main>
}
