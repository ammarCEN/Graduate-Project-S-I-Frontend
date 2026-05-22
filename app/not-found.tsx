import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <Card>
            <CardContent>
                <div className="flex flex-col h-full items-center justify-center gap-4">
                    <img
                        className="h-80"
                        src={"/SAQI-Logo.png"}
                        alt="SAQI logo alt"
                    />
                    <h1 className='text-5xl font-bold text-center'>404 - Page Not Found</h1>
                    <p className='text-gray-500 text-lg text-center'>We couldn't find what you were looking for.</p>
                    <Button variant='link'>

                        <Link className='mt-4' href="/">Return Home</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default NotFound