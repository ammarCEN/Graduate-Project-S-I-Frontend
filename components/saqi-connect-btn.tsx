'use client';

import useConnection from '@/app/providers/api-provider'
import StatusIndicator from './status-indicator'
import { Button } from './ui/button'

const SAQIConnectBtn = () => {
    const { isConnected } = useConnection();
    return (
        <>
            <StatusIndicator className="border px-2 rounded-lg" connected={isConnected} buttonGroup />
            <Button variant="outline">
                Connect
            </Button>
        </>
    )
}

export default SAQIConnectBtn