import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className='h-full w-full overflow-x-hidden'>
            {children}
        </div>
    )
}

export default Layout