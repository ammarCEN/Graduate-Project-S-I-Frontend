'use client';

import { Button } from './ui/button'
import { TbClipboardText } from "react-icons/tb";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import LiveLogger from './live-log';
import useConnection from '@/app/providers/api-provider';
import { MdClearAll } from "react-icons/md";
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';


const ShowLiveLogs = () => {
  const { logs, clearLogs } = useConnection();

  const [unreadCount, setUnreadCount] = useState(-1);

  useEffect(() => {
    setUnreadCount(prev => {
      if (logs.length == 0)
        return 0;

      return prev + 1;
    });
  }, [logs]);

  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='relative'
          onClick={() => setUnreadCount(0)}
        >
          <TbClipboardText />
          System logs
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className={cn(
                "h-5 w-5 p-2",

                "absolute -top-2 -right-2 flex items-center justify-center text-xs rounded-full",

                "!bg-destructive !text-background !ring-2 !ring-destructive/50"
              )}
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            System Live Logger <span className='!text-destructive font-bold'>( {logs.length} )</span>
          </DialogTitle>
          <DialogDescription>
            Here you can show all logs returned from robot.
          </DialogDescription>
        </DialogHeader>

        <LiveLogger />

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant='outline'>
              Close
            </Button>
          </DialogClose>
          <Button type="button" variant='destructive' onClick={clearLogs}>
            <MdClearAll />
            Clear logs
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default ShowLiveLogs