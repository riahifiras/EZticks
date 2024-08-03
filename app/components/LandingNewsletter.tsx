import React from 'react'

const LandingNewsletter = () => {
    return (
        <div className='w-full h-60 bg-[#FFE047] flex justify-center items-center gap-20'>
            <div className='flex flex-col gap-4 text-[#2D2C3C]'>
                <h2 className='font-semibold text-2xl'>Subscribe to our Newsletter</h2>
                <p className='text-lg'>Receive our weekly newsletter & updates with new events from your favourite organizers & venues.</p>
            </div>
            <div>
                <div className='relative flex'>
                    <input className='w-96 outline-none px-6 py-4 text-lg rounded-l-md' type="text" placeholder='Enter your e-mail address' />
                    <button className='bg-[#2D2C3C] text-[#FEE047] w-32 rounded-r-md'>Subscribe</button>
                    
                </div>
            </div>
        </div>
    )
}

export default LandingNewsletter
